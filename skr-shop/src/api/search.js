import request from '@/utils/request.js'


// 搜索商品
export function selectProduct(data){
    return request({
        url:'/type/selectProduct',
        method:'post',
        data
    })
}