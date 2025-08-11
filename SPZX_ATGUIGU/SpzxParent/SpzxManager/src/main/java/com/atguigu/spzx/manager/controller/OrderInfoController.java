package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.IOrderInfoService;
import com.atguigu.spzx.model.request.order.OrderStatisticsReq;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.model.response.order.OrderStatisticsResp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "订单信息管理接口")
@RestController
@RequestMapping(value="/admin/order/orderInfo")
public class OrderInfoController {
    @Autowired
    private IOrderInfoService orderInfoService ;

    @Operation(summary = "获取订单统计数据")
    @GetMapping("/getOrderStatisticsData")
    public Result<OrderStatisticsResp> getOrderStatisticsData(@ModelAttribute OrderStatisticsReq orderStatisticsReq) {
        OrderStatisticsResp orderStatisticsResp = orderInfoService.getOrderStatisticsData(orderStatisticsReq) ;
        return Result.build(orderStatisticsResp , ResultCodeEnum.SUCCESS) ;
    }
}
