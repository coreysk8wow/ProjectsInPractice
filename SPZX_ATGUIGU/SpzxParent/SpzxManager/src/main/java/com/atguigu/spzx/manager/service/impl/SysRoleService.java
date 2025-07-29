package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.manager.mapper.ISysRoleMapper;
import com.atguigu.spzx.manager.mapper.ISysRoleMenuMapper;
import com.atguigu.spzx.manager.mapper.ISysUserRoleMapper;
import com.atguigu.spzx.manager.service.ISysRoleService;
import com.atguigu.spzx.model.entity.system.SysRole;
import com.atguigu.spzx.model.request.system.SysRoleReq;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SysRoleService implements ISysRoleService {

    private ISysRoleMapper sysRoleMapper;
    private ISysUserRoleMapper sysUserRoleMapper;
    private ISysRoleMenuMapper sysRoleMenuMapper;

    @Autowired
    public SysRoleService(ISysRoleMapper sysRoleMapper,
                          ISysUserRoleMapper sysUserRoleMapper,
                          ISysRoleMenuMapper sysRoleMenuMapper) {
        this.sysRoleMapper = sysRoleMapper;
        this.sysUserRoleMapper = sysUserRoleMapper;
        this.sysRoleMenuMapper = sysRoleMenuMapper;
    }

    @Override
    public PageInfo<SysRole> findByPage(SysRoleReq sysRoleReq, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<SysRole> roleList = sysRoleMapper.getRolesByRolename(sysRoleReq);
        return new PageInfo<SysRole>(roleList);
    }

    @Override
    public void save(SysRole sysRole) {
        sysRoleMapper.save(sysRole);
    }

    @Override
    public void updateById(SysRole sysRole) {
        sysRoleMapper.updateById(sysRole);
    }

    @Transactional
    @Override
    public void deleteById(Long roleId) {
        // 检查是否有现存用户分配了该角色
        int cntUserByRole = sysUserRoleMapper.countUserByRoleId(roleId);
        if (cntUserByRole > 0) {
            throw new GuiguException(ResultCodeEnum.DELETE_ROLE_USER_EXIST);
        }
        // 删除角色
        sysRoleMapper.deleteById(roleId);

        // 删除角色和菜单的关联关系
        sysRoleMenuMapper.deleteByRoleId(roleId);
    }
}
