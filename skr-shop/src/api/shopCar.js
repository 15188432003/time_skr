import request from "../utils/request";

//添加购物车
export function addShopCar(data) {
    return request({
        url: "/shopCar/addShopCar",
        method: 'post',
        data
    })
}

//获取用户购物车

export function getShopCar(data) {
    return request({
        url: "/shopCar/getShopCar",
        method: 'post',
        data
    })
}

//购物车更新数量
export function updateShopCar(data) {
    return request({
        url: "/shopCar/updateShopCar",
        method: 'post',
        data
    })
}


//删除购物车
export function deleteShopCar(data) {
    return request({
        url: "/shopCar/deleteShopCar",
        method: 'post',
        data
    })
}


