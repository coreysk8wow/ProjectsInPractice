package com.atguigu.spzx.manager.service;

import com.atguigu.spzx.model.entity.system.SysMenu;
import com.atguigu.spzx.model.response.common.Result;

import java.util.List;

public interface ISysMenuService {
    /**
     * 为当前所有菜单，生成菜单树。
     * @return
     */
    List<SysMenu> genMenuTree();

    // 创建一个新菜单
    void addMenu(SysMenu sysMenu);

    // 更新菜单 by id
    void updateMenuById(SysMenu sysMenu);

    // 删除菜单 by id
    void deleteMenuById(Long id);

    List<SysMenu> getMenuListByUserId();
}
