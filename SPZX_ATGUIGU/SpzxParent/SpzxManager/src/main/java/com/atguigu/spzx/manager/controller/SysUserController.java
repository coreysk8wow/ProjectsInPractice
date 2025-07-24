package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.ISysUserRoleService;
import com.atguigu.spzx.manager.service.ISysUserService;
import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.request.system.AssignRoleReq;
import com.atguigu.spzx.model.request.system.SysUserReq;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.github.pagehelper.PageInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "用户接口")
@RestController
@RequestMapping(value = "/admin/system/sysUser")
public class SysUserController {
    @Autowired
    private ISysUserService sysUserService;

    @Autowired
    private ISysUserRoleService sysUserRoleService;

    @Operation(summary = "分页查询用户列表接口")
    @GetMapping(value = "/findByPage/{pageNum}/{pageSize}")
    public Result<PageInfo<SysUser>> findByPage(
            // 此处不写@ModelAttribute也可以
            @ModelAttribute SysUserReq sysUserReq,
            @PathVariable Integer pageNum,
            @PathVariable Integer pageSize) {
        // 设置默认分页参数
        if (pageNum == null || pageNum < 1) {
            pageNum = 1;
        }
        if (pageSize == null || pageSize < 1) {
            pageSize = 10;
        }

        PageInfo<SysUser> userPageInfo = sysUserService.findByPage(sysUserReq, pageNum, pageSize);
        return Result.build(userPageInfo, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "添加用户接口")
    @PostMapping(value = "/addUser")
    public Result addUser(@RequestBody SysUser sysUser) {
        sysUserService.addUser(sysUser);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "更新用户接口")
    @PutMapping(value = "/updateUser")
    public Result updateUser(@RequestBody SysUser sysUser) {
        sysUserService.updateUser(sysUser);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "根据用户ID删除用户接口")
    @DeleteMapping(value = "/deleteById/{id}")
    public Result deleteById(@PathVariable Long id) {
        sysUserService.deleteById(id);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "根据用户ID查询相应角色和全部角色接口")
    @GetMapping(value = "/findAllRoles/{userId}")
    public Result<Map<String , Object>> findAllRoles(@PathVariable(value = "userId") Long userId) {
        Map<String, Object> resultMap = sysUserRoleService.findAllRoles(userId);
        return Result.build(resultMap , ResultCodeEnum.SUCCESS)  ;
    }

    @Operation(summary = "给用户赋予角色接口")
    @PostMapping(value = "/assignRoleToUser")
    public Result<String> assignRoleToUser(@RequestBody AssignRoleReq assignRoleReq) {
        sysUserService.assignRoleToUser(assignRoleReq);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

}
