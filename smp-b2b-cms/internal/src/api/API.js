import { get, post, patch } from '@/utils/request'

export default {
  // goods相关API
  fetchSelectOptions: () => get('/pdc/api/v1/dic/query'), // 方法注释
  fetchList: (params) => get('/pdc/api/v1/product/query', params), // 方法注释  使用中
  fetchGoods: (params) => get('/pdc/api/v1/product/query', params), // 方法注释

  // 新增权限页面API
  newRole: (params) => post('/api/v1/role', params), // 新增角色
  setROle1: (params) => patch('/api/api/v1/user_role', params), // 新增角色

  // role相关API
  roleFetchList: (params) => get('/api/v1/role', params), // 获取列表1 信息  使用中
  fetchAllRoleList: () => get(`/api/api/v1/role?page=0`), // 获取内部所有角色, 已使用
  deleteRole: (params, data) => patch('/api/delete/role', params, data), // 删除角色
  getFristMenu: () => get('/api/root/list'), // 获取一级菜单, 使用中
  createRole: (params) => post('/api/createRole', params), // 创建角色
  roleNameExists: (params) => get('/api/checkRoleName', params), // 角色是否存在
  fetchAllResource: () => get('/api/resource'), // 所有资源
  updateRolePermission: (params) => patch('/api/binding/permission', params), // 角色权限修改
  customRoleList: (params) => get('/api/custom/master/permission', params), // 外部客户角色列表

  // statement相关API
  statementFetchList: (params, data) => post('/statement/financialForm', params, data), // 列表1
  statementExportExcel: (params, data) => post('/statement/export', { header: { responseType: 'blob' }}, data), // 导出
  countExport: (data) => post('/statement/count', data), // 算出总共有多少数据

  // trade相关API
  tradeFetchList: (params, data) => post(`/order/order/internal/orderList?${params}`, data), // 列表1
  fetchTrade: (params) => get('/order/order/internal/orderDetail', params), // 订单详情1
  orderConfirm: (params) => get('/order/order/confirmedB2BOrder', params), // 订单确认1
  tradePayment: (params) => post('/order/attachment/upload/paymentVoucher', params), // 付款凭证
  tradeDelivery: (params) => post('/order/attachment/upload/verifyPaymentVoucher', params), // 到款凭证
  updateTrade: (params) => get('/order/order/buildShippingList', params), // 添加出货单1
  verifyShippingList: (params) => get('/order/order/verifyShippingList', params), // 确认出货单1
  shipment: (params) => post('/order/attachment/upload/packingList', params), // 上传装箱单1
  sending: (params) => post('/order/attachment/upload/outboundOrder', params), // 上传出库单
  reUploadOrder: (params) => post('/order/attachment/upload/reUploadOrder', params), // 再次上传订单1
  modifyB2BShipmentType: (params) => get('/order/order/modifyB2BShipmentType', params), // 修改提货方式1
  createTrade: (params) => post('/order/order/createB2BOrder', params), // 创建订单1

  // transition相关API
  transitionFetchList: (params) => get('/transaction/list', params), // 方法注释

  // user相关API
  userFetchList: (params) => post(`/api/internal/user/list?page=${params.page}&limit=${params.limit}`, params), // 外部
  userFetchExternalList: (params) => post(`/api/internal/custom/list?page=${params.page}&limit=${params.limit}`, params), // 外部
  createUser: (params) => post('/user/create', params), // 方法注释
  updateUser: (params) => post('/user/update', params), // 方法注释
  deleteUser: (params) => post('/user/delete', params), // 删除用户
  userChangePassword: (params) => patch('/api/user/password', params), // 修改密码

  // 订单列表相关API
  getDispatchApprovalList: (params) => get(`/order/api/v1/toBeConfirmedDispatch?dispatchNo=${params}`), // 获取发货单列表
  getCustormer: (params) => get(`/order/api/v1/customer?customerName=${params}`),
  orderDetail: (params) => get(`/order/api/v1/${params}/orderInformation`), // 获取详情   1
  dispathInfo: (params) => get('/order/api/v1/orderDispatchInfo', params), // 查看发货详情
  submitOrder: (params) => post(`/order/api/v1/orderConfirmation`, params), // 提交订单
  serviceApprove: (params) => get('/order/api/v1/serviceApprove', params), // 确认订单
  serviceRefuse: (params) => post('/order/api/v1/serviceRefuse', params), // 拒绝订单
  getDispatchSelectInfo: () => get('/order/api/v1/getDispatchSelectInfo'), // 获取发货单相关select
  createOrder: (params) => post(`/order/api/v1/createOrder`, params), // 导入订单列表
  customerCode: (params) => get(`/order/api/v1/${params}/customerCode`), // 检查用户代码是否存在
  productDiscount: (params, data) => post(`/order/api/v1/${params}/discount`, data), // 导入折扣
  exportResult: (params) => get(`/order/api/v1/${params}/occupyInventory`), // 导出结果
  querenfukuan: (params) => patch('/order/api/v1/confirmReceipt', params), // 确认付款
  createDispatch: (params) => post('/order/api/v1/createDispatch', params), // 提交发货单
  serviceQuxiao: (params) => post('/order/api/vi/serviceQuxiao', params), // 取消订单
  dispatchCancel: (params) => post('/order/api/v1/dispatchCancel', params), // 取消发货单
  dispatchApprove: (params) => post('/order/api/v1/dispatchApprove', params), // 同意发货单
  dispatchRefuse: (params) => post('/order/api/v1/dispatchRefuse', params), // 拒绝发货单
  submitApproval: (params) => post('/order/api/v1/submitApproval', params), // 提交审核校验
  submitApprovalDetail: (params) => post('/order/api/v1/confirmSubmissionApproval', params), // 提交审核
  getorderOccupyStatus: (params) => get(`/order/api/v1/cumulativeState?orderNo=${params}`), // 查看订单占库结果
  cancelOrder: (params) => post(`/order/api/v1/${params}/orderCancel`), // 取消订单
  uploadPay: (params, data) => post(`/order/api/v1/${params}/upload`, data), // 上传支付凭证
  orderStatus: (params) => get(`/order/api/v1/orderStatus?orderNo=${params}`), // 获取订单列表状态
  getPic: (params) => get('/order/api/v1/resource/url', params), // 请求图片资源
  getApprovaView: (params) => get(`/order/api/v1/approval?orderNo=${params}`), // 查看审批材料
  getApproCailiao: (params, No) => get(`/order/api/v1/preview_resource?orderNo=${No}&resourceType=${params}`),
  getSearchTypeObj: () => get(`/order/api/v1/_dict`), // 获取退货类型状态接口
  // B2B退货单相关API
  createReturnOrder: (params) => post(`/order/api/v1/import/ret_order`, params), // 导入退货单
  getReturnDetail: (params) => get(`/order/api/v1/ret_order_detail/_head?retOrderNo=${params}`), // 获取退货单详情信息
  submitReturnOrder: (params) => post(`/order//api/v1/submit/_ret_order`, params), // 提交退货单
  confirmReturnOrder: (params) => post(`/order/api/v1/confirm/_ret_order`, params), // 确认/拒绝退货单
  refuseRetNo: (params) => post(`/order/api/v1/${params}/_cancel`, params), // 取消退货单
  retSubmitApproval: (params) => post(`/order/api/v1/approve/_ret_order`, params), // 退货单提交审批

  // 发/收货单页相关API
  getDelivery: (params) => get(`/bff/api/v1/dispatch?billNo=${encodeURI(params)}`), // 获取发货单基本信息
  getReceive: (params) => get(`/bff/api/v1/receive?billNo=${encodeURI(params)}`), // 获取收货单基本信息
  getMessage: (params) => post('/bff/api/v1/dict/type/_list', params), // 获取数据字典
  getCustorm: () => get('/bff/api/v1/vend-cust'), // 获取客商信息
  getCustorm1: () => get('/bff/api/v1/vend-cust?vendCusts=custom,shop'), // 获取客商信息
  getwarehouse: (params) => get(`/bff/api/v1/warehouses?externalWarehouseInfo=${params}`), // 获取仓库信息
  getwarehouseType: () => get(`/bff/api/v1/dict/type?typeCode=physical_inventory_query_warehouse_type`), // 获取仓库信息
  getchannelType: (params, data) => get(`/bff/api/v1/channels?channelInfo=${params}&bizTypes=${data}`), // 获取渠道信息
  getwarehouseType1: () => get(`/bff/api/v1/dict/type?typeCode=bill_query_warehouse_type`), // 获取ODS仓库信息
  exportExcel12: (params) => post('/bff/api/v1/dispatch/_export', params), // daochu
  getwarehouseList: (params, data) => get(`/bff/api/v1/warehouses?externalWarehouseInfo=${params}&warehouseTypes=${data}`),
  getProductList: (params, data) => post(`/bff/api/v1/dispatch/${params}/details/_page`, data),

  // 订单修改页相关API
  delProduct: (params) => patch('/order/api/v1/deleteOrRecover', params), // 删除或恢复单条商品
  trueUpdata: (params) => patch('/order/api/v1/confirm', params), // 确认修改
  delMore: (params) => patch('/order/api/v1/delete', params), // 批量删除

  // CIS库存查询相关API
  physicalInventory: (params) => post(`/bff/api/v1/physical_inventory/_list`, params), // 实物库存分页查询
  getWarehouses: (params) => get(`/bff/api/v1/warehouses?externalWarehouseInfo=1&warehouseTypes=${params}`, params), // 仓库接口
  getDictType: (type) => get(`/bff/api/v1/dict/type?typeCode=${type}`, type), // 仓库类型
  getChannel: (params) => get(`/bff/api/v1/channel/warehouse/mapping?warehouseCode=${params}`), // 映射渠道代码 传仓库内码同步修改根据仓库查渠道
  getTypeCode11: () => get('/bff/api/v1/dict/type?typeCode=inventory_log_type'), // 获取流水类型
  getCaozuo: (params) => post('/bff/api/v1/channel_inventory/_allocation', params),
  getQuDaoType: () => get('/bff/api/v1/dict/type?typeCode=channel_biz_type'),
  // getBrandName: () => get('/bff/api/v1/brands'), // 获取品牌名

  // 仓库管理&系统日志相关API
  getWhouseSearch: () => get('/bff/bd/api/v1/dic/query?types=bizType,samePhysicalWarehouse,designatedWarehouseSend,warehouseStatus,physicalWarehouse'), // 获取数据字典信息
  updataWhouseMsg: (params) => post('/bff/bd/api/v1/warehouse/updateWarehouse', params), // 修改仓库管理信息
  getLogSearch: () => get('/bff/bd/api/v1/dic/query?types=optType'), // 日志查询条件
  getlogHouse: (params) => post('/bff/bd/api/v1/warehouse/getWarehousePagination', params), // 获取名称列表

  // OMS相关API
  getOmsSearchType: () => get(`/bff/oos/api/query/v1/dictionary/query?types=bizType,orderStatus,orderType,orderSource,retrieverReason`), // 获取Type类型, 新增订单来源类型查询
  getOmsDetailMsg: (id, No) => get(id ? `/bff/oos/api/query/v1/order/get?uid=${id}&types=base,delivery,invoice,payment,returnOrders,dispatchBill&orderNo=${No}` : `/bff/oos/api/query/v1/order/get?orderNo=${No}&types=base,delivery,invoice,payment,returnOrders,dispatchBill`), // 获取详情信息
  // getOmsQueryList: (params) => post(`/oos/oos/api/query/v1/order/items/list`, params), // 获取交易单售后详情列表
  getOmsSouhouSearchType: () => get(`/bff/oos/api/query/v1/dictionary/query?types=bizType,returnOrderType,returnOrderStatus`), // 获取售后列表参数
  getOmsSouhouDetailMsg: (id, No) => get(id ? `/bff/oos/api/query/v1/ro/get?uid=${id}&returnNo=${No}&types=base,warehouse,delivery` : `/bff/oos/api/query/v1/ro/get?returnNo=${No}&types=base,warehouse,delivery`) // 获取售后详情信息
  // getOmsReList: (params) => post(`/oos/oos/api/query/v1/ro/items/list`, params) // 获取售后单售后详情列表
}
