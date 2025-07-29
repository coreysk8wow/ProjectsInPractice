package com.atguigu.spzx.manager.mapper;

import com.atguigu.spzx.model.entity.system.SysMenu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ISysMenuMapper {
    List<SysMenu> selectAll();

    // 插入一个菜单
    void insert(SysMenu sysMenu);

    // 更新菜单
    void updateById(SysMenu sysMenu);

    // 删除菜单 by id
    void deleteById(Long id);

    // 根据父菜单ID查询子菜单数量
    int countByParentId(Long parentId);

    List<SysMenu> selectMenuListByUserId(Long userId);

    SysMenu selectById(Long menuId);
}
