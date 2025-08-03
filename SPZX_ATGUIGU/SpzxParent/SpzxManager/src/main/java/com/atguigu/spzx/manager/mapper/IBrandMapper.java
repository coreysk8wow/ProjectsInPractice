package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.product.Brand;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IBrandMapper {
    List<Brand> selectAll();

    void insert(Brand brand);

    void updateById(Brand brand);

    void deleteById(Long id);
}
