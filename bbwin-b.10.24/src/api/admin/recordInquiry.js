import request from '@/utils/request'

export function fetchDataList(page, size, data) {
  return request({
    url: '/api/manage/AllBaby',
    method: 'post',
    params: {
      page,
      size,
      ...data
    }
  })
}
