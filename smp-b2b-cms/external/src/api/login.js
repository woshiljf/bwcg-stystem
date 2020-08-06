import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    userCode: username,
    password: password,
    systemId: 10
  }
  // php本地
  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data
  // })
  // 内部
  // return request({
  //   url: '/api/internal/user/login',
  //   method: 'post',
  //   data
  // })
  // 外部
  return request({
    url: '/api/external/custom/login',
    method: 'post',
    data
  })
}

export function logout() {
  const data = {
    systemId: 10
  }
  // 本地
  // return request({
  //   url: '/login/logout',
  //   method: 'post',
  //   data
  // })
  // 内部
  // return request({
  //   url: '/api/internal/user/logout',
  //   method: 'post',
  //   data
  // })
  // 外部
  return request({
    url: '/api/external/custom/logout',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  // 本地
  // return request({
  //   url: '/user/info',
  //   method: 'get'
  // })
  // 内部
  // return request({
  //   url: '/api/internal/user/info',
  //   method: 'get'
  // })
  // 外部
  return request({
    url: '/api/external/custom/info',
    method: 'get'
  })
}

