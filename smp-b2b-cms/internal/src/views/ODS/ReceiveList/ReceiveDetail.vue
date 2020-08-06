<template>
  <el-container class="order-box">
    <el-button v-preventReClick class="export-btn" type="primary" @click="exportWord">导出</el-button>
    <!-- 详情组件 -->
    <div class="padding-left-10">
      <detail-view :options="receiveOptions" :data="baseText" />
    </div>
    <el-row class="rowStyle">
      <el-form ref="form" :model="form">
        <el-col :xs="24" :sm="12" :md="12" :lg="3" :xl="2">
          <el-form-item >
            <el-select v-model="form.type" placeholder="请选择" @change="resetText">
              <el-option
                label="SKU条码"
                value="barCode"/>
              <el-option
                label="货号"
                value="materialCode"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item>
            <el-input
              ref="int"
              v-model="form.textarea"
              :rows="3"
              type="text"
              class="widthLength"
              placeholder="请输入内容"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item>
            <el-checkbox v-model="form.onlyDiffBill">只看收货差异</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="7" :xl="7">
          <el-form-item>
            <el-button v-preventReClick type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-col :span="24">
      <p><span v-if="getFlag && tableData.length === 0" class="textStyle">没有符合查询条件的结果,请更改查询条件试一试</span></p>
    </el-col>
    <!-- 表格组件 -->
    <table-common v-loading="loading" :height="150" :table-header="receiveDetailtableHeader" :change-cell="[8]" :change-cell-color="'red'" :table-data="tableData" @getSortList="getSortMethod"/>
    <!-- 分页组件 -->
    <page-common
      ref="page"
      :default-parameters="params"
      :api="`/bff/api/v1/receive/details?billNo=${encodeURI(this.$route.params.id)}`"
      method="post"
      @query="query"
      @loading="load"
    />
  </el-container>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import PageCommon from '@/components/PageCommon'
import TableCommon from '@/components/TableCommon'
import TableText from '@/textResources/tableText'
import searchBarOptions from '@/textResources/searchBarOptions'
import detailText from '@/textResources/detail'
import detailView from '@/components/detailView'
// import moment from 'moment'
export default {
  name: 'ReceiveDetail',
  components: {
    PageCommon, // 分页组件
    SearchBar, // 搜索组件
    TableCommon, // 表格组件
    detailView // 详情组件
  },
  data() {
    return {
      form: { // 搜索参数
        type: 'barCode',
        onlyDiffBill: '',
        textarea: ''
      },
      loading: false, // 加载动画变量
      getFlag: false, // 表格无数据时控制显示文字变量
      receiveOptions: detailText.receiveOptions, // 详情组件选项变量
      receiveDetailtableHeader: TableText.receiveDetailtableHeader, // 表格组件选项变量
      receiveDetailOptions: searchBarOptions.receiveDetailOptions, // 搜索组件选项变量
      tableData: [], // 表格数据来源
      baseText: {}, // 详情数据来源
      params: { // 默认参数
        columnName: ''
      },
      defaultExportOptions: { // 初始化导出参数
        url: '/bff/api/v1/receive/_export', // 导出地址
        data: { // 导出参数
          billNoList: this.$route.params.id
        }
      }
    }
  },
  async created() {
    if (sessionStorage.getItem('urlName') !== 'ODS管理-收货单详情页面') {
      window._paq.push(['setDocumentTitle', 'ODS管理-收货单详情页面'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', 'ODS管理-收货单详情页面')
    }
    // 获取基本信息
    const id = this.$route.params.id
    const res = await this.$api.getReceive(id)
    this.baseText = res.data.data
  },
  methods: {
    // 重置
    resetText() {
      this.form.textarea = ''
    },
    // 表格排序方法
    getSortMethod(column) {
      if (column.order) {
        console.log('点击触发排序,', column.order)
        const data = {
          orderByList: [{
            columnName: 'difference_amount',
            order: column.order
          }]
        }
        this.$refs.page.getList(data)
      }
    },
    // 查询
    search() {
      const params = {}
      params[this.form.type] = this.form.textarea.trim() || this.form.textarea
      params['onlyDiffBill'] = this.form.onlyDiffBill
      this.getFlag = true
      this.$refs.page.getList(params)
    },
    // 获取表格数据源
    query(data) {
      this.tableData = data
    },
    // 加载动画
    load(status) {
      this.loading = status
    },
    // 重置
    reset() {
      for (var k in this.form) {
        this.form[k] = ''
      }
      this.form.type = 'barCode'
    },
    // 导出
    exportWord() {
      this.$axios({
        method: 'post',
        url: '/bff/api/v1/receive/_export',
        data: { billNoList: [this.$route.params.id] }
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
.widthLength{
  width:80%
}
.rowStyle{
  padding: 10px 5px 0px 5px
}
.Hstyle{
  color: #0a76a4
}
.padding-left-10 {
 padding-left:10px
}
  .order-box {
    display: block;
    width:100%;
    padding: 15px 40px;
  }
  .tabel-detail span:last-child{
    display: inline-block;
    margin-left: 20px;
    font-weight: 200;

  }
   .blue-line{
    width: 15px;
    font-weight: 900;
    color: blue;
    display: inline-block;
  }
  .tabel-detail span{
    font-weight: 200;
    font-size: 15px;
  }
  .tabel-detail{
    overflow: hidden;
    padding-bottom: 30px;
  }
  .mt{
    margin-top: 30px;
  }
  .tr{
    text-align: right;
  }
   .export-btn{
    position: absolute;
    top: 10px;
    right: 30px;
    z-index: 99999
  }
</style>
