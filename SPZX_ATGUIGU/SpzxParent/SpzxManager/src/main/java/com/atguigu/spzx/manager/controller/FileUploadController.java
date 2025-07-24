package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.IFileUploadService;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "文件上传接口")
@RestController
@RequestMapping("/admin/system")
public class FileUploadController {
    @Autowired
    private IFileUploadService fileUploadService;

    @Operation(summary = "文件上传接口")
    @PostMapping(value = "/uploadFile")
    public Result<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileUploadService.upload(file);
        return Result.build(fileUrl, ResultCodeEnum.SUCCESS);
    }

}
