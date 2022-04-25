/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:11:34
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-25 11:54:11
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Card, Select, Result, Button } from 'antd'
import Table from '@ke/table'
import { last, map, sum } from 'lodash'
import { getColumns, getDataSource } from './config'

const Index = () => {
  const [project, setProject] = useState()
  const [projectList, setProjectList] = useState([])
  const [projectInofList, setProjectInofList] = useState([])

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
    </>
  )
}

Index.displayName = 'Analysis'

export default Index
