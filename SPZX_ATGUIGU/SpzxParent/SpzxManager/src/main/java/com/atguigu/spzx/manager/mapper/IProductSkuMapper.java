package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.product.ProductSku;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IProductSkuMapper {
    void insert(ProductSku productSku);

    List<ProductSku> selectByProductId(Long productId);

    void updateById(ProductSku productSku);

    // 逻辑删除 by product Id
    void deleteByProductId(Long id);
}
