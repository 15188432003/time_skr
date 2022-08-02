import request from '@/utils/request'
// import http from '@/utils/http'
import https from '@/utils/ajax'

// export function login(data) {
//   return http({
//     url: '/login',
//     method: 'get',
//     data
//   })
// }




export function login(data){
  return https({
    url:'/store/login',
    method:'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token:'admin-token' }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
