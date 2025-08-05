package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.IProductSpecsService;
import com.atguigu.spzx.model.entity.product.ProductSpec;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "商品规格管理接口")
@RestController
@RequestMapping("/admin/product/productSpecs")
public class ProductSpecsController {
    @Autowired
    private IProductSpecsService productSpecsService;

    @Operation(summary = "分页获取所有商品规格")
    @GetMapping("/getAll")
    public Result<PageInfo<ProductSpec>> getAllProductSpecs(
            @RequestParam int pageNum,
            @RequestParam int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<ProductSpec> productSpecsList = productSpecsService.getAllProductSpecs();

        return Result.build(new PageInfo(productSpecsList), ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "添加商品规格")
    @PostMapping("/add")
    public Result addProductSpec(@RequestBody ProductSpec productSpec) {
        productSpecsService.addProductSpec(productSpec);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "更新商品规格")
    @PutMapping("/updateById")
    public Result updateProductSpec(@RequestBody ProductSpec productSpec) {
        productSpecsService.updateProductSpec(productSpec);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "删除商品规格")
    @DeleteMapping("/deleteById/{id}")
    public Result deleteProductSpec(@PathVariable Long id) {
        productSpecsService.deleteProductSpec(id);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }
}
