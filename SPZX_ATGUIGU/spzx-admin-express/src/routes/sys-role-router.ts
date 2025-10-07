import { GuiguException } from "@/exceptions/custom-exception";
import { ISysRole } from "@/model/entity/interfaces/system-entity-intf";
import { PageInfo, Result, ResultCodeEnum } from "@/model/response/common-resp";
import { ISysRoleMenuService, ISysRoleService } from "@/services/interfaces/system-service-intf";
import { SysRoleMenuServiceImpl, SysRoleServiceImpl } from "@/services/system-service-impl";
import express from "express";
import { Container as IoC } from "typedi";
import { ISysRoleReq } from "@/model/request/interfaces/system-req-intf";
import { TMenusAndRoleObj } from "@/model/response/interfaces/system-resp-intf";


export const roleRouter = express.Router();
const sysRoleService: ISysRoleService = IoC.get(SysRoleServiceImpl);
const sysRoleMenuService: ISysRoleMenuService = IoC.get(SysRoleMenuServiceImpl);

// 分页查询角色列表接口
roleRouter.post('/findByPage/:pageNum/:pageSize', async (req, res) => {
    const { pageNum, pageSize } = req.params;
    let pgNum = Number(pageNum);
    let pgSize = Number(pageSize);    
    if (isNaN(pgNum) || pgNum <= 0) {
        pgNum = 1;
    }
    if (isNaN(pgSize) || pgSize <= 0) {
        pgSize = 10;
    }

    const sysRoleReq: ISysRoleReq = req.body;

    const sysRolePageInfo: PageInfo<ISysRole> = await sysRoleService.findByPage(sysRoleReq, pgNum, pgSize);

    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<PageInfo<ISysRole>>(ResultCodeEnum.SUCCESS, sysRolePageInfo)
    );
});

// 保存角色接口
roleRouter.post('/save', async (req, res) => {
    const sysRole: ISysRole = req.body;
    console.log("Saving role:", sysRole);
    await sysRoleService.addRole(sysRole);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 更新角色接口
roleRouter.put('/updateById', async (req, res) => {
    const sysRole: Partial<ISysRole> = req.body;
    console.log("Updating role:", sysRole);
    await sysRoleService.updateById(sysRole);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 根据角色ID删除角色接口
roleRouter.delete('/deleteById/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Deleting role with ID:", id);

    const identity = Number(id);
    if (isNaN(identity)) {
        throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
    }

    sysRoleService.deleteById(identity);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 根据角色ID查询相应角色的菜单和全部菜单接口
roleRouter.get('/getAllMenus/:roleId', async (req, res) => {
	const roleId = Number(req.params.roleId);
	if (isNaN(roleId)) {
		throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
	}
	const menuList: TMenusAndRoleObj = await sysRoleMenuService.findSysRoleMenuByRoleId(roleId);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<TMenusAndRoleObj>(ResultCodeEnum.SUCCESS, menuList)
    );
});

// 给角色分配菜单接口
roleRouter.post('/assignMenuToRole', async (req, res) => {
    const assignMenuReq = req.body;
    await sysRoleMenuService.assignMenuToRole(assignMenuReq);
    console.log("Assigned menus to role:", assignMenuReq);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

