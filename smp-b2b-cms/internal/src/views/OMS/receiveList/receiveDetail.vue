<template>
  <el-container class="order-box">
    <el-row :gutter="20">
      <el-col :span="12" >
        <div class="box-De">
          <div class="clearfix box-He" >
            <span>售后单信息</span>
          </div>
          <!-- 详情组件 -->
          <detail-view :options="OMSReceiveDetailOptions" :data="baseText" :width-span="12" class="p10"/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="box-De">
          <div class="clearfix box-He" >
            <span>快递信息</span>
          </div>
          <!-- 详情组件 -->
          <detail-view :options="OMSReceiveDetailOptions1" :data="baseText2" :width-span="12" class="p10"/>
        </div>
      </el-col>
      <el-col :span="24" class="m10andp10">
        <div class="box-De">
          <div class="clearfix box-He" >
            <span>退货仓信息</span>
          </div>
          <!-- 详情组件 -->
          <detail-view :options="OMSReceiveDetailOptions2" :data="baseText3" :width-span="8" class="p10"/>
        </div>
      </el-col>
      <el-col :span="24" class="m10andp10">
        <div class="box-De">
          <div class="clearfix box-He" >
            <span>商品详情</span>
          </div>
          <!-- 表格组件 -->
          <div class="m10andwh70">
            <table-common v-loading="loading" :table-header="OMSproductDetailtableHeader" :table-data="tableData"/>
          </div>
          <!-- 分页器组件 -->
          <page-common
            ref="page"
            :default-parameters="params1"
            :page-size-list="[25, 50, 100]"
            :hide-last="true"
            layout="total, sizes, prev, pager, next"
            api="/bff/oos/api/query/v1/ro/items/list"
            method="post"
            @query="query"
            @loading="load"
          />
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import TableCommon from '../common/TableCommon'
import detailView from '@/components/detailView'
import TableText from '@/textResources/tableText'
import detailText from '@/textResources/detail'
import PageCommon from '@/components/PageCommon'

export default {
  name: 'OmsReceiveDetail',
  components: { TableCommon, detailView, PageCommon },
  data() {
    return {
      params1: { // 初始化变量
        uid: this.$route.params.id || '', // 单id
        returnNo: this.$route.params.No // 单号
      },
      OMSReceiveDetailOptions: detailText.OMSReceiveDetailOptions, // 详情选项变量
      OMSReceiveDetailOptions1: detailText.OMSReceiveDetailOptions1, // 详情选项变量
      OMSReceiveDetailOptions2: detailText.OMSReceiveDetailOptions2, // 详情选项变量
      baseText: {}, // 详情选项数据源
      baseText2: {}, // 详情选项数据源
      baseText3: {}, // 详情选项数据源
      loading: false, // 加载动画变量
      OMSproductDetailtableHeader: TableText.OMSproductDetailtableHeader, // 表格选项变量
      tableData: [], // 表格数据源
      form: {} // 搜索参数
    }
  },
  async created() {
    if (sessionStorage.getItem('urlName') !== 'OMS-售后订单详情页面') {
      window._paq.push(['setDocumentTitle', 'OMS-售后订单详情页面'])
      window._paq.push(['trackPageView'])
      sessionStorage.setItem('urlName', 'OMS-售后订单详情页面')
    }
    // 截取路由传递参数
    const id = this.$route.params.id || ''
    const No = this.$route.params.No
    // 搜索详情信息
    const res = await this.$api.getOmsSouhouDetailMsg(id, No)
    const lest = res.data.data
    this.baseText = lest.base
    this.baseText2 = lest.delivery
    this.baseText2['provinceAndCity'] = `${lest.delivery.senderProvince}-${lest.delivery.senderCity}-${lest.delivery.senderDistrict}`
    // this.baseText2['detailAdress'] = `${lest.delivery.senderProvince}.${lest.delivery.senderCity}.${lest.delivery.senderDistrict}.${lest.delivery.senderAddress}`
    this.baseText3 = lest.warehouse
  },
  methods: {
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
.m10andwh70{
  margin: 10px;
   width: 70%
}
.m10andp10{
  margin:10px 0;
  padding: 10px;
}
.p10{
  padding: 0 10px
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
  .box-De{
    border: 1px solid #C0C4CC;
    box-shadow: 0 3px 10px rgba(46, 8, 8, 0.1);
  }
  .box-He{
    background-color:#304156;
    border-bottom: 1px solid #ccc;
    color: white;
    font-size: 14px;
    padding: 6px
  }

</style>

