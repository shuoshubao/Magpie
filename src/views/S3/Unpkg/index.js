/*
 * @Author: shuoshubao
 * @Date:   2022-04-29 13:54:04
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-27 13:52:26
 */
import { fetchPkg } from '@/utils'
import { Form, Table } from '@nbfe/components'
import { plus } from '@nbfe/tools'
import { Button, Card, Collapse, List, Modal, Space, Typography } from 'antd'
import { map } from 'lodash'
import React, { useRef, useState } from 'react'
import { getFormColumns, getTableColumns } from './config'
import { dataSource } from './data'

const { Text } = Typography

const Index = () => {
  const tableRef = useRef()

  const [modalVisible, setModalVisible] = useState(false)

  const handleSearch = params => {
    tableRef.current.search(params)
  }

  return (
    <>
      <Card
        title={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true)
            }}
          >
            新发布
          </Button>
        }
        extra={
          <Space>
            <span>共</span>
            <Text type="success">{dataSource.length}</Text>
            <span>个包,</span>
            <Text type="success">{plus(dataSource.map(v => v.versions.length))}</Text>
            <span>个版本</span>
          </Space>
        }
      >
        <Collapse defaultActiveKey={map(dataSource, 'name')}>
          {dataSource.map(v => {
            const { name, versions } = v
            return (
              <Collapse.Panel header={name} key={name}>
                <Collapse>
                  {versions.map(v2 => {
                    const { version, files } = v2
                    return (
                      <Collapse.Panel header={version} key={version}>
                        <List
                          size="small"
                          dataSource={files}
                          renderItem={item => {
                            const url = ['https://file.ljcdn.com/bs', name, version, item].join('/')
                            return (
                              <List.Item style={{ padding: '8px 0' }}>
                                <Text
                                  copyable={{
                                    text: url
                                  }}
                                >
                                  {url}
                                </Text>
                              </List.Item>
                            )
                          }}
                        />
                      </Collapse.Panel>
                    )
                  })}
                </Collapse>
              </Collapse.Panel>
            )
          })}
        </Collapse>
      </Card>
      <Modal
        title="新发布包"
        visible={modalVisible}
        width={800}
        style={{ top: 20 }}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <Form columns={getFormColumns()} labelWidth={100} showResetBtn={false} onSubmit={handleSearch} />
        <Table
          ref={tableRef}
          rowKey="version"
          columns={getTableColumns({ setModalVisible })}
          remoteConfig={{
            fetch: async params => {
              const { name, registry } = params
              if (!name) {
                return {
                  list: []
                }
              }
              const { versions } = await fetchPkg({ registry, name })
              return {
                list: Object.values(versions).reverse()
              }
            }
          }}
        />
      </Modal>
    </>
  )
}

Index.displayName = 'Unpkg'

export default Index
