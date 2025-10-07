import { Nullable } from "../../types/basic-type";
import { BaseEntity } from "./base-entity";


/** 购物车实体类 */
export class CartInfo extends BaseEntity {
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

    constructor(
        userId?: Nullable<number>,
        skuId?: Nullable<number>,
        cartPrice?: Nullable<number>,
        skuNum?: Nullable<number>,
        imgUrl?: Nullable<string>,
        skuName?: Nullable<string>,
        isChecked?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.userId = userId;
        this.skuId = skuId;
        this.cartPrice = cartPrice;
        this.skuNum = skuNum;
        this.imgUrl = imgUrl;
        this.skuName = skuName;
        this.isChecked = isChecked;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            userId: this.userId,
            skuId: this.skuId,
            cartPrice: this.cartPrice,
            skuNum: this.skuNum,
            imgUrl: this.imgUrl,
            skuName: this.skuName,
            isChecked: this.isChecked
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}