/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:11:34
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-05-11 14:05:03
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { Modal, Card, List, Select, Result, Button, InputNumber, Typography, Progress, message } from 'antd'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import BugOutlined from '@ant-design/icons/BugOutlined'
import Table from '@ke/table'
import { last, sortBy } from 'lodash'
import { div, formatters } from '@nbfe/tools'
import { Colors } from '@/configs'
import { getColumns, getDataSource, getProgressPercent, getProgressFormat, JsExtensions } from './config'

const { Text } = Typography

const Index = () => {
  const [project, setProject] = useState()
  const [projectList, setProjectList] = useState([])
  const [projectInofList, setProjectInofList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [largeFileLimit, setLargeFileLimit] = useState()
  const [eslintLoading, setEslintLoading] = useState(false)
  const [EslintData, setEslintData] = useState({})

  const fetchProjectInfoList = async value => {
    const res = await ipcRenderer.invoke('getProjectAnalysis', value)
    setProjectInofList(res)
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
    const localReports = ipcRenderer.sendSync('globSync', `${ESLINT_REPORT_DIR}/${projectName}/*.json`)
    if (localReports.length) {
      const res = ipcRenderer.sendSync('fse', 'readJsonSync', last(localReports))
      setEslintData(res)
    } else {
      setEslintData({})
    }
  }

  const fetchProjects = async () => {
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
    setProjectList(dataSource)
    setProject(value)
    fetchProjectInfoList(value)
    fetchLocalEslintReport(value)
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
            }}
            options={projectList}
            style={{ width: 200 }}
          />
        }
      >
        {!projectList.length && (
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
        )}
        {!!projectInofList.length && (
          <Table
            key={project}
            rowKey="type"
            size="small"
            dataSource={getDataSource({ projectInofList })}
            columns={getColumns()}
            pagination={false}
          />
        )}
      </Card>

      <Card
        title={
          <div>
            <span>大文件</span>
            <Text type={largeFiles.length ? 'danger' : 'success'}> {largeFiles.length}</Text>
            <span> / </span>
            <span>{projectInofJsFileList.length}</span>
            <span> = </span>
            <Text type={largeFiles.length ? 'danger' : 'success'}>
              {formatters.percentage(div(largeFiles.length, projectInofJsFileList.length))}
            </Text>
          </div>
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
                ipcRenderer.invoke('electron.openBrowserWindow', EslintData.EslintReportFilePath)
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
        <Progress
          width={150}
          percent={getProgressPercent(EslintData)}
          format={getProgressFormat(EslintData)}
          type="circle"
          strokeColor={Colors.red}
          trailColor={Colors.green}
        />
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
