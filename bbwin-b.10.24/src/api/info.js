import request from '@/utils/request'

export function fetchDataList(babyId) {
  return request({
    url: '/record/checkResult',
    method: 'get',
    params: { babyId }
  })
}

export function recordDetail(babyId) {
  return request({
    url: '/common/recordDetail',
    method: 'get',
    params: { babyId }
  })
}
