package com.atguigu.spzx.manager.controller.config.spzx.model.response.order;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Schema(description = "统计结果实体类")
public class OrderStatisticsResp {

    @Schema(description = "日期数据集合")
    private List<String> dateList ;

    @Schema(description = "总金额数据集合")
    private List<BigDecimal> amountList ;
}
