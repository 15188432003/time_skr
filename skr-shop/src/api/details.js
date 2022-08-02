import request from "../utils/request";

//详情页

//点击获取商品详情
export function getGoodId(data) {
    return request({
        url: "/store/getSpu",
        method: 'post',
        data
    })
}

//获取商品详情
export function getGoodType(data) {
    return request({
        url: "/store/getSku",
        method: 'post',
        data
    })
}

// 获取sku
export function getstoreSku(data) {
    return request({
        url: "/store/getstoreSku",
        method: 'post',
        data
    })
}

//获取评论
export function getRating(data) {
    return request({
        url: "/rating/getRating",
        method: 'post',
        data
    })
}
//添加评论
export function addRating(data) {
    return request({
        url: "/rating/addRating",
        method: 'post',
        data
    })
}
//删除评论
export function delRating(data) {
    return request({
        url: "/rating/delRating",
        method: 'post',
        data
    })
}