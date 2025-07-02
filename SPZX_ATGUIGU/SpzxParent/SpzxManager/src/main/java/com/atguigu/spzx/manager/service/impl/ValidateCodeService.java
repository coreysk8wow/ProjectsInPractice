package com.atguigu.spzx.manager.service.impl;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.CircleCaptcha;
import com.atguigu.spzx.manager.service.IValidateCodeService;
import com.atguigu.spzx.model.response.system.ValidateCodeResp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class ValidateCodeService implements IValidateCodeService {

    private final RedisTemplate<String , String> redisTemplate ;

    @Autowired
    public ValidateCodeService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public ValidateCodeResp generateValidateCode() {
        // 使用hutool工具包中的工具类生成图片验证码
        //参数：宽  高  验证码位数 干扰线数量
        CircleCaptcha circleCaptcha = CaptchaUtil
                .createCircleCaptcha(150, 48, 4, 20);
        String codeValue = circleCaptcha.getCode();
        String imageBase64 = circleCaptcha.getImageBase64();

        // 生成uuid作为图片验证码的key
        String codeKey = UUID.randomUUID().toString().replace("-", "");

        // 将验证码存储到Redis中
        redisTemplate.opsForValue()
                .set("user:login:validatecode:" + codeKey , codeValue , 5 , TimeUnit.MINUTES);

        System.out.println("user:login:validatecode:" + codeKey);

        // 构建响应结果数据
        ValidateCodeResp validateCodeResp = new ValidateCodeResp() ;
        validateCodeResp.setCodeKey(codeKey);
        validateCodeResp.setCodeValue("data:image/png;base64," + imageBase64);

        // 返回数据
        return validateCodeResp;
    }
}
