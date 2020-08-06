import request from '@/utils/request'

// 列表1
export function fetchList(query) {
  // return request({
  //   url: '/order/trade/list',
  //   method: 'get',
  //   params: query,
  //   data: query
  // })
  return request({
    url: '/order/order/internal/orderList',
    method: 'post',
    params: query,
    data: query
  })
}
// 订单详情1
export function fetchTrade(orderNo) {
  // 根据orderNo
  return request({
    url: '/order/order/internal/orderDetail',
    method: 'get',
    params: { orderNo }
  })
  // return request({
  //   url: '/order/trade/detail',
  //   method: 'get',
  //   params: { id }
  // })
}
// 订单确认1
export function orderConfirm(query) {
  return request({
    url: '/order/order/confirmedB2BOrder',
    method: 'get',
    params: query
  })
}
// 付款凭证
export function payment(data) {
  return request({
    url: '/order/attachment/upload/paymentVoucher',
    method: 'post',
    data
  })
}
// 到款凭证
export function delivery(data) {
  return request({
    url: '/order/attachment/upload/verifyPaymentVoucher',
    method: 'post',
    data
  })
}

// 添加出货单1
export function updateTrade(query) {
  return request({
    url: '/order/order/buildShippingList',
    method: 'get',
    params: query
  })
}

// 确认出货单1
export function verifyShippingList(query) {
  return request({
    url: '/order/order/verifyShippingList',
    method: 'get',
    params: query
  })
}
// 上传装箱单1
export function shipment(data) {
  return request({
    url: '/order/attachment/upload/packingList',
    method: 'post',
    data
  })
}

// 上传出库单
export function sending(data) {
  return request({
    url: '/order/attachment/upload/outboundOrder',
    method: 'post',
    data
  })
}
// 再次上传订单1
export function reUploadOrder(data) {
  return request({
    url: '/order/attachment/upload/reUploadOrder',
    method: 'post',
    data
  })
}
// 修改提货方式1
export function modifyB2BShipmentType(query) {
  return request({
    url: '/order/order/modifyB2BShipmentType',
    method: 'get',
    params: query
  })
}

//  创建订单1
export function createTrade(data) {
  return request({
    url: '/order/order/createB2BOrder',
    method: 'post',
    params: data,
    data
  })
}

