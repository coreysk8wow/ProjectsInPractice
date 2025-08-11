import request from '@/utils/request'

const base_url = '/admin/order/orderInfo'

// 订单统计
export const GetOrderStatisticsData = searchObj => {
  return request({
    url: `${base_url}/getOrderStatisticsData`,
    method: 'get',
    params: searchObj,
  })
}
