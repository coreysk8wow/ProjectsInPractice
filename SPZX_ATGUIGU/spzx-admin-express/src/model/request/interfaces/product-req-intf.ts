import { IBaseEntity } from "@/model/entity/interfaces/baseEntity-intf";
import { Nullable } from "@/types/basic-type";

/**
 * 搜索条件实体类
 */
export interface ICategoryBrandReq {
    brandId: Nullable<number>; // 品牌ID
    categoryId: Nullable<number>; // 分类ID
}

/**
 * 商品搜索条件实体类
 */
export interface IProductReq {
    brandId: Nullable<number>; // 品牌id
    category1Id: Nullable<number>; // 一级分类id
    category2Id: Nullable<number>; // 二级分类id
    category3Id: Nullable<number>; // 三级分类id
}

export interface ISkuSaleReq {
    skuId: Nullable<number>;
    num: Nullable<number>;
}



