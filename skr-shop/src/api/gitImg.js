import request from '@/utils/request.js'


 //  获取图片
export function getImg(data){
    return request({
        url:'/type/getImg',
        method:'post',
        data
    })
}