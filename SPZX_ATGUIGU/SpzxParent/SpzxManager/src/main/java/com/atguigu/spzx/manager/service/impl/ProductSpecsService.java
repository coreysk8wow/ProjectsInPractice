package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.IProductSpecsMapper;
import com.atguigu.spzx.manager.service.IProductSpecsService;
import com.atguigu.spzx.model.entity.product.ProductSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSpecsService implements IProductSpecsService {
    private IProductSpecsMapper productSpecsMapper;

    @Autowired
    public ProductSpecsService(IProductSpecsMapper productSpecsMapper) {
        this.productSpecsMapper = productSpecsMapper;
    }

    @Override
    public List<ProductSpec> getAllProductSpecs() {
        return productSpecsMapper.selectAll();
    }

    @Override
    public void addProductSpec(ProductSpec productSpec) {
        productSpecsMapper.insert(productSpec);
    }

    @Override
    public void updateProductSpec(ProductSpec productSpec) {
        productSpecsMapper.updateById(productSpec);
    }

    @Override
    public void deleteProductSpec(Long id) {
        productSpecsMapper.deleteById(id);
    }
}
