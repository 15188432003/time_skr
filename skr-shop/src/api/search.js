import request from '@/utils/request.js'


// ๆ็ดขๅๅ
export function selectProduct(data){
    return request({
        url:'/type/selectProduct',
        method:'post',
        data
    })
}