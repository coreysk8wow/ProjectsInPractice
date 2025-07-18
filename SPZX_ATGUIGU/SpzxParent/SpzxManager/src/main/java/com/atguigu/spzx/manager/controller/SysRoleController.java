package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.ISysRoleService;
import com.atguigu.spzx.model.entity.system.SysRole;
import com.atguigu.spzx.model.request.system.SysRoleReq;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "角色接口")
@RestController
@RequestMapping(value = "/admin/system/sysRole")
public class SysRoleController {

    @Autowired
    private ISysRoleService sysRoleService;

    @Operation(summary = "分页查询角色列表接口")
    @PostMapping(value = "/findByPage/{pageNum}/{pageSize}")
    public Result<PageInfo<SysRole>> findByPage(@RequestBody SysRoleReq sysRoleReq,
                                                @PathVariable(value = "pageNum", required = false) Integer pageNum,
                                                @PathVariable(value = "pageSize", required = false) Integer pageSize) {;

        if (pageNum == null || pageNum < 1) {
            pageNum = 1;
        }
        if (pageSize == null || pageSize < 1) {
            pageSize = 10;
        }

        PageInfo<SysRole> rolePageInfo = sysRoleService.findByPage(sysRoleReq, pageNum, pageSize);
        return Result.build(rolePageInfo, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "保存角色接口")
    @PostMapping(value = "/save")
    public Result save(@RequestBody SysRole sysRole) {
        sysRoleService.save(sysRole);
        log.debug("保存角色信息: {}", sysRole);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "更新角色接口")
    @PutMapping(value = "/updateById")
    public Result updateById(@RequestBody SysRole sysRole) {
        sysRoleService.updateById(sysRole);
        log.debug("更新角色信息: {}", sysRole);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "根据角色ID删除角色接口")
    @DeleteMapping(value = "/deleteById/{id}")
    public Result deleteById(@PathVariable Long id) {
        sysRoleService.deleteById(id);
        log.debug("删除角色ID: {}", id);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }
}
