package com.atguigu.spzx.manager.controller;

import com.atguigu.spzx.manager.controller.config.spzx.model.request.system.LoginReq;
import com.atguigu.spzx.manager.controller.config.spzx.model.response.common.Result;
import com.atguigu.spzx.manager.controller.config.spzx.model.response.common.ResultCodeEnum;
import com.atguigu.spzx.manager.controller.config.spzx.model.response.system.LoginResp;
import com.atguigu.spzx.manager.service.ISysUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "用户接口")
@RestController
@RequestMapping(value = "/admin/system/index")
public class IndexController {

    @Autowired
    private ISysUserService sysUserService;

    @Operation(summary = "登陆接口")
    @PostMapping(value = "/login")
    public Result<LoginResp> login(@RequestBody LoginReq loginReq) {
        LoginResp login = sysUserService.login(loginReq);
        return Result.build(login, ResultCodeEnum.SUCCESS);
    }

}
