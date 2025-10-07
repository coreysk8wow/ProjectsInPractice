import { Nullable } from "@/types/basic-type";


/**
 * 请求参数实体类
 */
export class AssignMenuReq {
    roleId: Nullable<number>; // 角色id
    menuIdList: Nullable<Array<Map<string, number>>>; // 选中的菜单id的集合; Map的键表示菜单的id，值表示是否为半开; 0否，1是

    constructor(roleId?: Nullable<number>, menuIdList?: Nullable<Array<Map<string, number>>>) {
        this.roleId = roleId;
        this.menuIdList = menuIdList;
    }
}

/**
 * 请求参数实体类
 */
export class AssignRoleReq {
    userId: Nullable<number>; // 用户id
    roleIdList: Nullable<Array<number>>; // 角色id的List集合

    constructor(userId?: Nullable<number>, roleIdList?: Nullable<Array<number>>) {
        this.userId = userId;
        this.roleIdList = roleIdList;
    }
}

/**
 * 用户登录请求参数
 */
export class LoginReq {
    userName: Nullable<string>; // 用户名
    password: Nullable<string>; // 密码
    captcha: Nullable<string>; // 提交验证码
    codeKey: Nullable<string>; // 验证码key

    constructor(userName?: Nullable<string>, password?: Nullable<string>, captcha?: Nullable<string>, codeKey?: Nullable<string>) {
        this.userName = userName;
        this.password = password;
        this.captcha = captcha;
        this.codeKey = codeKey;
    }
}

/**
 * 请求参数实体类
 */
export class SysOperLogReq {
    title: Nullable<string>; // 模块名称
    operName: Nullable<string>; // 操作用户名
    createTimeBegin: Nullable<string>; // 开始时间
    createTimeEnd: Nullable<string>; // 结束时间

    constructor(title?: Nullable<string>, operName?: Nullable<string>, createTimeBegin?: Nullable<string>, createTimeEnd?: Nullable<string>) {
        this.title = title;
        this.operName = operName;
        this.createTimeBegin = createTimeBegin;
        this.createTimeEnd = createTimeEnd;
    }
}

/**
 * 请求参数实体类
 */
export class SysRoleReq {
    roleName: Nullable<string>; // 角色名称

    constructor(roleName?: Nullable<string>) {
        this.roleName = roleName;
    }
}

/**
 * 请求参数实体类
 */
export class SysUserReq {
    keyword: Nullable<string>; // 搜索关键字
    createTimeBegin: Nullable<string>; // 开始时间
    createTimeEnd: Nullable<string>; // 结束时间

    constructor(keyword?: Nullable<string>, createTimeBegin?: Nullable<string>, createTimeEnd?: Nullable<string>) {
        this.keyword = keyword;
        this.createTimeBegin = createTimeBegin;
        this.createTimeEnd = createTimeEnd;
    }
}
