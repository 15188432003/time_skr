
import instance from '@/utils/ajax'

export function getBrands (data){
    return instance({
        url:"/wares/getBrands",
        method:'post',
        data
    })
}
export function deleteBrand (data){
    return instance({
        url:"/wares/deleteBrand",
        method:'post',
        data
    })
}



//获取商品列表
export function getShopList(data) {
    return instance({
        url: "/store/getShopList",
        method: 'post',
        data
    })
}
//查询商品
export function searchShop(data) {
    return instance({
        url: "/store/search",
        method: 'post',
        data
    })
}

//删除商品
export function deletShop(data) {
    return instance({
        url: "/store/deleteSpu",
        method: 'post',
        data
    })
}
//查看库存
export function getSku(data) {
    return instance({
        url: "/store/getSku",
        method: 'post',
        data
    })
}

//添加商品还没用到
// export function addSpu(data) {
//     return instance({
//         url: "/store/addSpu",
//         method: 'post',
//         data
//     })
// }

//获取品牌名
export function getBrandName(data) {
    return instance({
        url: "/store/getBrandName",
        method: 'post',
        data
    })
}