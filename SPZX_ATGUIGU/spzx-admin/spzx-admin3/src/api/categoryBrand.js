import request from '@/utils/request'

const base_url = '/admin/product/categoryBrand'

// 分页列表
export const GetCategoryBrandPageList = (page, limit, searchObj) => {
  return request({
    url: `${base_url}/findByPage?pageNum=${page}&pageSize=${limit}`,
    method: 'get',
    params: searchObj,
  })
}

// 保存信息
export const AddCategoryBrand = categoryBrand => {
  return request({
    url: `${base_url}/add`,
    method: 'post',
    data: categoryBrand,
  })
}

// 修改信息
export const UpdateCategoryBrandById = categoryBrand => {
  return request({
    url: `${base_url}/updateById`,
    method: 'put',
    data: categoryBrand,
  })
}

// 根据id逻辑删除数据
export const DeleteCategoryBrandById = id => {
  return request({
    url: `${base_url}/deleteById/${id}`,
    method: 'delete',
  })
}

// 根据分类的id获取品牌数据
export const FindBrandByCategoryId = categoryId => {
  return request({
    url: `${base_url}/findBrandByCategoryId/${categoryId}`,
    method: 'get',
  })
}
