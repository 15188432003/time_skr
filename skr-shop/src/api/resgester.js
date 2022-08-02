import request from '@/utils/request.js'


export function getMessage(){
    return request({
        url:'/user/getMessage',
        method:'post'
    })
}

export function register(data){
    return request({
        url:'/user/register',
        method:'post',
        data
    })
}