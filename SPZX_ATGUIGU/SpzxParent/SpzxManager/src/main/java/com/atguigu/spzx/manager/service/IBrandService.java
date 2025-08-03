package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.product.Brand;

import java.util.List;

public interface IBrandService {
    /**
     * 查询所有品牌
     * @return 品牌列表
     */
    List<Brand> findAllBrands();

    /**
     * 添加新品牌
     * @param brand 新品牌信息
     */
    void addBrand(Brand brand);

    /**
     * 更新品牌信息
     * @param brand 更新后的品牌信息
     */
    void updateBrand(Brand brand);

    /**
     * 删除品牌
     * @param id 品牌ID
     */
    void deleteBrand(Long id);
}
