package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.ICategoryBrandService;
import com.atguigu.spzx.model.entity.product.CategoryBrand;
import com.atguigu.spzx.model.request.product.CategoryBrandReq;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "分类品牌管理接口")
@Slf4j
@RestController
@RequestMapping(value = "/admin/product/categoryBrand")
public class CategoryBrandController {

    @Autowired
    private ICategoryBrandService categoryBrandService;

    @Operation(summary = "分页查询分类品牌接口")
    @GetMapping(value = "/findByPage")
    public Result<PageInfo<CategoryBrand>> findByPage(
            @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @ModelAttribute CategoryBrandReq categoryBrandReq) {
        PageHelper.startPage(pageNum, pageSize);
        List<CategoryBrand> categoryBrandList = categoryBrandService.find(categoryBrandReq);
        PageInfo<CategoryBrand> pageInfo = new PageInfo<>(categoryBrandList);
        return Result.build(pageInfo, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "添加分类品牌接口")
    @PostMapping("/add")
    public Result add(@RequestBody CategoryBrand categoryBrand) {
        categoryBrandService.add(categoryBrand);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "更新分类品牌接口")
    @PutMapping("/updateById")
    public Result updateById(@RequestBody CategoryBrand categoryBrand) {
        categoryBrandService.updateById(categoryBrand);
        return Result.build(null , ResultCodeEnum.SUCCESS) ;
    }

    @Operation(summary = "逻辑删除分类品牌接口")
    @DeleteMapping("/deleteById/{id}")
    public Result deleteById(@PathVariable Long id) {
        categoryBrandService.deleteById(id);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }
}
