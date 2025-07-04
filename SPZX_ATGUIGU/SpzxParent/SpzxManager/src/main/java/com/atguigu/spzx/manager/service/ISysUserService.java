package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.request.system.LoginReq;
import com.atguigu.spzx.model.response.system.LoginResp;

public interface ISysUserService {

    /**
     * 根据用户名查询用户数据
     * @param loginDto
     * @return
     */
    LoginResp login(LoginReq loginDto);

    void logout(String token);

    SysUser getUserInfo(String token);
}
