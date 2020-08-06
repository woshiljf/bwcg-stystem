<template>
  <div>
    <table-common v-loading="data.loading" :height="130" :table-header="data.tableHeader" :table-data="data.tableList" :table-button-width="100" table-button>
      <template slot="btn" slot-scope="scope">
        <el-button type="text" @click="openSetRoleDialog(scope.rowData.row)">编辑</el-button>
        <dialog-button
          :button-type="'text'"
          :button-text="'删除'"
          :options="data.deleteDialogOptions"
          :show-dialog.sync="data.deleteDialog"
          @open="openD( scope.rowData.row)"
          @DialogConfirm="deleteNowConfirm"/>
      </template>
    </table-common>
    <el-dialog
      :visible.sync="data.setRolDialog"
      width="70%"
      @close="handleClose">
      <el-form :model="data.form" style="width: 70%; margin: 0 auto">
        <el-form-item label="权限名">
          <el-input v-model="data.form.resourceName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="ResourceCode">
          <el-input v-model="data.form.resourceCode" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="data.form.url" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="ParentID">
          <el-input v-model="data.form.parentId" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="资源描述">
          <el-input v-model="data.form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="data.setRolDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TableCommon from './components/TableCommon'
import DialogButton from './components/DialogButton'
import { deleteDialogOptions, tableHeader } from './newResourceListData'
export default {
  name: 'NewResourceListTable',
  components: {
    DialogButton,
    TableCommon
  },
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: {
        row: {},
        setRolDialog: false,
        tableList: this.dataList, // 表格数据源
        deleteDialogOptions: deleteDialogOptions, // 删除弹窗创建项options数组
        deleteDialog: false, // 删除弹窗显示控制变量
        tableHeader: tableHeader, // 表格表头信息数组
        curow: {},
        form: {
          remark: '',
          resourceCode: '',
          url: '',
          parentId: '',
          resourceName: ''
        }
      }
    }
  },
  watch: {
    dataList: {
      handler(newVal) {
        this.data.tableList = newVal
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.data = null
  },
  methods: {
    handleClose(done) {
      this.data.form = {
        remark: '',
        resourceCode: '',
        url: '',
        parentId: '',
        resourceName: ''
      }
    },
    openD(row) {
      this.data.deleteDialog = true
      this.curow = row
      console.log(row, 'dangqianhang')
    },
    async setRole() {
      const str = JSON.stringify(this.data.form)
      const params = JSON.parse(str)
      for (var e in params) {
        if (typeof (params[e]) === 'string') {
          params[e] = params[e].trim()
        }
      }
      this.$axios({
        method: 'patch',
        url: '/api/api/v1/resource',
        data: params
      }).then(res => {
        this.$notify({
          title: '成功',
          type: 'success',
          message: '编辑角色成功',
          duration: 2000
        })
        this.data.setRolDialog = false
        this.handleClose()
        this.$emit('getList')
      }).catch(e => {
        this.$notify({
          title: '错误',
          type: 'error',
          message: '编辑角色失败',
          duration: 2000
        })
      })
    },
    async openSetRoleDialog(row) {
      const str = JSON.stringify(row)
      this.data.form = JSON.parse(str)
      this.data.setRolDialog = true
    },
    // 删除用户
    async deleteNowConfirm(even) {
      const params = this.curow
      params['disable'] = true
      this.$axios({
        method: 'patch',
        url: '/api/api/v1/resource',
        data: params
      }).then(res => {
        this.$notify({
          title: '成功',
          type: 'success',
          message: '删除角色成功',
          duration: 2000
        })
        this.data.deleteDialog = false
        this.$emit('getList')
      }).catch(e => {
        this.$notify({
          title: '错误',
          type: 'error',
          message: '删除角色失败',
          duration: 2000
        })
      })
      // const res = await delUser({ list: params })
      // console.log(res)
    }
  }
}
</script>
