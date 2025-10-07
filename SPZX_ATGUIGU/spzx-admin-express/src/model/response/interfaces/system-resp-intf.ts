import { ISysMenu, ISysRole } from "@/model/entity/interfaces/system-entity-intf";
import { Nullable } from "@/types/basic-type";

export interface ILoginResp {
	token: Nullable<string>; // 令牌
	refresh_token: Nullable<string>; // 刷新令牌,可以为空
}

/**
 * 系统菜单响应结果实体类
 */
export interface ISysMenuResp {
	title: Nullable<string>; // 系统菜单标题
	name: Nullable<string>; // 系统菜单名称
	children: ISysMenuResp[]; // 系统菜单子菜单列表
}

/**
 * 验证码响应结果实体类
 */
export interface IValidateCodeResp {
	codeKey: Nullable<string>; // 验证码key
	codeValue: Nullable<string>; // 验证码值
}

// 获取所有角色列表和用户已分配的角色ID列表的返回类型
export type TRolesAndUserObj = {
	allRolesList: ISysRole[];
	userRoleIdList: number[];
}

// 根据用户ID查询用户的菜单权限和角色菜单ID列表的返回类型
export type TMenusAndRoleObj = {
	menuTreeList: ISysMenu[];
	roleMenuIdList: number[];
}
