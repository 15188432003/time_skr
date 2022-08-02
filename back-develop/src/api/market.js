import https from '@/utils/ajax'

//获取优惠券
export function getVoucher(data) {
    return https({
        url: '/voucher/getVoucher',
        method: 'post',
        data
    })
}


export function addVoucher(data) {
    return https({
        url: '/voucher/addVoucher',
        method: 'post',
        data
    })
}

export function editVoucheer(data) {
    return https({
        url: '/voucher/editVoucheer',
        method: 'post',
        data
    })
}

export function deleteVoucher(data) {
    return https({
        url: '/voucher/deleteVoucher',
        method: 'post',
        data
    })
}

export function selectVoucher(data) {
    return https({
        url: '/voucher/selectVoucher',
        method: 'post',
        data
    })
}

export function addspike(data) {
    return https({
        url: '/spike/addspike',
        method: 'post',
        data
    })
}

export function getspike(data) {
    return https({
        url: '/spike/getspike',
        method: 'post',
        data
    })
}


export function updatespike(data) {
    return https({
        url: '/spike/updatespike',
        method: 'post',
        data
    })
}



export function delspike(data) {
    return https({
        url: '/spike/delspike',
        method: 'post',
        data
    })
}


export function slectspike(data) {
    return https({
        url: '/spike/slectspike',
        method: 'post',
        data
    })
}