import request from '@/utils/request'

export function info(id) {
  return request({
    url: '/user/apiExtShopGoods/info',
    method: 'get',
    params: { id }
  })
}

export function getUserList() {
  return request({
    url: '/api/manage/getUserList',
    method: 'get'
  })
}

export function saveData(data) {
  return request({
    url: '/record/insertBaby',
    method: 'post',
    data: { ...data }
  })
}
