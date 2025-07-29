package com.atguigu.spzx.manager.service.impl;

import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.manager.helper.MenuHelper;
import com.atguigu.spzx.manager.mapper.ISysMenuMapper;
import com.atguigu.spzx.manager.mapper.ISysRoleMenuMapper;
import com.atguigu.spzx.manager.service.ISysMenuService;
import com.atguigu.spzx.model.entity.system.SysMenu;
import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.utils.AuthContextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SysMenuService implements ISysMenuService {
    private ISysMenuMapper sysMenuMapper;

    private ISysRoleMenuMapper sysRoleMenuMapper;

    @Autowired
    public SysMenuService(ISysMenuMapper sysMenuMapper,
                          ISysRoleMenuMapper sysRoleMenuMapper) {
        this.sysMenuMapper = sysMenuMapper;
        this.sysRoleMenuMapper = sysRoleMenuMapper;
    }

    @Override
    public List<SysMenu> genMenuTree() {
        List<SysMenu> menuList = sysMenuMapper.selectAll();
        if (menuList == null) return null;
        List<SysMenu> menuTreeList = MenuHelper.buildTree(menuList);

        return menuTreeList;
    }

    @Transactional
    @Override
    public void addMenu(SysMenu sysMenu) {
        // 添加新菜单
        sysMenuMapper.insert(sysMenu);

        // 如果新菜单有上级菜单，则将上级菜单的is_half设置为1（半开）
        updateSysRoleMenuIsHalf(sysMenu);
    }

    private void updateSysRoleMenuIsHalf(SysMenu sysMenu) {
        // 查询是否存在父节点
        SysMenu parentMenu = sysMenuMapper.selectById(sysMenu.getParentId());
        if(parentMenu != null) {
            // 将该id的菜单设置为半开
            sysRoleMenuMapper.updateIsHalfByMenuId(parentMenu.getId(), 1);
            // 递归调用
            updateSysRoleMenuIsHalf(parentMenu) ;
        }

    }

    @Override
    public void updateMenuById(SysMenu sysMenu) {
        if (sysMenu == null || sysMenu.getId() == null) {
            throw new GuiguException(0, "Menu or Menu ID cannot be null");
//            throw new IllegalArgumentException("Menu or Menu ID cannot be null");
        }
        sysMenuMapper.updateById(sysMenu);
    }

    @Transactional
    @Override
    public void deleteMenuById(Long id) {
        if (id == null) {
            throw new GuiguException(0, "Menu ID cannot be null");
//            throw new IllegalArgumentException("Menu ID cannot be null");
        }

        // 先查询是否存在子菜单，如果存在不允许进行删除
        int numChildren = sysMenuMapper.countByParentId(id);
        if (numChildren > 0) {
            throw new GuiguException(ResultCodeEnum.NODE_ERROR);
//            throw new IllegalArgumentException("Cannot delete menu with children");
        }

        // 如果不存在子菜单，开始删除
        sysMenuMapper.deleteById(id);
        // 同时删除sys_role_menu表中对应的记录
        sysRoleMenuMapper.deleteByMenuId(id);

        /*
        // 查询当前菜单的parent_id, 如果有上级菜单，将上级菜单的is_half设置为1（半开）
        SysMenu sysMenu = sysMenuMapper.selectById(id);
        if (sysMenu != null && sysMenu.getParentId() != null) {
            Long parentId = sysMenu.getParentId();
            sysRoleMenuMapper.updateIsHalfByMenuId(parentId, 1);
        }*/
    }

    @Override
    public List<SysMenu> getMenuListByUserId() {
        SysUser sysUser = AuthContextUtil.get();
        Long userId = sysUser.getId();          // 获取当前登录用户的id

        List<SysMenu> sysMenuList = sysMenuMapper.selectMenuListByUserId(userId);

        //构建树形数据
        return MenuHelper.buildTree(sysMenuList);
    }
}
