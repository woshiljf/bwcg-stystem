import { fetchList, getFristMenu, deleteRole, fetchAllResource, updateRolePermission, roleNameExists, createRole } from '@/api/role'
import { mapGetters } from 'vuex'
import { testImport } from '@/utils/index.js'
export default {
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      list: null,
      total: 0,
      test1: testImport(),
      listQuery: (() => {
        return localStorage.getItem('roleListQuery') ? JSON.parse(localStorage.getItem('roleListQuery')) : {
          page: 1,
          limit: 20,
          roleName: undefined
        }
      })(),
      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogAddVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看',
        add: '添加',
        edit: '编辑'
      },
      // 一级菜单
      fristMenu: [],
      // 返回所有资源
      allResource: [],
      itemChecked: [],
      itemAddChecked: [],
      // 默认tree的字段
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      addRoleName: null,
      addTemp: {
        roleNameAvailable: null,
        addSubmitDisabled: false,
        showNotice: false
      },
      temp: {
        id: null,
        roleName: null,
        permissionResponseVo: null,
        editSubmitDisabled: true,
        roleCode: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'resourceCode'
    ])
  },
  watch: {
    listQuery: {
      handler: (val) => {
        if (window.localStorage) {
          localStorage.setItem('roleListQuery', JSON.stringify(val))
        }
      },
      deep: true
    },
    dialogAddVisible: function(val) {
      if (val === false) {
        this.resetAddRole()
      }
    },
    dialogEditVisible: function(val) {
      if (val === false) {
        this.resetEditRole()
      }
    },
    addRoleName: function(val, oldVal) {
      if (val) {
        this.addTemp.showNotice = true
        roleNameExists({ roleName: val }).then(response => {
          this.addTemp.roleNameAvailable = !response.data
        }).catch(error => {
          console.log(error, 'roleNameExists')
        })
      } else {
        this.addTemp.showNotice = false
      }
    }
  },
  created() {
    if (sessionStorage.getItem('urlName') !== '权限管理-角色管理-内部页面') {
      window._paq.push(['setDocumentTitle', '权限管理-角色管理-内部页面'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', '权限管理-角色管理-内部页面')
    }
  },
  mounted() {
    // 获取角色列表
    this.getList()
    // 获取所有一级目录
    this.getFristMenu()
    // 获取所有资源
    this.getAllResource()
  },
  methods: {
    // 编辑窗口关闭
    resetEditRole() {
      this.dialogEditVisible = false
      this.$refs.treeEdit.setCheckedKeys([])
    },
    // 添加窗口关闭
    resetAddRole() {
      this.dialogAddVisible = false
      this.addRoleName = null
      this.$refs.treeAdd.setCheckedKeys([])
    },
    // 添加操作
    submitAdd() {
      const data = { systemId: 111 }
      const tempCode = []
      this.$refs.treeAdd.getCheckedNodes().forEach((v) => {
        if (v.resourceCode) {
          tempCode.push(v.resourceCode)
        }
      })
      data.roleName = this.addRoleName
      data.resourceCode = tempCode
      if (!data.roleName) {
        this.tipMsg('error', '角色名称不能为空!')
        return
      }
      if (data.resourceCode.length <= 0) {
        this.tipMsg('error', '权限不能为空!')
        return
      }
      // console.log(data, 'add Data')
      if (this.addTemp.addSubmitDisabled) {
        this.tipMsg('error', '不能重复点击!')
        return
      }
      this.addTemp.addSubmitDisabled = true
      setTimeout(() => {
        this.addTemp.addSubmitDisabled = false
      }, 2000)
      createRole(data).then(response => {
        this.tipMsg('success', '添加成功!')
      }).catch(error => {
        this.tipMsg('error', '添加失败!' + error)
      }).finally(() => {
        const time = setTimeout(() => {
          this.resetAddRole()
          this.getList()
          clearTimeout(time)
        }, 1000)
      })
    },
    // 修改提交
    submitEdit() {
      const data = {}
      const tempCode = []
      this.$refs.treeEdit.getCheckedNodes().forEach((v) => {
        if (v.resourceCode) {
          tempCode.push(v.resourceCode)
        }
      })
      if (tempCode.length <= 0) {
        this.tipMsg('error', '权限不能为空!')
        return
      }
      data.roleCode = this.temp.roleCode
      data.resourceCodes = tempCode.join(',')
      if (this.temp.editSubmitDisabled) {
        this.tipMsg('error', '不能重复点击!')
        return
      }
      this.temp.editSubmitDisabled = true
      const time = setTimeout(() => {
        this.temp.editSubmitDisabled = false
        clearTimeout(time)
      }, 2000)
      updateRolePermission(data).then(response => {
        this.tipMsg('success', '修改成功!')
      }).catch(error => {
        this.tipMsg('error', '修改失败!' + error)
      }).finally(() => {
        const time = setTimeout(() => {
          this.resetEditRole()
          this.getList()
          clearTimeout(time)
        }, 1000)
      })
    },
    // 获取空白所有资源
    getAllResource() {
      if (!localStorage.getItem('allResource')) {
        fetchAllResource().then(response => {
          const data = response.data
          const m = new Map()
          for (const i of this.fristMenu) {
            for (const j of data) {
              if (i.id === j.parentId && !m.has(i.remark)) {
                m.set(i.remark, i.id)
              }
            }
          }
          const res = []
          for (const z of m) {
            const item = { id: z[1], label: z[0], children: [] }
            for (const p of data) {
              if (z[1] === p.parentId && p.resourceCode !== 'deleteRole') {
                item.children.push({ label: p.remark, id: p.id, resourceCode: p.resourceCode })
              }
            }
            res.push(item)
          }
          this.allResource = res
          localStorage.setItem('allResource', JSON.stringify(this.allResource))
        })
      } else {
        this.allResource = JSON.parse(localStorage.getItem('allResource'))
      }
    },
    // 打开 edit 页面
    handleEdit(row) {
      this.dialogStatus = 'edit'
      this.dialogEditVisible = true
      this.temp = row
      this.itemChecked = []
      row.permissionResponseVo.forEach((v) => {
        this.itemChecked.push(v.id)
      })
    },
    // 打开 add 页面
    handleAdd() {
      this.dialogStatus = 'add'
      this.dialogAddVisible = true
    },
    // delete提示 并删除
    handleDelete(index, row) {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({ roleCode: row.roleCode }).then(response => {
          this.list.splice(index, 1)
          this.tipMsg('success', '删除成功!')
        }).catch(error => {
          this.tipMsg('error', '删除失败!' + error)
        })
      }).catch(() => {
        this.tipMsg('info', '已取消删除')
      })
    },
    tipMsg(type, msg) {
      this.$message({
        type: type,
        message: msg
      })
    },
    // 点击查看
    handleView(row) {
      this.dialogStatus = 'view'
      this.dialogFormVisible = true
      this.temp = row
    },
    dealObjectValue(obj) {
      const param = {}
      if (obj === null || obj === undefined || obj === '') {
        return param
      }
      for (const key in obj) {
        if (typeof (obj[key]) === 'object') {
          param[key] = this.dealObjectValue(obj[key])
        } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
          param[key] = obj[key]
        }
      }
      return param
    },
    // 获取一级菜单
    getFristMenu() {
      if (!localStorage.getItem('fristMenu')) {
        getFristMenu().then(response => {
          this.fristMenu = response.data
          localStorage.setItem('fristMenu', JSON.stringify(response.data))
        })
      } else {
        this.fristMenu = JSON.parse(localStorage.getItem('fristMenu'))
      }
    },
    // 获取列表
    getList() {
      this.listLoading = true
      fetchList(this.dealObjectValue(this.listQuery)).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        const time = setTimeout(() => {
          this.listLoading = false
          clearTimeout(time)
        }, 0.5 * 1000)
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
