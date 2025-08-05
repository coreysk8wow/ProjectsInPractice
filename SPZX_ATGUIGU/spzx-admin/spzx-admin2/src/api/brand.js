import request from '@/utils/request'

const base_url = '/admin/product/brand'

// 分页列表
export const GetBrandPageList = (page, limit) => {
  return request({
    url: `${base_url}/findByPage?pageNum=${page}&pageSize=${limit}`,
    method: 'get',
  })
}

// 查询所有的品牌数据
export const FindAllBrand = () => {
  return request({
    url: `${base_url}/findAll`,
    method: 'get',
  })
}

// 保存品牌
export const AddBrand = brand => {
  return request({
    url: `${base_url}/add`,
    method: 'post',
    data: brand,
  })
}

// 修改信息
export const UpdateBrandById = brand => {
  return request({
    url: `${base_url}/update`,
    method: 'put',
    data: brand,
  })
}

// 根据id删除品牌
export const DeleteBrandById = id => {
  return request({
    url: `${base_url}/deleteById/${id}`,
    method: 'delete',
  })
}
