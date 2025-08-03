package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.ICategoryService;
import com.atguigu.spzx.model.entity.product.Category;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "商品分类接口")
@RestController
@RequestMapping("/admin/product/category")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @Operation(summary = "根据parentId获取下级节点")
    @GetMapping(value = "/findByParentId/{parentId}")
    public Result<List<Category>> findByParentId(@PathVariable Long parentId) {
        List<Category> list = categoryService.findByParentId(parentId);
        return Result.build(list, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "导出分类数据为Excel")
    @GetMapping(value = "/exportData")
    public void exportData(HttpServletResponse response) {
        categoryService.exportDataAsExcel(response);
//        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "导入分类数据")
    @PostMapping(value = "/importData")
    public Result<Void> importData(MultipartFile file) {
        categoryService.importData(file);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }
}
