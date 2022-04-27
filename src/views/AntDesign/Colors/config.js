/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 15:08:20
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 16:52:06
 */
import { message } from 'antd'
import * as Colors from '@ant-design/colors'
import { range } from 'lodash'
import { copyText } from '@nbfe/tools'
import styles from './index.module.less'

const ColorsList = [
  {
    value: 'red',
    desc: 'Dust Red',
    cnDesc: '薄暮',
    tags: ['斗志', '奔放']
  },
  {
    value: 'volcano',
    desc: 'Volcano',
    cnDesc: '火山',
    tags: ['醒目', '澎湃']
  },
  {
    value: 'orange',
    desc: 'Sunset Orange',
    cnDesc: '日暮',
    tags: ['温暖', '欢快']
  },
  {
    value: 'gold',
    desc: 'Calendula Gold',
    cnDesc: '金盏花',
    tags: ['活力', '积极']
  },
  {
    value: 'yellow',
    desc: 'Sunrise Yellow',
    cnDesc: '日出',
    tags: ['出生', '阳光']
  },
  {
    value: 'lime',
    desc: 'Lime',
    cnDesc: '青柠',
    tags: ['自然', '生机']
  },
  {
    value: 'green',
    desc: 'Polar Green',
    cnDesc: '极光绿',
    tags: ['健康', '创新']
  },
  {
    value: 'cyan',
    desc: 'Cyan',
    cnDesc: '明青',
    tags: ['希望', '坚强']
  },
  {
    value: 'blue',
    desc: 'Daybreak Blue',
    cnDesc: '拂晓蓝',
    tags: ['包容', '科技', '普惠']
  },
  {
    value: 'geekblue',
    desc: 'Geek Blue',
    cnDesc: '极客蓝',
    tags: ['探索', '钻研']
  },
  {
    value: 'purple',
    desc: 'Golden Purple',
    cnDesc: '酱紫',
    tags: ['优雅', '浪漫']
  },
  {
    value: 'magenta',
    desc: 'Magenta',
    cnDesc: '法式洋红',
    tags: ['明快', '感性']
  }
]

export const columns = [
  {
    width: 170,
    render: (text, record, index) => {
      const { desc, cnDesc } = record
      const { value } = ColorsList[index]
      const color = Colors[value]
      return (
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              color: color.primary,
              fontWeight: 500,
              fontSize: 16,
              lineHeight: '24px'
            }}
          >
            {desc}
          </div>
          <div
            style={{
              color: color[4],
              lineHeight: '16px'
            }}
          >
            {cnDesc}
          </div>
        </div>
      )
    }
  },
  ...range(10).map(v => {
    return {
      dataIndex: ['color', v].join('_'),
      render: (text, record, index) => {
        return (
          <div
            className={styles.colorValue}
            style={{
              background: text,
              color: v > 5 ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0.85)'
            }}
            onClick={() => {
              copyText(text)
              message.success(['色值已复制', text].join(' : '))
            }}
          >
            {text}
          </div>
        )
      }
    }
  })
]

export const dataSource = ColorsList.map(v => {
  const { value } = v
  const temp = {}
  range(10).forEach(i => {
    temp[['color', i].join('_')] = Colors[value][i]
  })
  return {
    ...v,
    ...temp
  }
})
