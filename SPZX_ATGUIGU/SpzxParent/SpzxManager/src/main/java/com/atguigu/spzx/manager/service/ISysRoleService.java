package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.system.SysRole;
import com.atguigu.spzx.model.request.system.SysRoleReq;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface ISysRoleService {
    PageInfo<SysRole> findByPage(SysRoleReq sysRoleReq, Integer pageNum, Integer pageSize);

    void save(SysRole sysRole);

    void updateById(SysRole sysRole);

    void deleteById(Long roleId);

}
