/*
 * @Author: fangt11
 * @Date:   2021-07-13 20:07:26
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 17:24:59
 */

import axios from 'axios'
import { message } from 'antd'
import { merge, isFunction, random, isEqual, pick } from 'lodash'
import { sleep } from '@nbfe/tools'

const defaultRequestConfig = {
  returnType: 'data', // 'data' | 'response' | 'originResponse'
  checkCode: true,
  successCode: 200, // code: 0 为成功
  onError: null, // 错误处理函数
  showLoading: true,
  cacheThreshold: 50 // 缓存间隔 ms
}

const store = {
  // 正在进行的请求数量
  loadingCount: 0,
  loadingInstance: null
}

// 手动关闭 message.loading
const hideLoading = () => {
  if (store.loadingInstance && store.loadingCount <= 0) {
    // store.loadingInstance();
    message.destroy('request-loading')
  }
}

// 缓存请求
const CacheRequest = []

// 永久缓存请求
const memoizeOneCacheRequest = []

// eslint-disable-next-line sonarjs/cognitive-complexity
export const request = (axiosConfig = {}, requestConfig = {}) => {
  const mergeRequestConfig = merge({}, defaultRequestConfig, requestConfig)

  const { returnType, checkCode, successCode, onError, showLoading, cacheThreshold } = mergeRequestConfig

  const memoizeOne = cacheThreshold === Infinity

  if (showLoading) {
    if (store.loadingCount === 0) {
      store.loadingInstance = message.loading({ key: 'request-loading', content: '接口请求中...', duration: 0 })
    }
    if (!memoizeOne) {
      store.loadingCount++
    }
  }

  const usedCacheRequest = memoizeOne ? memoizeOneCacheRequest : CacheRequest

  const item = usedCacheRequest.find(v => {
    return isEqual({ axiosConfig, requestConfig: mergeRequestConfig }, pick(v, ['axiosConfig', 'requestConfig']))
  })

  if (item) {
    if (memoizeOne) {
      store.loadingCount--
      return item.request
    }
    if (Date.now() - item.timestap <= cacheThreshold) {
      store.loadingCount--
      return item.request
    }
  }

  // eslint-disable-next-line no-async-promise-executor
  const promiseInstance = new Promise(async (resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      await sleep(random(0, 0.5))
    }
    axios(axiosConfig)
      .then(response => {
        if (showLoading) {
          store.loadingCount--
          hideLoading()
        }
        if (response.config.responseType === 'text') {
          resolve(response.data)
          return
        }
        const { code, message: messageText, data } = response.data
        if (!checkCode) {
          resolve(response)
          return
        }
        let returnData = response
        if (returnType === 'data') {
          returnData = data
        }
        if (returnType === 'response') {
          returnData = response.data
        }
        // 成功
        if (code === successCode) {
          resolve(returnData)
          return
        }
        // 失败
        if (isFunction(onError)) {
          onError(response.data)
          resolve(response.data)
          return
        }
        message.error(messageText)
        reject(response.data)
      })
      .catch(e => {
        if (showLoading) {
          store.loadingCount--
          hideLoading()
        }
        reject(e)
        message.error(e.message || '接口请求失败!')
      })
  })

  usedCacheRequest.unshift({
    timestap: Date.now(),
    axiosConfig,
    requestConfig: mergeRequestConfig,
    request: promiseInstance
  })

  // 清理内存
  if (!memoizeOne) {
    CacheRequest.splice(1e2, 1e2)
  }

  return promiseInstance
}
