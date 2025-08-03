package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.IBrandMapper;
import com.atguigu.spzx.manager.service.IBrandService;
import com.atguigu.spzx.model.entity.product.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService implements IBrandService {
    private IBrandMapper brandMapper;

    @Autowired
    public BrandService(IBrandMapper brandMapper) {
        this.brandMapper = brandMapper;
    }

    @Override
    public List<Brand> findAllBrands() {
        List<Brand> brandList = brandMapper.selectAll();
        return brandList;
    }

    @Override
    public void addBrand(Brand brand) {
        brandMapper.insert(brand);
    }

    @Override
    public void updateBrand(Brand brand) {
        brandMapper.updateById(brand);
    }

    @Override
    public void deleteBrand(Long id) {
        brandMapper.deleteById(id);
    }
}
