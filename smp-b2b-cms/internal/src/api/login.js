import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    userCode: username,
    password: password,
    systemId: 10
  }
  return request({
    url: '/api/internal/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  const data = {
    systemId: 10
  }
  return request({
    url: '/api/internal/user/logout',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/api/internal/user/info',
    method: 'get'
  })
}

