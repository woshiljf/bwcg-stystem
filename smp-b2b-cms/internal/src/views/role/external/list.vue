<template>
  <div class="order-box clearfix">
    <div class="role-list">
      <!--搜索项-->
      <div class="filter-container clearfix">
        <el-button v-waves v-show="resourceCode.indexOf('createdRole') != -1" class="filter-item fr" type="primary" @click="handleAdd()">
          {{ $t('role.add') }}
        </el-button>
      </div>
      <!--表格-->
      <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="box-shadow: 0 3px 10px rgba(46, 8, 8, 0.1);">
        <el-table-column
          type="index"/>
        <el-table-column :label="$t('role.roleName')" prop="roleName" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }} </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('role.permissionList')" prop="permissionList" align="center" >
          <template slot-scope="scope">
            <permission-item ref="permissionItem" :permission="scope.row.permissionResponseVo" :frist-menu="fristMenu"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-waves v-show="resourceCode.indexOf('modifyRole') != -1" type="warning" size="small" @click="handleEdit(scope.row)" >{{ $t('role.edit') }}</el-button>
            <el-button v-waves type="primary" size="small" @click="handleView(scope.row)" >{{ $t('role.view') }}</el-button>
            <el-button v-waves v-show="resourceCode.indexOf('deleteRole') != -1" type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" >{{ $t('role.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <!--分页-->
      <!--查看-->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item :label="$t('role.roleName')" prop="roleName">
            {{ temp.roleName }}
          </el-form-item>
          <el-form-item :label="$t('role.permissionList')" prop="roleName">
            <permission-item ref="permissionItem" :permission="temp.permissionResponseVo" :frist-menu="fristMenu" :show="true"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-waves @click="dialogFormVisible = false">{{ $t('table.close') }}</el-button>
        </div>
      </el-dialog>
      <!--编辑-->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogEditVisible">
        <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item v-model="temp['roleName']" :label="$t('role.roleName')" prop="roleName">
            {{ temp.roleName }}
          </el-form-item>
          <el-form-item :label="$t('role.permissionList')" prop="resourceCodes">
            <el-tree
              ref="treeEdit"
              :data="allResource"
              :default-checked-keys="itemChecked"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              default-expand-all
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-waves :disabled="temp.editSubmitDisabled" type="primary" @click="submitEdit()" >{{ $t('table.submit') }}</el-button>
          <el-button v-waves @click="resetEditRole()">{{ $t('table.close') }}</el-button>
        </div>
      </el-dialog>
      <!--添加-->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogAddVisible">
        <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item :label="$t('role.roleName')" prop="roleName">
            <el-input v-model="addRoleName" :value="addRoleName" maxlength="40" autocomplete="off" clearable />
            <i v-show="addTemp.showNotice && addTemp.roleNameAvailable" style="color:#67C23A" class="el-icon-success">角色名称可用</i>
            <i v-show="addTemp.showNotice && !addTemp.roleNameAvailable" style="color:#E6A23C" class="el-icon-warning">角色名称不可用</i>
          </el-form-item>
          <el-form-item :label="$t('role.permissionList')" prop="resourceCodes">
            <el-tree
              ref="treeAdd"
              :data="allResource"
              :default-checked-keys="itemAddChecked"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              default-expand-all
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-waves :disabled="addTemp.addSubmitDisabled" type="primary" @click="submitAdd()" >{{ $t('table.submit') }}</el-button>
          <el-button v-waves @click="resetAddRole()">{{ $t('table.close') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { customRoleList, getFristMenu, deleteRole, fetchAllResource, updateRolePermission, roleNameExists, createRole } from '@/api/role'
import { mapGetters } from 'vuex'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import PermissionItem from '@/views/role/components/permissionItem'
export default {
  name: 'Role',
  components: { Pagination, PermissionItem },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      isDisable: false,
      list: null,
      total: 0,
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
      const data = { systemId: 10 }
      const tempCode = []
      this.$refs.treeAdd.getCheckedNodes().forEach((v) => {
        if (v.resourceCode) {
          tempCode.push(v.resourceCode)
        }
      })
      data.roleName = this.addRoleName
      data.resourceCode = tempCode
      if (!data.roleName) {
        this.$message({
          type: 'error',
          message: '角色名称不能为空!'
        })
        return
      }
      if (data.resourceCode.length <= 0) {
        this.$message({
          type: 'error',
          message: '权限不能为空!'
        })
        return
      }
      // console.log(data, 'add Data')
      if (this.addTemp.addSubmitDisabled) {
        this.$message({
          type: 'error',
          message: '不能重复点击!'
        })
        return
      }
      this.addTemp.addSubmitDisabled = true
      setTimeout(() => {
        this.addTemp.addSubmitDisabled = false
      }, 2000)
      createRole(data).then(response => {
        // console.log(response, 'add response')
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        // setTimeout(() => {
        //   this.dialogAddVisible = false
        //   this.$refs.treeAdd.setCheckedKeys([])
        //   this.getList()
        // }, 1000)
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '添加失败!' + error
        })
      }).finally(() => {
        setTimeout(() => {
          this.resetAddRole()
          this.getList()
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
        this.$message({
          type: 'error',
          message: '权限不能为空!'
        })
        return
      }
      data.roleCode = this.temp.roleCode
      data.resourceCodes = tempCode.join(',')
      if (this.temp.editSubmitDisabled) {
        this.$message({
          type: 'error',
          message: '不能重复点击!'
        })
        return
      }
      this.temp.editSubmitDisabled = true
      setTimeout(() => {
        this.temp.editSubmitDisabled = false
      }, 2000)
      updateRolePermission(data).then(response => {
        console.log(response)
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '修改失败!' + error
        })
      }).finally(() => {
        setTimeout(() => {
          this.resetEditRole()
          this.getList()
        }, 1000)
      })
    },
    // 获取空白所有资源
    getAllResource() {
      if (!localStorage.getItem('allResource')) {
        fetchAllResource().then(response => {
          const data = response.data
          const m = new Map()
          // console.log(typeof this.fristMenu)
          console.log(this.fristMenu, 'fristMenu')
          for (const i of this.fristMenu) {
            for (const j of data) {
              if (i.id === j.parentId && !m.has(i.remark)) {
                m.set(i.remark, i.id)
              }
            }
          }
          // console.log(m, 'res')
          const res = []
          for (const z of m) {
            const item = { id: z[1], label: z[0], children: [] }
            for (const p of data) {
              if (z[1] === p.parentId && p.resourceCode !== 'deleteRole') {
                item.children.push({ label: p.remark, id: p.id, resourceCode: p.resourceCode })
              }
            }
            res.push(item)
            // console.log(z)
          }
          // console.log(res, 'res')
          this.allResource = res
          localStorage.setItem('allResource', JSON.stringify(this.allResource))
        }).catch(error => {
          console.log(error, 'allResource')
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
      // console.log(this.itemChecked)
    },
    // 打开 add 页面
    handleAdd() {
      this.dialogStatus = 'add'
      this.dialogAddVisible = true
      // console.log(this.itemChecked)
    },
    // delete提示 并删除
    handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({ roleCode: row.roleCode }).then(response => {
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '删除失败!' + error
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
        }).catch(error => {
          console.log(error, 'getFristMenu')
        })
      } else {
        this.fristMenu = JSON.parse(localStorage.getItem('fristMenu'))
      }
    },
    // 获取列表
    getList() {
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 500)
      this.listLoading = true
      customRoleList(this.dealObjectValue(this.listQuery)).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      }).catch(error => {
        console.log(error, 'getListError')
        this.listLoading = false
        console.log(error.response.status)
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .role-list{
    margin: 20px;
    height: 100%;
  }
</style>
