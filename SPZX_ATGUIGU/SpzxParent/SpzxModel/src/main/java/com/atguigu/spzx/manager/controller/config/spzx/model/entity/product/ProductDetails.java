package com.atguigu.spzx.manager.controller.config.spzx.model.entity.product;

import com.atguigu.spzx.manager.controller.config.spzx.model.entity.base.BaseEntity;
import lombok.Data;

@Data
public class ProductDetails extends BaseEntity {

	private Long productId;
	private String imageUrls;

}