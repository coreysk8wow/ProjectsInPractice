package com.atguigu.spzx.manager.service;

import org.springframework.web.multipart.MultipartFile;

public interface IFileUploadService {
    String upload(MultipartFile multipartFile);
}
