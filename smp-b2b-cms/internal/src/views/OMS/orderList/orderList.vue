<template>
  <div>
    <el-container class="order-box OMSOrderBox">
      <el-col :span="24">
        <!-- 搜索框组件 -->
        <search-bar
          ref="sh"
          :label-width="130"
          :all-oreder-params="true"
          :default-params="SearchBarParams"
          :options="omsOrderListOptions"
          :options-copy="optionsCopy"
          :width-px="120"
          :is-export="true"
          is-reset
          @export="searchExport"
          @search="search"/>
      </el-col>
      <el-table
        :data="tableData"
        :header-cell-style="{background: '#204060', color: 'white'}"
        :height="`calc(100vh - ${220}px)`"
        border
        class="tbStyle">
        <el-table-column
          prop="orderNo"
          label="单号"
          width="240">
          <template slot-scope="scope">
            <p><span>交易单号:</span><span :class="scope.row.inadequate === true ? 'red' : ''">{{ scope.row.orderNo }}</span></p>
            <p><span>平台单号:</span><span>{{ scope.row.platformNo }}</span></p>
            <p><span>外部单号:</span><span>{{ scope.row.externalOrderNo }}</span></p>
            <p><span>单据类型:</span><span>{{ scope.row.orderTypeName }}</span></p>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="收件人信息"
          width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.receiverName }}</p>
            <p>{{ scope.row.receiverMobile }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="单据状态">
          <template slot-scope="scope">
            <p><span>单据状态:</span><span>{{ scope.row.orderStatusName }}</span></p>
            <p><span>支付状态:</span><span>{{ scope.row.payStatusName }}</span></p>
          </template>
        </el-table-column>
        <el-table-column
          prop="shopname"
          label="客店名称">
          <template slot-scope="scope">
            <span>{{ scope.row.shopCodeName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="订单时间">
          <template slot-scope="scope">
            <p><span>平台订单生成时间:</span><span>{{ scope.row.orderCreateTime }}</span></p>
            <p><span>交易订单创建时间:</span><span>{{ scope.row.orderTransactTime }}</span></p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <p class="blueText">
              <router-link :to="{path: `/OMS/OrderDetail/${scope.row.orderNo}/${scope.row.uid}`}">查看</router-link>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <page-common
        ref="page"
        :default-parameters="params1"
        :page-size-list="[25, 50, 100]"
        :hide-last="true"
        layout="total, sizes, prev, pager, next"
        api="/bff/oos/api/query/v1/order/list"
        method="post"
        @query="query"
        @loading="load"
      />
    </el-container>
  </div>
</template>

<script>
import SearchBar from '../common/SearchBar'
import PageCommon from '@/components/PageCommon'
import searchBarOptions from '@/textResources/searchBarOptions'
import { getNewTime } from '@/textResources/searchBarOptions'
import moment from 'moment'

export default {
  name: 'OmsOrderList',
  components: { SearchBar, PageCommon },
  data() {
    return {
      omsOrderListOptions: searchBarOptions.omsOrderListOptions, // 搜索框选项变量
      tableData: [], // 表格数据源
      getFlag: false, // 表格无数据时控制显示文字变量
      params1: { // 初始化变量
      },
      moment: moment, // 时间插件, 更改时间格式
      optionsCopy: [], // 多选选项数据源
      SearchBarParams: {}, // 搜索参数
      defaultExportOptions: { // 初始化默认导出参数
        url: '/bff/oos/api/query/v1/order/list/export', // 导出接口
        data: {}, // 导出传递参数
        method: 'post', // 导出方法
        hasParams: true // 导出参数是否存在
      }
    }
  },
  beforeDestroy() {
    // 页面的变量后期可整理，组件销毁时，可以将变量释放掉。
  },
  async created() {
    // 刷新最新默认时间
    getNewTime()
    if (sessionStorage.getItem('urlName') !== 'OMS-订单交易列表') {
      window._paq.push(['setDocumentTitle', 'OMS-订单交易列表'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', 'OMS-订单交易列表')
    }
    // 初始化请求时间段
    this.params1 = {
      orderTransactTimeEnd: this.moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      orderTransactTimeStart: this.moment(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)).format('YYYY-MM-DD HH:mm:ss')
    }
    // 获取用户信息
    const res1 = await this.$api.getCustorm1()
    // 转换字典数据格式以适应下拉框
    res1.data.data.map(item => {
      item['label'] = item.vendCustName
      item['value'] = item.vendCustCode
    })
    this.omsOrderListOptions[8].options = res1.data.data
    // 客商信息全部数据源
    this.optionsCopy = res1.data.data
    // 获取搜索类型
    const res = await this.$api.getOmsSearchType()
    const lest = res.data.data
    // 更改数据格式以适应下拉框
    for (const k in lest) {
      lest[k].map(item => {
        item['value'] = item.dicKey
        item['label'] = item.dicValue
      })
    }
    this.omsOrderListOptions[3].options = lest.bizType
    this.omsOrderListOptions[4].options = lest.orderType
    this.omsOrderListOptions[5].options = lest.orderStatus
    // 获取订单来源数据源
    this.omsOrderListOptions[9].options = lest.orderSource
  },
  mounted() {
    this.params1 = {}
    // const res = document.getElementsByClassName('search-bar-col')
    // res[11].style = 'margin-right: 1px'
  },
  methods: {
    // 查询
    search(params) {
      const searchParams = this.dealParams(params)
      // 无数据显示提示信息变量
      this.getFlag = true
      // 发送请求
      this.$refs.page.getList(searchParams)
    },
    // 获取表格数据源
    query(data) {
      this.tableData = data
    },
    // 加载动画
    load(status) {
      this.loading = status
    },
    dealParams(params) {
      // 如果有订单发货时间, 则将其拆分成开始时间和结束时间
      if (params.createTime) {
        params.orderTransactTimeStart = moment(params.createTime[0]).format('YYYY-MM-DD HH:mm:ss')
        params.orderTransactTimeEnd = moment(params.createTime[1]).format('YYYY-MM-DD HH:mm:ss')
        delete params.createTime
      }
      // 如果如果有创建时间, 则将其拆分成开始时间和结束时间
      if (params.changeTime) {
        params.orderCreateTimeStart = moment(params.changeTime[0]).format('YYYY-MM-DD HH:mm:ss')
        params.orderCreateTimeEnd = moment(params.changeTime[1]).format('YYYY-MM-DD HH:mm:ss')
        delete params.changeTime
      }
      // 处理空参及空格数据
      for (var e in params) {
        if (params[e] === '') {
          delete params[e]
        } else if (typeof (params[e]) === 'string') {
          params[e] = params[e].trim()
        }
      }
      return params
    },
    // 导出功能函数
    searchExport(searchParams) {
      const params = this.defaultExportOptions
      console.log('123123s')
      // 调用方法处理参数
      params.data = this.dealParams(searchParams)
      this.$axios({
        method: params.method,
        url: params.url,
        data: params.data,
        timeout: 30000
        // responseType: 'blob'
      }).then(res => {
        if (res.data.code) {
          this.$notify({
            title: '错误',
            message: res.data.msg,
            type: 'error',
            duration: 2000
          })
          return
        }
        // 转换文件流格式
        const blob = new Blob(['\ufeff' + res.data], { type: 'text/csv;charset=utf-8' })
        const url = window.URL.createObjectURL(blob)
        // 通过创建a标签实现
        const link = document.createElement('a')
        link.href = url
        // 对下载的文件命名
        link.download = decodeURI(res.headers['content-disposition'].split('=')[1]) || '发货单导出数据表.csv'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
</script>
<style scoped>
.blueText{
  color:blue
}
.tbStyle{
  width: 100%;
  box-shadow: 0 3px 10px rgba(46, 8, 8, 0.1);
}
.textStyle{
  margin-left: 40px;
  color:red
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
  .el-divider{
    margin: 12px 0;
  }
  .mr{
    margin: 10px 0;
  }
 .red{
   color: red;
 }
</style>
