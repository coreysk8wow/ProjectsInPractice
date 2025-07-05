package com.atguigu.spzx.manager.service.impl;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSON;
import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.model.request.system.LoginReq;
import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.model.response.system.LoginResp;
import com.atguigu.spzx.manager.mapper.ISysUserMapper;
import com.atguigu.spzx.manager.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class SysUserService implements ISysUserService {

    private final ISysUserMapper sysUserMapper;

    private final RedisTemplate<String , String> redisTemplate;

    @Autowired
    public SysUserService(ISysUserMapper sysUserMapper,
                          RedisTemplate<String , String> redisTemplate) {
        this.sysUserMapper = sysUserMapper;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public LoginResp login(LoginReq loginReq) {
        // 校验验证码是否正确
        String captcha = loginReq.getCaptcha();     // 用户输入的验证码
        String codeKey = loginReq.getCodeKey();     // redis中验证码的数据key

        // 从Redis中获取验证码
        String redisCode = redisTemplate.opsForValue().get("user:login:validatecode:" + codeKey);
        if(StrUtil.isEmpty(redisCode) || !StrUtil.equalsIgnoreCase(redisCode , captcha)) {
            throw new GuiguException(ResultCodeEnum.VALIDATECODE_ERROR) ;
        }

        // 验证通过后，删除redis中的验证码
        redisTemplate.delete("user:login:validatecode:" + codeKey) ;

        // 根据用户名查询用户
        SysUser sysUser = sysUserMapper.selectByUserName(loginReq.getUserName());
        if (sysUser == null) {
//            throw new RuntimeException("用户名或者密码错误") ;
            throw new GuiguException(ResultCodeEnum.LOGIN_ERROR);
        }

        // 验证密码是否正确
        String inputPassword = loginReq.getPassword();
        String pwdDigest = DigestUtils.md5DigestAsHex(inputPassword.getBytes());
        if (!pwdDigest.equals(sysUser.getPassword())) {
//            throw new RuntimeException("用户名或者密码错误") ;
            throw new GuiguException(ResultCodeEnum.LOGIN_ERROR);
        }

        // 生成令牌，保存数据到Redis中
        String token = UUID.randomUUID().toString().replace("-", "");
        redisTemplate.opsForValue().set("user:login:" + token, JSON.toJSONString(sysUser),
                30, TimeUnit.MINUTES);

        // 构建响应结果对象
        LoginResp loginResp = new LoginResp();
        loginResp.setToken(token);
        loginResp.setRefresh_token("");

        return loginResp;
    }

    @Override
    public void logout(String token) {
        redisTemplate.delete("user:login:" + token);
    }

    @Override
    public SysUser getUserInfo(String token) {
        String userJson = redisTemplate.opsForValue().get("user:login:" + token);
        return JSON.parseObject(userJson , SysUser.class) ;
    }

    @Override
    public void resetUserTimeout(String token, int timeoutInSeconds) {
        redisTemplate.expire("user:login:" + token, timeoutInSeconds, TimeUnit.SECONDS);
    }
}
