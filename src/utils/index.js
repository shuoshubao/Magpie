/*
 * @Author: fangt11
 * @Date:   2021-07-05 19:52:43
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-29 15:19:54
 */
export * from './route'
export * from './axios'
export * from './theme'
export * from './npm'

// 解析 repository.url
export const repositoryUrlStringify = url => {
  if (!url) {
    return url
  }
  if (url.startsWith('http')) {
    return url
  }
  const host = url.slice(url.indexOf('@') + 1, url.indexOf(':'))
  const pathname = url.slice(url.indexOf(':') + 1, url.indexOf('.git'))
  return ['https://', host, pathname].join('')
}
