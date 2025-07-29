package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.request.system.AssignRoleReq;
import com.atguigu.spzx.model.request.system.LoginReq;
import com.atguigu.spzx.model.request.system.SysUserReq;
import com.atguigu.spzx.model.response.system.LoginResp;
import com.github.pagehelper.PageInfo;

public interface ISysUserService {

    /**
     * 根据用户名查询用户数据
     * @param loginDto
     * @return
     */
    LoginResp login(LoginReq loginDto);

    void logout(String token);

    SysUser getUserInfo(String token);

    void resetUserTimeout(String token, int timeoutInSeconds);

    PageInfo<SysUser> findByPage(SysUserReq sysUserReq, Integer pageNum, Integer pageSize);

    SysUser findById(Long id);

    void addUser(SysUser sysUser);

    void updateUser(SysUser sysUser);

    void deleteById(Long id, boolean isCascade);

    void assignRoleToUser(AssignRoleReq assignRoleReq);

}
