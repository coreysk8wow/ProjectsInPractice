package com.atguigu.spzx.manager.service.impl;

import cn.hutool.core.date.DateUtil;
import com.atguigu.spzx.manager.mapper.IOrderStatisticsMapper;
import com.atguigu.spzx.manager.service.IOrderInfoService;
import com.atguigu.spzx.model.entity.order.OrderStatistics;
import com.atguigu.spzx.model.request.order.OrderStatisticsReq;
import com.atguigu.spzx.model.response.order.OrderStatisticsResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderInfoService implements IOrderInfoService {
    private IOrderStatisticsMapper orderStatisticsMapper;

    @Autowired
    public OrderInfoService(IOrderStatisticsMapper orderStatisticsMapper) {
        this.orderStatisticsMapper = orderStatisticsMapper;
    }

    @Override
    public OrderStatisticsResp getOrderStatisticsData(OrderStatisticsReq orderStatisticsReq) {
        // 查询统计结果数据
        List<OrderStatistics> orderStatisticsList = orderStatisticsMapper.selectList(orderStatisticsReq) ;

        //日期列表
        List<String> dateList = orderStatisticsList.stream()
                .map(orderStatistics -> DateUtil.format(orderStatistics.getOrderDate(), "yyyy-MM-dd"))
                .collect(Collectors.toList());

        //统计金额列表
        List<BigDecimal> amountList = orderStatisticsList.stream()
                .map(OrderStatistics::getTotalAmount)
                .collect(Collectors.toList());

        // 创建OrderStatisticsVo对象封装响应结果数据
        OrderStatisticsResp orderStatisticsResp = new OrderStatisticsResp() ;
        orderStatisticsResp.setDateList(dateList);
        orderStatisticsResp.setAmountList(amountList);

        return orderStatisticsResp;
    }
}
