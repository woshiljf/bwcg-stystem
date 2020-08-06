import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'
import Vue from 'vue'
import { pvuvChangeName, saveAuditLog } from './globalFunction/index'

// 创建axios对象
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})
function removeEmptyParmas(parmas) {
  for (const k in parmas) {
    if (parmas[k] === null || parmas[k] === '' || parmas[k] === {} || parmas === []) {
      delete parmas[k]
    }
  }
  return parmas
}

// 请求拦截
service.interceptors.request.use(
  config => {
    // 流量统计中文转换
    pvuvChangeName(config)
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    // 系统API返回统一处理
    const status = response.status
    const msg = response.statusText
    // 保存审计日志
    saveAuditLog(response)
    if (status === 200 || status === 0 || status === 204) {
      return Promise.resolve(response)
    } else {
      window.VUE_SCOPE.$message.error(msg || '请求失败，请重试')
      return Promise.reject(
        msg
      )
    }
  },
  error => {
    saveAuditLog(error.response)
    // 响应码状态码400异常处理
    if (error.response.status === 400) {
      Message({
        message: error.response.data.msg || '请求参数错误',
        type: 'error',
        duration: 2000
      })
      return Promise.reject(error)
    }
    // 响应状态码500异常处理
    if (error.response.status === 500) {
      Message({
        message: error.response.data.msg || '服务器出错了,请稍后重试',
        type: 'error',
        duration: 2000
      })
      return Promise.reject(error)
    }
    if (error.response.data.code === '3000035') {
      this.$notify({
        title: '提示',
        message: '登陆超时',
        duration: 2000
      })
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      const code = error.response.data.errorCode ? error.response.data.errorCode : error.response.data.code
      const msg = error.response.data.errorMsg ? error.response.data.errorMsg : error.response.data.msg
      if (code === '4011005' && error.response.data.newAccessToken) {
        setToken(error.response.data.newAccessToken || error.response.data.token || error.response.data.data)
        store.dispatch('UpdateToken', error.response.data.newAccessToken || error.response.data.token || error.response.data.data).then(() => {
          Promise.resolve()
        })
      } else if (code === '4011007') {
        location.reload()
        // Promise.resolve()
      } else if (code === '041101001' || code === '041101002') {
        if (code === '041101001') {
          // location.reload()
          Message({
            message: '没有权限访问, 请联系相关人员',
            type: 'error',
            duration: 2000
          })
        } else {
          setToken(error.response.data.data.newAccessToken || error.response.data.data.token || error.response.data.data)
          store.dispatch('UpdateToken', error.response.data.data.newAccessToken || error.response.data.data.token || error.response.data.data).then(() => {
            Promise.resolve()
          })
        }
      } else {
        if (code === '4001') {
          console.log('登陆失败')
        } else {
          if (msg) {
            Message({
              message: msg,
              type: 'error',
              duration: 5000
            })
          } else {
            Message({
              message: '网络异常,请稍后重试',
              type: 'error',
              duration: 0
            })
          }
        }
      }
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = service

// get.post.put.del.patch请求方法提取
const get = (url, params) => {
  params = removeEmptyParmas(params)
  return service.get(url, { params })
}

const post = (url, params) => {
  return service.post(url, params)
}

const put = (url, params) => {
  return service.put(url, params)
}

const del = (url, params) => {
  return service.delete(url, params)
}
const patch = (url, params) => {
  return service.patch(url, params)
}
export default service
export {
  get,
  post,
  put,
  del,
  patch
}
