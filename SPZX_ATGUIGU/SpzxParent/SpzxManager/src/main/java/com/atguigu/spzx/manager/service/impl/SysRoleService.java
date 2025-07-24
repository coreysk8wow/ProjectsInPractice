package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.manager.mapper.ISysRoleMapper;
import com.atguigu.spzx.manager.service.ISysRoleService;
import com.atguigu.spzx.model.entity.system.SysRole;
import com.atguigu.spzx.model.request.system.SysRoleReq;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysRoleService implements ISysRoleService {

    @Autowired
    private ISysRoleMapper sysRoleMapper;

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

    @Override
    public void deleteById(Long id) {
        sysRoleMapper.deleteById(id);
    }
}
