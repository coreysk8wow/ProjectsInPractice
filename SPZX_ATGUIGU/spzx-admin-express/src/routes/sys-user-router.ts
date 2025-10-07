import { GuiguException } from "@/exceptions/custom-exception";
import { ISysRole, ISysUser } from "@/model/entity/interfaces/system-entity-intf";
import { SysRole } from "@/model/entity/system-entity";
import { PageInfo, Result, ResultCodeEnum } from "@/model/response/common-resp";
import {
	ISysRoleMenuService,
	ISysRoleService,
	ISysUserRoleService,
	ISysUserService,
} from "@/services/interfaces/system-service-intf";
import {
	SysRoleMenuServiceImpl,
	SysRoleServiceImpl,
	SysUserRoleServiceImpl,
	SysUserServiceImpl,
} from "@/services/system-service-impl";
import { Nullable } from "@/types/basic-type";
import express from "express";
import { Container as IoC } from "typedi";
import { IAssignRoleReq, ISysRoleReq, ISysUserReq } from "@/model/request/interfaces/system-req-intf";
import { sysRole, sysUserRole } from "@/db/schema";
import { TRolesAndUserObj } from "@/model/response/interfaces/system-resp-intf";

export const userRouter = express.Router();
const sysUserService: ISysUserService = IoC.get(SysUserServiceImpl);
const sysUserRoleService: ISysUserRoleService = IoC.get(SysUserRoleServiceImpl);

// 分页查询用户列表接口
userRouter.get("/findByPage/:pageNum/:pageSize", async (req, res) => {
	const { pageNum, pageSize } = req.params;
	let pgNum = Number(pageNum);
	let pgSize = Number(pageSize);
	if (isNaN(pgNum) || pgNum <= 0) {
		pgNum = 1;
	}
	if (isNaN(pgSize) || pgSize <= 0) {
		pgSize = 10;
	}
    
    // Springboot @ModelAttribute equivalent: directly using query parameters
	const sysUserReq: ISysUserReq = {
		keyword: req.query.keyword as Nullable<string>,
		createTimeBegin: req.query.createTimeBegin as Nullable<string>,
		createTimeEnd: req.query.createTimeEnd as Nullable<string>,
	};

	const usersPageInfo: PageInfo<ISysUser> = await sysUserService.findByPage(sysUserReq, pgNum, pgSize);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<PageInfo<ISysUser>>(ResultCodeEnum.SUCCESS, usersPageInfo)
    );
});

// 添加用户接口
userRouter.post('/addUser', async (req, res) => {
    const sysUser: ISysUser = req.body;
    console.log("Adding user:", sysUser);
    await sysUserService.addUser(sysUser);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 更新用户接口
userRouter.put('/updateUser', async (req, res) => {
    const sysUser: Partial<ISysUser> = req.body;
    console.log("Updating user:", sysUser);

    await sysUserService.updateUserById(sysUser);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 根据用户ID删除用户接口
userRouter.delete('/deleteById/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Deleting user with ID:", id);

    const identity = Number(id);
    await sysUserService.deleteById(identity, true);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 根据用户ID查询相应角色和全部角色接口
userRouter.get('/findAllRoles/:userId', async (req, res) => {
    const { userId } = req.params;
    const uId: number = Number(userId);

    const resultObject: TRolesAndUserObj = await sysUserRoleService.findAllRoles(uId);

    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<TRolesAndUserObj>(ResultCodeEnum.SUCCESS, resultObject)
    );
});

// 给用户赋予角色接口
userRouter.post('/assignRoleToUser', async (req, res) => {
    const assignRoleReq: IAssignRoleReq = req.body;
    sysUserService.assignRoleToUser(assignRoleReq);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});