package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.product.Product;
import com.atguigu.spzx.model.request.product.ProductReq;

import java.util.List;

public interface IProductService {
    List<Product> selectAll(ProductReq productReq);

    // 添加商品
    void addProduct(Product product);

    Product getProductById(Long id);

    void updateById(Product product);

    // 删除商品、SKU、DETAILS
    void deleteById(Long id);

    // 商品审核状态更新
    void updateAuditStatus(Long id, Integer auditStatus);

    // 商品上架状态更新
    void updateStatus(Long id, Integer status);
}
