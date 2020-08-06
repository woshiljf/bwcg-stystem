<template>
  <div class="user-list">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="info" icon="el-icon-upload" >{{ $t('trade.uploadFutureGoods') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="info" icon="el-icon-upload" >{{ $t('trade.uploadSaleGoods') }}</el-button>
    </div>
    <div class="filter-container">
      <el-input :placeholder="$t('trade.orderNo')" v-model.trim="listQuery.orderNo" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="$t('trade.customerCode')" v-model.trim="listQuery.customerCode" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select :placeholder="$t('trade.bizType')" v-model="listQuery.bizType" clearable style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter">
        <el-option v-for="(item, k) in bizTypeOptions" :key="item" :label="k" :value="item"/>
      </el-select>
      <el-select :placeholder="$t('trade.orderStatus')" v-model="listQuery.state" clearable style="width: 160px;" class="filter-item" @keyup.enter.native="handleFilter">
        <el-option v-for="(item, k) in orderStatusOptions" :key="item" :label="k" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.shipmentType" :placeholder="$t('trade.shipmentType')" clearable style="width: 140px" class="filter-item">
        <el-option v-for="(item, k) in shipmentTypeOptions" :key="item" :label="k" :value="item"/>
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
      <el-table-column :label="$t('trade.orderNo')" prop="orderNo" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('trade.customerCode')" prop="roleCode" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.customerCode }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('trade.bizType')" prop="bizType" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.bizType===1?'期货':'特价' }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createTime')" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('trade.state')" prop="roleCode" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.state | orderStatusZhFilter }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('trade.shipmentType')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.shipmentType | shipmentTypeFilter">{{ scope.row.shipmentType| shipmentTypeZhFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link :to="'/trade/edit/'+scope.row.orderNo">
            <el-button type="primary" size="small" icon="el-icon-edit">{{ $t('trade.action') }}</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('trade.customerCode')" prop="customerCode">
          <el-input v-model="temp.customerCode" maxlength="20" placeholder="请输入客户代码" style="width: 90%" />
        </el-form-item>
        <el-form-item :label="$t('trade.bizType')" prop="bizType">
          <span>{{ temp.bizType===1?'期货':'特价' }}</span>
        </el-form-item>
        <el-upload
          ref="uploadx"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          class="upload-demo"
          name="file"
          list-type="text"
          accept=".xls,.xlsx,.xlsm"
          action="aa"
          multiple>
          <el-button size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">一次只能上传一个excel文件，仅限格式xlsx、xls、xlsm，单个文件不超过10MB</div>
        </el-upload>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createTrade } from '@/api/trade'
import { mapGetters } from 'vuex'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
export default {
  name: 'User',
  components: { Pagination },
  directives: { waves },
  filters: {
    shipmentTypeFilter(status) {
      const shipmentTypeMap = {
        1: 'default',
        2: 'success'
      }
      return shipmentTypeMap[status]
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
    shipmentTypeZhFilter(status) {
      const shipmentTypeZhMap = {
        1: '自提',
        2: '物流'
      }
      return shipmentTypeZhMap[status]
    },
    bizTypeZhFilter(status) {
      const bizTypeZhMap = {
        1: '期货',
        2: '特价'
      }
      return bizTypeZhMap[status]
    },
    orderStatusZhFilter(status) {
      const orderStatusZhMap = {
        10: '待确认',
        20: '待付款',
        30: '待核款',
        40: '已核款',
        50: '待审核出货单',
        60: '已审核出货单',
        70: '已装箱',
        80: '已出库',
        99: '订单取消'
      }
      return orderStatusZhMap[status]
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
        return localStorage.getItem('tradeListQuery') ? JSON.parse(localStorage.getItem('tradeListQuery')) : {
          page: 1,
          limit: 20,
          orderNo: undefined,
          customerCode: undefined,
          bizType: undefined,
          state: undefined,
          shipmentType: undefined
        }
      })(),
      shipmentTypeOptions: { '自提（默认)': 1, '快递': 2 },
      bizTypeOptions: { '期货': 1, '特价': 2 },
      orderStatusOptions: {
        '待确认': 10,
        '待付款': 20,
        '待核款': 30,
        '已核款': 40,
        '待审核出货单': 50,
        '已审核出货单': 60,
        '已装箱': 70,
        '已出库': 80,
        '订单取消': 99
      },
      temp: {
        id: undefined,
        customerCode: undefined,
        attachName: undefined,
        file: undefined,
        bizType: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        customerCode: [{ required: true, message: 'customerCode is required', trigger: 'change' }]
        // file: [{ required: true, message: 'file is required' }]
      },
      file: '',
      visibleDel: false
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
          localStorage.setItem('tradeListQuery', JSON.stringify(val))
        }
      },
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    // 获取列表
    getList() {
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 500)
      this.listLoading = true
      fetchList(this.dealObjectValue(this.listQuery)).then(response => {
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
    createData() {
      const that = this
      that.formData = new FormData()
      that.$refs['uploadx'].submit()
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          that.formData.append('customerCode', this.temp.customerCode)
          that.formData.append('bizType', this.temp.bizType)
          if (!that.formData.get('file')) {
            this.$notify({
              title: '错误',
              message: '文件不能为空',
              type: 'error',
              duration: 2000
            })
            return
          }
          if (that.formData.get('file').size / 1024 / 1024 >= 10) {
            this.$notify({
              title: '错误',
              message: '上传文件大小不能超过 10MB!',
              type: 'error',
              duration: 2000
            })
            return
          }
          createTrade(that.formData).then(() => {
            // 直接在页面显示插入的数据
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
            that.$refs['uploadx'].clearFiles()
          })
        }
      })
    },
    // 重新刷新页面
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 清空搜索
    handleReset() {
      this.resetQuery()
      // this.getList()
    },
    // 清空搜索项
    resetQuery() {
      this.listQuery.page = 1
      this.listQuery.orderNo = undefined
      this.listQuery.customerCode = undefined
      this.listQuery.bizType = undefined
      this.listQuery.state = undefined
      this.listQuery.shipmentType = undefined
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
        customerCode: undefined,
        attachName: undefined,
        bizType: undefined
      }
    },
    // 上传
    handleCreate(bizType) {
      this.resetTemp()
      this.temp.bizType = bizType
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        console.log(this.$refs['dataForm'])
        this.$refs['dataForm'].clearValidate()
      })
    },
    // upload
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeUpload(file) {
      console.log('beforeUpload')
      this.formData.append('file', file)
      return false
    }

  }
}
</script>

<style scoped>
  .user-list{
    margin: 20px;
  }
</style>
