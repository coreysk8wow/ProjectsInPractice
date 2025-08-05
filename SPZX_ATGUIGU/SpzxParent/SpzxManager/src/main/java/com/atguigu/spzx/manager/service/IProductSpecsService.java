package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.product.ProductSpec;

import java.util.List;

public interface IProductSpecsService {
    // 获取所有商品规格
    List<ProductSpec> getAllProductSpecs();

    void addProductSpec(ProductSpec productSpec);

    void updateProductSpec(ProductSpec productSpec);

    void deleteProductSpec(Long id);
}
