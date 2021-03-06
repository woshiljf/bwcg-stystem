// newListHeader-DialogOption
// 新建角色弹窗options
const newListHeaderDialogOption = [
  {
    type: 'input',
    label: '角色名称',
    name: 'roleName',
    rules: true
  },
  {
    type: 'input',
    label: '角色英文名',
    name: 'roleCode',
    rules: true
  },
  {
    type: 'textArea',
    label: '角色描述',
    name: 'remark',
    rules: true
  }
]

// newListTable-DialogOption
// newListTable-tableHeaderData
const tableHeader = [
  { label: '角色名称', prop: 'roleName' }, { label: '角色描述', prop: 'remark' }, { label: '创建人', prop: 'creator' }, { label: '创建时间', prop: 'createTime' },
  { label: '最后修改时间', prop: 'lastUpdateTime' }
]
// 查询弹窗元素options
const searchDialogOptions = [
  {
    type: 'text',
    label: '角色名称',
    name: 'roleName'
  },
  {
    type: 'text',
    label: '角色英文名',
    name: 'roleCode'
  },
  {
    type: 'text',
    label: '角色描述',
    name: 'remark'
  },
  {
    type: 'tree',
    label: '权限',
    defaultProps: {
      children: 'childNodes',
      label: 'resourceName'
    },
    name: 'permissionResponseVo'
  },
  {
    type: 'text',
    label: '用户',
    name: 'userName'
  }
]

// 删除当前角色弹窗options
const deleteDialogOptions = [{
  type: 'text',
  label: '确定要删除么?',
  name: 'deleterow'
}]

export { newListHeaderDialogOption, searchDialogOptions, deleteDialogOptions, tableHeader }
