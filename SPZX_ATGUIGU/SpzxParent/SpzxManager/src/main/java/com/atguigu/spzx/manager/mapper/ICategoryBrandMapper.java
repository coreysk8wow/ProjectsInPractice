package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.product.CategoryBrand;
import com.atguigu.spzx.model.request.product.CategoryBrandReq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ICategoryBrandMapper {
    List<CategoryBrand> find(CategoryBrandReq CategoryBrandReq);

    void insert(CategoryBrand categoryBrand);

    void updateById(CategoryBrand categoryBrand);

    // 逻辑删除
    void deleteById(Long id);
}
