/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:11:34
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 19:47:18
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
    setProjectList(dataSource)
    setProject(dataSource[0].value)
    const res = await ipcRenderer.invoke('project-analysis', dataSource[0].value)
    setProjectInofList(res)
  }

  useEffect(() => {
    fetchProjects()
  }, [setProject, setProjectList])

  console.log(111, projectList.length)
  console.log(projectInofList)

  return (
    <>
      <Card
        title="基本信息"
        extra={
          <Select
            value={project}
            onChange={value => {
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
