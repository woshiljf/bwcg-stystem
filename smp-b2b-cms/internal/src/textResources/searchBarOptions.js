const searchBarOptions = {
  // B2B订单列表页搜索框
  orderListOptions: [{
    type: 'input',
    name: 'orderNo',
    placeholder: '请输入查询订单号',
    label: '订单号:'
  }, {
    type: 'input',
    name: 'manualBillNo',
    placeholder: '请输入手工单号',
    label: '手工单号:'
  }, {
    type: 'select',
    name: 'billType',
    multiple: true,
    options: [
      { value: 'FUTURE', label: '期货' },
      { value: 'SPECIAL', label: '特价' },
      { value: 'SPOT', label: '现货' },
      { value: 'OTHER', label: '其他' }
    ],
    placeholder: '请选择类型',
    label: '订单类型:'
  }, {
    type: 'select',
    name: 'orderStatus',
    multiple: true,
    options: [
      { value: 'WAIT_OCCUPY_INVENTORY', label: '待占库' },
      { value: 'OCCUPYING_INVENTORY', label: '占库中' },
      { value: 'OCCUPYING_INVENTORY_FINISH', label: '占库完成' },
      { value: 'AGREE_APPROVAL', label: '审批通过' },
      { value: 'DOING_APPROVAL', label: '审批中' },
      { value: 'REFUSE_APPROVAL', label: '审批不通过' },
      { value: 'ORDER_CONFIRMATION', label: '订单确认中' },
      { value: 'ORDER_CONFIRMED', label: '订单已确认' },
      { value: 'DISPATCH_CONFIRMATION', label: '发货单确认中' },
      { value: 'DISPATCH_CONFIRMED', label: '发货中' },
      { value: 'PARTIAL_DELIVERY', label: '部分发货' },
      { value: 'SHIPPED', label: '已发货' },
      { value: 'CANCELING', label: '订单取消中' },
      { value: 'CANCELLED', label: '订单已取消' }
    ],
    placeholder: '请选择类型',
    label: '订单状态:'
  }, {
    type: 'daterange',
    name: 'createTime',
    placeholder: '订单日期',
    label: '订单日期'
  }, {
    type: 'input',
    name: 'customerShortName',
    placeholder: '请输入查询客户简称',
    label: '客户简称:'
  }, {
    type: 'input',
    name: 'customerCode',
    placeholder: '请输入查询客户代码',
    label: '客户代码:'
  }],

  // B2B退货单列表页搜索框
  dealersSearchBarOptions: [
    {
      type: 'input',
      name: 'retOrderNo',
      placeholder: '请输入退货订单号',
      label: '销售退货单号:'
    },
    {
      type: 'select',
      name: 'retOrderStatus',
      multiple: true,
      options: [],
      placeholder: '请选择类型',
      label: '销售退货单状态:',
      index: 0
    }, {
      type: 'radioSelect',
      name: 'warehouseCode',
      options: [],
      filterable: true,
      placeholder: '全部',
      label: '收货仓:'
    }, {
      type: 'select',
      name: 'retType',
      multiple: true,
      options: [],
      placeholder: '请选择类型',
      label: '退货类型:',
      index: 1
    }, {
      type: 'input',
      name: 'customerCode',
      placeholder: '请输入查询客户代码',
      label: '客户代码:'
    }, {
      type: 'input',
      name: 'customerName',
      placeholder: '请输入查询客户简称',
      label: '客户简称:'
    }, {
      type: 'daterange',
      name: 'createTime',
      placeholder: '订单日期',
      label: '开单日期'
    }
  ],

  // ODS发货单列表页搜索框
  deliveryListOptions: [{
    type: 'input',
    name: 'billNo',
    placeholder: '请输入发货单号',
    label: '发货单号:'
  }, {
    type: 'select',
    name: 'billStatusList',
    multiple: true,
    options: [],
    placeholder: '全部',
    label: '发货单状态:',
    index: 0
  }, {
    type: 'lazySelect',
    name: 'fromExternalWarehouseCodeList',
    options: [],
    placeholder: '全部',
    label: '发货仓:'
  }, {
    type: 'lazySelect1',
    name: 'toExternalWarehouseCodeList',
    options: [],
    placeholder: '全部',
    label: '目的仓:'
  }, {
    type: 'radioSelect',
    name: 'vendCustCode',
    options: [],
    filterable: true,
    placeholder: '全部',
    label: '客商名称:'
  }, {
    type: 'select',
    name: 'bizTypeList',
    multiple: true,
    options: [],
    placeholder: '全部',
    label: '业务类型:',
    index: 3
  }, {
    type: 'input',
    name: 'orderNo',
    placeholder: '请输入订单号',
    label: '订单号:'
  }, {
    type: 'input',
    name: 'sourceBillNo',
    placeholder: '请输入来源单号',
    label: '来源单号:'
  }, {
    type: 'input',
    name: 'shopBillNo',
    placeholder: '请输入网店交单号',
    label: '网店交易单号:'
  }, {
    type: 'input',
    name: 'otherBillNo',
    placeholder: '请输入其他单号',
    label: '其他单号:'
  }, {
    type: 'input',
    name: 'phone',
    placeholder: '请输入收件人电话',
    label: '收件人电话:'
  },
  {
    type: 'input',
    name: 'expressBillNo',
    placeholder: '请输入关键字',
    label: '快递单号:'
  }, {
    type: 'checkbox',
    name: 'hasDiffExpectQty',
    placeholder: '预计发货与实际发货有差异'
  },
  {
    type: 'daterange',
    name: 'createTime',
    defaultValue: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
    placeholder: '',
    label: '发货单生成时间:'
  }, {
    type: 'daterange',
    name: 'deliveryTime',
    placeholder: '',
    label: '发货时间:'
  }],

  // ODS发货单详情页搜索框
  deliveryDetailOptions: [{
    type: 'input',
    name: 'materialCode',
    placeholder: '请输入货号',
    label: '货号'
  }, {
    type: 'input',
    name: 'barCode',
    placeholder: '请输入sku',
    label: 'sku'
  }, {
    type: 'checkbox',
    name: 'onlyDiffBill',
    placeholder: '只看发货差异'
  }],

  // ODS 收货单列表搜索框
  receiveListOptions: [{
    type: 'input',
    name: 'billNo',
    placeholder: '请输入收货单号',
    label: '收货单号:'
  }, {
    type: 'select',
    name: 'billStatusList',
    options: [],
    multiple: true,
    placeholder: '全部',
    label: '收货单状态:',
    index: 0
  }, {
    type: 'lazySelect',
    name: 'toExternalWarehouseCodeList',
    options: [],
    multiple: true,
    placeholder: '全部',
    index: 4,
    label: '收货仓:'
  }, {
    type: 'lazySelect1',
    name: 'fromExternalWarehouseCodeList',
    options: [],
    multiple: true,
    index: 5,
    placeholder: '全部',
    label: '发货仓:'
  }, {
    type: 'radioSelect',
    name: 'vendCustCode',
    options: [],
    placeholder: '全部',
    label: '客商名称:'
  }, {
    type: 'select',
    name: 'bizTypeList',
    options: [],
    multiple: true,
    placeholder: '全部',
    label: '业务类型:',
    index: 3
  }, {
    type: 'input',
    name: 'orderNo',
    placeholder: '请输入订单号',
    label: '订单号:'
  }, {
    type: 'input',
    name: 'sourceBillNo',
    placeholder: '请输入来源单号',
    label: '来源单号:'
  }, {
    type: 'input',
    name: 'shopBillNo',
    placeholder: '请输入网店交易单号',
    label: '网店交易单号:'
  }, {
    type: 'input',
    name: 'externalBillNo',
    placeholder: '请输入外部单号',
    label: '外部单号:'
  },
  {
    type: 'daterange',
    name: 'createTime',
    defaultValue: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
    placeholder: '收货单生成时间',
    label: '收货单生成时间:'
  }, {
    type: 'daterange',
    name: 'ReceiveTime',
    placeholder: '收货时间',
    label: '收货时间:'
  }, {
    type: 'checkbox',
    name: 'hasDiffExpectQty',
    placeholder: '预计收货与实收有差异'
  }],

  // ODS 收货单详情页搜索框
  receiveDetailOptions: [{
    type: 'input',
    name: 'materialCode',
    placeholder: '请输入查询退货单号',
    label: '货号'
  }, {
    type: 'input',
    name: 'barCode',
    placeholder: '请输入',
    label: 'sku条码'
  }, {
    type: 'checkbox',
    name: 'onlyDiffBill',
    placeholder: '只看收货差异'
  }],

  // 库存查询页搜索框
  stockListOptions: [{
    type: 'input',
    name: 'barCodeList',
    placeholder: '支持批量输入,以,号隔开',
    label: 'sku条码'
  }, {
    type: 'input',
    name: 'materialCodeList',
    placeholder: '支持批量输入,以,号隔开',
    label: '货号'
  }, {
    type: 'select',
    name: 'warehouseCodeList',
    options: [{
      label: '第一个仓4051043405907',
      value: 'WH001223'
    }, {
      label: '第二个仓4051043409738',
      value: 'WH001227'
    }, {
      label: '第三个仓4051043443985',
      value: 'WH001223'
    }],
    multiple: true,
    placeholder: '全部',
    label: '仓库'
  }, {
    type: 'input',
    name: 'minUnallocatedQty',
    label: '未分配可用数≥',
    placeholder: '请输入不小于0的数值'
  }],

  // 仓库管理搜索框
  whouseListOptions: [
    {
      type: 'input',
      name: 'warehouseCode',
      placeholder: '请输入仓库内码',
      label: '仓库内码',
      maxlength: 20
    },
    {
      type: 'input',
      name: 'warehouseExternalCode',
      placeholder: '请输入仓库外码',
      label: '仓库外码',
      maxlength: 20
    },
    {
      type: 'lazySelect',
      name: 'warehouseName',
      options: [],
      placeholder: '全部',
      label: '仓库名称'
    },
    {
      type: 'select',
      name: 'physicalWarehouse',
      options: [],
      placeholder: '全部',
      label: '实体仓'
    }, {
      type: 'select',
      name: 'bizType',
      options: [],
      placeholder: '全部',
      label: '业务类型'
    }, {
      type: 'select',
      name: 'samePhysicalWarehouse',
      options: [],
      placeholder: '全部',
      label: '物理仓'
    },
    {
      type: 'select',
      name: 'designatedWarehouseSend',
      options: [],
      placeholder: '全部',
      label: '指定仓发'
    },
    {
      type: 'select',
      name: 'warehouseStatus',
      options: [],
      placeholder: '全部',
      label: '状态'
    }
  ],

  // 系统日志搜索框
  sysmLogOptions: [
    {
      type: 'date',
      name: 'startTime',
      placeholder: '请选择开始时间',
      label: '开始时间'
    },
    {
      type: 'date',
      name: 'endTime',
      placeholder: '请选择结束时间',
      label: '结束时间'
    },
    {
      type: 'select',
      name: 'optType',
      options: [],
      placeholder: '全部',
      label: '操作'
    }
  ],

  // OMS订单列表搜索框
  omsOrderListOptions: [
    {
      type: 'input',
      name: 'orderNo',
      placeholder: '',
      label: '交易单号:'
    },
    {
      type: 'input',
      name: 'externalNo',
      placeholder: '',
      label: '外部单号:'
    },
    {
      type: 'input',
      name: 'platformNo',
      placeholder: '',
      label: '平台单号:'
    },
    {
      type: 'select',
      name: 'bizTypes',
      options: [],
      multiple: true,
      placeholder: '全部',
      label: '业务类型:',
      index: 0
    },
    {
      type: 'select',
      name: 'orderType',
      options: [],
      multiple: true,
      placeholder: '全部',
      label: '单据类型:',
      index: 1
    },
    {
      type: 'select',
      name: 'orderStatus',
      options: [],
      multiple: true,
      placeholder: '全部',
      label: '单据状态:',
      index: 2
    },
    {
      type: 'input',
      name: 'receiverNameLike',
      placeholder: '',
      label: '收件人姓名:'
    },
    {
      type: 'input',
      name: 'receiverMobileLike',
      placeholder: '',
      label: '收件人电话:'
    },
    {
      type: 'radioSelect',
      name: 'shopCode',
      options: [],
      filterable: true,
      placeholder: '全部',
      label: '客店名称:'
    },
    { // 增加订单来源与缺货查询
      type: 'select',
      name: 'orderSource',
      options: [],
      multiple: true,
      placeholder: '全部',
      label: '订单来源:',
      index: 3
    },
    {
      type: 'daterange',
      name: 'changeTime',
      label: '平台单生成时间:'
    },
    {
      type: 'daterange',
      name: 'createTime',
      defaultValue: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
      label: '交易单创建时间:'
    },
    {
      type: 'checkbox',
      name: 'inadequate',
      placeholder: '缺货'
    } // 修改结束
  ],
  // oms售后单列表搜索项
  omsReceiveListOptions: [
    {
      type: 'input',
      name: 'returnNo',
      placeholder: '',
      label: '售后单号:'
    },
    {
      type: 'input',
      name: 'orderNo',
      placeholder: '',
      label: '交易单号:'
    },
    {
      type: 'input',
      name: 'externalNo',
      placeholder: '',
      label: '外部单号:'
    },
    {
      type: 'input',
      name: 'platformNo',
      placeholder: '',
      label: '平台单号:'
    },
    {
      type: 'select',
      name: 'bizTypes',
      options: [],
      multiple: true,
      placeholder: '全部',
      label: '业务类型:',
      index: 0
    },
    {
      type: 'select',
      name: 'returnTypes',
      options: [],
      multiple: true,
      placeholder: '全部',
      label: '单据类型:',
      index: 1
    },
    {
      type: 'select',
      name: 'returnStatus',
      options: [],
      multiple: true,
      placeholder: '全部',
      label: '单据状态:',
      index: 2
    },
    {
      type: 'radioSelect',
      name: 'shopCode',
      options: [],
      filterable: true,
      placeholder: '全部',
      label: '客店名称:'
    },
    {
      type: 'input',
      name: 'senderNameLike',
      placeholder: '',
      label: '客户姓名:'
    },
    {
      type: 'input',
      name: 'senderMobileLike',
      placeholder: '',
      label: '客户电话:'
    },
    {
      type: 'input',
      name: 'expressNum',
      placeholder: '',
      label: '快递单号:'
    },
    {
      type: 'daterange',
      name: 'createTime',
      defaultValue: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()],
      label: '售后单创建时间:'
    }
  ]
}
// 添加刷新最新默认时间的方法
export const getNewTime = () => {
  // 遍历刷新最新默认时间
  for (const k in searchBarOptions) {
    searchBarOptions[k].map(item => {
      // 如果有默认值属性的,那么就判断为时间组件, 那么给它重新刷新后的值
      if (item.defaultValue) {
        item.defaultValue = [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date()]
      }
    })
  }
}
export default searchBarOptions
