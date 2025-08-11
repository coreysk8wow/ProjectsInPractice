package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.IProductUnitMapper;
import com.atguigu.spzx.manager.service.IProductUnitService;
import com.atguigu.spzx.model.entity.base.ProductUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductUnitService implements IProductUnitService {
    private IProductUnitMapper productUnitMapper;

    @Autowired
    public ProductUnitService(IProductUnitMapper productUnitMapper) {
        this.productUnitMapper = productUnitMapper;
    }

    @Override
    public List<ProductUnit> findAll() {
        List<ProductUnit> productUnitList = productUnitMapper.selectAll();
        return productUnitList;
    }
}
