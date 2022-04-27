/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 14:55:02
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 17:19:40
 * @Desc 图片占位符
 */
import React, { useRef } from 'react'
import { ipcRenderer, shell } from 'electron'
import { Card, Button, Space, message } from 'antd'
import Form from '@ke/form'
import { copyText } from '@nbfe/tools'
import { getColumns } from './config'

const Index = () => {
  const canvasRef = useRef()

  const handleSubmit = async params => {
    const { width, height, color, background, text } = params
    const canvas = canvasRef.current
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = background
    ctx.fillRect(0, 0, width, height)
    ctx.fill()
    ctx.font = '30px Arial'
    const { width: textWidth } = ctx.measureText(text)
    ctx.fillStyle = color
    ctx.fillText(text, (width - textWidth) / 2, height / 2)
    ctx.fill()
  }

  const handleDownload = async () => {
    const canvas = canvasRef.current
    const filePath = await ipcRenderer.sendSync('saveImgae', canvas.toDataURL(), `Placeholder_${Date.now()}.png`)
    message.success(['下载成功', filePath].join(': '))
    shell.showItemInFolder(filePath)
  }

  const handleCopy = async () => {
    const canvas = canvasRef.current
    await ipcRenderer.sendSync('copyImage', canvas.toDataURL())
    message.success('复制成功, 可直接粘贴图片')
  }

  const handleCopyDataURL = async () => {
    const canvas = canvasRef.current
    copyText(canvas.toDataURL())
    message.success('复制成功')
  }

  return (
    <>
      <Card
        title="图片占位符"
        extra={
          <Button type="link" href="https://carbon.now.sh">
            官网
          </Button>
        }
      >
        <Form onSubmit={handleSubmit} columns={getColumns()} showResetBtn={false} />
      </Card>
      <Space className="pdtb10">
        <Button type="primary" onClick={handleDownload}>
          下载图片
        </Button>
        <Button type="primary" onClick={handleCopy}>
          复制图片
        </Button>
        <Button type="primary" onClick={handleCopyDataURL}>
          复制 DataURL
        </Button>
      </Space>
      <div>
        <canvas ref={canvasRef} />
      </div>
    </>
  )
}

Index.displayName = 'Placeholder'

export default Index
