<template>
  <div>
    <el-container class="order-box OMSReceiveBox">
      <el-col :span="24">
        <!-- 搜索组件 -->
        <search-bar
          ref="sh"
          :label-width="130"
          :all-oreder-params="true"
          :default-params="SearchBarParams"
          :options="omsReceiveListOptions"
          :options-copy="optionsCopy"
          :width-px="120"
          is-reset
          @search="search"/>
      </el-col>
      <el-table
        :data="tableData"
        :header-cell-style="{background: '#204060', color: 'white'}"
        :height="`calc(100vh - ${200}px)`"
        border
        class="tbStyle">
        <el-table-column
          prop="orderNo"
          label="单号"
          width="240">
          <template slot-scope="scope">
            <p><span>售后单号:</span><span>{{ scope.row.returnNo }}</span></p>
            <p><span>交易单号:</span><span>{{ scope.row.orderNo }}</span></p>
            <p><span>外部单号:</span><span>{{ scope.row.externalNo }}</span></p>
            <p><span>平台单号:</span><span>{{ scope.row.platformNo }}</span></p>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="客户信息"
          width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.senderName }}</p>
            <p>{{ scope.row.senderMobile }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="单据状态">
          <template slot-scope="scope">
            <span>{{ scope.row.returnStatusName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shopname"
          label="客店名称">
          <template slot-scope="scope">
            <span>{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="售后单创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <p class="blueColor"><router-link :to="{path: `/OMS/ReceiveDetail/${scope.row.returnNo}/${scope.row.uid}`}">查看</router-link></p>
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
        api="/bff/oos/api/query/v1/ro/list"
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
  name: 'OmsReceiveList',
  components: { SearchBar, PageCommon },
  data() {
    return {
      omsReceiveListOptions: searchBarOptions.omsReceiveListOptions, // 搜索框选项变量
      tableData: [], // 表格数据源
      getFlag: false, // 表格无数据时控制显示文字变量
      params1: { // 初始化变量
        fromCreateTime: '',
        toCreateTime: ''
      },
      moment: moment, // 时间插件, 更改时间格式
      optionsCopy: [], // 多选选项数据源
      SearchBarParams: {} // 搜索参数
    }
  },
  async created() {
    // 刷新最新默认时间
    getNewTime()
    if (sessionStorage.getItem('urlName') !== 'OMS-售后订单列表页面') {
      window._paq.push(['setDocumentTitle', 'OMS-售后订单列表页面'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', 'OMS-售后订单列表页面')
    }
    // 初始化请求参数, 最近一周
    this.params1 = {
      createTimeEnd: this.moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      createTimeStart: this.moment(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)).format('YYYY-MM-DD HH:mm:ss')
    }
    // 获取客商信息
    const res1 = await this.$api.getCustorm1()
    // 转换客商信息格式,以适应下拉框
    res1.data.data.map(item => {
      item['label'] = item.vendCustName
      item['value'] = item.vendCustCode
    })
    this.omsReceiveListOptions[7].options = res1.data.data
    this.optionsCopy = res1.data.data
    // 获取售后列表参数
    const res = await this.$api.getOmsSouhouSearchType()
    const lest = res.data.data
    console.log(lest)
    // 转换格式以适应下拉框
    for (const k in lest) {
      lest[k].map(item => {
        item['value'] = item.dicKey
        item['label'] = item.dicValue
      })
    }
    this.omsReceiveListOptions[5].options = lest.returnOrderType
    this.omsReceiveListOptions[4].options = lest.bizType
    this.omsReceiveListOptions[6].options = lest.returnOrderStatus
  },
  methods: {
    // 查询
    search(params) {
      for (const k in this.params1) {
        if (this.params1[k] instanceof Array) {
          this.params1 = []
        } else {
          delete this.params1[k]
        }
      }
      // 如果有创建时间, 则拆份成开始时间和结束时间
      if (params.createTime) {
        params.createTimeEnd = moment(params.createTime[1]).format('YYYY-MM-DD HH:mm:ss')
        params.createTimeStart = moment(params.createTime[0]).format('YYYY-MM-DD HH:mm:ss')
        delete params.createTime
      }
      // 处理空参及空格问题
      for (var e in params) {
        if (params[e] === '') {
          delete params[e]
        } else if (typeof (params[e]) === 'string') {
          params[e] = params[e].trim()
        }
      }
      this.getFlag = true
      // 发送请求列表信息
      this.$refs.page.getList(params)
    },
    // 获取表格数据源
    query(data) {
      this.tableData = data
    },
    // 加载动画
    load(status) {
      this.loading = status
    }
  }
}
</script>
<style scoped>
.blueColor{
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

</style>
