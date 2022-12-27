/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 14:35:33
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-06 20:04:39
 */
// import memoizeOne from 'memoize-one'
import { request } from '@/utils'

const themeKey = 'theme'

export const isDarkTheme = () => {
  const theme = window.localStorage.getItem(themeKey)
  return theme === 'dark'
}

export const getTheme = () => {
  if (isDarkTheme()) {
    return 'dark'
  }
  return 'light'
}

const antdStyleCdnPrefix = 'https://unpkg.com/antd@4.18.7/dist'

const DarkThemeAntdStyleCdnUrl = [antdStyleCdnPrefix, 'antd.dark.min.css'].join('/')
const LightThemeAntdStyleCdnUrl = [antdStyleCdnPrefix, 'antd.min.css'].join('/')

export const setTheme = async () => {
  const theme = getTheme()

  document.body.dataset.theme = theme

  const antdStyleCdnUrl = isDarkTheme() ? DarkThemeAntdStyleCdnUrl : LightThemeAntdStyleCdnUrl

  const text = await request(
    {
      url: antdStyleCdnUrl,
      responseType: 'text'
    },
    {
      cacheThreshold: Infinity,
      showLoading: false
    }
  )

  const styleNode = document.createElement('style')
  styleNode.setAttribute('data-theme', theme)
  styleNode.innerHTML = text
    .replace('/*# sourceMappingURL=antd.min.css.map*/', '')
    .replace('/*# sourceMappingURL=antd.dark.min.css.map*/', '')
  document.head.insertBefore(styleNode, document.head.firstChild)

  const oldThemeNode = document.querySelector(`style[data-theme="${isDarkTheme() ? 'light' : 'dark'}"]`)

  if (oldThemeNode) {
    document.head.removeChild(oldThemeNode)
  }
}
