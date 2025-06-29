package com.atguigu.spzx.manager.controller.config.spzx.model.response.h5;

import com.atguigu.spzx.manager.controller.config.spzx.model.entity.product.Category;
import com.atguigu.spzx.manager.controller.config.spzx.model.entity.product.ProductSku;
import lombok.Data;

import java.util.List;

@Data
public class IndexResp {

    private List<Category> categoryList ;       // 一级分类的类别数据
    private List<ProductSku> productSkuList ;   // 畅销商品列表数据

}