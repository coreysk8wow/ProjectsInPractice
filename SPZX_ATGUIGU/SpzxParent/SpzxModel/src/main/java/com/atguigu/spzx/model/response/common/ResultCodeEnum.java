package com.atguigu.spzx.model.response.common;

import lombok.Getter;

@Getter // 提供获取属性值的getter方法
public enum ResultCodeEnum {

    SUCCESS(200 , "操作成功") ,
    LOGIN_ERROR(201 , "用户名或者密码错误"),
    VALIDATECODE_ERROR(202 , "验证码错误") ,
    LOGIN_AUTH(208 , "用户未登录"),
    USER_NAME_IS_EXISTS(209 , "用户名已经存在"),
    USER_NOT_EXISTS(210 , "用户不存在"),
    USERNAME_CHANGING_FORBIDDEN(210 , "用户名username不可以修改"),
    SYSTEM_ERROR(9999 , "系统异常，请稍后再试"),
    NODE_ERROR( 217, "该节点下有子节点，不可以删除，请先删除子菜单。"),
    DELETE_ROLE_USER_EXIST( 218, "该角色下有用户，不可以删除，请先删除用户。"),
    DATA_ERROR(204, "数据异常"),
    ACCOUNT_STOP( 216, "账号已停用"),

    STOCK_LESS( 219, "库存不足"),

    ;

    private Integer code ;      // 业务状态码
    private String message ;    // 响应消息

    private ResultCodeEnum(Integer code , String message) {
        this.code = code ;
        this.message = message ;
    }

}
