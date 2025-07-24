package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.system.SysRole;
import com.atguigu.spzx.model.request.system.SysRoleReq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ISysRoleMapper {
    /**
     * 根据角色名称分页查询角色列表
     * 角色名称不填，获取所有角色
     *
     * @param sysRoleReq
     * @return
     */
    List<SysRole> getRolesByRolename(SysRoleReq sysRoleReq);

    void save(SysRole sysRole);

    void updateById(SysRole sysRole);

    /**
     * 根据角色ID删除角色
     * 
     * @param id 角色ID
     */
    void deleteById(Long id);


}
