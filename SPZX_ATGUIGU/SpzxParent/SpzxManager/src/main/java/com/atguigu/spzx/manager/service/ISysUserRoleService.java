package com.atguigu.spzx.manager.service;

import java.util.Map;

public interface ISysUserRoleService {
    Map<String, Object> findAllRoles(Long userId);
}
