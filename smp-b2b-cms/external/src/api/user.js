import request from '@/utils/request'

export function fetchList(query) {
  // php本地
  // return request({
  //   url: '/user/list',
  //   method: 'get',
  //   params: query
  // })
  // 内部
  // return request({
  //   url: '/internal/user/list',
  //   method: 'get',
  //   params: query
  // })
  // 外部
  return request({
    url: '/api/external/custom/list',
    method: 'post',
    params: { page: query.page, limit: query.limit },
    data: query
  })
}

export function fetchExternalList(query) {
  // 外部
  return request({
    url: '/api/external/custom/list',
    method: 'post',
    params: { page: query.page, limit: query.limit },
    data: query
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function changePassword(data) {
  const info = {
    oldPassword: data.originPass,
    newPassword: data.pass,
    systemId: 10
  }
  console.log(data)
  // php本地
  // return request({
  //   url: '/user/changepassword',
  //   method: 'post',
  //   data
  // })
  // 外部
  return request({
    url: '/api/external/custom/password',
    method: 'patch',
    data: info
  })
}
