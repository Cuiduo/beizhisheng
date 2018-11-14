import request from '@/utils/request'

export function getHospitalName(hospitalId) {
  return request({
    url: '/login/getHospitalName',
    method: 'get',
    params: { hospitalId }
  })
}

export function setHospitalName(data) {
  return request({
    url: '/api/manage/setHospitalName',
    method: 'post',
    params: { ...data }
  })
}

export function getLogo(hospitalId) {
  return request({
    url: '/api/manage/getLogo',
    method: 'get',
    params: { hospitalId }
  })
}

export function setLogo(data) {
  return request({
    url: '/api/manage/setLogo',
    method: 'post',
    data: { ...data }
  })
}

export function getBanner(hospitalId) {
  return request({
    url: '/api/manage/getBanner',
    method: 'get',
    params: { hospitalId }
  })
}

export function setBanner(data) {
  return request({
    url: '/api/manage/setBanner',
    method: 'post',
    data: { ...data }
  })
}

export function getInnerLogo(hospitalId) {
  return request({
    url: '/api/manage/getInnerLogo',
    method: 'get',
    params: { hospitalId }
  })
}

export function setInnerLogo(data) {
  return request({
    url: '/api/manage/setInnerLogo',
    method: 'post',
    data: { ...data }
  })
}
