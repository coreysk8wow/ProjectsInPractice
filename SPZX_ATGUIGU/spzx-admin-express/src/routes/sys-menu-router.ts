import { GuiguException } from "@/exceptions/custom-exception";
import { ISysMenu, ISysUser } from "@/model/entity/interfaces/system-entity-intf";
import { Result, ResultCodeEnum } from "@/model/response/common-resp";
import { ISysMenuResp} from "@/model/response/interfaces/system-resp-intf";
import { ISysMenuService, } from "@/services/interfaces/system-service-intf";
import { SysMenuServiceImpl, } from "@/services/system-service-impl";
import express from "express";
import { Container as IoC } from "typedi";

export const menuRouter = express.Router();
const sysMenuService: ISysMenuService = IoC.get(SysMenuServiceImpl);

// 获取菜单树接口
menuRouter.get("/getMenuTree", async (req, res) => {
	const menuTree: ISysMenu[] = await sysMenuService.genMenuTree();
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<ISysMenu[]>(ResultCodeEnum.SUCCESS, menuTree)
	);
});

// 添加菜单接口
menuRouter.post("/add", async (req, res) => {
	const sysMenu: ISysMenu = req.body;
	console.log("Adding menu:", sysMenu);

	await sysMenuService.addMenu(sysMenu);
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
	);
});

// 更新菜单接口
menuRouter.put("/updateById", async (req, res) => {
	const sysMenu: Partial<ISysMenu> = req.body;
	console.log("Updating menu:", sysMenu);

	await sysMenuService.updateMenuById(sysMenu);
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
	);
});

// 根据ID删除菜单接口
menuRouter.delete("/deleteById/:id", async (req, res) => {
	const { id } = req.params;
	console.log("Deleting menu with ID:", id);

	await sysMenuService.deleteMenuById(Number(id));
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
	);
});

// 获取用户菜单接口
menuRouter.get("/getUserMenu", async (req, res) => {
	const currSysUser: ISysUser = res.locals.user;
	if (
		currSysUser === null ||
		currSysUser === undefined ||
		currSysUser.id === null ||
		currSysUser.id === undefined
	) {
		throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
	}

	const userMenuList = await sysMenuService.getMenuListByUserId(currSysUser.id);
    const userMenuRespList: ISysMenuResp[] = buildMenus(userMenuList);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<ISysMenuResp[]>(ResultCodeEnum.SUCCESS, userMenuRespList)
    );
});

// 将List<ISysMenu>转换成List<ISysMenuResp>
function buildMenus(menus: ISysMenu[]): ISysMenuResp[] {
    const sysMenuRespList: ISysMenuResp[] = [];
    for (const m of menus) {
        const sysMenuResp: ISysMenuResp = {
            title: m.title, 
            name: m.component, 
            children: [] as ISysMenuResp[]
        }
        if (m.children !== null && m.children !== undefined && m.children.length > 0) {
            sysMenuResp.children = buildMenus(m.children);
        }
        sysMenuRespList.push(sysMenuResp);
    }
    return sysMenuRespList;
}
