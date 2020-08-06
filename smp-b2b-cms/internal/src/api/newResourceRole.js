import { get, del, post, patch } from '@/utils/request'
// 权限菜单请求接口
const getallResuorce = () => get('/api/api/V2/resource')
const delUser = (params) => del('/api/api/v1/role', params)
const setRoleFuction = (params) => post('/api/api/v1/role_resource', params)
const getUserList = (params) => get(`/api/api/v1/user_role?roleCode=${params}&systemId=10`)
const setResource = (params) => post(`/api/api/v1/resource`, params)
const changeResource = (params) => patch(`/api/api/v1/resource`, params)

export { getallResuorce, delUser, setRoleFuction, getUserList, setResource, changeResource }
