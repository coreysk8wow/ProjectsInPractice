package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.service.ISysMenuService;
import com.atguigu.spzx.manager.service.ISysUserService;
import com.atguigu.spzx.manager.service.IValidateCodeService;
import com.atguigu.spzx.model.entity.system.SysUser;
import com.atguigu.spzx.model.request.system.LoginReq;
import com.atguigu.spzx.model.response.common.Result;
import com.atguigu.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.model.response.system.LoginResp;
import com.atguigu.spzx.model.response.system.ValidateCodeResp;
import com.atguigu.spzx.utils.AuthContextUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Tag(name = "用户接口")
@RestController
@RequestMapping(value = "/admin/system/index")
public class IndexController {

    @Autowired
    private ISysUserService sysUserService;

    @Autowired
    private IValidateCodeService validateCodeService;

    @Autowired
    private ISysMenuService sysMenuService;

    @Operation(summary = "登陆接口")
    @PostMapping(value = "/login")
    public Result<LoginResp> login(@RequestBody LoginReq loginReq) {
        LoginResp login = sysUserService.login(loginReq);
        return Result.build(login, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "登出接口")
    @GetMapping(value = "/logout")
    public Result logout(@RequestHeader(value = "token") String token) {
        sysUserService.logout(token);
        return Result.build(null, ResultCodeEnum.SUCCESS);
    }

    @Operation(summary = "生成验证码接口")
    @GetMapping(value = "/generateValidateCode")
    public Result<ValidateCodeResp> generateValidateCode() {
        ValidateCodeResp validateCodeResp = validateCodeService.generateValidateCode();
        return Result.build(validateCodeResp , ResultCodeEnum.SUCCESS) ;
    }

    @Operation(summary = "获取用户信息接口")
    @GetMapping(value = "/getUserInfo")
    public Result<SysUser> getUserInfo() {
        return Result.build(AuthContextUtil.get(), ResultCodeEnum.SUCCESS) ;
    }

}
