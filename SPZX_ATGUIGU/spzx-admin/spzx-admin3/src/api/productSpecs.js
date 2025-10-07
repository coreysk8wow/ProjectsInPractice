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
export const AddProductSpec = productSpec => {
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

// 查询所有的产品规格数据
export const FindAllProductSpecs = () => {
    return request({
        url: `${base_url}/findAll`,
        method: 'get',
    })
}
