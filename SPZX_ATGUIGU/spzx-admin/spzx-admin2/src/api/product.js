import request from '@/utils/request'

const base_url = '/admin/product/product'

// 分页列表
export const GetProductPageList = (page, limit, queryDto) => {
  return request({
    url: `${base_url}/getAll?pageNum=${page}&pageSize=${limit}`,
    method: 'get',
    params: queryDto,
  })
}

// 保存信息
export const AddProduct = product => {
  return request({
    url: `${base_url}/add`,
    method: 'post',
    data: product,
  })
}

// 修改信息
export const UpdateProductById = product => {
  return request({
    url: `${base_url}/updateById`,
    method: 'put',
    data: product,
  })
}

// 根据id获取信息
export const GetProductById = id => {
  return request({
    url: `${base_url}/getById/${id}`,
    method: 'get',
  })
}

// 根据id删除商品
export const DeleteProductById = id => {
  return request({
    url: `${base_url}/deleteById/${id}`,
    method: 'delete',
  })
}

//审核
export const UpdateProductAuditStatus = (id, auditStatus) => {
  return request({
    url: `${base_url}/updateAuditStatus/${id}/${auditStatus}`,
    method: 'put',
  })
}

//上下架
export const UpdateProductStatus = (id, status) => {
  return request({
    url: `${base_url}/updateStatus/${id}/${status}`,
    method: 'put',
  })
}
