import { Nullable } from "@/types/basic-type";
import { IBaseEntity } from "./baseEntity-intf";


/** 产品单元实体类 */
export interface IProductUnit extends IBaseEntity {
	name: Nullable<string>; // 单位名称，如"件","箱"
}

/** 品牌实体类 */
export interface IBrand extends IBaseEntity {
	name: Nullable<string>; // 品牌名称
	logo: Nullable<string>; // 品牌logo
}

/** 分类实体类 */
export interface ICategory extends IBaseEntity {
	name: Nullable<string>; // 分类名称
	imageUrl: Nullable<string>; // 分类图片url
	parentId: Nullable<number>; // 父节点id
	status: Nullable<number>; // 分类状态: 是否显示[0-不显示，1显示]
	orderNum: Nullable<number>; // 排序字段
	hasChildren: Nullable<boolean>; // 是否存在子节点
	children: ICategory[]; // 子节点List集合
}

/** 分类品牌实体类 */
export interface ICategoryBrand extends IBaseEntity {
	/** 品牌id */
	brandId: Nullable<number>;

	/** 分类id */
	categoryId: Nullable<number>;

	/** 分类名称 */
	categoryName: Nullable<string>;

	/** 品牌名称 */
	brandName: Nullable<string>;

	/** 品牌logo */
	logo: Nullable<string>;
}

/** 商品实体类 */
export interface IProduct extends IBaseEntity {
    name: Nullable<string>; // 商品名称
    brandId: Nullable<number>; // 品牌id
    category1Id: Nullable<number>; // 一级分类id
    category2Id: Nullable<number>; // 二级分类id
    category3Id: Nullable<number>; // 三级分类id
    unitName: Nullable<string>; // 计量单位
    sliderUrls: Nullable<string>; // 轮播图url
    specValue: Nullable<string>; // 商品规格值json串
    status: Nullable<number>; // 线上状态：0-初始值，1-上架，-1-自主下架
    auditStatus: Nullable<number>; // 审核状态
    auditMessage: Nullable<string>; // 审核信息

    // 扩展的属性，用来封装响应的数据
    brandName: Nullable<string>; // 品牌名称
    category1Name: Nullable<string>; // 一级分类名称
    category2Name: Nullable<string>; // 二级分类名称
    category3Name: Nullable<string>; // 三级分类名称
    productSkuList: IProductSku[]; // sku列表集合
    detailsImageUrls: Nullable<string>; // 图片详情列表
}


/** ProductSku */
export interface IProductSku extends IBaseEntity {
    skuCode: Nullable<string>; // 商品编号
    skuName: Nullable<string>; // skuName
    productId: Nullable<number>; // 商品ID
    thumbImg: Nullable<string>; // 缩略图路径
    salePrice: Nullable<number>; // 售价
    marketPrice: Nullable<number>; // 市场价
    costPrice: Nullable<number>; // 成本价
    stockNum: Nullable<number>; // 库存数
    saleNum: Nullable<number>; // 销量
    skuSpec: Nullable<string>; // sku规格信息json
    weight: Nullable<string>; // 重量
    volume: Nullable<string>; // 体积
    status: Nullable<number>; // 线上状态：0-初始值，1-上架，-1-自主下架
}

/** 商品详情实体类 */
export interface IProductDetails extends IBaseEntity {
    productId: Nullable<number>;
    imageUrls: Nullable<string>;
}

/** 商品规格实体类 */
export interface IProductSpec extends IBaseEntity {
    specName: Nullable<string>; // 规格名称
    specValue: Nullable<string>; // 规格值
}