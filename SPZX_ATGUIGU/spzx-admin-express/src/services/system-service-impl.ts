import { db } from "@/config/db-config";
import { redisClient } from "@/config/redis-config";
import { CODEKEY_PREFIX, LOGIN_TOKEN_PREFIX } from "@/constants/redis-constants";
import {
    sysMenu as sysMenuTbl,
    sysRoleMenu as sysRoleMenuTbl,
    sysRole as sysRoleTbl,
    sysUserRole as sysUserRoleTbl,
    sysUser as sysUserTbl,
} from "@/db/schema";
import { GuiguException } from "@/exceptions/custom-exception";
import { ISysMenu, ISysRole, ISysUser } from "@/model/entity/interfaces/system-entity-intf";
import {
    IAssignMenuReq,
    IAssignRoleReq,
    ILoginReq,
    ISysRoleReq,
    ISysUserReq,
} from "@/model/request/interfaces/system-req-intf";
import { PageInfo, ResultCodeEnum } from "@/model/response/common-resp";
import {
    ILoginResp,
    TMenusAndRoleObj,
    TRolesAndUserObj,
} from "@/model/response/interfaces/system-resp-intf";
import { Nullable } from "@/types/basic-type";
import { generateMD5Hash } from "@/utils/encryption-util";
import { MenuHelper } from "@/utils/menu-util";
import { config } from "dotenv";
import { and, asc, count, desc, eq, gte, like, lte } from "drizzle-orm";
import { Container as IoC, Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import {
    ISysMenuService,
    ISysRoleMenuService,
    ISysRoleService,
    ISysUserRoleService,
    ISysUserService,
} from "./interfaces/system-service-intf";


// Specify custom .env path
config({ path: ".env" });

const sysUserCols = {
	id: sysUserTbl.id,
	userName: sysUserTbl.username,
	password: sysUserTbl.password,
	name: sysUserTbl.name,
	phone: sysUserTbl.phone,
	avatar: sysUserTbl.avatar,
	description: sysUserTbl.description,
	status: sysUserTbl.status,
	createTime: sysUserTbl.createTime,
	updateTime: sysUserTbl.updateTime,
	isDeleted: sysUserTbl.isDeleted,
};

const sysMenuCols = {
	id: sysMenuTbl.id,
	parentId: sysMenuTbl.parentId,
	title: sysMenuTbl.title,
	component: sysMenuTbl.component,
	sortValue: sysMenuTbl.sortValue,
	status: sysMenuTbl.status,
	createTime: sysMenuTbl.createTime,
	updateTime: sysMenuTbl.updateTime,
	isDeleted: sysMenuTbl.isDeleted,
};

@Service()
export class SysUserServiceImpl implements ISysUserService {
	// 用户登录
	async login(req: ILoginReq): Promise<Nullable<ILoginResp>> {
		// 校验验证码是否正确
		const captcha: string = req.captcha!;
		const codeKey: string = req.codeKey!;
		// 从Redis中获取验证码
		const redisValue = await redisClient.get(`${CODEKEY_PREFIX}${codeKey}`);
		if (
			redisValue === null ||
			redisValue === undefined ||
			redisValue.toLowerCase() !== captcha.toLowerCase()
		) {
			throw GuiguException.fromEnum(ResultCodeEnum.WRONG_VALIDATECODE);
		}

		// 验证通过后，删除redis中的验证码
		redisClient.del(`${CODEKEY_PREFIX}${codeKey}`);

		// 根据用户名查询用户
		const sysUser: Nullable<ISysUser> = await this.selectByUserName(req.userName);
		if (sysUser === null || sysUser === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.USER_NOT_EXISTS);
		}

		// 验证密码是否正确
		if (req.password === null || req.password === undefined || req.password.trim() === "") {
			throw GuiguException.fromEnum(ResultCodeEnum.USER_PASSWORD_CAPTCHA_EMPTY);
		}
		const pwd: string = req.password;
		const pwdDigest = generateMD5Hash(pwd);
		if (pwdDigest !== sysUser.password) {
			throw GuiguException.fromEnum(ResultCodeEnum.WRONG_PASSWORD);
		}

		// 生成令牌，保存数据到Redis中
		const token = uuidv4().replace(/-/g, "");
		redisClient.setEx(`${LOGIN_TOKEN_PREFIX}${token}`, 30 * 60, JSON.stringify(sysUser));
		console.log(`user token: ${LOGIN_TOKEN_PREFIX}${token}`);

		return {
			token: token,
			refresh_token: "", // 暂不实现刷新令牌功能
		} as ILoginResp;
	}

	// 用户登出
	async logout(token: string): Promise<void> {
		await redisClient.del(`${LOGIN_TOKEN_PREFIX}${token}`);
	}

	// 根据token，从Redis获取用户信息
	async getUserInfo(token: string): Promise<Nullable<ISysUser>> {
		const redisValue = await redisClient.get(`${LOGIN_TOKEN_PREFIX}${token}`);
		return redisValue ? (JSON.parse(redisValue) as ISysUser) : null;
	}

	// 重置用户会话过期时间
	async resetUserTimeout(token: string, timeoutInSeconds: number): Promise<void> {
		await redisClient.expire(`${LOGIN_TOKEN_PREFIX}${token}`, timeoutInSeconds);
	}

	async findAll(): Promise<ISysUser[]> {
		const result: ISysUser[] = await db
			.select(sysUserCols)
			.from(sysUserTbl)
			.orderBy(asc(sysUserTbl.id));
		if (result.length === 0) {
			return [];
		} else {
			return result;
		}
	}

	async findByPage(
		sysUserReq: ISysUserReq,
		pageNum: number,
		pageSize: number
	): Promise<PageInfo<ISysUser>> {
		// Build conditions dynamically
		const whereConditions = [];
		// Only add userId condition if it's not null/undefined
		if (
			sysUserReq.keyword !== null &&
			sysUserReq.keyword !== undefined &&
			sysUserReq.keyword.trim() !== ""
		) {
			whereConditions.push(like(sysUserTbl.username, sysUserReq.keyword));
		}
		if (
			sysUserReq.createTimeBegin !== null &&
			sysUserReq.createTimeBegin !== undefined &&
			sysUserReq.createTimeBegin.trim() !== ""
		) {
			const beginDate: Date = new Date(sysUserReq.createTimeBegin);
			whereConditions.push(gte(sysUserTbl.createTime, beginDate));
		}
		if (
			sysUserReq.createTimeEnd !== null &&
			sysUserReq.createTimeEnd !== undefined &&
			sysUserReq.createTimeEnd.trim() !== ""
		) {
			const endDate: Date = new Date(sysUserReq.createTimeEnd);
			whereConditions.push(lte(sysUserTbl.createTime, endDate));
		}
		whereConditions.push(eq(sysUserTbl.isDeleted, 0));

		const offset = (pageNum - 1) * pageSize;
		const result: ISysUser[] = await db
			.select(sysUserCols)
			.from(sysUserTbl)
			.where(and(...whereConditions))
			.orderBy(asc(sysUserTbl.id))
			.offset(offset)
			.limit(pageSize);

		const total = (
			await db
				.select({ cnt: count(sysUserTbl.id) })
				.from(sysUserTbl)
				.where(and(...whereConditions))
		)[0].cnt;

		console.log(`Total users matching criteria: ${total}`);
		console.log("result" + JSON.stringify(result));

		return new PageInfo<ISysUser>(result, total);
	}

	async findById(id: number): Promise<Nullable<ISysUser>> {
		if (!id || id <= 0) {
			return null;
		}

		const result: ISysUser[] = await db
			.select(sysUserCols)
			.from(sysUserTbl)
			.where(and(eq(sysUserTbl.id, id), eq(sysUserTbl.isDeleted, 0)));

		if (result.length === 0) {
			return null;
		} else {
			return result[0];
		}
	}

	async addUser(sysUser: ISysUser): Promise<void> {
		// 检查用户名是否已存在
		const existingUser = await this.selectByUserName(sysUser.userName);
		if (existingUser) {
			throw GuiguException.fromEnum(ResultCodeEnum.USER_NAME_IS_EXISTS);
		}

        // 对密码进行MD5加密
		const pwdDigest = generateMD5Hash(sysUser.password);

        const now = new Date();

        const userToInsert = {
            ...sysUser,
            username: sysUser.userName,
            password: pwdDigest,
            id: undefined, // let the database auto-generate the ID
            createTime: now,
		    updateTime: now,
        }

		// 插入新用户
		await db.insert(sysUserTbl).values(userToInsert);
	}

	async updateUserById(sysUser: Partial<ISysUser>): Promise<void> {
		if (sysUser.id === null || sysUser.id === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
        }

		// 检查用户是否已存在
		const existingUser = await this.findById(sysUser.id);
		if (existingUser === null || existingUser === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.USER_NOT_EXISTS);
		} else if (existingUser.userName !== sysUser.userName) {
			throw GuiguException.fromEnum(ResultCodeEnum.USERNAME_CHANGING_FORBIDDEN);
		}

		// 修改用户信息菜单李不修改密码，改密码走专门流程。
		sysUser.password = undefined;

		// 插入新用户
		const userToUpdate = {
			...sysUser,
			createTime: undefined,
			updateTime: new Date(),
            id: sysUser.id
		};
		await db
			.update(sysUserTbl)
			.set(userToUpdate)
			.where(eq(sysUserTbl.id, sysUser.id));
	}

	async deleteById(id: number, isCascade: boolean): Promise<void> {
		await db
			.update(sysUserTbl)
			.set({ isDeleted: 1, updateTime: new Date() })
			.where(eq(sysUserTbl.id, id));

		//级联删除用户角色关联
		if (isCascade) {
			await db
				.update(sysUserRoleTbl)
				.set({ isDeleted: 1, updateTime: new Date() })
				.where(eq(sysUserRoleTbl.userId, id));
		}
	}

	// Transactional
	async assignRoleToUser(assignRoleReq: IAssignRoleReq): Promise<void> {
		const userId: number = assignRoleReq.userId;
		const roleIdListNew: number[] = assignRoleReq.roleIdList;
		const roleIdSetNew: Set<number> = new Set(roleIdListNew);

		await db.transaction(async (tx) => {
			// Build conditions dynamically
			const whereConditions = [eq(sysUserRoleTbl.isDeleted, 0)];
			// Only add userId condition if it's not null/undefined
			if (userId !== null && userId !== undefined) {
				whereConditions.push(eq(sysUserRoleTbl.userId, userId));
			}
			const roleIdListOld: number[] = (
				await tx
					.select({ roleId: sysUserRoleTbl.roleId })
					.from(sysUserRoleTbl)
					.where(and(...whereConditions))
					.orderBy(desc(sysUserRoleTbl.id))
			).map((r) => r.roleId);
			const roleIdSetOld: Set<number> = new Set(roleIdListOld);

			// Elements in NEW but not in OLD (NEW - OLD)
			const onlyInNew: Array<number> = roleIdListNew.filter((x) => !roleIdSetOld.has(x));
			console.log("Only in new (roles to add): ", onlyInNew);

			// Elements in OLD but not in NEW (OLD - NEW)
			const onlyInOld: Array<number> = roleIdListOld.filter((x) => !roleIdSetNew.has(x));
			console.log("Only in old (roles to remove): ", onlyInOld);

			// Elements in both NEW and OLD (NEW ∩ OLD)
			const inBoth: Array<number> = roleIdListNew.filter((x) => roleIdSetOld.has(x));
			console.log("In both NEW and OLD(roles unchanged): ", inBoth);

			if (onlyInNew.length > 0) {
				// 如果有新增的角色ID，则插入到sys_user_role表中
				for (const roleId of onlyInNew) {
					const now = new Date();
					await tx.insert(sysUserRoleTbl).values({
						roleId: roleId,
						userId: userId,
						createTime: now,
						updateTime: now,
						isDeleted: 0,
					});
				}
			}

			if (onlyInOld.length > 0) {
				// 如果有删除的角色ID，则从sys_user_role表中删除
				for (const roleId of onlyInOld) {
					await tx
						.update(sysUserRoleTbl)
						.set({ isDeleted: 1, updateTime: new Date() })
						.where(
							and(
								eq(sysUserRoleTbl.userId, userId),
								eq(sysUserRoleTbl.roleId, roleId),
								eq(sysUserRoleTbl.isDeleted, 0)
							)
						);
				}
			}
		});
	}

	private async selectByUserName(userName: string): Promise<Nullable<ISysUser>> {
		const result: ISysUser[] = await db
			.select(sysUserCols)
			.from(sysUserTbl)
			.where(and(eq(sysUserTbl.username, userName), eq(sysUserTbl.isDeleted, 0)));

		if (result.length === 0) {
			return null;
		} else {
			return result[0];
		}
	}
}

@Service()
export class SysMenuServiceImpl implements ISysMenuService {
	async genMenuTree(): Promise<ISysMenu[]> {
		const menus = await db
			.select(sysMenuCols)
			.from(sysMenuTbl)
			.where(eq(sysMenuTbl.isDeleted, 0));
		if (menus === null || menus === undefined) return [];

		const menuList: ISysMenu[] = menus.map((m) => ({
			...m,
			children: [],
		}));

		// 构建菜单树
		return MenuHelper.buildMenuTree(menuList);
	}

	// Transactional
	async addMenu(sysMenu: ISysMenu): Promise<void> {
		const menuToInsert = {
			...sysMenu,
			id: undefined, // let the database auto-generate the ID
			createTime: new Date(),
			updateTime: new Date(),
		};

		try {
			await db.transaction(async (tx) => {
				await tx.insert(sysMenuTbl).values(menuToInsert);
				// 如果新菜单有上级菜单，则将上级菜单的is_half设置为1（半开）
				await this.updateSysRoleMenuIsHalf(sysMenu, tx);
			});
		} catch (error) {
			console.error("Transaction failed and rolled back:", error);
			throw error; // Rethrow the error after logging it
		}
	}

	// 如果新菜单有上级菜单，则将上级菜单的is_half设置为1（半开）
	private async updateSysRoleMenuIsHalf(sysMenu: ISysMenu, tx: any): Promise<void> {
		// 查询是否存在父节点
		const parentMenu = await tx
			.select()
			.from(sysMenuTbl)
			.where(and(eq(sysMenuTbl.id, sysMenu.parentId), eq(sysMenuTbl.isDeleted, 0)));

		if (parentMenu && parentMenu.length > 0) {
			await tx
				.update(sysRoleMenuTbl)
				.set({ isHalf: 1, updateTime: new Date() })
				.where(eq(sysRoleMenuTbl.menuId, sysMenu.parentId));
		}
	}

	async updateMenuById(sysMenu: Partial<ISysMenu>): Promise<void> {
		if (!sysMenu || sysMenu.id === null || sysMenu.id === undefined)
			throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);

		const menuToUpdate = {
			...sysMenu,
			createTime: undefined,
			updateTime: new Date(),
            id: sysMenu.id
		};

		await db
			.update(sysMenuTbl)
			.set(menuToUpdate)
			.where(and(eq(sysMenuTbl.id, sysMenu.id), eq(sysMenuTbl.isDeleted, 0)));
	}

	// Transactional
	async deleteMenuById(id: number): Promise<void> {
		if (id === null || id === undefined) {
			throw new GuiguException(0, "Menu ID cannot be null");
		}

		try {
			await db.transaction(async (tx) => {
				// 先查询是否存在子菜单，如果存在不允许进行删除
				const result = await tx
					.select({ cnt: count(sysMenuTbl.id) })
					.from(sysMenuTbl)
					.where(and(eq(sysMenuTbl.parentId, id), eq(sysMenuTbl.isDeleted, 0)));
				if (result[0].cnt > 0) {
					throw GuiguException.fromEnum(ResultCodeEnum.NODE_ERROR);
				}

				// 如果不存在子菜单，开始删除
				tx.update(sysMenuTbl)
					.set({ isDeleted: 1, updateTime: new Date() })
					.where(and(eq(sysMenuTbl.id, id), eq(sysMenuTbl.isDeleted, 0)));
				// 同时删除sys_role_menu表中对应的记录
				tx.update(sysRoleMenuTbl)
					.set({ isDeleted: 1, updateTime: new Date() })
					.where(eq(sysRoleMenuTbl.menuId, id));
			});
		} catch (error) {
			console.error("Transaction failed and rolled back:", error);
			throw error; // Rethrow the error after logging it
		}
	}

	/**
	 * 获取当前用户的菜单列表
	 * @param userId 当前登录用户的id
	 */
	async getMenuListByUserId(userId: number): Promise<ISysMenu[]> {
		const menus = await db
			.selectDistinct(sysMenuCols)
			.from(sysMenuTbl)
			.innerJoin(sysRoleMenuTbl, eq(sysMenuTbl.id, sysRoleMenuTbl.menuId))
			.innerJoin(sysUserRoleTbl, eq(sysRoleMenuTbl.roleId, sysUserRoleTbl.roleId))
			.where(
				and(
					eq(sysUserRoleTbl.userId, userId),
					eq(sysMenuTbl.isDeleted, 0),
					eq(sysRoleMenuTbl.isDeleted, 0),
					eq(sysUserRoleTbl.isDeleted, 0)
				)
			);

		const menuList: ISysMenu[] = menus.map((m) => ({
			...m,
			children: [],
		}));
		return MenuHelper.buildMenuTree(menuList);
	}
}

@Service()
export class SysRoleServiceImpl implements ISysRoleService {
	async addRole(sysRole: ISysRole): Promise<void> {
		const now = new Date();
		const roleToInsert = {
			...sysRole,
			id: undefined, // let the database auto-generate the ID
			createTime: now,
			updateTime: now,
		};

		await db.insert(sysRoleTbl).values(roleToInsert);
	}

	async findByPage(
		sysRoleReq: ISysRoleReq,
		pageNum: number,
		pageSize: number
	): Promise<PageInfo<ISysRole>> {
		// Build conditions dynamically
		const whereConditions = [];
		// Only add userId condition if it's not null/undefined
		if (
			sysRoleReq.roleName !== null &&
			sysRoleReq.roleName !== undefined &&
			sysRoleReq.roleName.trim() !== ""
		) {
			whereConditions.push(like(sysRoleTbl.roleName, `%${sysRoleReq.roleName}%`));
		}
		whereConditions.push(eq(sysRoleTbl.isDeleted, 0));

		const offset = (pageNum - 1) * pageSize;
		const result: ISysRole[] = await db
			.select()
			.from(sysRoleTbl)
			.where(and(...whereConditions))
			.orderBy(asc(sysRoleTbl.id))
			.limit(pageSize)
			.offset(offset);

		const total = (
			await db
				.select({ cnt: count(sysRoleTbl.id) })
				.from(sysRoleTbl)
				.where(and(...whereConditions))
		)[0].cnt;

		return new PageInfo<ISysRole>(result, total);
	}

	async updateById(sysRole: Partial<ISysRole>): Promise<void> {
		if (sysRole.id === null || sysRole.id === undefined)
			throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);

		const roleToUpdate = {
			...sysRole,
            id: sysRole.id,
			createTime: undefined,
			updateTime: new Date(),
		};

		await db
			.update(sysRoleTbl)
			.set(roleToUpdate)
			.where(eq(sysRoleTbl.id, sysRole.id));
	}

	async deleteById(roleId: number): Promise<void> {
		// 检查是否有现存用户分配了该角色
		const cntUserByRole = await db
			.select({ cnt: count(sysUserRoleTbl.userId) })
			.from(sysUserRoleTbl)
			.where(eq(sysUserRoleTbl.roleId, roleId));

		if (cntUserByRole[0].cnt > 0) {
			throw GuiguException.fromEnum(ResultCodeEnum.DELETE_ROLE_USER_EXIST);
		}

		// 删除角色
		await db
			.update(sysRoleTbl)
			.set({ isDeleted: 1, updateTime: new Date() })
			.where(eq(sysRoleTbl.id, roleId));

		// 删除角色和菜单的关联关系
		await db
			.update(sysRoleMenuTbl)
			.set({ isDeleted: 1, updateTime: new Date() })
			.where(eq(sysRoleMenuTbl.roleId, roleId));
	}
}

@Service()
export class SysRoleMenuServiceImpl implements ISysRoleMenuService {
	#sysMenuService: ISysMenuService = IoC.get(SysMenuServiceImpl);

	async findSysRoleMenuByRoleId(roleId: number): Promise<TMenusAndRoleObj> {
		const menuTree: ISysMenu[] = await this.#sysMenuService.genMenuTree();

		const dbResult = await db
			.select({ mId: sysRoleMenuTbl.menuId })
			.from(sysRoleMenuTbl)
			.where(
				and(
					eq(sysRoleMenuTbl.roleId, roleId),
					eq(sysRoleMenuTbl.isDeleted, 0),
					eq(sysRoleMenuTbl.isHalf, 0)
				)
			);
		const roleMenuIdList: number[] = dbResult.map((r) => r.mId);

		return {
			menuTreeList: menuTree,
			roleMenuIdList: roleMenuIdList,
		} as TMenusAndRoleObj;
	}

	// Transactional
	async assignMenuToRole(assignMenuReq: IAssignMenuReq): Promise<void> {
		if (assignMenuReq === null || assignMenuReq === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
		}

		await db.transaction(async (tx) => {
			await tx.delete(sysRoleMenuTbl).where(eq(sysRoleMenuTbl.roleId, assignMenuReq.roleId));
			const menuIdList = assignMenuReq.menuIdList;
			if (menuIdList !== null && menuIdList !== undefined && menuIdList.length > 0) {
				for (const menuInfo of menuIdList) {
					const roleId = assignMenuReq.roleId;
					if (isNaN(menuInfo.id) || isNaN(menuInfo.isHalf)) {
						throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
					}
					const now = new Date();
					await tx.insert(sysRoleMenuTbl).values({
						roleId: roleId,
						menuId: menuInfo.id,
						isHalf: menuInfo.isHalf,
						createTime: now,
						updateTime: now,
						isDeleted: 0,
					});
				}
			}
		}).catch((error) => {
			console.error("Transaction failed and rolled back:", error);
			throw error; // Rethrow the error after logging it
		});
	}
}

@Service()
export class SysUserRoleServiceImpl implements ISysUserRoleService {
	/**
	 * 获取所有角色列表和用户已分配的角色ID列表
	 *
	 * @param userId
	 * @return 包含所有角色列表和用户已分配角色ID列表的Map
	 */
	async findAllRoles(userId: number): Promise<TRolesAndUserObj> {
		const allRoles: ISysRole[] = await db
			.select()
			.from(sysRoleTbl)
			.where(eq(sysRoleTbl.isDeleted, 0));

		// Build conditions dynamically
		const whereConditions = [eq(sysUserRoleTbl.isDeleted, 0)];
		// Only add userId condition if it's not null/undefined
		if (userId !== null && userId !== undefined) {
			whereConditions.push(eq(sysUserRoleTbl.userId, userId));
		}
		const userRoleIdList: number[] = (
			await db
				.select({ roleId: sysUserRoleTbl.roleId })
				.from(sysUserRoleTbl)
				.where(and(...whereConditions))
				.orderBy(desc(sysUserRoleTbl.id))
		).map((r) => r.roleId);

		/* 		const resultMap: Map<string, object> = new Map<string, object>();
		resultMap.set("allRolesList", allRoles);
		resultMap.set("userRoleIdList", userRoleIdList); */

		return {
			allRolesList: allRoles,
			userRoleIdList: userRoleIdList,
		} as TRolesAndUserObj;
	}
}
