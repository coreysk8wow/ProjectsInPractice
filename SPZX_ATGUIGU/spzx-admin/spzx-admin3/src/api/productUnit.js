import request from '@/utils/request'

const base_url = '/admin/product/productUnit'

// 获取全部信息
export const FindAllProductUnit = () => {
  return request({
    url: `${base_url}/findAll`,
    method: 'get',
  })
}
