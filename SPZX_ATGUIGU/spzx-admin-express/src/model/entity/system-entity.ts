import { Nullable } from "../../types/basic-type";
import { BaseEntity } from "./base-entity";

/** 系统菜单实体类 */
export class SysMenu extends BaseEntity {
    // 父节点id
    parentId: Nullable<number>;

    // 节点标题
    title: Nullable<string>;

    // 组件名称
    component: Nullable<string>;

    // 排序值
    sortValue: Nullable<number>;

    // 状态(0:禁止,1:正常)
    status: Nullable<number>;

    // 子节点
    children: SysMenu[];

    constructor(
        parentId?: Nullable<number>,
        title?: Nullable<string>,
        component?: Nullable<string>,
        sortValue?: Nullable<number>,
        status?: Nullable<number>,
        children: SysMenu[] = [],
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.parentId = parentId;
        this.title = title;
        this.component = component;
        this.sortValue = sortValue;
        this.status = status;
        this.children = children;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentId: this.parentId,
            title: this.title,
            component: this.component,
            sortValue: this.sortValue,
            status: this.status,
            children: this.children
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** SysOperLog */
export class SysOperLog extends BaseEntity {
    // 模块标题
    title: Nullable<string>;

    // 方法名称
    method: Nullable<string>;

    // 请求方式
    requestMethod: Nullable<string>;

    // 业务类型（0其它 1新增 2修改 3删除）
    businessType: Nullable<number>;

    // 操作类别（0其它 1后台用户 2手机端用户）
    operatorType: Nullable<string>;

    // 操作人员
    operName: Nullable<string>;

    // 请求URL
    operUrl: Nullable<string>;

    // 主机地址
    operIp: Nullable<string>;

    // 请求参数
    operParam: Nullable<string>;

    // 返回参数
    jsonResult: Nullable<string>;

    // 操作状态（0正常 1异常）
    status: Nullable<number>;

    // 错误消息
    errorMsg: Nullable<string>;

    constructor(
        title?: Nullable<string>,
        method?: Nullable<string>,
        requestMethod?: Nullable<string>,
        businessType?: Nullable<number>,
        operatorType?: Nullable<string>,
        operName?: Nullable<string>,
        operUrl?: Nullable<string>,
        operIp?: Nullable<string>,
        operParam?: Nullable<string>,
        jsonResult?: Nullable<string>,
        status?: Nullable<number>,
        errorMsg?: Nullable<string>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.title = title;
        this.method = method;
        this.requestMethod = requestMethod;
        this.businessType = businessType;
        this.operatorType = operatorType;
        this.operName = operName;
        this.operUrl = operUrl;
        this.operIp = operIp;
        this.operParam = operParam;
        this.jsonResult = jsonResult;
        this.status = status;
        this.errorMsg = errorMsg;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            title: this.title,
            method: this.method,
            requestMethod: this.requestMethod,
            businessType: this.businessType,
            operatorType: this.operatorType,
            operName: this.operName,
            operUrl: this.operUrl,
            operIp: this.operIp,
            operParam: this.operParam,
            jsonResult: this.jsonResult,
            status: this.status,
            errorMsg: this.errorMsg
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 角色实体类 */
export class SysRole extends BaseEntity {
    // 角色名称
    roleName: Nullable<string>;

    // 角色编码
    roleCode: Nullable<string>;

    // 描述
    description: Nullable<string>;

    constructor(
        roleName?: Nullable<string>,
        roleCode?: Nullable<string>,
        description?: Nullable<string>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.roleName = roleName;
        this.roleCode = roleCode;
        this.description = description;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            roleName: this.roleName,
            roleCode: this.roleCode,
            description: this.description
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

export class SysRoleUser extends BaseEntity {
    // 角色id
    roleId: Nullable<number>;

    // 用户id
    userId: Nullable<number>;

    constructor(
        roleId?: Nullable<number>,
        userId?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.roleId = roleId;
        this.userId = userId;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            roleId: this.roleId,
            userId: this.userId
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 系统用户实体类 */
export class SysUser extends BaseEntity {
    // 用户名
    userName: Nullable<string>;

    // 密码
    password: Nullable<string>;

    // 昵称
    name: Nullable<string>;

    // 手机号码
    phone: Nullable<string>;

    // 图像
    avatar: Nullable<string>;

    // 描述
    description: Nullable<string>;

    // 状态（1：正常 0：停用）
    status: Nullable<number>;

    constructor(
        userName?: Nullable<string>,
        password?: Nullable<string>,
        name?: Nullable<string>,
        phone?: Nullable<string>,
        avatar?: Nullable<string>,
        description?: Nullable<string>,
        status?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.avatar = avatar;
        this.description = description;
        this.status = status;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            userName: this.userName,
            password: this.password,
            name: this.name,
            phone: this.phone,
            avatar: this.avatar,
            description: this.description,
            status: this.status
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}