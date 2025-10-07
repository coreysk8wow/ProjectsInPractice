import { Nullable } from "@/types/basic-type";

/**
 * 使用NodeJS包：ExcelJS替代JAVA的EasyExcel
 */
export interface ICategoryExcelResp {
	id: Nullable<number>;
	name: Nullable<string>;
	imageUrl: Nullable<string>;
	parentId: Nullable<number>;
	status: Nullable<number>;
	orderNum: Nullable<number>; // 排序号
}
