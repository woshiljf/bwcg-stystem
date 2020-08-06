import request from '@/utils/request'
// 货品列表,获取所有下拉框可选数据的api接口
export function fetchSelectOptions() {
  return request({
    url: '/pdc/api/v1/dic/query',
    method: 'get'
  })
}

// 货品列表，点击查询，根据搜索条件获取数据，翻页，请求接口
export function fetchList(data) {
  return request({
    url: '/pdc/api/v2/product/query',
    method: 'get',
    params: data
  })
}

// 货品详情,点击查看按钮，服务端请求的数据
export function fetchGoods(data) {
  // 根据barCode
  return request({
    // url: '/pdc/api/v1/product/query',
    url: '/pdc/api/v2/product/query',
    method: 'get',
    params: data
  })
}
// 根据货号查询sku数据列表
export function fetchDetail(data) {
  // 根据productCode
  return request({
    // url: '/pdc/api/v1/product/query',
    url: '/pdc/api/v2/product/detail',
    method: 'get',
    params: data
  })
}
