import request from '@/utils/request'

export function setRecordDetail(data) {
  return request({
    url: '/api/manage/setRecordDetail',
    method: 'post',
    data: { ...data }
  })
}

export function recordContent() {
  return request({
    url: '/common/recordContent',
    method: 'get'
  })
}
