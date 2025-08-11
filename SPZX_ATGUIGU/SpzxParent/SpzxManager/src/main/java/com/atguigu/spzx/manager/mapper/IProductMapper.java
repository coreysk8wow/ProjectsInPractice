package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.product.Product;
import com.atguigu.spzx.model.request.product.ProductReq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IProductMapper {
    List<Product> selectAll(ProductReq productReq);

    void insert(Product product);

    void updateById(Product product);

    // 逻辑删除 by id
    void deleteById(Long id);
}
