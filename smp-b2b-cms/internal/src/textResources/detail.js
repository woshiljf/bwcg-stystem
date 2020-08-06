export default {
  // ODS 发货单信息
  deliveryOptions: [{
    label: '发货单号',
    key: 'billNo', // data中对应的字段
    span: 12
  }, {
    label: '订单号',
    key: 'orderNo',
    type: 'link',
    to: '/TradingPlatform/List/ListDetail',
    span: 12
  }, {
    label: '来源单号',
    key: 'sourceBillNo',
    span: 12
  },
  {
    label: '网店交易单号',
    key: 'shopBillNo',
    span: 12
  }, {
    label: '发货单状态',
    key: 'billStatusName'
  }, {
    label: '发货单生成时间',
    key: 'createTime'
  }, {
    label: '发货单下发时间',
    key: 'billDate'
  }, {
    label: '发货时间',
    key: 'deliveryTime'
  }, {
    label: '业务类型',
    key: 'bizTypeName'
  }, {
    label: '客商编码',
    key: 'vendCustCode'
  },
  {
    label: '客商名称',
    key: 'vendCustName',
    span: 12
  }, {
    label: '调拨类型',
    key: 'allocateType'
  }, {
    label: '调拨方式名称',
    key: 'allocateModeName'
  }, {
    label: '调拨优先级',
    key: 'allocatePriority',
    span: 12
  }, { // 增加详情信息展示
    label: '发运方式',
    key: 'transportMethodName'
  }, {
    label: '所属批次',
    key: 'batchMark'
  }, {
    label: '预计到货时间',
    key: 'expectArrivalTime'
  }, {
    label: '其他单号',
    key: 'otherBillNo' // 修改结束
  }, {
    label: '发货仓代码',
    key: 'fromExternalWarehouseCode'
  }, {
    label: '发货仓名称',
    key: 'fromExternalWarehouseName'
  }, {
    label: '目的仓代码',
    key: 'toExternalWarehouseCode'
  }, {
    label: '目的仓名称',
    key: 'toExternalWarehouseName'
  },
  {
    label: '收件人省市区',
    key: 'provinceCityArea'
  }, {
    label: '收件人地址',
    key: 'address'
  }, {
    label: '收件人姓名',
    key: 'contact'
  }, {
    label: '收件人电话',
    key: 'phone'
  }, {
    label: '是否打印发票',
    key: 'PrintInvoiceFlag',
    type: 'radio'
  }, {
    label: '是否货票同行',
    key: 'WithInvoiceFlag',
    type: 'radio',
    span: 12
  }, {
    label: '备注',
    key: 'remark'
  }],
  // ODS 收货单信息
  receiveOptions: [{
    label: '收货单号',
    key: 'billNo',
    span: 12
  }, {
    label: '订单号',
    key: 'orderNo',
    type: 'link',
    to: '/TradingPlatform/returnList/creditDetail',
    span: 12
  }, {
    label: '来源单号',
    key: 'sourceBillNo',
    span: 12
  },
  {
    label: '网店交易单号',
    key: 'shopBillNo'
  }, {
    label: '外部单号',
    key: 'externalBillNo'
  },
  {
    label: '收货单状态',
    key: 'billStatusName'
  }, {
    label: '收货单生成时间',
    key: 'createTime'
  }, {
    label: '收货单生效时间',
    key: 'billDate'
  }, {
    label: '收货时间',
    key: 'receiveTime'
  }, {
    label: '业务类型',
    key: 'bizTypeName'
  }, {
    label: '客商编码',
    key: 'vendCustCode'
  },
  {
    label: '客商名称',
    key: 'vendCustName',
    span: 12
  }, {
    label: '调拨类型',
    key: 'allocateType'
  }, {
    label: '调拨方式名称',
    key: 'allocateModeName'
  }, {
    label: '调拨优先级',
    key: 'allocatePriority',
    span: 12
  }, {
    label: '收货仓代码',
    key: 'toExternalWarehouseCode'
  }, {
    label: '收货仓名称',
    key: 'toExternalWarehouseName'
  }, {
    label: '发货仓代码',
    key: 'fromExternalWarehouseCode'
  }, {
    label: '发货仓名称',
    key: 'fromExternalWarehouseName'
  },
  {
    label: '寄件人省市区',
    key: 'provinceCityArea'
  }, {
    label: '寄件人地址',
    key: 'address'
  }, {
    label: '寄件人姓名',
    key: 'contact'
  }, {
    label: '寄件人电话',
    key: 'phone'
  }, {
    label: '快递公司',
    key: 'expressCompanyCode'
  }, {
    label: '快递单号',
    key: 'expressBillNo',
    span: 12
  }, {
    label: '备注',
    key: 'remark'
  }],

  // B2B订单信息
  orderDetailOptions: [{
    label: '订单号',
    key: 'orderNo'
  }, {
    label: '订单日期',
    key: 'createDate'
  }, {
    label: '订单状态',
    key: 'orderStatus'
  },
  {
    label: '客户代码',
    key: 'customerCode'
  }, {
    label: '客户简称',
    key: 'customerShortName'
  }, {
    label: '订单金额',
    key: 'orderAmount'
  }, {
    label: '金额计算方式',
    key: 'priceCalculateModeValue'
  }, {
    label: '货币',
    key: 'balanceCurrencyValue'
  }, {
    label: '账务类别',
    key: 'accountingCategoryValue'
  }, {
    label: '业务员',
    key: 'businessMan'
  },
  {
    label: '制单人',
    key: 'creator'
  }, {
    label: '切货总数量',
    key: 'cutAmount'
  }, {
    label: '切货总金额',
    key: 'cutAmountTotal'
  }, {
    label: '发货总数量',
    key: 'dispatchAmount'
  }, {
    label: '发货总金额',
    key: 'dispatchAmountTotal'
  }, {
    label: '占库总数量',
    key: 'occupyAmount'
  }, {
    label: '占库总金额',
    key: 'occupyAmountTotal'
  }],

  // B2B 退货信息
  returnDetailOptions: [{
    label: '订单号',
    key: 'billNo'
  },
  {
    label: '客户编码',
    key: 'shopBillNo'
  }, {
    label: '客户简称',
    key: 'billStatusName'
  },
  {
    label: '业务员',
    key: 'vendCustName'
  },
  {
    label: '制单人',
    key: 'vendCustName'
  }],

  // B2B退货详情页
  returnListDetailOptions: [{
    label: '退货单号',
    key: 'retOrderNo'
  }, {
    label: '退货单状态',
    key: 'retOrderStatus'
  }, {
    label: '收货仓',
    key: 'receiveWarehouseName'
  },
  {
    label: '退货类型',
    key: 'retType'
  },
  {
    label: '金额计算方式',
    key: 'priceCalculateModeValue'
  }, {
    label: '账务类别',
    key: 'accountingCategoryValue'
  }, {
    label: '发运方式',
    key: 'transportMethodCodeValue'
  }, {
    label: '申请退货总数',
    key: 'planRetTotalQty'
  }, {
    label: '申请退货总金额',
    key: 'planRetTotalAmount'
  }, {
    label: '收货总数量',
    key: 'receiveTotalQty'
  }, {
    label: '收货总金额',
    key: 'receiveTotalAmount'
  }, {
    label: '业务员',
    key: 'businessMan'
  },
  {
    label: '制单人',
    key: 'creator'
  }],

  // OMS详情展示
  // 订单信息
  OMSOrderDetailOptions: [{
    label: '交易单号',
    key: 'orderNo'
  }, {
    label: '交易订单创建时间',
    key: 'orderTransactTime'
  }, {
    label: '平台单号',
    key: 'platformNo'
  },
  {
    label: '平台订单生成时间',
    key: 'orderCreateTime'
  }, {
    label: '外部单号',
    key: 'externalNo'
  }, {
    label: '单据状态',
    key: 'orderStatusName'
  }, {
    label: '单据类型',
    key: 'orderTypeName'
  }, {
    label: '业务类型',
    key: 'bizTypeName'
  }, {
    label: '客店代码',
    key: 'shopCode'
  }, {
    label: '客店名称',
    key: 'shopCodeName'
  },
  {
    label: '订单备注',
    key: 'remark'
  }, {
    label: '订单来源', // 增加订单来源
    key: 'orderSourceName'
  }],
  // 配送信息
  OMSOrderDetailOptions1: [{
    label: '收件人',
    key: 'receiverName'
  }, {
    label: '手机',
    key: 'receiverMobile'
  }, {
    label: '收件人省市区',
    key: 'provinceAndCity',
    span: 24
  },
  {
    label: '详细地址',
    key: 'receiverAddress',
    span: 24
  }, {
    label: '配送方式',
    key: 'logisticApproach'
  }, {
    label: '指定快递',
    key: 'logisticName'
  }, {
    label: '指定快递单号',
    key: 'logisticOrder',
    span: 24
  }, {
    label: '配送时间',
    key: 'availableDeliveryPeriod'
  }],
  // 支付信息
  OMSOrderDetailOptions2: [{
    label: '商品总金额',
    key: 'totalAmount'
  }, {
    label: '运费金额',
    key: 'shipFee'
  }, {
    label: '平台优惠金额',
    key: 'platDiscountAmount'
  },
  {
    label: '商家优惠金额',
    key: 'merchantDiscountAmount'
  }, {
    label: '订单金额',
    key: 'amount'
  }, {
    label: '支付时间',
    key: 'orderPaidTime'
  }, {
    label: '支付方式',
    key: 'payTypeName'
  }, {
    label: '支付状态',
    key: 'payStatusName'
  }],
  // 发票信息
  OMSOrderDetailOptions3: [{
    label: '寄送方式',
    key: 'invoiceTypeName'
  }, {
    label: '发票类型',
    key: 'sendType'
  }],

  // OMS售后详情
  OMSReceiveDetailOptions: [{
    label: '售后单号',
    key: 'returnNo'
  }, {
    label: '售后单创建时间',
    key: 'createTime'
  }, {
    label: '单据状态',
    key: 'returnStatusName'
  },
  {
    label: '交易单号',
    key: 'orderNo',
    type: 'link',
    to: '/OMS/OrderDetail',
    onlyLink: true
  }, {
    label: '收货单号',
    key: 'receiptNo',
    type: 'link',
    to: '/ODS/ReceiveList/ReceiveDetail',
    onlyLink: true
  }, {
    label: '外部单号',
    key: 'externalNo'
  }, {
    label: '单据类型',
    key: 'returnTypeName'
  }, {
    label: '业务类型',
    key: 'bizTypeName'
  }, {
    label: '客店代码',
    key: 'shopCode'
  }, {
    label: '客店名称',
    key: 'shopName'
  }],
  OMSReceiveDetailOptions1: [{
    label: '客户姓名',
    key: 'senderName'
  }, {
    label: '手机',
    key: 'senderMobile'
  }, {
    label: '客户寄件省市区',
    key: 'provinceAndCity',
    span: 24
  },
  {
    label: '详细地址',
    key: 'senderAddress',
    span: 24
  }, {
    label: '快递公司',
    key: 'logisticName',
    span: 24
  }, {
    label: '快递单号',
    key: 'logisticOrder'
  }],
  OMSReceiveDetailOptions2: [{
    label: '仓库账套',
    key: 'warehouseAccount'
  },
  {
    label: '仓库代码',
    key: 'warehouseExternalCode'
  },
  {
    label: '仓库名称',
    key: 'warehouseName'
  }
  ]
}
