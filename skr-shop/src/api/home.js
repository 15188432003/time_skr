import request from "@/utils/request.js";

//获取轮播图图片
export function getSwiper(data) {
  return request({
    url: "/type/getSwiper",
    method: 'post',
    data
  })
}

/**
 * 获取一级列表
 * url: /type/getproduct
 * 参数：parent_name
 */
export async function getTypeOneList(parent_name) {
  return await request({
    method: "post",
    url: "/type/getproduct",
    data: {
      parent_name
    }
  })
}
/**
 * 获取二级列表
 * url: /wares/getSpu
 * 参数：name
 */
export async function getTypeOTwoList(name, series) {
  return await request({
    method: "post",
    url: "/wares/getSpu",
    data: {
      name,
      series
    }
  })
}

export async function getSpu(spu_id) {
  return await request({
    method: "post",
    url: "/type/getSwiper",
    data: {
      spu_id
    }
  })
}