package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.manager.mapper.IProductDetailsMapper;
import com.atguigu.spzx.manager.mapper.IProductMapper;
import com.atguigu.spzx.manager.mapper.IProductSkuMapper;
import com.atguigu.spzx.manager.service.IProductService;
import com.atguigu.spzx.model.entity.product.Product;
import com.atguigu.spzx.model.entity.product.ProductDetails;
import com.atguigu.spzx.model.entity.product.ProductSku;
import com.atguigu.spzx.model.request.product.ProductReq;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService implements IProductService {
    private IProductMapper productMapper;
    private IProductSkuMapper productSkuMapper;
    private IProductDetailsMapper productDetailsMapper;

    @Autowired
    public ProductService(IProductMapper productMapper,
                          IProductSkuMapper productSkuMapper,
                          IProductDetailsMapper productDetailsMapper) {
        this.productMapper = productMapper;
        this.productSkuMapper = productSkuMapper;
        this.productDetailsMapper = productDetailsMapper;
    }

    @Override
    public List<Product> selectAll(ProductReq productReq) {
        return productMapper.selectAll(productReq);
    }

    @Transactional
    @Override
    public void addProduct(Product product) {
        // 保存商品数据
        product.setStatus(0);              // 设置上架状态为0
        product.setAuditStatus(0);         // 设置审核状态为0
        productMapper.insert(product);

        // 保存商品sku数据
        List<ProductSku> productSkuList = product.getProductSkuList();
        for (int i = 0; i < productSkuList.size(); i++) {
            // 获取ProductSku对象
            ProductSku productSku = productSkuList.get(i);
            productSku.setSkuCode(product.getId() + "_" + i);       // 构建skuCode

            productSku.setProductId(product.getId());               // 设置商品id
            productSku.setSkuName(product.getName() + productSku.getSkuSpec());
            productSku.setSaleNum(0);                               // 设置销量
            productSku.setStatus(0);
            productSkuMapper.insert(productSku);                    // 保存数据

        }

        // 保存商品详情数据
        ProductDetails productDetails = new ProductDetails();
        productDetails.setProductId(product.getId());
        productDetails.setImageUrls(product.getDetailsImageUrls());
        productDetailsMapper.insert(productDetails);
    }

    // 错了。参考NodeJS版。
    @Override
    public Product getProductById(Long id) {
        ProductReq productReq = new ProductReq();
        productReq.setId(id);

        // 根据id查询商品数据
        List<Product> productList = productMapper.selectAll(productReq);
        if (productList == null || productList.isEmpty()) {
            throw new GuiguException(ResultCodeEnum.DATA_ERROR);
        }
        Product product = productList.get(0);

        // 根据商品的id查询sku数据
        List<ProductSku> productSkuList = productSkuMapper.selectByProductId(id);
        product.setProductSkuList(productSkuList);

        // 根据商品的id查询商品详情数据
        ProductDetails productDetails = productDetailsMapper.selectByProductId(id);
        product.setDetailsImageUrls(productDetails.getImageUrls());

        // 返回数据
        return product;
    }

    @Transactional
    @Override
    public void updateById(Product product) {
        // 修改商品基本数据
        productMapper.updateById(product);

        // 修改商品的sku数据
        List<ProductSku> productSkuList = product.getProductSkuList();
        productSkuList.forEach(productSku -> {
            productSkuMapper.updateById(productSku);
        });

        // 修改商品的详情数据
        ProductDetails productDetails =
                productDetailsMapper.selectByProductId(product.getId());
        productDetails.setImageUrls(product.getDetailsImageUrls());
        productDetailsMapper.updateById(productDetails);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        productMapper.deleteById(id);                   // 根据id删除商品基本数据
        productSkuMapper.deleteByProductId(id);         // 根据商品id删除商品的sku数据
        productDetailsMapper.deleteByProductId(id);     // 根据商品的id删除商品的详情数据
    }

    @Override
    public void updateAuditStatus(Long id, Integer auditStatus) {
        Product product = new Product();
        product.setId(id);
        if (auditStatus != null && auditStatus == 1) {
            product.setAuditStatus(1);
            product.setAuditMessage("审批通过");
        } else {
            product.setAuditStatus(-1);
            product.setAuditMessage("审批不通过");
        }
        productMapper.updateById(product);
    }

    @Override
    public void updateStatus(Long id, Integer status) {
        Product product = new Product();
        product.setId(id);
        if (status != null && status == 1) {
            product.setStatus(1);
        } else {
            product.setStatus(-1);
        }
        productMapper.updateById(product);
    }
}
