import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function getInfo() {
  return request({
    url: '/common/currentInfo',
    method: 'get'
  })
}

export function checkToken(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'get'
  })
}

export function getNews() {
  return request({
    url: '/login/getNews',
    method: 'get'
  })
}

export function changePwd(oldPwd, newPwd) {
  return request({
    url: '/index/changePwd',
    method: 'post',
    params: { oldPwd, newPwd }
  })
}

export function getLogo(hospitalId) {
  return request({
    url: '/login/getLogo',
    method: 'get',
    params: { hospitalId }
  })
}

export function getBanner(hospitalId) {
  return request({
    url: '/login/getBanner',
    method: 'get',
    params: { hospitalId }
  })
}

export function getInnerLogo(hospitalId) {
  return request({
    url: '/api/manage/getInnerLogo',
    method: 'get',
    params: { hospitalId }
  })
}

export function getHospitalName(hospitalId) {
  return request({
    url: '/login/getHospitalName',
    method: 'get',
    params: { hospitalId }
  })
}
