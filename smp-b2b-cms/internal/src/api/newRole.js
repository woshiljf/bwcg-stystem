import { get, del, post } from '@/utils/request'
// 权限菜单请求接口
const getallResuorce = () => get('/api/api/v2/all_resource')
const getUserResuorce = (params, id) => get(`/api/api/v2/available_resource?roleCode=${params}&systemId=${id}`)
const delUser = (params) => del('/api/api/v1/role', params)
const setRoleFuction = (params) => post('/api/api/v1/role_resource', params)
const getUserList = (params) => get(`/api/api/v1/user_role?roleCode=${params}&systemId=10`)
const getResource = (params) => get(`/api/api/v1/role_resource?roleCode=${params}&systemId=10`)

export { getallResuorce, delUser, setRoleFuction, getUserList, getResource, getUserResuorce }
