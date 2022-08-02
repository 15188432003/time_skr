import request from '@/utils/request.js'

export function getVoucher(data){
    return request({
        url:'/controller/getVoucher',
        method:'post',
        data
    })
}