package com.atguigu.spzx.manager.helper;

import com.atguigu.spzx.common.exception.GuiguException;
import com.atguigu.spzx.model.entity.system.SysMenu;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;

import java.util.ArrayList;
import java.util.List;

/**
 * 递归生成菜单
 */
public class MenuHelper {
    public static List<SysMenu> buildTree(List<SysMenu> menuList) {
        if (menuList == null) throw new GuiguException(ResultCodeEnum.DATA_ERROR);

        List<SysMenu> tree = new ArrayList<>();
        for (SysMenu menu : menuList) {
            if (menu == null || menu.getParentId() == null)
                throw new GuiguException(ResultCodeEnum.DATA_ERROR);
            else if (Long.valueOf(0L).equals(menu.getParentId())) {
                tree.add(genSubTree(menu, menuList));
            }
        }

        return tree;
    }

    private static SysMenu genSubTree(SysMenu menu, List<SysMenu> menuList) {
        menu.setChildren(new ArrayList<>());
        for (SysMenu m : menuList) {
            if (m == null || m.getId() == null || menu.getId() == null || m.getParentId() == null)
                throw new GuiguException(ResultCodeEnum.DATA_ERROR);
            else if (menu.getId().equals(m.getParentId())) {
                menu.getChildren().add(genSubTree(m, menuList));
            }
        }
        return menu;
    }
}
