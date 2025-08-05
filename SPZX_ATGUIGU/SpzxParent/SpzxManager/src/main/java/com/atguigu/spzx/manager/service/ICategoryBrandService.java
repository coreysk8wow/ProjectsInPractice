package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.product.CategoryBrand;
import com.atguigu.spzx.model.request.product.CategoryBrandReq;

import java.util.List;

public interface ICategoryBrandService {
    List<CategoryBrand> find(CategoryBrandReq CategoryBrandReq);

    void add(CategoryBrand categoryBrand);

    void updateById(CategoryBrand categoryBrand);

    // 逻辑删除
    void deleteById(Long id);
}
