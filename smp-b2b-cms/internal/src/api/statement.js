import request from '@/utils/request'

// 列表1
export function fetchList(query) {
  return request({
    url: '/statement/financialForm',
    method: 'post',
    params: query,
    data: query
  })
}
// 导出
export function exportExcel(query) {
  return request({
    url: '/statement/export',
    method: 'post',
    params: query,
    responseType: 'blob',
    data: query
  })
}

// 算出总共有多少数据
export function countExport(data) {
  return request({
    url: '/statement/count',
    method: 'post',
    data: data
  })
}
