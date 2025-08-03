package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.product.Category;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICategoryService {
    List<Category> findByParentId(Long parentId);

    // 以EXCEL形式导出category数据
    void exportDataAsExcel(HttpServletResponse response);

    void importData(MultipartFile file);

}
