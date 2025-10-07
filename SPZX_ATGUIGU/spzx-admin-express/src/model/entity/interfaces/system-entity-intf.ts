import { Nullable } from "@/types/basic-type";
import { IBaseEntity } from "./baseEntity-intf"

/** 系统菜单实体类 */
export interface ISysMenu extends IBaseEntity {
    // 父节点id
    parentId: number;

    // 节点标题
    title: string;

    // 组件名称
    component: Nullable<string>;

    // 排序值
    sortValue: number;

    // 状态(0:禁止,1:正常)
    status: number;

    // 子节点
    children: ISysMenu[];
}

/** SysOperLog */
export interface ISysOperLog extends IBaseEntity {
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
}

/** 角色实体类 */
export interface ISysRole extends IBaseEntity {
    // 角色名称
    roleName: string;

    // 角色编码
    roleCode: Nullable<string>;

    // 描述
    description: Nullable<string>;
}

export interface ISysRoleUser extends IBaseEntity {
    // 角色id
    roleId: number;

    // 用户id
    userId: number;
}

/** 系统用户实体类 */
export interface ISysUser extends IBaseEntity {
    // 用户名
    userName: string;

    // 密码
    password: string;

    // 昵称
    name: Nullable<string>;

    // 手机号码
    phone: Nullable<string>;

    // 图像
    avatar: Nullable<string>;

    // 描述
    description: Nullable<string>;

    // 状态（1：正常 0：停用）
    status: number;
}
