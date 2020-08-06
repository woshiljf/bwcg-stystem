// label : 表头名,   prop 列对应数据字段  width: 每列宽度  sort: 是否排序
export default {

// B2B订单详情表头
  OrdertableHeader: [
    { label: '仓库名称', prop: 'warehouseName', width: '240' },
    {
      label: '货号',
      prop: 'productCode',
      width: '180'
    }, { label: '品牌', prop: 'brandValue', width: '180' }, { label: '年份', prop: 'productYear', width: '100' }, {
      label: '季节',
      prop: 'productSeasonValue',
      width: '80'
    }, { label: '类别', prop: 'productTypeValue', width: '90' },
    { label: '性别', prop: 'sexValue', width: '100' }, { label: '颜色名称', prop: 'colorValue', width: '100' }, {
      label: '上市日期',
      prop: 'planListingDate',
      width: '150'
    },
    { label: '系列', prop: 'productSeriesValue', width: '100' }, {
      label: '项目',
      prop: 'productProjectValue',
      width: '100'
    }, { label: '货品简称', prop: 'productShortName', width: '180' },
    { label: '零售价', prop: 'retailPrice', width: '100' }, { label: '尺码', prop: 'sizeCode', width: '100' }, {
      label: '折扣',
      prop: 'discount',
      width: '140'
    },
    { label: '结算价', prop: 'balanceAmount', width: '140' }, { label: '切货数量', prop: 'cutAmount', width: '100' },
    { label: '切货总金额', prop: 'cutTotalAmount', width: '100' },
    { label: '占用库存数量', prop: 'occupyQty', width: '120' }, { label: '占库总金额', prop: 'occupyTotalAmount', width: '120' }, {
      label: '发货数量',
      prop: 'dispatchQty',
      width: '100'
    }, { label: '发货总金额', prop: 'dispatchTotalAmount', width: '100' }, { label: '发货差异', prop: 'dispatchDiffQty', width: '100' }],

  // B2B订单列表表头
  OrderListHeader: [
    { label: '订单号', prop: 'orderNo', width: '240' }, { label: '手工单号', prop: 'manualBillNo', width: '240' }, { label: '订单类型', prop: 'billTypeDesc', width: '240' }, { label: '订单状态', prop: 'orderStatus', width: '120' }, {
      label: '客户代码',
      prop: 'customerCode'
    },
    { label: '客户简称', prop: 'customerShortName', width: '140' }, {
      label: '订单日期',
      prop: 'createDate',
      sort: true,
      width: '140'
    }, { label: '最后更新时间', prop: 'lastUpdateDate', sort: true, width: '240' }],

  // B2B发货单列表表头
  dispatchtableHeader: [
    { label: '发货单号', prop: 'dispatchNo', width: '270' }, {
      label: '发货状态',
      prop: 'dispatchStatue',
      width: '100'
    }, { label: '发货仓', prop: 'wareHouseName', width: '240' },
    { label: '金额计算方式', prop: 'amtcalcModeValue', width: '240' }, {
      label: '发运方式',
      prop: 'transportMethodCodeValue',
      width: '120'
    }, { label: '送货方式', prop: 'deliveryModeValue', width: '120' },
    { label: '付款方式', prop: 'paymentType', width: '120' }, {
      label: '开单日期',
      prop: 'createDate',
      width: '120'
    }, { label: '发货日期', prop: 'dispatchDate', width: '120' },
    { label: '最后更新时间', prop: 'updateTime', width: '200' }, { label: '发货差异', prop: 'shippingDifference', width: '100' }],

  // B2B退货单列表表头
  returntableHeader: [
    { label: '销售退货单号', prop: 'retOrderNo', width: '200' }, {
      label: '销售退货单状态',
      prop: 'retOrderStatusName',
      width: '140'
    }, { label: '收货仓', prop: 'receiveWarehouseName', width: '230' },
    { label: '退货类型', prop: 'retType', width: '140' }, {
      label: '客户代码',
      prop: 'customerCode',
      width: '180'
    }, { label: '客户简称', prop: 'customerName', width: '200' }, { label: '开单日期', prop: 'createTime', width: '240', sort: true },
    { label: '最后更新时间', prop: 'lastUpdateTime', width: '240', sort: true }],

  // B2B订单详情页退货单列表表头
  returntableHeader1: [
    { label: '销售退货单号', prop: 'retOrderNo', width: '240' }, {
      label: '销售退货单状态',
      prop: 'retOrderStatusName',
      width: '140'
    }, { label: '收货仓', prop: 'receiveWarehouseName', width: '140' },
    { label: '退货类型', prop: 'retType', width: '140' }, { label: '退货金额', prop: 'receiveTotalAmount', width: '140' }, { label: '开单日期', prop: 'createTime', width: '200' },
    { label: '最后更新时间', prop: 'lastUpdateTime', width: '200' }],

  // B2B退货单详情表头
  returnDetailtableHeader: [
    { label: '订单号', prop: 'orderNo', width: '200' },
    { label: '发货仓', prop: 'warehouseName', width: '240' },
    {
      label: '货号',
      prop: 'productCode',
      width: '180'
    }, { label: '品牌', prop: 'brandValue', width: '180' }, { label: '年份', prop: 'productYear', width: '100' }, {
      label: '季节',
      prop: 'productSeasonValue',
      width: '80'
    }, { label: '类别', prop: 'productTypeValue', width: '90' },
    { label: '性别', prop: 'sexValue', width: '100' }, { label: '颜色名称', prop: 'colorValue', width: '100' }, {
      label: '上市日期',
      prop: 'planListingDate',
      width: '150'
    },
    { label: '系列', prop: 'productSeriesValue', width: '100' }, {
      label: '项目',
      prop: 'productProjectValue',
      width: '100'
    }, { label: '货品简称', prop: 'productShortName', width: '180' },
    { label: '零售价', prop: 'retailPrice', width: '100' }, { label: '尺码', prop: 'sizeCode', width: '100' }, {
      label: '折扣',
      prop: 'discount',
      width: '140'
    },
    { label: '结算价', prop: 'balanceAmount', width: '140' }, {
      label: '申请退货数量',
      prop: 'planRetQty',
      width: '140'
    }, { label: '申请退货金额', prop: 'planRetAmount', width: '100' },
    { label: '收货数量', prop: 'receiveQty', width: '120' }, {
      label: '退货金额',
      prop: 'receiveAmount',
      width: '100'
    }, { label: '收货差异', prop: 'receiveDiffQty', width: '100' }
  ],
  // ODS发货单列表表头
  deliverytableHeader: [
    { label: '发货单号', prop: 'billNo', width: '280', link: true, to: '/ODS/DeliveryList/DeliveryDetail' }, {
      label: '发货单状态',
      prop: 'billStatusName',
      width: '100'
    }, { label: '业务类型', prop: 'bizTypeName', width: '90' },
    { label: '收件人电话', prop: 'phone', width: '120' },
    { label: '来源单号', prop: 'sourceBillNo', width: '160' },
    { label: '网店交易单号', prop: 'shopBillNo', width: '200' },
    { label: '订单号', prop: 'orderNo', width: '250', link: true, to: '/TradingPlatform/List/ListDetail', to1: '/scm/detail' }, { label: '客商名称', prop: 'vendCustName', width: '160', showOverFlowTooltip: true }, {
      label: '发货仓名称',
      prop: 'fromExternalWarehouseName',
      width: '180',
      showOverFlowTooltip: true
    },
    { label: '发货单生成时间', prop: 'createTime', width: '180' }, { label: '预计发货数量', prop: 'expectQty', width: '100' }, {
      label: '实际发货数量',
      prop: 'actualQty',
      width: '100'
    }, {
      label: '发货差异',
      prop: 'diffQty',
      width: '100'
    }],

  // ODS 发货单详情列表表头
  deliveryDetailtableHeader: [
    { label: '品牌', prop: 'brand', width: '180' }, { label: '货品简称', prop: 'productShortName', showOverFlowTooltip: true }, {
      label: '货号',
      prop: 'materialCode',
      width: '120'
    },
    { label: '尺码', prop: 'sizeName', width: '90' }, { label: 'SKU条码', prop: 'barCode', width: '140' }, {
      label: '颜色',
      prop: 'color',
      width: '100'
    },
    {
      label: '预计发货量',
      prop: 'estimateTotalAmount',
      width: '100'
    },
    { label: '实物占库数量', prop: 'occupiedQty', width: '100' }, // 增加实物占库数, 修改结束
    { label: '实际发货量', prop: 'amount', width: '100' }, {
      label: '发货差异',
      prop: 'differenceAmount',
      width: '120',
      sort: 'custom',
      cellStyle: true
    }, { label: '零售单价', prop: 'retailPrice', width: '90' }, { label: '结算单价', prop: 'price', width: '90' },
    { label: '箱号', prop: 'boxNo', width: '90' },
    { label: '快递公司', prop: 'deliveryCompanyName', showOverFlowTooltip: true, width: '100' }, {
      label: '快递单号',
      prop: 'deliveryExpressBillNo',
      width: '300'
    }],

  // ODS 收货单列表表头
  receivetableHeader: [
    { label: '收货单号', prop: 'billNo', width: '280', link: true, to: '/ODS/ReceiveList/ReceiveDetail' }, {
      label: '收货单状态',
      prop: 'billStatusName',
      width: '100'
    }, { label: '业务类型', prop: 'bizTypeName', width: '160' },
    { label: '来源单号', prop: 'sourceBillNo', width: '200' },
    { label: '网店交易单号', prop: 'shopBillNo', width: '200' },
    { label: '外部单号', prop: 'externalBillNo', width: '200' },
    { label: '订单号', prop: 'orderNo', width: '260', link: true, to: '/TradingPlatform/returnList/creditDetail', to1: '/scm/detail' }, { label: '客商名称', prop: 'vendCustName', width: '240' }, {
      label: '收货仓名称',
      prop: 'toExternalWarehouseName',
      width: '280'
    },
    { label: '收货单生成时间', prop: 'createTime', width: '180' }, { label: '预计收货数量', prop: 'expectQty', width: '100' }, {
      label: '实际收货数量',
      prop: 'actualQty',
      width: '100'
    }, { label: '收货差异', prop: 'diffQty', width: '90' }],

  // ODS 收货单详情列表表头
  receiveDetailtableHeader: [
    { label: '品牌', prop: 'brand' }, { label: '货品简称', prop: 'productShortName', width: '180' }, {
      label: '货号',
      prop: 'materialCode',
      width: '180'
    },
    { label: '尺码', prop: 'sizeName', width: '100' }, { label: 'SKU条码', prop: 'barCode' }, {
      label: '颜色',
      prop: 'color',
      width: '180'
    },
    { label: '预计收货量', prop: 'expectQty', width: '100' }, {
      label: '实际收货量',
      prop: 'actualQty',
      width: '100'
    }, { label: '收货差异', prop: 'diffQty', width: '120', sort: true }],

  // 实物库存分配列表表头1
  physicalallocationHeader: [
    { label: '仓库代码', prop: 'warehouseCode', width: '120' }, { label: '仓库名称', prop: 'warehouseName' }, { label: '仓库类型', prop: 'warehouseTypeName', width: '100' },
    { label: '品牌', prop: 'brandName' }, {
      label: '货号',
      prop: 'materialCode',
      width: '90'
    }, { label: '尺码类别', prop: 'size_category', width: '100' },
    { label: '尺码', prop: 'size', width: '80' }, {
      label: 'sku条码',
      prop: 'barCode',
      width: '120'
    }, { label: '实物数', prop: 'totalQty', width: '80', sort: true, renderHeader: true, toolText: '仓库中实有的库存数量', show: true }, { label: '占用数', prop: 'occupiedQty', width: '80', sort: true, renderHeader: true, toolText: '销售出，采购退，调拨出等发货占库但未出仓库的商品数量' },
    { label: '未分配可用数', prop: 'unallocatedQty', width: '80', sort: true, renderHeader: true, toolText: '线下销售和调拨等业务当前可用的库存数量' }, { label: '已分配可用数', prop: 'allocatedQty', width: '70', renderHeader: true, toolText: '分配给线上销售的当前可用库存数量' }],

  // 实物库存分配列表表头2
  physicalallocationHeader2: [
    { label: '仓库代码', prop: 'warehouseCode', width: '120' }, { label: '仓库名称', prop: 'warehouseName' }, { label: '仓库类型', prop: 'warehouseTypeName', width: '100' },
    { label: '品牌', prop: 'brandName' }, {
      label: '货号',
      prop: 'materialCode',
      width: '90'
    }, { label: '尺码类别', prop: 'size_category', width: '80' },
    { label: '尺码', prop: 'size', width: '80' }, {
      label: 'sku条码',
      prop: 'barCode',
      width: '120'
    }, { label: '实物数', prop: 'totalQty', width: '80', sort: true, renderHeader: true, toolText: '仓库中实有的库存数量', show: true }, { label: '占用数', prop: 'occupiedQty', width: '80', sort: true, renderHeader: true, toolText: '销售出，采购退，调拨出等发货占库但未出仓库的商品数量' },
    { label: '未分配可用数', prop: 'unallocatedQty', width: '80', sort: true, renderHeader: true, toolText: '线下销售和调拨等业务当前可用的库存数量' }, { label: '已分配可用数', prop: 'allocatedQty', width: '70', renderHeader: true, toolText: '分配给线上销售的当前可用库存数量' },
    { label: '操作', prop: 'operation' }, { label: '流水', prop: 'pipeline', width: '100' },
    { label: '类别', prop: 'category' }, { label: '系列', prop: 'series', width: '' }, { label: '款型', prop: 'style', width: '' }, { label: '项目', prop: 'project', width: '' }, { label: '零售价', prop: 'retail_price', width: '' }, { label: '性别', prop: 'sex', width: '' },
    { label: '颜色', prop: 'color', width: '' }, { label: '上市时间', prop: 'market_time', width: '' }, { label: '年份', prop: 'year', width: '' }, { label: '季节', prop: 'season', width: '' }
  ],

  // 渠道库存分配列表表头1
  channelallocationHeader: [
    { label: 'sku条码', prop: 'barCode', width: '120' }, { label: '货号', prop: 'materialCode', width: '100' }, { label: '尺码类别', prop: 'size_category', width: '80' }, { label: '尺码', prop: 'size', width: '60' },
    { label: '品牌', prop: 'brand' }, { label: '货品简称', prop: 'goods_abbreviation', width: '100' }, { label: '业务类型', prop: 'business_type', width: '100' },
    { label: '渠道名称', prop: 'channel_name', width: '100' }, { label: '渠道可用数', prop: 'channel_availale_number', width: '60' }, { label: '渠道占用数', prop: 'channel_occupy_number', width: '60' },
    { label: '流水', prop: 'pipeline', width: '100' }
  ],
  // 渠道库存分配列表表头2
  channelallocationHeader2: [
    { label: 'sku条码', prop: 'barCode', width: '120' }, { label: '货号', prop: 'materialCode', width: '100' }, { label: '尺码类别', prop: 'size_category', width: '80' }, { label: '尺码', prop: 'size', width: '60' },
    { label: '品牌', prop: 'brand' }, { label: '货品简称', prop: 'goods_abbreviation', width: '100' }, { label: '业务类型', prop: 'business_type', width: '100' },
    { label: '渠道名称', prop: 'channel_name', width: '100' }, { label: '渠道可用数', prop: 'channel_availale_number', width: '60' }, { label: '渠道占用数', prop: 'channel_occupy_number', width: '60' },
    { label: '流水', prop: 'pipeline', width: '100' },
    { label: '类别', prop: 'category' }, { label: '系列', prop: 'series', width: '' }, { label: '款型', prop: 'style', width: '' }, { label: '项目', prop: 'project', width: '' }, { label: '零售价', prop: 'retail_price', width: '' }, { label: '性别', prop: 'sex', width: '' },
    { label: '颜色', prop: 'color', width: '' }, { label: '上市时间', prop: 'market_time', width: '' }, { label: '年份', prop: 'year', width: '' }, { label: '季节', prop: 'season', width: '' }
  ],

  // SCM调拨申请单-虚仓发货查询列表表头
  scmDeliveryQuerytableHeader: [
    { label: '选择', prop: 'choose', width: '180' }, { label: '条码', prop: 'barCode', width: '180' }, { label: '货号', prop: 'materialCode', width: '180' }, { label: '尺码', prop: 'size', width: '180' },
    { label: '吊牌价', prop: 'materialCode', width: '180' },
    { label: '金额',
      prop: 'materialCode',
      width: '180'
    },
    { label: '类别', prop: 'materialCode', width: '180' }, { label: '项目', prop: 'materialCode', width: '180' }, { label: '系列', prop: 'materialCode', width: '180' }, { label: '货号', prop: 'materialCode', width: '180' },
    { label: '款型', prop: 'materialCode', width: '180' },
    {
      label: '品牌',
      prop: 'brand',
      width: '180'
    }, { label: '申请数量', prop: 'count', width: '180' }, { label: '可用库存数', prop: 'avaliableCount', width: '180' }, { label: '可用库存数', prop: 'avaliablestockCount', width: '180' }, { label: '实发数量', prop: 'trueCount', width: '180' }
  ],

  // 仓库管理列表表头
  whouseListHeader: [
    { label: '所属账套', prop: 'warehouseAccount', width: '80' }, { label: '仓库外码', prop: 'warehouseExternalCode', width: '120' }, { label: '仓库名称', prop: 'warehouseName', width: '240' }, { label: '仓库内码', prop: 'warehouseCode', width: '160' },
    { label: '仓库类型', prop: 'warehouseTypeValue', width: '100' },
    { label: '实体仓',
      prop: 'physicalWarehouse',
      width: '80'
    },
    { label: '仓库属性', prop: 'warehousePropertyValue', width: '120' }, { label: '仓库分类', prop: 'warehouseCategoryValue', width: '100' }, { label: '业务类型', prop: 'bizType', width: '80' }, { label: '同物理仓', prop: 'samePhysicalWarehouse', width: '140' },
    { label: '指定仓发', prop: 'designatedWarehouseSend', width: '120' },
    {
      label: '状态',
      prop: 'warehouseStatus',
      width: '80'
    }, { label: '仓负责人', prop: 'owner', width: '100' }, { label: '仓库地址', prop: 'addressValue', width: '340' }, { label: '电话', prop: 'phone', width: '120' }, { label: '送货地址', prop: 'deliveryInfo', width: '340' },
    { label: '业务地区', prop: 'bizAreaName', width: '180' }, { label: '最后更新时间', prop: 'lastUpdateTime', width: '180' }
    // , { label: '送货联系人', prop: 'songhuoren', width: '100' }, { label: '送货电话', prop: 'songhuophone', width: '120' }
  ],

  // 日志查询表头
  sysmLogHeader: [
    { label: '用户名', prop: 'accountName', width: '100' }, { label: '登录IP', prop: 'ipAddress', width: '100' }, { label: '操作类型', prop: 'optType', width: '100' }, { label: '操作前', prop: 'value' },
    { label: '操作后', prop: 'newValue' }, { label: '仓库名称', prop: 'keyName' }, { label: '结果', prop: 'result', width: '100' }, { label: '操作时间', prop: 'opsTime', width: '180' }
  ],

  // OMS订单详情表头
  // 发货单列表信息
  OMSSendDetailtableHeader: [
    { label: '发货单号', prop: 'billNo', width: '200' }, { label: '发货单状态', prop: 'billStatus', width: '100' }, { label: '其他单号', prop: 'extraNo', width: '150' }, { label: '发货仓名称', prop: 'warehouseName', width: '140' },
    { label: '发货单创建时间', prop: 'createTime' }, { label: '是否存在差异', prop: 'isDiff', width: '100' }
  ],
  // 售后单列表信息
  OMSSendDetailtableHeader1: [
    { label: '售后单号', prop: 'returnNo' }, { label: '售后单状态', prop: 'returnStatusName', width: '100' }, { label: '售后单创建时间', prop: 'createTime', width: '180' }
  ],
  // 商品详情信息
  OMSSendDetailtableHeader2: [
    { label: '品牌', prop: 'brandName' }, { label: '货品简称', prop: 'shortName' }, { label: '货号', prop: 'productCode' },
    { label: '尺码', prop: 'skuSize' }, { label: 'SKU条码', prop: 'barcode' }, { label: '颜色', prop: 'colorName' },
    { label: '商品结算单价', prop: 'balaPrice' }, { label: '单件优惠', prop: 'accountName' }, { label: '商品数量', prop: 'quantity' },
    { label: '占库渠道', prop: 'channelShowName', width: '200' }, { label: '预计渠道占库数', prop: 'expectedQty', width: '120' }, { label: '渠道占库数', prop: 'channelQty' }, // 增加渠道占库等4项
    { label: '实物占库数量', prop: 'occupyQty' }, { label: '发货数量', prop: 'dispatchQty' } // 修改结束
  ],

  // OMS售后单详情
  OMSproductDetailtableHeader: [
    { label: '品牌', prop: 'brandName' }, { label: '货号简称', prop: 'shortName' },
    { label: '货号', prop: 'productCode' }, { label: '尺码', prop: 'skuSize' }, { label: 'SKU条码', prop: 'barcode' }, { label: '颜色', prop: 'colorName' },
    { label: '售后数量', prop: 'quantity' }, { label: '收货数量', prop: 'actualQuantity' }
  ]
}
