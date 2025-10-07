import { GuiguException } from "@/exceptions/custom-exception";
import { ISysMenu } from "@/model/entity/interfaces/system-entity-intf";
import { ResultCodeEnum } from "@/model/response/common-resp";

export class MenuHelper {
	static buildMenuTree(menus: ISysMenu[]): ISysMenu[] {
		if (menus === null || menus === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.DATA_ERROR);
		}

		const tree: ISysMenu[] = [];
		for (const m of menus) {
			if (m === null || m === undefined) {
				throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
			} else if (m.parentId === 0) {
				tree.push(this.genSubTree(m, menus));
			}
		}

		return tree;
	}

	private static genSubTree(menu: ISysMenu, menus: ISysMenu[]): ISysMenu {
		menu.children = [];
		for (const m of menus) {
			if (m === null || m === undefined) {
				throw GuiguException.fromEnum(ResultCodeEnum.SYSTEM_ERROR);
			} else if (m.parentId === menu.id) {
				menu.children.push(this.genSubTree(m, menus));
			}
		}

		return menu;
	}
}
