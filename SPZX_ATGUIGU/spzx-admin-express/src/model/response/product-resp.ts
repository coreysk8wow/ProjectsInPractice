import { Nullable } from "../../types/basic-type";

/**
 * 使用NodeJS包：ExcelJS替代JAVA的EasyExcel
 */
export class CategoryExcelResp {
	id: Nullable<number>;
	name: Nullable<string>;
	imageUrl: Nullable<string>;
	parentId: Nullable<number>;
	status: Nullable<number>;
	orderNum: Nullable<number>; // 排序号

	constructor(
		id?: Nullable<number>,
		name?: Nullable<string>,
		imageUrl?: Nullable<string>,
		parentId?: Nullable<number>,
		status?: Nullable<number>,
		orderNum?: Nullable<number>
	) {
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.parentId = parentId;
		this.status = status;
		this.orderNum = orderNum;
	}

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            imageUrl: this.imageUrl,
            parentId: this.parentId,
            status: this.status,
            orderNum: this.orderNum
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
