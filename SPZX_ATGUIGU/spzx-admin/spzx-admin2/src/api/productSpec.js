import request from '@/utils/request'

const base_url = '/admin/product/productSpecs'

// 分页列表
export const GetProductSpecPageList = (page, limit) => {
  return request({
    url: `${base_url}/getAll?pageNum=${page}&pageSize=${limit}`,
    method: 'get',
  })
}

// 保存信息
export const SaveProductSpec = productSpec => {
  return request({
    url: `${base_url}/add`,
    method: 'post',
    data: productSpec,
  })
}

// 修改信息
export const UpdateProductSpecById = productSpec => {
  return request({
    url: `${base_url}/updateById`,
    method: 'put',
    data: productSpec,
  })
}

// 根据id删除数据
export const DeleteProductSpecById = id => {
  return request({
    url: `${base_url}/deleteById/${id}`,
    method: 'delete',
  })
}
