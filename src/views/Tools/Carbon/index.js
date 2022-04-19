/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 14:55:02
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-19 13:49:01
 * @Desc Carbon
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { Card, Button, message } from 'antd'
import Table from '@ke/table'
import Form from '@ke/form'
import { pick } from 'lodash'
import hljs from 'highlight.js/lib/core'
import { classNames } from '@nbfe/tools'
import html2canvas from 'html2canvas'
import { HighlightThemes, injectHighlightStyle, getColumns } from './config'
import styles from './index.module.less'

const Index = () => {
  const containerRef = useRef()
  const formRef = useRef()

  const [config, setConfig] = useState({})
  const [imgSrc, setImgSrc] = useState()
  const [highlightCode, setHighlightCode] = useState()

  const handleSubmit = async () => {
    const formData = await formRef.current.getFormData()
    setConfig(formData)
    const { theme, language, code } = formData
    const { value } = hljs.highlight(code, { language })

    setHighlightCode(value)
  }

  const handleDownload = async () => {
    const canvas = await html2canvas(containerRef.current)
    const filePath = await ipcRenderer.sendSync('saveImgae', canvas.toDataURL(), `Carbon_${Date.now()}.png`)
    message.success(['下载成功', filePath].join(': '))
    shell.showItemInFolder(filePath)
  }

  const handleCopy = async () => {
    const canvas = await html2canvas(containerRef.current)
    await ipcRenderer.sendSync('copyImage', canvas.toDataURL())
    message.success('复制成功')
  }

  useEffect(() => {
    injectHighlightStyle(HighlightThemes[0].value)
  }, [])

  return (
    <>
      <Card
        title="Carbon"
        extra={
          <Button type="link" href="https://carbon.now.sh">
            官网
          </Button>
        }
      >
        <Form ref={formRef} columns={getColumns(handleSubmit)} showResetBtn={false} onSubmit={handleSubmit}>
          <div style={{ marginLeft: -110 }}>
            <Button type="primary" onClick={handleSubmit}>
              预览图片
            </Button>
            <Button type="primary" onClick={handleDownload} style={{ marginLeft: 20 }}>
              下载图片
            </Button>
            <Button type="primary" onClick={handleCopy} style={{ marginLeft: 20 }}>
              复制图片
            </Button>
          </div>
        </Form>
      </Card>
      <div ref={containerRef} className={styles.containerWrap} style={pick(config, ['padding', 'background', 'width'])}>
        <div className={styles.container}>
          <div className={classNames('hljs', styles.titleArea)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
              <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5"></circle>
                <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5"></circle>
                <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5"></circle>
              </g>
            </svg>
            <span className={styles.titleText}>{config.title}</span>
          </div>
          <pre style={{ margin: 0 }}>
            <code className="hljs language-javascript">
              <div dangerouslySetInnerHTML={{ __html: highlightCode }}></div>
            </code>
          </pre>
        </div>
      </div>
    </>
  )
}

Index.displayName = 'Carbon'

export default Index
