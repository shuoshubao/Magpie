/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 14:35:33
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 14:39:34
 */

const themeKey = 'theme'

export const isDarkTheme = () => {
  const theme = window.localStorage.getItem('themeKey')
  return theme === 'dark'
}

export const getTheme = () => {
  if (isDarkTheme()) {
    return 'dark'
  }
  return 'light'
}
