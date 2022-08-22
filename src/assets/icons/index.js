/*
 * @Author: shuoshubao
 * @Date:   2022-04-13 15:27:38
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-29 16:40:44
 */

import React from 'react'
import { omit } from 'lodash'
import { classNames } from '@nbfe/tools'

const defaultSvgProps = {
  viewBox: '64 64 896 896',
  focusable: 'false',
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'currentColor',
  width: '1em',
  height: '1em'
}

const getSvgProps = props => {
  return { ...defaultSvgProps, ...omit(props, 'className') }
}

export const VSCode = props => {
  const svgProps = getSvgProps(props)

  return (
    <span className={classNames('anticon', props.className)}>
      <svg viewBox="64 64 896 896" focusable="false" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
        <path
          d="M746.222933 102.239573l-359.799466 330.820267L185.347413 281.4976 102.2464 329.864533l198.20544 182.132054-198.20544 182.132053 83.101013 48.510293 201.076054-151.558826 359.799466 330.676906 175.527254-85.251413V187.4944z m0 217.57952v384.341334l-255.040853-192.177494z"
          fill="#222222"
          p-id="2251"
        />
      </svg>
    </span>
  )
}
