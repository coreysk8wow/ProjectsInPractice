import { Nullable } from "@/types/basic-type";
import { IBaseEntity } from "./baseEntity-intf";


/** 购物车实体类 */
export interface ICartInfo extends IBaseEntity {
    // 用户id
    userId: Nullable<number>;

    // skuid
    skuId: Nullable<number>;

    // 放入购物车时价格
    cartPrice: Nullable<number>;

    // 数量
    skuNum: Nullable<number>;

    // 图片文件
    imgUrl: Nullable<string>;

    // sku名称 (冗余)
    skuName: Nullable<string>;

    // isChecked
    isChecked: Nullable<number>;
}