/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:11:34
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 19:47:18
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Card } from 'antd'
import { Descriptions } from '@ke/table'
import { Select } from '@ke/form'
import { last } from 'lodash'
import { getColumns } from './config'

const Index = () => {
  const [project, setProject] = useState()
  const [projectList, setProjectList] = useState([])

  useEffect(() => {}, [])

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
            remoteConfig={{
              fetch: async () => {
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
                setProject(dataSource[0])
                setProjectList(dataSource)

                const res = await ipcRenderer.invoke('project-analysis', dataSource[0].value)
                console.log(111)
                console.log(res)

                return dataSource
              }
            }}
            style={{ width: 200 }}
          />
        }
      >
        <table className="ant-table ant-table-bordered" style={{ width: '100%' }}>
          <thead className="ant-table-thead">
            <tr>
              <th>分类</th>
              <th>文件数</th>
              <th>代码行数</th>
              <th>代码体积</th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody">
            <tr>
              <td>js</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>style</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>image</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  )
}

Index.displayName = 'Analysis'

export default Index
