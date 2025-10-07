import { Nullable } from "../../types/basic-type";
import { BaseEntity } from "./base-entity";

/** 产品单元实体类 */
export class ProductUnit extends BaseEntity {
	name: Nullable<string>; // 单位名称，如"件","箱"

	constructor(
		name?: Nullable<string>,
		id?: Nullable<number>,
		createTime?: Nullable<Date>,
		updateTime?: Nullable<Date>,
		isDeleted?: Nullable<number>
	) {
		super(id, createTime, updateTime, isDeleted);
		this.name = name;
	}

	toJSON() {
		return {
			...super.toJSON(),
			name: this.name,
		};
	}

	toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

/** 品牌实体类 */
export class Brand extends BaseEntity {
	name: Nullable<string>; // 品牌名称
	logo: Nullable<string>; // 品牌logo

	constructor(
		name?: Nullable<string>,
		logo?: Nullable<string>,
		id?: Nullable<number>,
		createTime?: Nullable<Date>,
		updateTime?: Nullable<Date>,
		isDeleted?: Nullable<number>
	) {
		super(id, createTime, updateTime, isDeleted);
		this.name = name;
		this.logo = logo;
	}

	toJSON() {
		return {
			...super.toJSON(),
			name: this.name,
			logo: this.logo,
		};
	}

	toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

/** 分类实体类 */
export class Category extends BaseEntity {
	name: Nullable<string>; // 分类名称
	imageUrl: Nullable<string>; // 分类图片url
	parentId: Nullable<number>; // 父节点id
	status: Nullable<number>; // 分类状态: 是否显示[0-不显示，1显示]
	orderNum: Nullable<number>; // 排序字段
	hasChildren: Nullable<boolean>; // 是否存在子节点
	children: Category[]; // 子节点List集合

	constructor(
		name?: Nullable<string>,
		imageUrl?: Nullable<string>,
		parentId?: Nullable<number>,
		status?: Nullable<number>,
		orderNum?: Nullable<number>,
		hasChildren?: Nullable<boolean>,
		children: Category[] = [],
		id?: Nullable<number>,
		createTime?: Nullable<Date>,
		updateTime?: Nullable<Date>,
		isDeleted?: Nullable<number>
	) {
		super(id, createTime, updateTime, isDeleted);
		this.name = name;
		this.imageUrl = imageUrl;
		this.parentId = parentId;
		this.status = status;
		this.orderNum = orderNum;
		this.hasChildren = hasChildren;
		this.children = children;
	}

	toJSON() {
		return {
			...super.toJSON(),
			name: this.name,
			imageUrl: this.imageUrl,
			parentId: this.parentId,
			status: this.status,
			orderNum: this.orderNum,
			hasChildren: this.hasChildren,
			children: this.children,
		};
	}

	toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

/** 分类品牌实体类 */
export class CategoryBrand extends BaseEntity {
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

	constructor(
		brandId?: number,
		categoryId?: number,
		categoryName?: string,
		brandName?: string,
		logo?: string,
		id?: number,
		createTime?: Date,
		updateTime?: Date,
		isDeleted?: number
	) {
		super(id, createTime, updateTime, isDeleted);
		this.brandId = brandId;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.brandName = brandName;
		this.logo = logo;
	}

	toJSON() {
		return {
			...super.toJSON(),
			brandId: this.brandId,
			categoryId: this.categoryId,
			categoryName: this.categoryName,
			brandName: this.brandName,
			logo: this.logo,
		};
	}

	toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

/** 商品实体类 */
export class Product extends BaseEntity {
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
    productSkuList: ProductSku[]; // sku列表集合
    detailsImageUrls: Nullable<string>; // 图片详情列表

    constructor(
        name?: Nullable<string>,
        brandId?: Nullable<number>,
        category1Id?: Nullable<number>,
        category2Id?: Nullable<number>,
        category3Id?: Nullable<number>,
        unitName?: Nullable<string>,
        sliderUrls?: Nullable<string>,
        specValue?: Nullable<string>,
        status?: Nullable<number>,
        auditStatus?: Nullable<number>,
        auditMessage?: Nullable<string>,
        brandName?: Nullable<string>,
        category1Name?: Nullable<string>,
        category2Name?: Nullable<string>,
        category3Name?: Nullable<string>,
        productSkuList: ProductSku[] = [],
        detailsImageUrls?: Nullable<string>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.name = name;
        this.brandId = brandId;
        this.category1Id = category1Id;
        this.category2Id = category2Id;
        this.category3Id = category3Id;
        this.unitName = unitName;
        this.sliderUrls = sliderUrls;
        this.specValue = specValue;
        this.status = status;
        this.auditStatus = auditStatus;
        this.auditMessage = auditMessage;
        this.brandName = brandName;
        this.category1Name = category1Name;
        this.category2Name = category2Name;
        this.category3Name = category3Name;
        this.productSkuList = productSkuList;
        this.detailsImageUrls = detailsImageUrls;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            brandId: this.brandId,
            category1Id: this.category1Id,
            category2Id: this.category2Id,
            category3Id: this.category3Id,
            unitName: this.unitName,
            sliderUrls: this.sliderUrls,
            specValue: this.specValue,
            status: this.status,
            auditStatus: this.auditStatus,
            auditMessage: this.auditMessage,
            brandName: this.brandName,
            category1Name: this.category1Name,
            category2Name: this.category2Name,
            category3Name: this.category3Name,
            productSkuList: this.productSkuList,
            detailsImageUrls: this.detailsImageUrls,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}


/** ProductSku */
export class ProductSku extends BaseEntity {
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

    constructor(
        skuCode?: Nullable<string>,
        skuName?: Nullable<string>,
        productId?: Nullable<number>,
        thumbImg?: Nullable<string>,
        salePrice?: Nullable<number>,
        marketPrice?: Nullable<number>,
        costPrice?: Nullable<number>,
        stockNum?: Nullable<number>,
        saleNum?: Nullable<number>,
        skuSpec?: Nullable<string>,
        weight?: Nullable<string>,
        volume?: Nullable<string>,
        status?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.skuCode = skuCode;
        this.skuName = skuName;
        this.productId = productId;
        this.thumbImg = thumbImg;
        this.salePrice = salePrice;
        this.marketPrice = marketPrice;
        this.costPrice = costPrice;
        this.stockNum = stockNum;
        this.saleNum = saleNum;
        this.skuSpec = skuSpec;
        this.weight = weight;
        this.volume = volume;
        this.status = status;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            skuCode: this.skuCode,
            skuName: this.skuName,
            productId: this.productId,
            thumbImg: this.thumbImg,
            salePrice: this.salePrice,
            marketPrice: this.marketPrice,
            costPrice: this.costPrice,
            stockNum: this.stockNum,
            saleNum: this.saleNum,
            skuSpec: this.skuSpec,
            weight: this.weight,
            volume: this.volume,
            status: this.status,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 商品详情实体类 */
export class ProductDetails extends BaseEntity {
    productId: Nullable<number>;
    imageUrls: Nullable<string>;

    constructor(
        productId?: Nullable<number>,
        imageUrls?: Nullable<string>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.productId = productId;
        this.imageUrls = imageUrls;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            productId: this.productId,
            imageUrls: this.imageUrls,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 商品规格实体类 */
export class ProductSpec extends BaseEntity {
    specName: Nullable<string>; // 规格名称
    specValue: Nullable<string>; // 规格值

    constructor(
        specName?: Nullable<string>,
        specValue?: Nullable<string>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.specName = specName;
        this.specValue = specValue;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            specName: this.specName,
            specValue: this.specValue,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}