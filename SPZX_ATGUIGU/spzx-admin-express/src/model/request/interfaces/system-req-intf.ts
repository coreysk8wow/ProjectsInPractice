import { Nullable } from "@/types/basic-type";


/**
 * 请求参数实体类
 */
export interface IAssignMenuReq {
    roleId: number; // 角色id
    
    // 选中的菜单id的集合; Map的键表示菜单的id，值表示是否为半开; 0否，1是
    menuIdList: Array<TMenuId>;
}

export type TMenuId = {
    id: number; // 菜单id
    isHalf: number; // 是否为半开; 0否，1是
}

/**
 * 请求参数实体类
 */
export interface IAssignRoleReq {
    userId: number; // 用户id
    roleIdList: Array<number>; // 角色id的List集合
}

/**
 * 用户登录请求参数
 */
export interface ILoginReq {
    userName: string; // 用户名
    password: string; // 密码
    captcha: string; // 提交验证码
    codeKey: string; // 验证码key
}

/**
 * 请求参数实体类
 */
export interface ISysOperLogReq {
    title: Nullable<string>; // 模块名称
    operName: Nullable<string>; // 操作用户名
    createTimeBegin: Nullable<string>; // 开始时间
    createTimeEnd: Nullable<string>; // 结束时间
}

/**
 * 请求参数实体类
 */
export interface ISysRoleReq {
    roleName: string; // 角色名称
}

/**
 * 请求参数实体类
 */
export interface ISysUserReq {
    keyword: Nullable<string>; // 搜索关键字
    createTimeBegin: Nullable<string>; // 开始时间
    createTimeEnd: Nullable<string>; // 结束时间
}
