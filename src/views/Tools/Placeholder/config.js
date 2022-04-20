/*
 * @Author: shuoshubao
 * @Date:   2022-04-20 17:08:11
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-20 20:49:08
 */

import React, { useRef, useState, useEffect } from 'react'

export const getColumns = () => {
  return [
    {
      name: 'width',
      label: '宽度',
      defaultValue: 879,
      template: {
        tpl: 'number',
        width: 200
      }
    },
    {
      name: 'height',
      label: '高度',
      defaultValue: 200,
      template: {
        tpl: 'number',
        width: 100
      }
    },
    {
      name: 'text',
      label: '内容',
      defaultValue: '879x200'
    },
    {
      name: 'color',
      label: '颜色',
      defaultValue: '#525252',
      template: {
        tpl: 'color-picker',
        width: 100
      }
    },
    {
      name: 'background',
      label: '背景色',
      defaultValue: '#969696',
      template: {
        tpl: 'color-picker',
        width: 100
      }
    }
  ]
}
