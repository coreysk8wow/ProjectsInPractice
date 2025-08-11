package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.request.order.OrderStatisticsReq;
import com.atguigu.spzx.model.response.order.OrderStatisticsResp;

public interface IOrderInfoService {
    OrderStatisticsResp getOrderStatisticsData(OrderStatisticsReq orderStatisticsReq);
}
