import { add, formatTime, isEmptyObject } from '@nbfe/tools'
import { Collapse, Result, Table, Tabs, Typography } from 'antd'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import less from 'highlight.js/lib/languages/less'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'
import hljsDefineVue from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/monokai.css'
import { filter, pick, sortBy } from 'lodash'
import React, { useState } from 'react'
import { Logo } from './config'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('jsx', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('tsx', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('less', less)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('vue', hljsDefineVue)

export default props => {
  const { dataSource } = props

  if (isEmptyObject(dataSource)) {
    return null
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const { statistics } = dataSource
  const { detectionDate, formats } = statistics

  const TotalColumns = [
    {
      title: 'language',
      dataIndex: 'language'
    },
    {
      title: 'FILES',
      dataIndex: 'sources'
    },
    {
      title: 'LINES',
      dataIndex: 'lines'
    },
    {
      title: 'CLONES',
      dataIndex: 'clones'
    },
    {
      title: 'DUPLICATED LINES',
      render: (value, record) => {
        const { duplicatedLines, percentage } = record
        return `${duplicatedLines}(${percentage}%)`
      }
    },
    {
      title: 'DUPLICATED TOKENS',
      render: (value, record) => {
        const { duplicatedTokens, percentageTokens } = record
        return `${duplicatedTokens}(${percentageTokens}%)`
      }
    }
  ]

  const TotalDataSource = Object.entries(formats).reduce((prev, [language, { total }]) => {
    prev.push({
      language,
      ...total
    })
    return prev
  }, [])

  const [language] = selectedRowKeys

  const duplicates = filter(dataSource.duplicates, { format: language })

  const sources = formats?.[language]?.sources || {}
  const SourcesColumns = [
    {
      title: '文件路径',
      dataIndex: 'path',
      render: value => {
        return <Typography.Text copyable>{value}</Typography.Text>
      }
    },
    {
      title: 'LINES',
      dataIndex: 'lines'
    },
    {
      title: 'DUPLICATED LINES',
      dataIndex: 'duplicatedLines'
    }
  ]
  const SourcesDataSource = Object.entries(sources).reduce((prev, [k, v]) => {
    prev.push({
      path: k,
      ...pick(v, ['lines', 'duplicatedLines'])
    })
    return prev
  }, [])

  const renderFileInfo = file => {
    const { name, startLoc, endLoc } = file
    const text = [name, '(', startLoc.line, ':', startLoc.column, '-', endLoc.line, ':', endLoc.column, ')'].join('')
    return (
      <div>
        <Typography.Text
          copyable={{
            text: [name, startLoc.line, startLoc.column].join(':'),
            tooltips: ['复制文件路径及代码位置']
          }}
        >
          {text}
        </Typography.Text>
      </div>
    )
  }

  return (
    <>
      <Table
        rowKey="language"
        columns={TotalColumns}
        dataSource={TotalDataSource}
        size="small"
        pagination={false}
        rowSelection={{
          type: 'radio',
          hideSelectAll: true,
          selectedRowKeys,
          onChange: setSelectedRowKeys
        }}
        title={() => {
          return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ height: 45, fontSize: 0 }}>
                <div style={{ transform: `scale(${45 / 85})`, transformOrigin: 'left top' }}>
                  <Logo />
                </div>
              </div>
              <Typography.Text type="secondary">{formatTime(detectionDate, 'YYYY-MM-DD HH:mm:ss')}</Typography.Text>
            </div>
          )
        }}
        summary={pageData => {
          const total = {
            language: 0,
            sources: 0,
            lines: 0,
            clones: 0,
            duplicatedLines: 0,
            percentage: 0,
            duplicatedTokens: 0,
            percentageTokens: 0
          }

          pageData.forEach(v => {
            Object.entries(total).forEach(([k]) => {
              total[k] = add(total[k], v[k])
            })
          })

          const duplicatedLinesText = `${total.duplicatedLines}`
          const duplicatedTokensText = `${total.duplicatedTokens}`

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell />
              <Table.Summary.Cell>合计</Table.Summary.Cell>
              <Table.Summary.Cell>{total.sources}</Table.Summary.Cell>
              <Table.Summary.Cell>{total.lines}</Table.Summary.Cell>
              <Table.Summary.Cell>{total.clones}</Table.Summary.Cell>
              <Table.Summary.Cell>{duplicatedLinesText}</Table.Summary.Cell>
              <Table.Summary.Cell>{duplicatedTokensText}</Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
      {!!language && (
        <Tabs defaultActiveKey="Clones" style={{ marginTop: 10 }}>
          <Tabs.TabPane tab={['Clones', '(', duplicates.length, ')'].join('')} key="Clones">
            <Collapse expandIconPosition="right">
              {duplicates.map((v, i) => {
                const { fragment, firstFile, secondFile } = v
                const computedLanguage = language === 'markup' ? 'vue' : language
                const { value: highlightCode } = hljs.highlight(fragment, { language: computedLanguage })
                return (
                  <Collapse.Panel
                    header={
                      <div>
                        {renderFileInfo(firstFile)}
                        {renderFileInfo(secondFile)}
                      </div>
                    }
                    key={i}
                  >
                    <pre>
                      <code className={`hljs language-${computedLanguage}`}>
                        <div dangerouslySetInnerHTML={{ __html: highlightCode }} />
                      </code>
                    </pre>
                  </Collapse.Panel>
                )
              })}
            </Collapse>
            {!duplicates.length && <Result status="success" />}
          </Tabs.TabPane>
          <Tabs.TabPane tab={['Files', '(', SourcesDataSource.length, ')'].join('')} key="Files">
            <Table
              rowKey="path"
              columns={SourcesColumns}
              dataSource={sortBy(SourcesDataSource, ['duplicatedLines']).reverse()}
              pagination={false}
              size="small"
            />
            {!SourcesDataSource.length && <Result status="success" />}
          </Tabs.TabPane>
        </Tabs>
      )}
    </>
  )
}
