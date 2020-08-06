import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 40

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    roleName: '@first',
    permissionList: { test: 'test' }
  }))
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    console.log(List)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getResourceByRoleName: (roleName) => {
    return [
      { name: 'User', remark: '用户管理', checkAll: false, permission: [{ name: 'editUser', remark: '编辑用户' }, { name: 'deleteUser', remark: '删除用户' }] },
      { name: 'Role', remark: '角色管理', checkAll: false, permission: [{ name: 'editRole', remark: '编辑角色' }, { name: 'deleteRole', remark: '删除角色' }] },
      { name: 'Order', remark: '订单管理', checkAll: false, permission: [{ name: 'editOrder', remark: '编辑订单' }, { name: 'deleteOrder', remark: '删除订单' }] }]
  },
  getAllResource: () => {
    return [
      { name: 'User', remark: '用户管理', checkAll: false, permission: [{ name: 'editUser', remark: '编辑用户' }, { name: 'deleteUser', remark: '删除用户' }] },
      { name: 'Role', remark: '角色管理', checkAll: false, permission: [{ name: 'editRole', remark: '编辑角色' }, { name: 'deleteRole', remark: '删除角色' }] },
      { name: 'Order', remark: '订单管理', checkAll: false, permission: [{ name: 'editOrder', remark: '编辑订单' }, { name: 'deleteOrder', remark: '删除订单' }] }]
  },

  createArticle: () => ({
    data: 'success'
  }),
  test: () => {
    return [
      {
        partitionName: '1区', selected: false, partitionId: 1, isIndeterminate: false,
        country: [
          { id: '1', fieldName: '奥地利', fieldTableName: '奥地利', distributors: 'UPS', selected: false },
          { id: '2', fieldName: '芬兰', fieldTableName: '芬兰', distributors: 'UPS', selected: false },
          { id: '3', fieldName: '意大利', fieldTableName: '意大利', distributors: 'UPS', selected: false },
          { id: '4', fieldName: '葡萄牙', fieldTableName: '葡萄牙', distributors: 'UPS', selected: false },
          { id: '9', fieldName: '西班牙', fieldTableName: '西班牙', distributors: 'UPS', selected: false },
          { id: '10', fieldName: '瑞典', fieldTableName: '瑞典', distributors: 'UPS', selected: false }]
      },
      {
        partitionName: '2区', selected: false, partitionId: 2, isIndeterminate: false,
        country: [
          { id: '5', fieldName: '丹麦', fieldTableName: '单买', distributors: '', selected: false },
          { id: '6', fieldName: '法国', fieldTableName: '法国', distributors: '', selected: false }]
      },
      {
        partitionName: '3区', selected: false, partitionId: 3, isIndeterminate: false,
        country: [
          { id: '7', fieldName: '德国', fieldTableName: '德国', distributors: 'YODEL', selected: false },
          { id: '8', fieldName: '瑞士', fieldTableName: '瑞士', distributors: 'DPD', selected: false }]
      }
    ]
  },
  updateArticle: () => ({
    data: 'success'
  })
}
