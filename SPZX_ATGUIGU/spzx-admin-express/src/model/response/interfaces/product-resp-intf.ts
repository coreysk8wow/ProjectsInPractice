import { Nullable } from "@/types/basic-type";

/**
 * 使用NodeJS包：ExcelJS替代JAVA的EasyExcel
 */
export interface ICategoryExcelResp {
	id: Nullable<number>;
	name: Nullable<string>; // 名称
	imageUrl: Nullable<string>; // 图片url
	parentId: Nullable<number>; // 上级id
	status: Nullable<number>; // 状态
	orderNum: Nullable<number>; // 排序号
}
