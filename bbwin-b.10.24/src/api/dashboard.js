import request from '@/utils/request'

export function getLastCheck() {
  return request({
    url: '/index/getLastCheck',
    method: 'get'
  })
}
export function getRecordNum() {
  return request({
    url: '/index/getRecordNum',
    method: 'get'
  })
}
