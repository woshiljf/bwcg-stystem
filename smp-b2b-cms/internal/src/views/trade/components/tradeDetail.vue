<template>
  <div class="createPost-container">
    <div class="createPost-main-container">
      <el-card class="box-card orderinfo">
        <el-row class="text item">
          <el-col :span="3">{{ $t('trade.orderNo') }}:</el-col><el-col :span="3">{{ temp.orderNo }}</el-col>
        </el-row>
        <el-row class="text item">
          <el-col :span="3">{{ $t('trade.customerCode') }}:</el-col><el-col :span="3">{{ temp.code }}</el-col>
        </el-row>
        <el-row class="text item">
          <el-col :span="3">{{ $t('trade.bizType') }}:</el-col><el-col :span="3">{{ temp.bizType | bizTypeFilter }}</el-col>
        </el-row>
        <el-row class="text item">
          <el-col :span="3">{{ $t('trade.orderStatus') }}:</el-col><el-col :span="3">{{ temp.state | orderStatusZhFilter }}</el-col>
        </el-row>
        <el-row class="text item">
          <el-col :span="3">{{ $t('trade.shipmentType') }}:</el-col>
          <el-col :span="3">{{ temp.shipmentType | shipmentTypeZhFilter }} </el-col>
          <el-col :span="3">
            <el-button v-if="(temp.state ===10 || temp.state === 20) && (resourceCode.indexOf('modifyB2BShipmentType') != -1)" type="primary" @click="handleUpdate" >{{ $t('tradeDetail.update') }}</el-button>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card order">
        <el-row class="text item">
          <el-col :span="2"><b>{{ $t('tradeDetail.order') }}:</b></el-col>
          <el-col :span="4">{{ orderInfo.attachName || '暂无' }}</el-col>
          <el-col :span="2">{{ $t('tradeDetail.uploadTime') }}: <br><br>{{ $t('tradeDetail.orderConfirmTime') }}: </el-col>
          <el-col :span="3">{{ orderInfo.createTime | dateFilter }}<br><br>{{ orderInfo.confirmTime | dateFilter }}</el-col>
          <el-col :span="8" >
            <a v-if="orderInfo.attachName && (resourceCode.indexOf('orderExport') != -1)" :href="'/order/attachment/download?attachName='+orderInfo.attachName+'&orderNo='+temp.orderNo+'&attachUsage='+orderInfo.attachUsage" target="_blank" >
              <el-button class="filter-item" type="primary" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <a v-else @click="notHasInfo" >
              <el-button class="filter-item" type="info" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <el-button v-if="temp.state === 10 && (resourceCode.indexOf('createOrder') != -1)" class="filter-item" type="primary" icon="el-icon-upload" @click="dialogVisible=true">{{ $t('tradeDetail.upload') }}</el-button>
            <el-button v-else class="filter-item" type="info" icon="el-icon-upload" >{{ $t('tradeDetail.upload') }}</el-button>
            <el-button v-if="temp.state === 10 && (resourceCode.indexOf('confirmOrder') != -1)" class="filter-item" type="primary" @click="orderCheck" >{{ $t('tradeDetail.orderCheck') }}</el-button>
            <el-button v-else class="filter-item" type="info" icon="el-icon-check" >{{ $t('tradeDetail.orderCheck') }}</el-button>
          </el-col>
          <el-col :span="1">
            <el-button :type="temp.state >= 20?'success':'info'" icon="el-icon-check" circle/>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card payment">
        <el-row class="text item">
          <el-col :span="2"><b>{{ $t('tradeDetail.payment') }}:</b></el-col>
          <el-col :span="4">{{ paymentVoucher.attachName || '暂无' }}</el-col>
          <el-col :span="2">{{ $t('tradeDetail.uploadTime') }}: </el-col>
          <el-col :span="3">{{ paymentVoucher.createTime | dateFilter }}</el-col>
          <el-col :span="8">
            <a v-if="paymentVoucher.attachName && (resourceCode.indexOf('paymentVoucherExport') != -1)" :href="'/order/attachment/download?attachName='+paymentVoucher.attachName+'&orderNo='+temp.orderNo+'&attachUsage='+paymentVoucher.attachUsage" target="_blank" >
              <el-button class="filter-item" type="primary" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <a v-else @click="notHasInfo" >
              <el-button class="filter-item" type="info" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <el-button v-if="temp.state === 20 && (resourceCode.indexOf('paymentVoucher') != -1)" class="filter-item" type="primary" icon="el-icon-upload" @click="handleImageUpload('payment')">{{ $t('tradeDetail.upload') }}</el-button>
            <el-button v-else class="filter-item" type="info" icon="el-icon-upload" >{{ $t('tradeDetail.upload') }}</el-button>
          </el-col>
          <el-col :span="1">
            <el-button :type="temp.state >= 30?'success':'info'" icon="el-icon-check" circle/>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card delivery">
        <el-row class="text item">
          <el-col :span="2"><b>{{ $t('tradeDetail.delivery') }}:</b></el-col>
          <el-col :span="4">{{ verifyPaymentVoucher.attachName || '暂无' }}</el-col>
          <el-col :span="2">{{ $t('tradeDetail.uploadTime') }}: </el-col>
          <el-col :span="3">{{ verifyPaymentVoucher.createTime | dateFilter }}</el-col>
          <el-col :span="8">
            <a v-if="verifyPaymentVoucher.attachName && (resourceCode.indexOf('verifyPaymentVoucherExport') != -1)" :href="'/order/attachment/download?attachName='+verifyPaymentVoucher.attachName+'&orderNo='+temp.orderNo+'&attachUsage='+verifyPaymentVoucher.attachUsage" target="_blank" >
              <el-button class="filter-item" type="primary" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <a v-else @click="notHasInfo" >
              <el-button class="filter-item" type="info" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <el-button v-if="temp.state === 30 && (resourceCode.indexOf('verifyPaymentVoucher') != -1)" class="filter-item" type="primary" icon="el-icon-upload" @click="handleImageUpload('delivery')" >{{ $t('tradeDetail.upload') }}</el-button>
            <el-button v-else e class="filter-item" type="info" icon="el-icon-upload" >{{ $t('tradeDetail.upload') }}</el-button>
          </el-col>
          <el-col :span="1">
            <el-button :type="temp.state >= 40?'success':'info'" icon="el-icon-check" circle/>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card packing">
        <el-form :model="temp">
          <el-row class="text item">
            <el-col :span="2"><b>{{ $t('tradeDetail.packing') }}:</b></el-col>
            <el-col :span="4">
              <el-input v-model="shipment.shipmentOrderNo" :value="shipment.shipmentOrderNo" :readonly="shipmentOrderNoBoole" style="width: 80%;" placeholder="请输入出货单号" maxlength="40" autocomplete="off"/>
            </el-col>
            <el-col :span="2">{{ $t('tradeDetail.addTime') }}: <br><br>{{ $t('tradeDetail.checkTime') }}: </el-col>
            <el-col :span="3">{{ shipment.createTime | dateFilter }}<br><br>{{ shipment.checkTime | dateFilter }}</el-col>
            <el-col :span="8">
              <el-button v-if="temp.state===40 && (resourceCode.indexOf('buildShippingList') != -1)" type="primary" class="filter-item" @click="handleAdd()" >{{ $t('tradeDetail.add') }}</el-button>
              <el-button v-else type="info" class="filter-item" >{{ $t('tradeDetail.add') }}</el-button>
              <el-button v-if="temp.state===50 && (resourceCode.indexOf('verifyShippingList') != -1)" type="primary" class="filter-item" @click="checkPass()">{{ $t('tradeDetail.checkPass') }}</el-button>
              <el-button v-else type="info" class="filter-item">{{ $t('tradeDetail.checkPass') }}</el-button>
            </el-col>
            <el-col :span="1">
              <el-button :type="temp.state >= 60?'success':'info'" icon="el-icon-check" circle/>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card class="box-card shipment">
        <el-row class="text item">
          <el-col :span="2"><b>{{ $t('tradeDetail.shipment') }}:</b></el-col>
          <el-col :span="4">{{ packingList.attachName || '暂无' }}</el-col>
          <el-col :span="2">{{ $t('tradeDetail.uploadTime') }}: </el-col>
          <el-col :span="3">{{ packingList.createTime | dateFilter }}</el-col>
          <el-col :span="8">
            <a v-if="packingList.attachName && (resourceCode.indexOf('packingListExport') != -1)" :href="'/order/attachment/download?attachName='+packingList.attachName+'&orderNo='+temp.orderNo+'&attachUsage='+packingList.attachUsage" target="_blank" >
              <el-button class="filter-item" type="primary" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <a v-else @click="notHasInfo" >
              <el-button class="filter-item" type="info" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <el-button v-if="temp.state===60 && (resourceCode.indexOf('packingList') != -1)" class="filter-item" type="primary" icon="el-icon-upload" @click="handleExcelUpload('shipment')">{{ $t('tradeDetail.upload') }}</el-button>
            <el-button v-else class="filter-item" type="info" icon="el-icon-upload">{{ $t('tradeDetail.upload') }}</el-button>
          </el-col>
          <el-col :span="1">
            <el-button :type="temp.state >= 70?'success':'info'" icon="el-icon-check" circle/>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card sending">
        <el-row class="text item">
          <el-col :span="2"><b>{{ $t('tradeDetail.sending') }}:</b></el-col>
          <el-col :span="4">{{ outboundOrder.attachName || '暂无' }}</el-col>
          <el-col :span="2">{{ $t('tradeDetail.uploadTime') }}: </el-col>
          <el-col :span="3">{{ outboundOrder.createTime | dateFilter }}</el-col>
          <el-col :span="8">
            <a v-if="outboundOrder.attachName && (resourceCode.indexOf('outboundOrderExport') != -1)" :href="'/order/attachment/download?attachName='+outboundOrder.attachName+'&orderNo='+temp.orderNo+'&attachUsage='+outboundOrder.attachUsage" target="_blank" >
              <el-button class="filter-item" type="primary" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <a v-else @click="notHasInfo" >
              <el-button class="filter-item" type="info" icon="el-icon-download" >{{ $t('tradeDetail.export') }}</el-button>
            </a>
            <el-button v-if="temp.state===70 && (resourceCode.indexOf('outboundOrder') != -1)" class="filter-item" type="primary" icon="el-icon-upload" @click="handleExcelUpload('sending')" >{{ $t('tradeDetail.upload') }}</el-button>
            <el-button v-else class="filter-item" type="info" icon="el-icon-upload">{{ $t('tradeDetail.upload') }}</el-button>
          </el-col>
          <el-col :span="1">
            <el-button :type="temp.state >= 80?'success':'info'" icon="el-icon-check" circle/>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!--修改提货方式-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="120px" style="width: 300px; margin-left:50px;">
        <el-form-item :label="$t('trade.shipmentType')" prop="shipment_type">
          <el-select v-model="temp['shipmentType']" placeholder="请选择" >
            <el-option v-for="(item,k) in shipmentTypeOptions" :key="item" :label="k" :value="item"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--再次覆盖上传-->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="提示"
      width="30%">
      <span>已有文件"{{ orderInfo.attachName }}"，是否覆盖？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleExcelUpload('order')">确 定</el-button>
      </span>
    </el-dialog>
    <UploadExcel ref="uploadExcel" :order-no="temp.orderNo" :step="step" :user-code="temp.code" @fetchUploadData="fetchData(temp.orderNo)"/>
    <UploadImage ref="uploadImage" :order-no="temp.orderNo" :step="step" :user-code="temp.code" @fetchUploadData="fetchData(temp.orderNo)"/>
  </div>
</template>

<script>
import { fetchTrade, modifyB2BShipmentType, orderConfirm, verifyShippingList, updateTrade } from '@/api/trade'
import { mapGetters } from 'vuex'
import UploadExcel from './uploadExcel'
import UploadImage from './UploadImage'

const defaultForm = {
  id: undefined
}

export default {
  name: 'TradeDetail',
  components: { UploadExcel, UploadImage },
  filters: {
    bizTypeFilter(status) {
      const bizTypeMap = {
        1: '期货',
        2: '特价'
      }
      return bizTypeMap[status]
    },
    dateFilter(time) {
      if (time !== undefined && time !== null) {
        return time.replace('T', ' ').replace('.000+0800', '').replace('.000+0000', '')
      } else {
        return '暂无'
      }
    },
    shipmentTypeZhFilter(status) {
      const shipmentTypeZhMap = {
        1: '自提',
        2: '物流'
      }
      return shipmentTypeZhMap[status]
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
      postForm: Object.assign({}, defaultForm),
      temp: {
        id: undefined,
        attachmentInfoList: [],
        customerCode: undefined,
        orderNo: undefined,
        bizType: undefined,
        shipmentType: undefined,
        shipmentOrderNo: undefined,
        state: undefined,
        userCode: undefined,
        code: undefined,
        orderStatus: undefined
      },
      shipmentTypeOptions: { '自提（默认)': 1, '物流': 2 },
      dialogFormVisible: false,
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改提货方式'
      },
      orderInfo: {},
      paymentVoucher: {},
      verifyPaymentVoucher: {},
      shipment: {},
      packingList: {},
      outboundOrder: {},
      auth: [],
      step: '',
      orderNo: '',
      shipmentOrderNoBoole: false,
      tempRoute: {}
    }
  },
  computed: {
    lang() {
      return this.$store.getters.language
    },
    ...mapGetters([
      'resourceCode'
    ])
  },
  mounted() {
    const orderNo = this.$route.params && this.$route.params.id
    this.fetchData(orderNo)
    this.orderNo = orderNo
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.dialogVisible = false
          // done()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 检验后端返回权限
    checkAuth(method) {
      if (!method) {
        return false
      }
      return this.auth.indexOf(method) > -1
    },
    // 重新获取数据
    refreshData() {
      this.fetchData(this.orderNo)
    },
    // 获取详情信息
    fetchData(orderNo) {
      fetchTrade(orderNo).then(response => {
        this.postForm = response.data.orderDetail
        this.temp = response.data.orderDetail
        this.temp.shipmentType = parseInt(this.temp.shipmentType)
        this.temp.state = parseInt(this.temp.state)
        this.orderInfo = this.temp.orderDto
        this.paymentVoucher = this.temp.paymentVoucherDto
        this.verifyPaymentVoucher = this.temp.verifyPaymentVoucherDto
        this.shipment = this.temp.shipmentDto
        this.shipmentOrderNoBoole = !!((this.shipment.shipmentOrderNo !== null && this.temp.state >= 50))
        this.packingList = this.temp.packingListDto
        this.outboundOrder = this.temp.outboundOrderDto
        this.auth = Object.values(response.data.userAuthority.resourceCode)
        this.dialogVisible = false
        // Set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    // title 中添加orderNo
    setTagsViewTitle() {
      const title = '编辑交易'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.orderNo}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    // 打开修改提货方式页面
    handleUpdate() {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 上传excel
    handleExcelUpload(step) {
      this.step = step
      if (step === 'order' && this.temp.state !== 10) {
        this.notifyNotSupport()
        return
      }
      if (step === 'shipment' && this.temp.state !== 60) {
        this.notifyNotSupport()
        return
      }
      if (step === 'sending' && this.temp.state !== 70) {
        this.notifyNotSupport()
        return
      }
      this.$refs.uploadExcel.handleUpload(step)
    },
    // 上传image
    handleImageUpload(step) {
      this.step = step
      if (step === 'payment' && this.temp.state !== 20) {
        this.notifyNotSupport()
        return
      }
      if (step === 'delivery' && this.temp.state !== 30) {
        this.notifyNotSupport()
        return
      }
      this.$refs.uploadImage.handleUpload(step)
    },
    // checkPass 出货单审核
    checkPass() {
      if (this.temp.state !== 50) {
        this.notifyNotSupport()
        return
      }
      const tempData = Object.assign({}, { orderNo: this.temp.orderNo })
      verifyShippingList(tempData).then(() => {
        this.notifySuccess()
        this.temp.state = 60
        this.refreshData()
      }).catch(error => {
        console.log(error)
      }).finally(error => {
        console.log(error)
      })
    },
    // 出货单添加
    handleAdd() {
      console.log(this.shipmentOrderNoBoole)
      if (!this.shipment.shipmentOrderNo) {
        this.$notify({
          title: '错误',
          message: '出货单号不能为空',
          type: 'error',
          duration: 2000
        })
        return
      }
      if (this.shipment.shipmentOrderNo.length > 40) {
        this.$notify({
          title: '错误',
          message: '出货单号太长',
          type: 'error',
          duration: 2000
        })
        return
      }
      if (this.temp.state === 40) {
        const tempData = Object.assign({}, { orderNo: this.temp.orderNo, shipmentOrderNo: this.shipment.shipmentOrderNo })
        updateTrade(tempData).then(() => {
          this.notifySuccess()
          this.temp.state = 50
          this.shipmentOrderNoBoole = true
          this.refreshData()
        }).catch(error => {
          console.log(error)
        }).finally(error => {
          console.log(error)
        })
      } else {
        this.notifyNotSupport()
        return
      }
    },
    // 订单确认
    orderCheck() {
      console.log(this.temp.state)
      if (this.temp.state !== 10) {
        this.notifyNotSupport()
        return
      }
      const tempData = Object.assign({}, { orderNo: this.temp.orderNo })
      orderConfirm(tempData).then(() => {
        this.notifySuccess()
        this.temp.state = 20
        this.refreshData()
      }).catch(error => {
        console.log(error)
      }).finally(error => {
        console.log(error)
      })
    },
    // 下载错误
    notHasInfo() {
      this.$notify({
        title: '错误',
        message: '暂无文件或暂无权限',
        type: 'error',
        duration: 2000
      })
    },
    // 提示success
    notifySuccess() {
      this.$notify({
        title: '成功',
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
    },
    // 提示状态不支持
    notifyNotSupport() {
      this.$notify({
        title: '错误',
        message: '订单状态不支持',
        type: 'error',
        duration: 2000
      })
    },
    // 修改提货方式
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, { orderNo: this.temp.orderNo, shipmentType: this.temp.shipmentType })
          modifyB2BShipmentType(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }).catch(error => {
            console.log(error)
          }).finally(error => {
            console.log(error)
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 20px;
      .item{
        margin-bottom: 18px;
      }
      .text{
        font-size: 14px;
      }
      .left{
        float:left;
      }
      .right{
        float:right;
      }
    }
  }
</style>
