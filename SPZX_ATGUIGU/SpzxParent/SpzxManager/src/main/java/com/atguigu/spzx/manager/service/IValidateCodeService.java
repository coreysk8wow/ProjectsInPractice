package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.response.system.ValidateCodeResp;

public interface IValidateCodeService {
    // 获取验证码图片
    ValidateCodeResp generateValidateCode();
}
