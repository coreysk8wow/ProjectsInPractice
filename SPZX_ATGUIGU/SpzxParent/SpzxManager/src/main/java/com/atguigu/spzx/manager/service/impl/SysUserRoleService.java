package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.ISysRoleMapper;
import com.atguigu.spzx.manager.mapper.ISysUserRoleMapper;
import com.atguigu.spzx.manager.service.ISysUserRoleService;
import com.atguigu.spzx.model.entity.system.SysRole;
import com.atguigu.spzx.model.request.system.SysRoleReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SysUserRoleService implements ISysUserRoleService {
    private ISysRoleMapper sysRoleMapper ;
    private ISysUserRoleMapper sysRoleUserMapper ;

    @Autowired
    public SysUserRoleService(ISysRoleMapper sysRoleMapper,
                              ISysUserRoleMapper sysRoleUserMapper) {
        this.sysRoleMapper = sysRoleMapper;
        this.sysRoleUserMapper = sysRoleUserMapper;
    }

    /**
     * 获取所有角色列表和用户已分配的角色ID列表
     *
     * @param userId 用户ID
     * @return 包含所有角色列表和用户已分配角色ID列表的Map
     */
    @Override
    public Map<String, Object> findAllRoles(Long userId) {
        List<SysRole> allRoleList = sysRoleMapper.getRolesByRolename(new SysRoleReq());
        List<Long> userRoleIdList = sysRoleUserMapper.getRoleIdsByUserId(userId);

        Map<String, Object> result = Map.of(
                "allRolesList", allRoleList,
                "userRoleIdList", userRoleIdList
        );

        return result;
    }
}
