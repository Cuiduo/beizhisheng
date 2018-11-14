import request from '@/utils/request'

export function showResult0_6(id) {
  return request({
    url: '/check/showResult0_6',
    method: 'get',
    params: { id }
  })
}

export function showResult3_6(id) {
  return request({
    url: '/check/showResult3_6',
    method: 'get',
    params: { id }
  })
}
export function showResult0_2(id) {
  return request({
    url: '/check/showResult0_2',
    method: 'get',
    params: { id }
  })
}
export function showResult50(id) {
  return request({
    url: '/check/showResult50',
    method: 'get',
    params: { id }
  })
}
export function showResultCognize(id) {
  return request({
    url: '/check/showResultCognize',
    method: 'get',
    params: { id }
  })
}

export function showResult132(id) {
  return request({
    url: '/check/showResult132',
    method: 'get',
    params: { id }
  })
}

export function showResultDdst(id) {
  return request({
    url: '/check/showResultDdst',
    method: 'get',
    params: { id }
  })
}
export function recordDetail(babyId) {
  return request({
    url: '/common/recordDetail',
    method: 'get',
    params: { babyId }
  })
}

export function saveTestRecord(data) {
  return request({
    url: '/check/saveTestRecord',
    method: 'post',
    data: { ...data }
  })
}

export function getTestRecord(testId, resultId) {
  return request({
    url: '/check/getTestRecord',
    method: 'get',
    params: { testId, resultId }
  })
}

