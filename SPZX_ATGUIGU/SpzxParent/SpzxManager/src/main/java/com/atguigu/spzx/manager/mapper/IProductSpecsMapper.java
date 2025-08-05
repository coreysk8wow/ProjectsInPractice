package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.product.ProductSpec;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IProductSpecsMapper {
    List<ProductSpec> selectAll();

    void updateById(ProductSpec productSpec);

    void deleteById(Long id);

    void insert(ProductSpec productSpec);
}
