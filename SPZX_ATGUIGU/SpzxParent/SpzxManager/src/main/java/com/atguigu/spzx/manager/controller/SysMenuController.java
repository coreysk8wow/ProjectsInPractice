package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.ISysMenuService;
import com.atguigu.spzx.model.entity.system.SysMenu;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.model.response.system.SysMenuResp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@Slf4j
@Tag(name = "菜单接口")
@RestController
@RequestMapping(value="/admin/system/sysMenu")
public class SysMenuController {
    @Autowired
    private ISysMenuService sysMenuService;

    @Operation(summary = "获取菜单树接口")
    @GetMapping("/getMenuTree")
    public Result<List<SysMenu>> getMenuTree() {
        List<SysMenu> menuList = sysMenuService.genMenuTree();
        return Result.build(menuList, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "添加菜单接口")
    @PostMapping("/add")
    public Result addMenu(@RequestBody SysMenu sysMenu) {
        log.info("添加菜单: {}", sysMenu);
        sysMenuService.addMenu(sysMenu);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "更新菜单接口")
    @PutMapping("/updateById")
    public Result updateMenuById(@RequestBody SysMenu sysMenu) {
        log.info("更新菜单: {}", sysMenu);
        sysMenuService.updateMenuById(sysMenu);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "根据ID删除菜单接口")
    @DeleteMapping("/deleteById/{id}")
    public Result deleteMenuById(@PathVariable Long id) {
        log.info("删除菜单 ID: {}", id);
        sysMenuService.deleteMenuById(id);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "获取用户菜单接口")
    @GetMapping(value = "/getUserMenu")
    public Result<SysMenuResp> getUserMenu() {
        List<SysMenu> menuListByUserId = sysMenuService.getMenuListByUserId();
        List<SysMenuResp> sysMenuResp = buildMenus(menuListByUserId);
        return Result.build(sysMenuResp, ResultCodeEnum.SUCCESS);
    }

    // 将List<SysMenu>对象转换成List<SysMenuVo>对象
    private List<SysMenuResp> buildMenus(List<SysMenu> menus) {

        List<SysMenuResp> sysMenuVoList = new LinkedList<SysMenuResp>();
        for (SysMenu sysMenu : menus) {
            SysMenuResp sysMenuResp = new SysMenuResp();
            sysMenuResp.setTitle(sysMenu.getTitle());
            sysMenuResp.setName(sysMenu.getComponent());
            List<SysMenu> children = sysMenu.getChildren();
            if (!CollectionUtils.isEmpty(children)) {
                sysMenuResp.setChildren(buildMenus(children));
            }
            sysMenuVoList.add(sysMenuResp);
        }
        return sysMenuVoList;
    }

}
