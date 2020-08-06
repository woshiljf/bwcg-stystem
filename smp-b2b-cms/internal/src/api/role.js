import request from '@/utils/request'

// 列表1
export function fetchList(query) {
  return request({
    url: '/api/api/v1/role',
    method: 'get',
    params: query
  })
}

// 获取内部所有角色
export function fetchAllRoleList() {
  return request({
    url: '/api/v1/role',
    method: 'get',
    params: { limit: 0 }
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: '/api/delete/role',
    method: 'patch',
    params: data,
    data
  })
}

// 获取一级菜单
export function getFristMenu() {
  return request({
    url: '/api/root/list',
    method: 'get'
  })
}
//  创建角色
export function createRole(data) {
  return request({
    url: '/api/createRole',
    method: 'post',
    data
  })
}
// 角色是否存在
export function roleNameExists(query) {
  return request({
    url: '/api/checkRoleName',
    method: 'get',
    params: query
  })
}

// 所有资源
export function fetchAllResource() {
  return request({
    url: '/api/resource',
    method: 'get'
  })
}

// 角色权限修改
export function updateRolePermission(data) {
  return request({
    url: '/api/binding/permission',
    method: 'patch',
    params: data
  })
}

// 外部客户角色列表
export function customRoleList(data) {
  return request({
    url: '/api/custom/master/permission',
    method: 'get',
    params: data
  })
}
