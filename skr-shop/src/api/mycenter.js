import request from '@/utils/request'

export function changePwd(data){
    return request({
        url:'/user/changePassword',
        method:'post',
        data
    })
}