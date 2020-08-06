<template>
  <div class="user-list">
    <div class="filter-container">
      <el-checkbox-group v-model="listQuery.userAddr">
        <el-checkbox v-for="(item, k) in userAddrOptions" :key="item" :label="k" :value="item"/>
      </el-checkbox-group>
      <el-input :placeholder="$t('table.userName')" v-model.trim="listQuery.name" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('table.customCode')" v-model.trim="listQuery.customCode" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.available" :placeholder="$t('table.available')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="(item, k) in availableOptions" :key="item" :label="k" :value="item"/>
      </el-select>
      <el-button v-waves :disabled="isDisable" class="filter-item" type="primary" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="handleReset">
        {{ $t('table.reset') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userName')" prop="userName" align="center" width="85">
        <template slot-scope="scope">
          <span>{{ scope.row.customName }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.customCode')" prop="customCode" align="center" width="85">
        <template slot-scope="scope">
          <span>{{ scope.row.customCode }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.propertyEnum')" prop="propertyEnum" align="center" width="85">
        <template slot-scope="scope">
          <span>{{ scope.row.accountProperty | attrFilter }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.available')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.available | statusFilter">{{ scope.row.available| statusZhFilter }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.userName')" prop="userName">
          <el-input v-model="temp.userName"/>
        </el-form-item>
        <el-form-item :label="$t('table.customCode')" prop="roleCode">
          <el-input v-model="temp.customCode"/>
        </el-form-item>
        <el-form-item :label="$t('table.available')" prop="available">
          <el-switch v-model="temp.available" active-color="#13ce66" inactive-color="#ff4949"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchExternalList, createUser, updateUser, deleteUser } from '@/api/user'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
export default {
  name: 'User',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        false: 'danger',
        true: 'success'
      }
      return statusMap[status]
    },
    attrFilter(status) {
      const statusMap = {
        CUSTOM_MASTER_ACCOUNT: '客户主账户',
        CUSTOM_SUB_ACCOUNT: '客户子账户'
      }
      return statusMap[status]
    },
    dateFilter(time) {
      // const d = new Date(time)
      // const times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      // return times
      return time.replace('T', ' ').replace('.000+0800', '').replace('.000+0000', '')
    },
    statusZhFilter(status) {
      const statusZhMap = {
        false: '禁用',
        true: '启用'
      }
      return statusZhMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      isDisable: false,
      list: null,
      total: 0,
      listQuery: (() => {
        return localStorage.getItem('externalUserListQuery') ? JSON.parse(localStorage.getItem('externalUserListQuery')) : {
          page: 1,
          limit: 20,
          userAddr: [],
          accountProperty: [],
          name: undefined,
          customCode: undefined,
          available: undefined
        }
      })(),
      availableOptions: { '启用': true, '禁用': false },
      userAddrOptions: { '客户主账户': 'CUSTOM_MASTER_ACCOUNT', '客户子账户': 'CUSTOM_SUB_ACCOUNT' },
      temp: {
        id: undefined,
        customCode: undefined,
        propertyEnum: undefined,
        name: undefined,
        available: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        userName: [{ required: true, message: 'userName is required', trigger: 'change' }],
        customCode: [{ required: true, message: 'roleCode is required', trigger: 'change' }]
      },
      visibleDel: false
    }
  },
  // 保存到localStorage
  watch: {
    listQuery: {
      handler: (val) => {
        if (window.localStorage) {
          localStorage.setItem('externalUserListQuery', JSON.stringify(val))
        }
      },
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 500)
      this.listLoading = true
      this.getProperty(this.listQuery.userAddr)
      fetchExternalList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        // Just to simulate the time of the request
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
    },
    getProperty(attr) {
      this.listQuery.accountProperty = []
      if (attr.length === 0) {
        return
      }
      for (const a of attr) {
        console.log(a)
        this.listQuery.accountProperty.push(this.userAddrOptions[a])
      }
    },
    // 重新刷新页面
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 重置
    handleReset() {
      this.resetQuery()
      // this.getList()
    },
    // 清空查询
    resetQuery() {
      this.listQuery.page = 1
      this.listQuery.customCode = undefined
      this.listQuery.userAddr = []
      this.listQuery.accountProperty = []
      this.listQuery.name = undefined
      this.listQuery.available = undefined
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    // 新建数据模板
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        roleCode: undefined,
        roleName: undefined,
        createTime: undefined,
        available: true
      }
    },
    // 打开新建
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        console.log(this.$refs['dataForm'])
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 新建数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createUser(this.temp).then(() => {
            // 直接在页面显示插入的数据
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 更新数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log('update')
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    // 更新数据
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 删除数据
    handleDelete(row) {
      this.$confirm(
        '确定要删除吗',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        const requestData = {
          id: row.id
        }
        deleteUser(requestData).then(res => {
          console.log(res.data.code)
          if (res.data.code === 200) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            // clear item
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
          } else {
            this.$message({
              type: 'info',
              message: res.message || '删除失败'
            })
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },

    // 更新状态
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    }
  }
}
</script>

<style scoped>
  .user-list{
    margin: 20px;
  }
</style>
