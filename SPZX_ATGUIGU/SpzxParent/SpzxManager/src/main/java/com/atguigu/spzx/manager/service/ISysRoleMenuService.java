package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.request.system.AssignMenuReq;

import java.util.Map;

public interface ISysRoleMenuService {
    Map<String, Object> findSysRoleMenuByRoleId(Long roleId);

    void assignMenuToRole(AssignMenuReq assignMenuReq);
}
