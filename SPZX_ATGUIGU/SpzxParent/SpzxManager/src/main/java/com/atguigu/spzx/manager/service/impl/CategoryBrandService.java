package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.ICategoryBrandMapper;
import com.atguigu.spzx.manager.service.ICategoryBrandService;
import com.atguigu.spzx.model.entity.product.Brand;
import com.atguigu.spzx.model.entity.product.CategoryBrand;
import com.atguigu.spzx.model.request.product.CategoryBrandReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryBrandService implements ICategoryBrandService {
    private ICategoryBrandMapper categoryBrandMapper;

    @Autowired
    public CategoryBrandService(ICategoryBrandMapper categoryBrandMapper) {
        this.categoryBrandMapper = categoryBrandMapper;
    }

    @Override
    public List<CategoryBrand> find(CategoryBrandReq CategoryBrandReq) {
        List<CategoryBrand> categoryBrandList = categoryBrandMapper.find(CategoryBrandReq);
        return categoryBrandList;
    }

    @Override
    public void add(CategoryBrand categoryBrand) {
        categoryBrandMapper.insert(categoryBrand);
    }

    @Override
    public void updateById(CategoryBrand categoryBrand) {
        categoryBrandMapper.updateById(categoryBrand);
    }

    @Override
    public void deleteById(Long id) {
        categoryBrandMapper.deleteById(id);
    }

    @Override
    public List<Brand> findBrandByCategoryId(Long categoryId) {
        return categoryBrandMapper.findBrandByCategoryId(categoryId);
    }
}
