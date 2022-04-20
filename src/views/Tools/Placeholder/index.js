/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 14:55:02
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-20 21:05:59
 * @Desc 图片占位符
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { Card, Button, Modal, message } from 'antd'
import Form from '@ke/form'
import Table from '@ke/table'
import { getColumns } from './config'

const Index = () => {
  const canvasRef = useRef()
  const [imageUrl, setImageUrl] = useState()

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

  return (
    <Card
      title="图片占位符"
      extra={
        <Button type="link" href="https://carbon.now.sh">
          官网
        </Button>
      }
    >
      <Form onSubmit={handleSubmit} columns={getColumns()} showResetBtn={false} />
      <canvas ref={canvasRef} />
    </Card>
  )
}

Index.displayName = 'Placeholder'

export default Index
