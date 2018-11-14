import request from '@/utils/request'

export function fetchDataList(data) {
  return request({
    url: '/record/list',
    method: 'get',
    params: {
      ...data
    }
  })
}
