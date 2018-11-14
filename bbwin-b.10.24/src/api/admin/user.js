import request from '@/utils/request'

export function fetchDataList() {
  return request({
    url: '/api/manage/getUserList',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/api/manage/addUser',
    method: 'post',
    data: { ...data }
  })
}

export function resetPwd(userId) {
  return request({
    url: '/api/manage/resetPwd',
    method: 'post',
    params: { userId }
  })
}

export function deleteUser(userId) {
  return request({
    url: '/api/manage/deleteUser',
    method: 'post',
    params: { userId }
  })
}
export function changeAuthority(userId) {
  return request({
    url: '/api/manage/changeAuthority',
    method: 'post',
    params: { userId }
  })
}
