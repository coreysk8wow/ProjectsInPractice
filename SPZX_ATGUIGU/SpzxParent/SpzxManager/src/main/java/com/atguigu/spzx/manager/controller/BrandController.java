package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.IBrandService;
import com.atguigu.spzx.model.entity.product.Brand;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "品牌接口")
@RestController
@RequestMapping("/admin/product/brand")
public class BrandController {
    @Autowired
    private IBrandService brandService;

    @Operation(summary = "分页查询品牌列表")
    @GetMapping(value = "/findByPage")
    public Result<PageInfo<Brand>> findByPage(
            @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Brand> brandList = brandService.findAllBrands();
        return Result.build(new PageInfo<>(brandList), ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "查询所有品牌列表")
    @GetMapping(value = "/findAll")
    public Result<List<Brand>> findAll() {
        List<Brand> brandList = brandService.findAllBrands();
        return Result.build(brandList, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "添加品牌")
    @PostMapping("/add")
    public Result addBrand(@RequestBody Brand brand) {
        brandService.addBrand(brand);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "更新品牌")
    @PutMapping("/update")
    public Result updateBrand(@RequestBody Brand brand) {
        brandService.updateBrand(brand);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "删除品牌")
    @DeleteMapping("/deleteById/{id}")
    public Result deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }
}
