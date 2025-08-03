package com.atguigu.spzx.manager.service.impl;

import com.alibaba.excel.EasyExcel;
import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.manager.easyExcel.CategoryExcelListener;
import com.atguigu.spzx.manager.mapper.ICategoryMapper;
import com.atguigu.spzx.manager.service.ICategoryService;
import com.atguigu.spzx.model.entity.product.Category;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.model.response.product.CategoryExcelResp;
import com.google.common.base.Throwables;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class CategoryService implements ICategoryService {
    private ICategoryMapper categoryMapper;

    @Autowired
    public CategoryService(ICategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<Category> findByParentId(Long parentId) {
        List<Category> categoryList = categoryMapper.selectByParentId(parentId);
        if (categoryList != null && !categoryList.isEmpty()) {
            for (Category category : categoryList) {
                // 设置是否有子节点
                int cntSubTree = categoryMapper.countByParentId(category.getId());
                category.setHasChildren(cntSubTree > 0);
            }
        }
        return categoryList;
    }

    @Override
    public void exportDataAsExcel(HttpServletResponse response) {
        try {
            // 设置响应结果类型
            response.setContentType("application/vnd.ms-excel");
            response.setCharacterEncoding("utf-8");

            // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
            String fileName = URLEncoder.encode("分类数据", "UTF-8");
            response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xlsx");
            //response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              List<Category> categoryList = categoryMapper.selectAll();
            List<CategoryExcelResp> categoryExcelRespList = new ArrayList<>(categoryList.size());

            // 将从数据库中查询到的Category对象转换成CategoryExcelVo对象
            for(Category category : categoryList) {
                CategoryExcelResp categoryExcelResp = new CategoryExcelResp();
//                BeanUtils.copyProperties(category, categoryExcelResp, CategoryExcelResp.class);
                BeanUtils.copyProperties(category, categoryExcelResp);
                categoryExcelRespList.add(categoryExcelResp);
            }

            // 写出数据到浏览器端
            EasyExcel.write(response.getOutputStream(), CategoryExcelResp.class)
                    .sheet("分类数据")
                    .doWrite(categoryExcelRespList);

        } catch (IOException e) {
            log.error("导出分类数据失败, 异常信息： {}", Throwables.getStackTraceAsString(e));
            throw new GuiguException(ResultCodeEnum.SYSTEM_ERROR);
        }
    }

    @Override
    public void importData(MultipartFile file) {
        //创建监听器对象，传递mapper对象
        CategoryExcelListener excelListener =
                new CategoryExcelListener(categoryMapper);
        //调用read方法读取excel数据
        try {
            EasyExcel.read(file.getInputStream(), CategoryExcelResp.class, excelListener)
                    .sheet().doRead();
        } catch (IOException e) {
            log.error("导入分类数据失败, 异常信息： {}", Throwables.getStackTraceAsString(e));
            throw new GuiguException(ResultCodeEnum.SYSTEM_ERROR);
        }
    }
}
