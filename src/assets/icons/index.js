/*
 * @Author: fangt11
 * @Date:   2022-04-13 15:27:38
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-19 19:53:17
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

export const NodeJs = props => {
  const svgProps = getSvgProps(props)

  return (
    <span className={classNames('anticon', props.className)}>
      <svg viewBox="64 64 896 896" focusable="false" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
        <path
          d="M512 1016c-13.4 0-27-3.6-38.8-10.4l-123.4-73c-18.4-10.4-9.4-14-3.4-16 24.6-8.6 29.6-10.4 55.8-25.4 2.8-1.6 6.4-1 9.2 0.8l94.8 56.2c3.4 2 8.2 2 11.4 0l369.4-213.2c3.4-2 5.6-6 5.6-10V298.6c0-4.2-2.2-8-5.8-10.2L517.6 75.4c-3.4-2-8-2-11.4 0L137.2 288.6c-3.6 2-5.8 6-5.8 10.2v426.2c0 4 2.2 8 5.8 9.8l101.2 58.4c55 27.4 88.6-4.8 88.6-37.4V335c0-6 4.8-10.6 10.8-10.6h46.8c5.8 0 10.8 4.6 10.8 10.6V756c0 73.2-40 115.2-109.4 115.2-21.4 0-38.2 0-85-23.2l-96.8-55.8C80.2 778.4 65.4 752.6 65.4 724.8V298.6c0-27.6 14.8-53.6 38.8-67.4L473.2 18c23.4-13.2 54.4-13.2 77.6 0l369.4 213.4c24 13.8 38.8 39.6 38.8 67.4v426.2c0 27.6-14.8 53.4-38.8 67.4L550.8 1005.6c-11.8 6.8-25.2 10.4-38.8 10.4z m298.2-420.2c0-79.8-54-101-167.4-116-114.8-15.2-126.4-23-126.4-49.8 0-22.2 9.8-51.8 94.8-51.8 75.8 0 103.8 16.4 115.4 67.6 1 4.8 5.4 8.4 10.4 8.4h48c3 0 5.8-1.2 7.8-3.4s3-5.2 2.8-8.2c-7.4-88.2-66-129.2-184.4-129.2-105.4 0-168.2 44.4-168.2 119 0 80.8 62.6 103.2 163.6 113.2 121 11.8 130.4 29.6 130.4 53.4 0 41.2-33.2 58.8-111 58.8-97.8 0-119.2-24.6-126.4-73.2-0.8-5.2-5.2-9-10.6-9h-47.8c-6 0-10.6 4.8-10.6 10.6 0 62.2 33.8 136.4 195.6 136.4 116.8-0.2 184-46.4 184-126.8z"
          fill=""
          p-id="15009"
        ></path>
      </svg>
    </span>
  )
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
        ></path>
      </svg>
    </span>
  )
}
