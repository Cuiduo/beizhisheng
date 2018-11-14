import request from '@/utils/request'

export function fetchDataList(testId) {
  return request({
    url: '/check/getTestQuestions',
    method: 'get',
    params: { testId }
  })
}

export function saveData(data) {
  return request({
    url: '/check/submit132',
    method: 'post',
    data: { ...data }
  })
}

export function recordDetail(babyId) {
  return request({
    url: '/common/recordDetail',
    method: 'get',
    params: { babyId }
  })
}
export function checkType() {
  return request({
    url: '/common/checkType',
    method: 'get'
  })
}
