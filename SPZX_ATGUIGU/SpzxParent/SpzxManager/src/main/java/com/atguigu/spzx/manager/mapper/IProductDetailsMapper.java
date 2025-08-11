package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.product.ProductDetails;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IProductDetailsMapper {
    void insert(ProductDetails productDetails);

    ProductDetails selectByProductId(Long productId);

    void updateById(ProductDetails productDetails);

    // 逻辑删除 by product Id
    void deleteByProductId(Long id);
}
