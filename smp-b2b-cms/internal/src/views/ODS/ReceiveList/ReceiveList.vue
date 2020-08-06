<template>
  <div>
    <el-container class="order-box ODSReceiveBox">
      <el-col :span="24">
        <!-- 搜索框组件 -->
        <search-bar
          ref="sh"
          :label-width="140"
          :all-oreder-params="true"
          :options="receiveListOptions"
          :width-px="120"
          :options-copy="optionsCopy"
          lazy-update
          is-reset
          @search="searchList"/>
      </el-col>
      <!-- 表格组件 -->
      <table-common v-loading="loading" :height="200" :table-header="receivetableHeader" :change-cell="[12]" :change-cell-color="'red'" :table-data="tableData" :table-button-width="120" table-button>
        <template slot="btn" slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="$router.push(`/ODS/ReceiveList/ReceiveDetail/${scope.rowData.row.billNo}`)">查看</el-button>
          <el-button
            :disabled="isDisable"
            type="text"
            size="mini"
            @click="Send(scope.rowData.row.billNo)">导出</el-button>
        </template>
      </table-common>
      <!-- 分页器组件 -->
      <page-common
        ref="page"
        :default-parameters="params1"
        :hide-last="true"
        layout="total, sizes, prev, pager, next"
        api="/bff/api/v1/receive/_page"
        method="post"
        @query="query"
        @loading="load"
      />
    </el-container>
  </div>
</template>

<script>
import SearchBar from '../DeliveryList/SearchBar'
import PageCommon from '@/components/PageCommon'
import TableCommon from '../DeliveryList/TableCommon'
import TableText from '@/textResources/tableText'
import searchBarOptions from '@/textResources/searchBarOptions'
import { getNewTime } from '@/textResources/searchBarOptions'
import moment from 'moment'
export default{
  name: 'ReceiveList',
  components: {
    SearchBar, // 搜索组件
    PageCommon, // 分页组件
    TableCommon // 表格组件
  },
  data: function() {
    return {
      isDisable: false, // 防重复点击保护变量
      moment: moment, // 时间插件, 处理时间格式
      loading: false, // 加载动画
      params1: { // 初始化搜索变量
        fromCreateTime: '',
        toCreateTime: ''
      },
      receivetableHeader: TableText.receivetableHeader, // 表格表头选项变量
      receiveListOptions: searchBarOptions.receiveListOptions, // 搜索框选项变量
      tableData: [], // 表格数据来源
      optionsCopy: [], // 多选数据来源
      getFlag: false, // 表格无数据时显示文字变量
      defaultExportOptions: { // 默认导出变量
        url: '/bff/api/v1/receive/_export', // 导出地址
        data: { // 导出参数
          billNoList: ''
        },
        method: 'post', // 导出方法
        hasParams: true // 是否有导出参数
      }
    }
  },
  async created() {
    // 刷新最新默认时间
    getNewTime()
    // pvuv信息传递
    if (sessionStorage.getItem('urlName') !== 'ODS管理-收货单列表页面') {
      window._paq.push(['setDocumentTitle', 'ODS管理-收货单列表页面'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', 'ODS管理-收货单列表页面')
    }
    // 初始化参数请求
    this.params1.toCreateTime = this.moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.params1.fromCreateTime = this.moment(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)).format('YYYY-MM-DD HH:mm:ss')
    const params = ['dispatch_bill_status', 'dispatch_bill_biz_type', 'warehouse_type', 'receive_bill_status', 'receive_bil_biz_type']
    // 获取字典数据接口
    const res = await this.$api.getMessage(params)
    this.MessageArr = res.data.data
    // 字典数据格式处理
    this.MessageArr.map(item => {
      item.dictCodes.map(e => {
        e['value'] = e.dictCode
        e['label'] = e.dictValue
      })
    })
    // 对搜索框属性进行赋值
    this.receiveListOptions[1].options = this.MessageArr.filter(item => item.typeCode === 'receive_bill_status')[0].dictCodes
    this.receiveListOptions[5].options = this.MessageArr.filter(item => item.typeCode === 'receive_bil_biz_type')[0].dictCodes
    const res1 = await this.$api.getCustorm()
    console.log(res1, '数组')
    // 客商信息处理
    res1.data.data.map(item => {
      item['label'] = item.vendCustName
      item['value'] = item.vendCustCode
    })
    this.receiveListOptions[3].options = res1.data.data
    this.optionsCopy = res1.data.data
  },
  mounted() {
    this.params1 = {}
    const res = document.getElementsByClassName('search-bar-col')
    res[9].style = 'margin-bottom: -1px;'
  },
  methods: {
    // 搜索查询
    searchList(params) {
      // 处理空参及空格问题
      for (var e in params) {
        if (params[e] === '') {
          delete params[e]
        } else if (typeof (params[e]) === 'string') {
          params[e] = params[e].trim()
        }
      }
      // 提取过滤非必要数组集合属性
      for (var k in params) {
        if (k === 'fromExternalWarehouseCodeList' || k === 'toExternalWarehouseCodeList') {
          const arr = []
          params[k].map(item => {
            arr.push(item.value)
          })
          params[k] = arr
        }
      }
      // 如果创建时间有值, 那么拆份成开始时间和结束时间
      if (params.createTime) {
        params.toCreateTime = moment(params.createTime[1]).format('YYYY-MM-DD HH:mm:ss')
        params.fromCreateTime = moment(params.createTime[0]).format('YYYY-MM-DD HH:mm:ss')
        delete params.createTime
      }
      // 如果收货时间有值, 那么拆分成开始时间和结束时间
      if (params.ReceiveTime) {
        params.toReceiveTime = moment(params.ReceiveTime[1]).format('YYYY-MM-DD HH:mm:ss')
        params.fromReceiveTime = moment(params.ReceiveTime[0]).format('YYYY-MM-DD HH:mm:ss')
        delete params.ReceiveTime
      }
      // 重置提示文字显示属性
      this.getFlag = true
      // 发送请求列表数据请求
      this.$refs.page.getList(params)
    },
    // 获取表格数据
    query(data) {
      this.tableData = data
    },
    // 加载动画
    load(status) {
      this.loading = status
    },
    formatter(row, column) {
      return row.address
    },
    // 跳转详情
    handleView(index, row) {
      console.log(index, row)
      this.$router.push(`/TradingPlatform/returnList/creditDetail/${index}`)
    },
    // 导出
    async Send(id) {
      this.isDisable = true
      const that = this
      setTimeout(() => {
        that.isDisable = false
      }, 2000)
      this.$axios({
        method: 'post',
        url: '/bff/api/v1/receive/_export',
        data: { billNoList: [id] }
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
        const blob = new Blob(['\ufeff' + res.data], { type: 'text/csv;charset=utf-8' })
        const url = window.URL.createObjectURL(blob)
        // const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(res.data)
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
  .text-right{
    text-align: center;
  }
  .text-right button:last-child {
    margin-right: 5%;
  }
</style>
