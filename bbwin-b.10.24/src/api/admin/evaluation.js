import request from '@/utils/request'

export function fetchDataList(page, size, data) {
  return request({
    url: '/api/manage/list0_6',
    method: 'get',
    params: {
      ...data
    }
  })
}
