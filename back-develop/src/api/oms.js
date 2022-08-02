import https from '@/utils/ajax'

export function getOrder(data){
    return https({
      url:'/order/getOrder',
      method:'post',
      data
    })
  }

  export function getOrderDetail(data){
    return https({
      url:'/order/getOrderDetail',
      method:'post',
      data
    })
  }

  export function updateOrder(data){
    return https({
      url:'/order/updateOrder',
      method:'post',
      data
    })
  }

  export function deleteOrder(data){
    return https({
      url:'/order/deleteOrder',
      method:'post',
      data
    })
  }

  export function getBackStock(data){
    return https({
      url:'/order/getBackStock',
      method:'post',
      data
    })
  }

  export function getBackStockDetail(data){
    return https({
      url:'/order/getBackStockDetail',
      method:'post',
      data
    })
  }
  export function updateBackStock(data){
    return https({
      url:'/order/updateBackStock',
      method:'post',
      data
    })
  }