<template>
  <el-container class="order-box">
    <div class="user-box">
      <el-col :span="24">
        <p class="mt"><span class="blue-line">|</span>客户基本信息</p>
        <el-col :span="24" class="tabel-detail">
          <el-col span="12">
            <span>客户代码</span><span >47000998</span>
          </el-col>
          <el-col span="12">
            <span>客户全称</span><span>江苏禾穗商贸有限公司(宝唯)</span>
          </el-col>
          <el-col span="12">
            <span>客户简称</span><span >江苏禾穗（宝唯）</span>
          </el-col>
          <el-col span="12">
            <span>客户性质</span><span>加盟客户</span>
          </el-col>
          <el-col span="12">
            <span>客户状态</span><span >已签约</span>
          </el-col>
          <el-col span="12">
            <span>客户分类</span><span>大宗销售</span>
          </el-col>
          <el-col span="12">
            <span>信贷余额</span><span >1000,000</span>
          </el-col>
          <el-col span="12">
            <span>预付款余额</span><span>1000,000</span>
          </el-col>
          <el-col span="12">
            <span>退货余额</span><span >10,000</span>
          </el-col>
          <el-col span="12">
            <span>取价方式</span><span>零售价</span>
          </el-col>
          <el-col span="12">
            <span>业务地区</span><span >江苏省.连云港市</span>
          </el-col>
          <el-col span="12">
            <span>联系人</span><span>Allen</span>
          </el-col>
          <el-col span="12">
            <span>电话</span><span >16666666666</span>
          </el-col>
          <el-col span="12">
            <span>修改时间</span><span>2019/3/20</span>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24">
        <p class="mt"><span class="blue-line">|</span>客户信贷信息</p>
        <el-col :span="24" class="tabel-detail">
          <el-col span="12">
            <span>信贷代码</span><span >47000998</span>
          </el-col>
          <el-col span="12">
            <span>生效日期</span><span>2019/3/20</span>
          </el-col>
          <el-col span="12">
            <span>信用额度</span><span >2019/3/20</span>
          </el-col>
          <el-col span="12">
            <span>截止日期</span><span>2019/3/20</span>
          </el-col>
          <el-col span="12">
            <span>信用天数</span><span >60</span>
          </el-col>
          <el-col span="12">
            <span>有效日期</span><span>2019/3/20</span>
          </el-col>
          <el-col span="12">
            <span>信贷类型</span><span >常规</span>
          </el-col>
          <el-col span="12">
            <span>是否可用</span><span>是</span>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24">
        <p>
          <span class="blue-line">|</span>客户折扣信息
          <el-button
            class="btn"
            type="primary"
            icon="el-icon-search"
            @click="$router.push('/TradingPlatform/UserMessage/HistoryDiscount')"
          >查询历史折扣</el-button>
        </p>
        <el-col :span="24" class="tabel-detail">
          <el-col span="12">
            <span>年份</span><span >2019</span>
          </el-col>
          <el-col span="12">
            <span>季节</span><span>秋</span>
          </el-col>
          <el-col span="12">
            <span>取价方式</span><span >零售价</span>
          </el-col>
          <el-col span="12">
            <span>品牌</span><span>ADIDAS ORIGINALS(阿迪经典)</span>
          </el-col>
          <el-col span="12">
            <span>类别</span><span >服装</span>
          </el-col>
          <el-col span="12">
            <span>是否可用</span><span>是</span>
          </el-col>
          <el-col span="12">
            <span>期货折扣</span><span >0.5300</span>
          </el-col>
          <el-col span="12">
            <span>现货折扣</span><span>1.0000</span>
          </el-col>
        </el-col>
        <el-col :span="24" class="tabel-detail">
          <el-col span="12">
            <span>年份</span><span >2019</span>
          </el-col>
          <el-col span="12">
            <span>季节</span><span>秋</span>
          </el-col>
          <el-col span="12">
            <span>取价方式</span><span >零售价</span>
          </el-col>
          <el-col span="12">
            <span>品牌</span><span>ADIDAS ORIGINALS(阿迪经典)</span>
          </el-col>
          <el-col span="12">
            <span>类别</span><span >鞋子</span>
          </el-col>
          <el-col span="12">
            <span>是否可用</span><span>是</span>
          </el-col>
          <el-col span="12">
            <span>期货折扣</span><span >0.5300</span>
          </el-col>
          <el-col span="12">
            <span>现货折扣</span><span>1.0000</span>
          </el-col>
        </el-col>
        <el-col :span="24" class="tabel-detail">
          <el-col span="12">
            <span>年份</span><span >2019</span>
          </el-col>
          <el-col span="12">
            <span>季节</span><span>秋</span>
          </el-col>
          <el-col span="12">
            <span>取价方式</span><span >零售价</span>
          </el-col>
          <el-col span="12">
            <span>品牌</span><span>ADIDAS KIDSS(阿迪小童)</span>
          </el-col>
          <el-col span="12">
            <span>类别</span><span >服装</span>
          </el-col>
          <el-col span="12">
            <span>是否可用</span><span>是</span>
          </el-col>
          <el-col span="12">
            <span>期货折扣</span><span >0.5300</span>
          </el-col>
          <el-col span="12">
            <span>现货折扣</span><span>1.0000</span>
          </el-col>
        </el-col>
      </el-col>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'UserMessage'
}
</script>

<style scoped>
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
  .tabel-detail{
    border: 1px solid #cccccc;
    border-radius: 10px;
    padding: 30px 10px 0 10px;
    margin-top: 20px;
  }
  .tabel-detail span:last-child{
    margin-left: 40px;
  }
  .tabel-detail span {
    display: inline-block;
    padding-bottom: 40px ;
    font-weight: 200;
  }
  .user-box{
    width: 70%;
    margin: 0 auto
  }
  .btn{
    float: right;
  }
</style>
