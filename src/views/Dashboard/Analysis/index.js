/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:11:34
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-25 13:52:51
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { Modal, Card, List, Select, Result, Button, InputNumber } from 'antd'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import Table from '@ke/table'
import { last, map, sum } from 'lodash'
import { sleep } from '@nbfe/tools'
import { getColumns, getDataSource } from './config'

const Index = () => {
  const [project, setProject] = useState()
  const [projectList, setProjectList] = useState([])
  const [projectInofList, setProjectInofList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [largeFileLimit, setLargeFileLimit] = useState()

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
  }

  const fetchProjectInfoList = async value => {
    const res = await ipcRenderer.invoke('project-analysis', value)
    setProjectInofList(res)
  }

  useEffect(() => {
    fetchProjects()
  }, [setProject, setProjectList])

  useEffect(() => {
    const defaultValue = ipcRenderer.sendSync('getStore', 'largeFileLimit')
    setLargeFileLimit(defaultValue)
  }, [setLargeFileLimit])

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
            dataSource={getDataSource({ projectInofList })}
            columns={getColumns()}
            pagination={false}
          />
        )}
      </Card>

      <Modal
        title="大文件阈值"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          ipcRenderer.send('setStore', 'largeFileLimit', largeFileLimit)
          setModalVisible(false)
        }}
      >
        <InputNumber value={largeFileLimit} onChange={setLargeFileLimit} step={10} />
      </Modal>

      <Card
        title="大文件"
        extra={
          <Button
            type="primary"
            icon={<SettingOutlined />}
            onClick={() => {
              setModalVisible(true)
            }}
          />
        }
      >
        <List
          size="small"
          dataSource={projectInofList.filter(v => {
            const { lines, ext } = v
            return ['.js', '.jsx', '.ts', '.tsx'].includes(ext) && lines >= largeFileLimit
          })}
          renderItem={v => {
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
              >
                <div>
                  {filePath} ({lines})
                </div>
              </List.Item>
            )
          }}
          size="small"
        />
      </Card>
    </>
  )
}

Index.displayName = 'Analysis'

export default Index
