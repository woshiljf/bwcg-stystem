<template>
  <el-container class="order-box finance">
    <!-- <p class="mr"><span class="blue-line">|</span>查询条件</p> -->
    <div class="search-bar">
      <el-form ref="ruleForm">
        <el-col class="search-bar-col" >
          <el-form-item label="排序方式:">
            <el-select v-model="listQuery.sortField" style="width: 100%;" clearable placeholder="请选择排序方法" @change="sortFieldSelected">
              <el-option
                v-for="(item,index) in orderByOptions"
                :key="index"
                :label="index"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="开始时间:">
            <el-date-picker
              v-model="listQuery.startTime"
              :picker-options="pickerStartOptions"
              style="width: 100%;"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期时间"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="结束时间:">
            <el-date-picker
              v-model="listQuery.endTime"
              :picker-options="pickerEndOptions"
              style="width: 100%;"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期时间"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="订单号:">
            <el-input :placeholder="$t('statement.orderNoPlaceholder')" v-model.trim="listQuery.orderNum" style="width: 100%;" clearable class="filter-item"/>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="订单类型:">
            <el-select :placeholder="$t('statement.orderTypePlaceholder')" v-model="listQuery.detailLineType" clearable style="width: 100%;" class="filter-item" @keyup.enter.native="handleFilter">
              <el-option v-for="(item, k) in orderTypeOptions" :key="item" :label="k" :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="条码:">
            <el-input :placeholder="$t('statement.barCodePlaceholder')" v-model.trim="listQuery.itemNo" style="width: 100%;" clearable class="filter-item"/>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="货号:">
            <el-input :placeholder="$t('statement.productCodePlaceholder')" v-model.trim="listQuery.goodsNo" style="width: 100%;" clearable class="filter-item"/>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="品牌:">
            <el-input :placeholder="$t('statement.brandPlaceholder')" v-model.trim="listQuery.brandName" style="width: 100%;" clearable class="filter-item"/>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-form-item label="账套:">
            <el-select v-model="listQuery.companyCode" style="width: 100%;" clearable placeholder="请选择账套">
              <el-option
                v-for="(item,index) in companyCodeOptions"
                :key="index"
                :label="index"
                :value="item"
                clearable
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="search-bar-col" >
          <el-radio v-model="listQuery.dateType" label="orderDate">订单日期</el-radio>
          <el-radio v-model="listQuery.dateType" label="transactionDate">出仓日期</el-radio>
        </el-col>

        <el-col style="text-align:center;margin-bottom: 10px">

          <el-button v-waves :disabled="isDisable" class="filter-item" type="primary" @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
          <el-button v-waves class="filter-item" type="primary" @click="handleReset">
            {{ $t('table.reset') }}
          </el-button>
          <el-popover
            v-loading="loading"
            v-model="visible2"
            placement="bottom"
            width="240"
            style="margin-left:10px;padding: 10px 0"
          >
            <div v-show="!loading">
              <p v-show="canExport" >确定导出 {{ countExportData }} 条数据</p>
              <p v-show="!canExport" >导出{{ countExportData }}条数据太多了， 最多导出100000条数据</p>
              <div style="text-align: right; margin: 0">
                <el-button type="info" size="mini" @click="visible2 = false">取消</el-button>
                <el-button v-show="canExport" type="primary" size="mini" @click="visible2 = false">
                  <a :href="'/statement/export?startTime='+listQuery.startTime+'&endTime='+listQuery.endTime+'&companyCode='+listQuery.companyCode+'&orderNum='+listQuery.orderNum+'&detailLineType='+listQuery.detailLineType+'&itemNo='+listQuery.itemNo+'&goodsNo='+listQuery.goodsNo+'&brandName='+listQuery.brandName+'&sortField='+listQuery.sortField+'&limit=0'" class="fr exportA" target="_blank" >确定</a>
                </el-button>
              </div>
            </div>
            <div v-show="loading">导出加载中...</div>
            <el-button slot="reference" type="primary" @click="btnClick">导出</el-button>
          </el-popover>
        </el-col>
      </el-form>
    </div>
    <!-- <p class="mr"><span class="blue-line">|</span>查询结果</p> -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      :header-cell-style="{background: '#204060', color: 'white'}"
      class="tableColor"
      height="calc(100vh - 180px)"
      border
      fit
      highlight-current-row
      style="width: 100%;" >
      <af-table-column prop="id" align="center" label="序号" >
        <template slot="header">
          序号
        </template>
      </af-table-column>
      <af-table-column prop="orderDate" align="center" label="订单日期" >
        <template slot="header" >
          订单日期
          <el-tooltip class="item" effect="dark" content="订单审核通过后的时间" placement="top">
            <i class="el-icon-info"/>
          </el-tooltip>
        </template>
      </af-table-column>
      <af-table-column label="出仓日期" prop="transactionDate" align="center" >
        <template slot="header">
          出仓日期
          <el-tooltip class="item" effect="dark" content="商品从唯品会仓库出库的日期" placement="top">
            <i class="el-icon-info"/>
          </el-tooltip>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.orderNo')" prop="orderNum" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNum }} </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.orderType')" prop="detailLineType" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.detailLineType | orderTypeFilter }} </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.companyCode')" prop="jit" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.companyCode }} </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.channel')" prop="jit" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.saleChannel }} </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.barCode')" prop="itemNo" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.itemNo }} </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.productCode')" prop="goodsNo" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.goodsNo }} </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.brand')" prop="brandName" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.brandName }} </span>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.saleNum')" prop="payableQuantity" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.payableQuantity }} </span>
        </template>
      </af-table-column>
      <af-table-column prop="orderPrice" label="唯品会售卖价" align="center" >
        <template slot="header">
          唯品会售卖价
          <el-tooltip class="item" effect="dark" content="唯品会前台销售的价格" placement="top">
            <i class="el-icon-info"/>
          </el-tooltip>
        </template>
      </af-table-column>
      <af-table-column prop="tagPrice" label="零售价" align="center" >
        <template slot="header">
          零售价
          <el-tooltip class="item" effect="dark" content="吊牌价" placement="top">
            <i class="el-icon-info"/>
          </el-tooltip>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.retailMoney')" prop="retailAmount" align="center" >
        <template slot="header">
          零售金额
          <el-tooltip class="item" effect="dark" content="零售价*销售数量" placement="top">
            <i class="el-icon-info"/>
          </el-tooltip>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.marketMoney')" prop="payableTotalBillAmount" align="center" >
        <template slot="header">
          销售额（扣满减含拒退）
          <el-tooltip class="item" effect="dark" content="扣除满减包含拒收和客退的销售额" placement="top">
            <i class="el-icon-info"/>
          </el-tooltip>
        </template>
      </af-table-column>
      <af-table-column :label="$t('statement.discount')" prop="discount" align="center" >
        <template slot="header">
          销售折扣
          <el-tooltip class="item" effect="dark" content="销售额（扣满减含拒退）/零售金额	" placement="top">
            <i class="el-icon-info"/>
          </el-tooltip>
        </template>
      </af-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchList, exportExcel, countExport } from '@/api/statement'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { parseTime } from '@/utils'
// options components
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'
import PromptMessage from './components/PromptMessage'

export default {
  name: 'JitList',
  components: { Pagination, FilenameOption, AutoWidthOption, BookTypeOption, PromptMessage },
  directives: { waves },
  filters: {
    orderTypeFilter(status) {
      const orderTypeMap = {
        'CR_CUST': '销售',
        // 'CR_CUST_DISCOUNT': '销售优惠',
        // '其他': 'OTHER',
        'DR_CUST': '客退'
        // 'DR_CUST_EXTRA': '跨月客退',
        // 'DR_CUST_DISCOUNT': '客退优惠',
      }
      return orderTypeMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        false: 'danger',
        true: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      downloadLoading: false,
      isDisable: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      listLoading: true,
      list: null,
      visible2: false,
      countExportData: 0,
      canExport: true,
      loading: false,
      total: 0,
      listQuery: (() => {
        return {
          page: 1,
          limit: 50,
          sortField: null,
          dateType: 'orderDate',
          orderNum: null,
          detailLineType: null,
          goodsNo: null,
          itemNo: null,
          companyCode: null,
          brandName: null,
          startTime: null,
          endTime: null
        }
      })(),
      companyCodeOptions: {
        '300': '300',
        '325': '325'
      },
      orderTypeOptions: {
        '销售': 'CR_CUST',
        // '销售优惠': 'CR_CUST_DISCOUNT',
        // '其他': 'OTHER',
        '客退': 'DR_CUST'
        // '跨月客退': 'DR_CUST_EXTRA',
        // '客退优惠': 'DR_CUST_DISCOUNT',
      },
      pickerStartOptions: {
        disabledDate: (time) => {
          if (this.listQuery.endTime) {
            return time.getTime() > new Date(this.listQuery.endTime).valueOf()
          } else {
            return time.getTime() > Date.now() - 8.64e6
          }
        }
      },
      pickerEndOptions: {
        disabledDate: (time) => {
          if (this.listQuery.startTime) {
            return time.getTime() < new Date(this.listQuery.startTime).valueOf() || time.getTime() > Date.now() - 8.64e6
          } else {
            return time.getTime() > Date.now() - 8.64e6
          }
        }
      },
      orderByOptions: {
        '默认': 'id',
        '订单日期': 'order_date'
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
          // localStorage.setItem('jitListQuery', JSON.stringify(val))
        }
      },
      deep: true
    }
  },
  created() {
    if (sessionStorage.getItem('urlName') !== '财务管理-JIT财务报表页面') {
      window._paq.push(['setDocumentTitle', '财务管理-JIT财务报表页面'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', '财务管理-JIT财务报表页面')
    }
    // console.log(this.resourceCode, 'resourceCode')
    this.getList()
    // console.log('xxxx')
  },
  methods: {
    getOrderDate(orderDate) {
      return orderDate.substring(0, 10)
    },
    btnClick() {
      this.countExportData = 0
      this.loading = true
      countExport(this.listQuery).then((res) => {
        this.countExportData = res.data
        this.canExport = !(this.countExportData >= 100000)
        this.loading = false
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = false
      })
    },
    // 清空搜索项
    resetSearchItem() {
      this.listQuery.page = 1
      this.listQuery.startTime = null
      this.listQuery.endTime = null
      this.listQuery.sortField = null
      this.listQuery.orderNum = null
      this.listQuery.detailLineType = null
      this.listQuery.goodsNo = null
      this.listQuery.itemNo = null
      this.listQuery.companyCode = null
      this.listQuery.brandName = null
    },
    // 重新刷新页面
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 重新搜索
    handleReset() {
      this.resetSearchItem()
      // this.getList()
    },
    // 选中某一个排序方式
    sortFieldSelected() {
      if (this.listQuery.sortField) {
        this.getList()
      }
    },
    handleDownload() {
      this.listLoading = true
      exportExcel(this.listQuery).then(res => {
        console.log(res, 'exportExcel')
        // 这里res.data是返回的blob对象
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        // const filename = 'test.xls'
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'test.xls'
        link.click()
      }).catch(error => {
        console.log(error, 'exportExcel')
        this.listLoading = false
        console.log(error.response.status)
      }).finally(() => {
        this.listLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    dealObjectValue(obj) {
      const param = {}
      if (obj === null || obj === undefined || obj === '') {
        return null
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
        console.log(error, 'getListerror')
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
  .statement-list{
    margin: 20px;
  }
  .hoverSpan {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: gray;
    line-height: 16px;
    text-align: center;
    color: white;
    font-size: 14px;
    font-weight: 400;
    margin-left: 2px;
  }
  .order-box {
  display: block;
  width:100%;
  padding: 15px 40px;
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
  .el-divider{
   margin: 15px 0
 }
  .tableColor{
    color: black
  }

</style>
