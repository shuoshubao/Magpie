/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:11:34
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-27 13:52:25
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { BrowserWindow } from '@electron/remote'
import { Modal, Card, List, Select, Result, Button, InputNumber, Typography, Progress, message } from 'antd'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import BugOutlined from '@ant-design/icons/BugOutlined'
import { Column } from '@antv/g2plot'
import { Table } from '@nbfe/components'
import { last, sortBy } from 'lodash'
import { sleep, div, formatters, isEmptyObject } from '@nbfe/tools'
import Jscpd from '@/components/Jscpd'
import { Colors } from '@/configs'
import { getColumns, getDataSource, getProgressPercent, getProgressFormat, JsExtensions, getColumnData } from './config'

const { Text } = Typography

const Index = () => {
  const chartRef = useRef()

  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState()
  const [projectList, setProjectList] = useState([])
  const [projectInofList, setProjectInofList] = useState([])
  const [columnPlot, setColumnPlot] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [largeFileLimit, setLargeFileLimit] = useState()
  const [eslintLoading, setEslintLoading] = useState(false)
  const [EslintData, setEslintData] = useState({})
  const [JscpdData, setJscpdData] = useState({})

  const fetchProjectInfoList = async value => {
    const res = await ipcRenderer.invoke('getProjectAnalysis', value)

    setProjectInofList(res)

    await sleep(0)

    columnPlot?.destroy()

    const plot = new Column(chartRef.current, {
      data: getColumnData(res),
      xField: 'label',
      yField: 'value',
      label: true,
      meta: {
        value: {
          alias: '数量'
        }
      }
    })

    setColumnPlot(plot)

    plot.render()
  }

  const fetchEslintReport = async () => {
    setEslintLoading(true)
    const sTime = Date.now()
    const res = await ipcRenderer.invoke('getEslintResults', project)
    if (res.errMsg) {
      message.error(res.errMsg)
      return
    }
    const eTime = Date.now()
    message.info(`已生成Eslint报告, 耗时: ${eTime - sTime} ms`)
    setEslintLoading(false)
    setEslintData(res)
  }

  const fetchLocalEslintReport = value => {
    const projectName = last(value.split('/'))
    const { ESLINT_REPORT_DIR } = ipcRenderer.sendSync('getMainConfig')
    const localReports = ipcRenderer.sendSync('globSync', `${ESLINT_REPORT_DIR}/${projectName}/1*.json`)
    if (localReports.length) {
      const res = ipcRenderer.sendSync('fse', 'readJsonSync', last(localReports))
      setEslintData(res)
    } else {
      setEslintData({})
    }
  }

  const fetchJscpdReport = async () => {
    const sTime = Date.now()
    const res = await ipcRenderer.invoke('getJscpdReport', project)
    if (res.errMsg) {
      message.error(res.errMsg)
      return
    }
    setJscpdData(res)
    const eTime = Date.now()
    message.info(`已生成Jscpd报告, 耗时: ${eTime - sTime} ms`)
  }

  const fetchLocalJscpdReport = value => {
    const projectName = last(value.split('/'))
    const { JSCPD_REPORT_DIR } = ipcRenderer.sendSync('getMainConfig')
    const localReports = ipcRenderer.sendSync('globSync', `${JSCPD_REPORT_DIR}/${projectName}/1*.json`)
    if (localReports.length) {
      const res = ipcRenderer.sendSync('fse', 'readJsonSync', last(localReports))
      setJscpdData(res)
    } else {
      setJscpdData({})
    }
  }

  const fetchProjects = () => {
    const projects = ipcRenderer.sendSync('getStore', 'projects')
    const dataSource = projects
      .filter(v => {
        const gitExisted = ipcRenderer.sendSync('fs', 'existsSync', [v, '.git'].join('/'))
        const packageExisted = ipcRenderer.sendSync('fs', 'existsSync', [v, 'package.json'].join('/'))
        return gitExisted && packageExisted
      })
      .map(v => {
        const shortName = last(v.split('/'))
        return {
          value: v,
          label: shortName
        }
      })
    if (dataSource.length === 0) {
      return
    }
    const { value } = dataSource[0]
    setLoading(false)
    setProjectList(dataSource)
    setProject(value)
    fetchProjectInfoList(value)
    fetchLocalEslintReport(value)
    fetchLocalJscpdReport(value)
  }

  useEffect(() => {
    fetchProjects()
  }, [setProject, setProjectList, setEslintData])

  useEffect(() => {
    const defaultValue = ipcRenderer.sendSync('getStore', 'largeFileLimit')
    setLargeFileLimit(defaultValue)
  }, [setLargeFileLimit])

  const projectInofJsFileList = projectInofList.filter(v => {
    const { ext } = v
    return JsExtensions.includes(ext)
  })

  const largeFiles = sortBy(
    projectInofJsFileList.filter(v => {
      const { lines } = v
      return lines >= largeFileLimit
    }),
    ['lines']
  ).reverse()

  if (loading) {
    return null
  }

  if (!projectList.length) {
    return (
      <Result
        status="error"
        title="你还没添加项目"
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.hash = '#/dashboard/projects'
            }}
          >
            添加项目
          </Button>
        }
      />
    )
  }

  return (
    <>
      <Card
        title="基本信息"
        extra={
          <Select
            value={project}
            onChange={async value => {
              await fetchProjectInfoList(value)
              setProject(value)
              fetchLocalEslintReport(value)
              fetchLocalJscpdReport(value)
            }}
            options={projectList}
            style={{ width: 200 }}
          />
        }
      >
        {!!projectInofList.length && (
          <Table
            key={project}
            rowKey="type"
            size="small"
            columns={getColumns()}
            dataSource={getDataSource({ projectInofList })}
            pagination={false}
          />
        )}
      </Card>

      <Card
        title={
          <>
            <span>大文件</span>
            <Text type={largeFiles.length ? 'danger' : 'success'}> {largeFiles.length}</Text>
            <span> / </span>
            <span>{projectInofJsFileList.length}</span>
            <span> = </span>
            <Text type={largeFiles.length ? 'danger' : 'success'}>
              {formatters.percentage(div(largeFiles.length, projectInofJsFileList.length))}
            </Text>
          </>
        }
        extra={
          <Button
            type="primary"
            icon={<SettingOutlined />}
            onClick={() => {
              setModalVisible(true)
            }}
          />
        }
        bodyStyle={{ padding: 0 }}
      >
        <List
          size="small"
          dataSource={largeFiles}
          style={{ maxHeight: 40 * 10, overflow: 'auto' }}
          renderItem={(v, i) => {
            const { filePath, lines } = v
            return (
              <List.Item
                extra={
                  <FolderOpenOutlined
                    onClick={() => {
                      shell.showItemInFolder([project, filePath].join('/'))
                    }}
                  />
                }
                style={{ padding: i === largeFiles.length - 1 ? '9px 10px' : '9px 10px 8px' }}
              >
                <span>
                  <Text copyable>{filePath}</Text>
                  <span>({lines})</span>
                </span>
              </List.Item>
            )
          }}
        />
      </Card>

      <Card title="代码行数分布图">
        <div ref={chartRef} style={{ height: 300 }} />
      </Card>

      <Card
        title="Eslint"
        extra={
          <>
            <Button
              type="primary"
              loading={eslintLoading}
              disabled={!EslintData.EslintReportFilePath}
              icon={<EyeOutlined />}
              onClick={() => {
                const win = new BrowserWindow()
                win.maximize()
                win.loadURL(`file://${EslintData.EslintReportFilePath}`)
              }}
            >
              新窗口查看完整的报告
            </Button>
            <Button type="primary" loading={eslintLoading} icon={<BugOutlined />} onClick={fetchEslintReport}>
              开始检测
            </Button>
          </>
        }
      >
        {isEmptyObject(EslintData) ? (
          <Result title="暂无数据" />
        ) : (
          <Progress
            width={150}
            percent={getProgressPercent(EslintData)}
            format={getProgressFormat(EslintData)}
            type="circle"
            strokeColor={Colors.red}
            trailColor={Colors.green}
          />
        )}
      </Card>

      <Card
        title="Jscpd"
        extra={
          <Button type="primary" loading={eslintLoading} icon={<BugOutlined />} onClick={fetchJscpdReport}>
            开始检测
          </Button>
        }
      >
        {isEmptyObject(JscpdData) ? <Result title="暂无数据" /> : <Jscpd dataSource={JscpdData} />}
      </Card>

      <Modal
        visible={modalVisible}
        title="大文件阈值"
        width={400}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          ipcRenderer.send('setStore', 'largeFileLimit', largeFileLimit)
          setModalVisible(false)
        }}
      >
        <InputNumber value={largeFileLimit} onChange={setLargeFileLimit} step={10} min={100} />
      </Modal>
    </>
  )
}

Index.displayName = 'Analysis'

export default Index
