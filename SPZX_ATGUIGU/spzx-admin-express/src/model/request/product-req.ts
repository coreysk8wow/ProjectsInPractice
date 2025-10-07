import { Nullable } from "@/types/basic-type";

/**
 * 搜索条件实体类
 */
export class CategoryBrandReq {
    brandId: Nullable<number>; // 品牌ID
    categoryId: Nullable<number>; // 分类ID

    constructor(brandId?: Nullable<number>, categoryId?: Nullable<number>) {
        this.brandId = brandId;
        this.categoryId = categoryId;
    }

    toJSON() {
        return {
            brandId: this.brandId,
            categoryId: this.categoryId
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/**
 * 商品搜索条件实体类
 */
export class ProductReq {
    brandId: Nullable<number>; // 品牌id
    category1Id: Nullable<number>; // 一级分类id
    category2Id: Nullable<number>; // 二级分类id
    category3Id: Nullable<number>; // 三级分类id

    constructor(
        brandId?: Nullable<number>,
        category1Id?: Nullable<number>,
        category2Id?: Nullable<number>,
        category3Id?: Nullable<number>
    ) {
        this.brandId = brandId;
        this.category1Id = category1Id;
        this.category2Id = category2Id;
        this.category3Id = category3Id;
    }

    toJSON() {
        return {
            brandId: this.brandId,
            category1Id: this.category1Id,
            category2Id: this.category2Id,
            category3Id: this.category3Id
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

export class SkuSaleReq {
    skuId: Nullable<number>;
    num: Nullable<number>;

    constructor(skuId?: Nullable<number>, num?: Nullable<number>) {
        this.skuId = skuId;
        this.num = num;
    }

    toJSON() {
        return {
            skuId: this.skuId,
            num: this.num
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}



