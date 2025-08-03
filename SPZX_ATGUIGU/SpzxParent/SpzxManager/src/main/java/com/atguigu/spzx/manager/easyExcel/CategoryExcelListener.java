package com.atguigu.spzx.manager.easyExcel;

import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.read.listener.ReadListener;
import com.atguigu.spzx.manager.mapper.ICategoryMapper;
import com.atguigu.spzx.model.entity.product.Category;
import com.atguigu.spzx.model.response.product.CategoryExcelResp;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class CategoryExcelListener implements ReadListener<CategoryExcelResp> {
    /**
     * 每隔5条存储数据库，实际使用中可以100条，然后清理list ，方便内存回收
     */
    private static final int BATCH_COUNT = 20;

    /**
     * 缓存的数据
     */
    private List<Category> cachedDataList = new ArrayList<>(BATCH_COUNT);

    private ICategoryMapper categoryMapper;

    @Autowired
    public CategoryExcelListener(ICategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

    @Override
    public void invoke(CategoryExcelResp data, AnalysisContext context) {
        Category category = new Category();
        BeanUtils.copyProperties(data, category);
        cachedDataList.add(category);

        // 达到BATCH_COUNT，存储数据库，防止数据几万条数据在内存，容易OOM
        if (cachedDataList.size() >= BATCH_COUNT) {
            saveData();
            cachedDataList = new ArrayList<>(BATCH_COUNT);
        }
    }

    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        // excel解析完毕以后需要执行的代码
        // 这里也要保存数据，确保最后遗留的数据也存储到数据库
        saveData();
    }

    private void saveData() {
        if (!cachedDataList.isEmpty()) {
            // 批量插入数据到数据库
            categoryMapper.insertMultiple(cachedDataList);
        }
    }

}
