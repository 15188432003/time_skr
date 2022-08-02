import request from '@/utils/request.js'


//获取用户订单
export function getUserOrder(data) {
    return request({
        url: '/order/getUserOrder',
        method: 'post',
        data
    })
}

//获取用户订单详情
export function getOrderDetail(data) {
    return request({
        url: '/order/getOrderDetail',
        method: 'post',
        data
    })
}

//添加订单
export function addOrder(data) {
    return request({
        url: '/order/addOrder',
        method: 'post',
        data
    })
}

//更新订单
export function updateOrder(data) {
    return request({
        url: '/order/updateOrder',
        method: 'post',
        data
    })
}

//删除订单
export function deleteOrder(data) {
    return request({
        url: '/order/deleteOrder',
        method: 'post',
        data
    })
}

//退货详情
export function getBackStockDetail(data){
    return request({
        url:'/order/getBackStockDetail',
        method: 'post',
        data
    })
}

//新增退货
export function addBackStock(data){
    return request({
        url:'/order/addBackStock',
        method: 'post',
        data
    })
}

//支付宝
export function payOrder(data) {
    return request({
        url: '/order/payOrder',
        method: 'post',
        data
    })
}

