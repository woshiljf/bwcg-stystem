<template>
  <div class="order-box clearfix customer">
    <!-- <p class="mr"><span class="blue-line">|</span>查询条件</p> -->
    <div class="filter-container searchBox">
      <el-checkbox-group v-model="listQuery.userAddr">
        <el-checkbox v-for="(item, k) in userAddrOptions" :key="item" :label="k" :value="k"/>
      </el-checkbox-group>
      <div class="inputBox">
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
    </div>
    <!-- <p class="mr"><span class="blue-line">|</span>查询结果</p> -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :header-cell-style="{background: '#204060', color: 'white'}"
      border
      fit
      highlight-current-row
      height="calc(100vh - 140px)"
      style="width: 100%; box-shadow: 0 3px 10px rgba(46, 8, 8, 0.1);"
      @sort-change="sortChange">
      <el-table-column :label="$t('table.id')" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userName')" prop="userName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customName }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.customCode')" prop="customCode" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customCode }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.propertyEnum')" prop="propertyEnum" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.accountProperty | attrFilter }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.available')" class-name="status-col">
        <template slot-scope="scope">
          <el-tag :type="scope.row.available | statusFilter">{{ scope.row.available| statusZhFilter }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" style="text-align:right">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-col>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.userName')" prop="userName">
          <el-input v-model="temp.customName"/>
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
// import { fetchExternalList, createUser, updateUser, deleteUser } from '@/api/user'
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
      // const date = new Date(time)
      // const y = date.getFullYear()
      // let m = date.getMonth() + 1
      // m = m < 10 ? ('0' + m) : m
      // let d = date.getDate()
      // d = d < 10 ? ('0' + d) : d
      // let h = date.getHours()
      // h = h < 10 ? ('0' + h) : h
      // let minute = date.getMinutes()
      // minute = minute < 10 ? ('0' + minute) : minute
      // let second = date.getSeconds()
      // second = second < 10 ? ('0' + second) : second
      // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
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
      userAddrOptions: {
        '客户主账户': 'CUSTOM_MASTER_ACCOUNT',
        '客户子账户': 'CUSTOM_SUB_ACCOUNT'
      },
      temp: {
        id: undefined,
        customCode: undefined,
        propertyEnum: undefined,
        customName: undefined,
        available: true
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        customName: [{ required: true, message: 'customName is required', trigger: 'change' }],
        customCode: [{ required: true, message: 'roleCode is required', trigger: 'change' }]
      },
      visibleDel: false
    }
  },
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
    if (sessionStorage.getItem('urlName') !== '权限管理-账户管理-外部页面') {
      window._paq.push(['setDocumentTitle', '权限管理-账户管理-外部页面'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', '权限管理-账户管理-外部页面')
    }
    this.getList()
  },
  methods: {
    // 获取列表
    async getList() {
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 500)
      this.listLoading = true
      this.getProperty(this.listQuery.userAddr)
      try {
        const res = await this.$api.userFetchExternalList(this.listQuery)
        this.list = res.data.list
        this.total = res.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      } catch (e) {
        this.listLoading = false
      } finally {
        this.listLoading = false
      }
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
    // resetQuery
    resetQuery() {
      this.listQuery.page = 1
      this.listQuery.available = undefined
      this.listQuery.userAddr = []
      this.listQuery.accountProperty = []
      this.listQuery.name = undefined
      this.listQuery.customCode = undefined
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
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          await this.$api.createUser(this.temp)
          // 直接在页面显示插入的数据
          this.list.unshift(this.temp)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 更新数据
    updateData() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          console.log('update')
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          await this.$api.updateUser(tempData)
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
      ).then(async() => {
        const requestData = {
          id: row.id
        }
        const res = await this.$api.deleteUser(requestData)
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
.order-box {
  display: block;
  width:100%;
  padding: 15px 40px;
}
.el-divider{
  margin: 15px 0
}
.blue-line{
    width: 15px;
    font-weight: 900;
    color: blue;
    display: inline-block;
  }
.mr{
    margin: 10px 0;
  }

</style>
