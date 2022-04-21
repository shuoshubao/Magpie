/*
 * @Author: shuoshubao
 * @Date:   2022-04-20 17:08:11
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 13:03:46
 */

import React, { useRef, useState, useEffect } from 'react'
import { merge } from 'lodash'

export const getColumns = () => {
  return [
    {
      name: 'width',
      label: '宽度',
      defaultValue: 879,
      template: {
        tpl: 'number'
      }
    },
    {
      name: 'height',
      label: '高度',
      defaultValue: 200,
      template: {
        tpl: 'number'
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
      defaultValue: '#000',
      template: {
        tpl: 'color-picker'
      }
    },
    {
      name: 'background',
      label: '背景色',
      defaultValue: '#969696',
      template: {
        tpl: 'color-picker'
      }
    }
  ].map(v => {
    return merge({}, v, {
      template: {
        width: 100
      }
    })
  })
}
