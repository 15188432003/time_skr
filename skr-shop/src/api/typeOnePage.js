import request from '../utils/request'

// 搜索商品
export async function similarProduct(data){
    return await request({
      url:'/type/similarProduct',
      method:'post',
      data
    })
  }


  // 获取一级分类列表 
  export async function getproduct(data){
    return await request({
      url:'/type/getproduct',
      method:'post',
      data
    })
  }
  
  //获取二级列表
//参数name
  export async function getSpu(data){
    return await request({
      url:'/wares/getSpu',
      method:'post',
      data
    })
  }