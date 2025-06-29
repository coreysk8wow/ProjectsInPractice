package com.atguigu.spzx.manager.controller.config.spzx.model.request.product;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "搜索条件实体类")
public class CategoryBrandReq {

	@Schema(description = "品牌id")
	private Long brandId;

	@Schema(description = "分类id")
	private Long categoryId;

}