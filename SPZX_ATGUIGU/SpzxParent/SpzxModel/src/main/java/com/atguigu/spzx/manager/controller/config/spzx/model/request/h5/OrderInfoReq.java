package com.atguigu.spzx.manager.controller.config.spzx.model.request.h5;

import com.atguigu.spzx.manager.controller.config.spzx.model.entity.order.OrderItem;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderInfoReq {

    //送货地址id
    private Long userAddressId;

    //运费
    private BigDecimal feightFee;

    //备注
    private String remark;

    //订单明细
    private List<OrderItem> orderItemList;
}