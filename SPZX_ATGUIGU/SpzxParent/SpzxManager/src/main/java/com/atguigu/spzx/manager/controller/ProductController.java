package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.IProductService;
import com.atguigu.spzx.model.entity.product.Product;
import com.atguigu.spzx.model.request.product.ProductReq;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "商品管理接口")
@RestController
@RequestMapping("/admin/product/product")
public class ProductController {
    @Autowired
    private IProductService productService;

    @Operation(summary = "分页查询商品列表")
    @GetMapping("/getAll")
    public Result<PageInfo<Product>> getAllProduct(
            @RequestParam int pageNum,
            @RequestParam int pageSize,
            @ModelAttribute ProductReq productReq) {
        PageHelper.startPage(pageNum, pageSize);
        List<Product> productList = productService.selectAll(productReq);
        return Result.build(new PageInfo<>(productList), ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "添加商品")
    @PostMapping("/add")
    public Result add(@RequestBody Product product) {
        productService.addProduct(product);
        return Result.build(null , ResultCodeEnum.SUCCESS) ;
    }

    @Operation(summary = "根据商品ID查询商品接口")
    @GetMapping("/getById/{id}")
    public Result<Product> getById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return Result.build(product , ResultCodeEnum.SUCCESS) ;
    }

    @Operation(summary = "根据ID更新商品接口")
    @PutMapping("/updateById")
    public Result updateById(@Parameter(name = "product", description = "请求参数实体类", required = true) @RequestBody Product product) {
        productService.updateById(product);
        return Result.build(null , ResultCodeEnum.SUCCESS) ;
    }

    @Operation(summary = "根据ID删除商品接口")
    @DeleteMapping("/deleteById/{id}")
    public Result deleteById(@PathVariable Long id) {
        productService.deleteById(id);
        return Result.build(null , ResultCodeEnum.SUCCESS) ;
    }

    @Operation(summary = "更新商品审核状态接口")
    @PutMapping("/updateAuditStatus/{id}/{auditStatus}")
    public Result updateAuditStatus(@PathVariable Long id,
                                    @PathVariable Integer auditStatus) {
        productService.updateAuditStatus(id, auditStatus);
        return Result.build(null , ResultCodeEnum.SUCCESS) ;
    }

    @Operation(summary = "更新商品上架状态接口")
    @PutMapping("/updateStatus/{id}/{status}")
    public Result updateStatus(@PathVariable Long id,
                               @PathVariable Integer status) {
        productService.updateStatus(id, status);
        return Result.build(null , ResultCodeEnum.SUCCESS) ;
    }
}
