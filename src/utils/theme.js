/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 14:35:33
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 13:38:18
 */

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

const antdStyleCdnPrefix = 'https://file.ljcdn.com/bs/antd/4.18.7/dist'

const DarkThemeAntdStyleCdnUrl = [antdStyleCdnPrefix, 'antd.dark.min.css'].join('/')
const LightThemeAntdStyleCdnUrl = [antdStyleCdnPrefix, 'antd.min.css'].join('/')

export const setTheme = () => {
  const theme = getTheme()

  document.body.dataset.theme = theme

  const antdStyleCdnUrl = isDarkTheme() ? DarkThemeAntdStyleCdnUrl : LightThemeAntdStyleCdnUrl

  const link = document.createElement('link')
  link.setAttribute('data-theme', theme)
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', antdStyleCdnUrl)

  document.head.appendChild(link)

  const oldThemeNode = document.querySelector(`link[data-theme="${isDarkTheme() ? 'light' : 'dark'}"]`)

  if (oldThemeNode) {
    setTimeout(() => {
      document.head.removeChild(oldThemeNode)
    }, 10)
  }
}
