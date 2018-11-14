import request from '@/utils/request'

export function testMonth(babyId, testId) {
  return request({
    url: '/common/testMonth',
    method: 'get',
    params: { babyId, testId }
  })
}
