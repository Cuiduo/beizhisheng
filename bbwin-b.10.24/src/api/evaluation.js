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
    url: '/check/submit0_6',
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
