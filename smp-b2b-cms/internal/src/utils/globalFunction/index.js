import urlName from '../pvuv/urlName'
import baseUrlto from '../pvuv/baseUrlto'
import pathToname from '../pvuv/pathname'
import store from '@/store'
import { getToken } from '@/utils/auth'
import axios from 'axios'

// 空参处理
export const getparams = (params) => {
  let newQueryString = ''
  for (const key in params) {
    if (params[key] !== '') {
      if (newQueryString !== '') {
        newQueryString += '&'
      }
      newQueryString += `${key}=${params[key]}`
    }
  }
  return newQueryString
}

// tryCatch统一处理
export const TryThrow = async function(params, apiName, successText, flag) {
  try {
    const res = await this.$api[apiName](params)
    this.$notify({
      title: '成功',
      message: successText,
      type: 'success',
      duration: 2000
    })
    // if (flag) {
    //   this.fl
    // }
    return res
  } catch (e) {
    if (e.response.status === 400) {
      this.$notify({
        title: '错误',
        message: e.response.data.msg || '请求参数错误',
        type: 'error',
        duration: 2000
      })
    } else if (e.response.status === 500) {
      this.$notify({
        title: '错误',
        message: '服务器出错,请稍后重试',
        type: 'error',
        duration: 2000
      })
    } else if (e.response.status !== 401) {
      this.$notify({
        title: '错误',
        message: e.response.data.msg,
        type: 'error',
        duration: 2000
      })
    }
    return
  }
}

// 流量统计注入
export const pvuv = function() {
  let uitem
  baseUrlto.map(e => {
    if (document.URL.indexOf(e.environmentUrl) !== -1) {
      uitem = e
    }
  })
  if (!uitem) {
    uitem = baseUrlto[0]
  }
  var _paq = _paq || []
  window._paq = _paq
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  const arr = location.pathname.split('/')
  let CurlName
  if (arr.length >= 5) {
    arr.splice(arr.length - 1, 1)
    const str = arr.join('/')
    CurlName = urlName[str]
  } else {
    const str = arr.join('/')
    CurlName = urlName[str]
  }
  CurlName = CurlName || '其他页面'
  sessionStorage.setItem('urlName', CurlName)
  // 页面刷新执行一次, 记录页面访问
  _paq.push(['setCustomUrl', `${location.host}${location.pathname}`])
  _paq.push(['setDocumentTitle', CurlName])
  _paq.push(['trackPageView'])
  _paq.push(['enableLinkTracking']);
  (function() {
    const u = uitem.staUrl
    _paq.push(['setTrackerUrl', u + 'matomo.php'])
    _paq.push(['setSiteId', uitem.staId])
    var d = document
    var g = d.createElement('script')
    var s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'matomo.js'
    s.parentNode.insertBefore(g, s)
  })()
}

// 流量统计中文转换
export const pvuvChangeName = function(config) {
  if (config.url.indexOf('/login') === -1) {
    // 设置用户名
    const name = store.getters.name
    let urlName
    let curl = config.url
    curl = curl.split('?')[0] || curl
    // 将请求地址转为中文
    for (const k in pathToname) {
      if (curl === k) {
        urlName = pathToname[k]
      } else {
        const kurl = k
        const turl = curl
        const karr = kurl.split('/')
        if (karr[karr.length - 1] === '*') {
          // 代表最后一位为*
          karr.splice(karr.length - 1, 1)
          const karr1 = turl.split('/')
          karr1.splice(karr1.length - 1, 1)
          const str = karr.join('/')
          const str2 = karr1.join('/')
          if (str === str2) {
            urlName = pathToname[k]
          }
        } else {
          karr.splice(karr.length - 2, 1)
          const str = karr.join('/')
          const karr1 = turl.split('/')
          karr1.splice(karr1.length - 2, 1)
          const str2 = karr1.join('/')
          if (str === str2) {
            urlName = pathToname[k]
          }
        }
      }
    }
    // urlName = urlName || '其他'
    urlName = urlName || config.url
    window._paq.push(['setCustomUrl', `${location.host}${curl}`])
    window._paq.push(['setDocumentTitle', urlName])
    window._paq.push(['setUserId', name])
    window._paq.push(['trackPageView'])
  }
}

// 保存审计日志
export const saveAuditLog = async function(response) {
  try {
    const config = response.config
    const token = getToken()
    const url = config.url
    const method = config.method
    if (token && method !== 'get' && await notInBlackList(url, method)) {
      const systemId = '10'
      const href = document.location.href
      const statusCode = response.status
      const time = Date.now()
      const data = `${systemId};${url};${method};${href};${statusCode};${time};${token}`
      navigator.sendBeacon('/bff/api/v1/audit_log', data)
    }
  } catch (error) {
    console.log('save audit log failed')
    console.dir(error)
  }
}

// 判断审计接口是否在黑名单内
let blackList
export const notInBlackList = async function(url, method) {
  if (!blackList) {
    const response = await axios.get('/bff/api/v1/audit_log/black_list?systemId=10')
    blackList = response.data || []
  }
  for (const i of blackList) {
    if (method === i.method && RegExp(i.requestPath).test(url)) {
      return false
    }
  }
  return true
}
