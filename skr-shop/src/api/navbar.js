import request from '../utils/request'

// 获取一级分类
// 参数： 无
export  function getTypeOne(data){
    return  request({
      url:'/type/getParentName',
      method:'post',
      data
    })
  }
// 获取二级分类
// 参数： parent_name
  export async function getTypeTwo(data){
    return await request({
      url:'/wares/getSecond ',
      method:'post',
      data
    })
  }

  // 获取图片
  // 参数：parent_name	是	string	一级分类
  //      name	否	string	二级分类
  //      start	否	int	按销量第几开始
  //      end	是	int	按销量第几结束
  //      sort_	否	int	值为price则为价格由高到低排序,否则默认小梁排序
  export  function getImg(data){
    return  request({
      url:'/type/getImg ',
      method:'post',
      data
    })
  }