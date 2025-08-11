package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.order.OrderStatistics;
import com.atguigu.spzx.model.request.order.OrderStatisticsReq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IOrderStatisticsMapper {
    void insert(OrderStatistics orderStatistics);

    List<OrderStatistics> selectList(OrderStatisticsReq orderStatisticsReq);
}
