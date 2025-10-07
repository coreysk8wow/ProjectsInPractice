import { Nullable } from "@/types/basic-type";
import { ISysMenu, ISysRole, ISysUser } from "@/model/entity/interfaces/system-entity-intf";
import { TRolesAndUserObj, ILoginResp, TMenusAndRoleObj } from "@/model/response/interfaces/system-resp-intf";
import {
	IAssignMenuReq,
	IAssignRoleReq,
	ILoginReq,
	ISysRoleReq,
	ISysUserReq,
} from "@/model/request/interfaces/system-req-intf";
import { PageInfo } from "@/model/response/common-resp";

// export type SysUserWithIdPartial = Partial<ISysUser> & { id: number };
// export type SysRoleWithIdPartial = Partial<ISysRole> & { id: number };

export interface ISysUserService {
	login(req: ILoginReq): Promise<Nullable<ILoginResp>>;

	logout(token: string): Promise<void>;

	getUserInfo(token: string): Promise<Nullable<ISysUser>>;

	resetUserTimeout(token: string, timeoutInSeconds: number): Promise<void>;

	findAll(): Promise<ISysUser[]>;

	// 分页能否成功，待验证
	findByPage(sysUserReq: ISysUserReq, pageNum: number, pageSize: number): Promise<PageInfo<ISysUser>>;

	findById(id: number): Promise<Nullable<ISysUser>>;

	addUser(sysUser: ISysUser): Promise<void>;

	updateUserById(sysUser: Partial<ISysUser>): Promise<void>;

	deleteById(id: number, isCascade: boolean): Promise<void>;

	assignRoleToUser(assignRoleReq: IAssignRoleReq): Promise<void>;
}

export interface ISysMenuService {
	// 为当前所有菜单，生成菜单树。
	genMenuTree(): Promise<ISysMenu[]>;

	// 创建一个新菜单
	addMenu(sysMenu: ISysMenu): Promise<void>;

	// 更新菜单 by id
	updateMenuById(sysMenu: Partial<ISysMenu>): Promise<void>;

	// 删除菜单 by id
	deleteMenuById(id: number): Promise<void>;

	/**
	 * 获取当前用户的菜单列表
	 * @param userId 当前登录用户的id
	 */
	getMenuListByUserId(userId: number): Promise<ISysMenu[]>;
}

export interface ISysRoleService {
	addRole(sysRole: ISysRole): Promise<void>;

	findByPage(sysRoleReq: ISysRoleReq, pageNum: number, pageSize: number): Promise<PageInfo<ISysRole>>;

	updateById(sysRole: Partial<ISysRole>): Promise<void>;

	deleteById(roleId: number): Promise<void>;
}

export interface ISysRoleMenuService {
	findSysRoleMenuByRoleId(roleId: number): Promise<TMenusAndRoleObj>;

	assignMenuToRole(assignMenuReq: IAssignMenuReq): Promise<void>;
}

/**
 * 获取所有角色列表和用户已分配的角色ID列表
 *
 * @param userId
 * @return 包含所有角色列表和用户已分配角色ID列表的Map
 */
export interface ISysUserRoleService {
	findAllRoles(userId: number): Promise<TRolesAndUserObj>;
}
