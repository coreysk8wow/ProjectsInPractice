import {
    IBrand,
    ICategory,
    ICategoryBrand,
    IProduct,
    IProductSpec,
    IProductUnit,
} from "@/model/entity/interfaces/product-entity-intf";
import { ByPage } from "@/model/request/interfaces/pagination";
import { ICategoryBrandReq, IProductReq } from "@/model/request/interfaces/product-req-intf";
import { PageInfo } from "@/model/response/common-resp";
import { Nullable } from "@/types/basic-type";
import { Response } from "express";

export interface ICategoryService {
	findByParentId(parentId: number): Promise<ICategory[]>;

	// 以EXCEL形式导出category数据
    exportDataAsExcel(res: Response): Promise<void>;

    importData(file: any): Promise<void>;
}

export interface IBrandService {
	/**
	 * 分页查询品牌
	 * @return {Promise<IBrand[]>} 品牌列表
	 */
	findByPage(pageNum: number, pageSize: number): Promise<PageInfo<IBrand>>;

	/**
	 * 查询所有品牌
	 * @return {Promise<IBrand[]>} 品牌列表
	 */
	findAll(): Promise<IBrand[]>;

	/**
	 * 添加新品牌
	 * @param brand
	 */
	addBrand(brand: IBrand): Promise<void>;

	/**
	 * 更新品牌信息
	 * @param brand
	 */
	updateBrand(brand: IBrand): Promise<void>;

	/**
	 * 删除品牌
	 * @param id
	 */
	deleteBrand(id: number): Promise<void>;
}

// 分类和品牌关系服务
export interface ICategoryBrandService {
	find(categoryBrandReq: ICategoryBrandReq, byPage?: ByPage): Promise<PageInfo<ICategoryBrand>>;

	add(categoryId: number, brandId: number): Promise<void>;

	updateById(categoryBrand: ICategoryBrand): Promise<void>;

	deleteById(id: number): Promise<void>;

	findBrandByCategoryId(categoryId: number): Promise<IBrand[]>;
}

// 商品规格服务
export interface IProductSpecService {
	getAllProductSpecs(byPage?: ByPage): Promise<PageInfo<IProductSpec>>;

	addProductSpec(productSpec: IProductSpec): Promise<void>;

	updateProductSpec(productSpec: IProductSpec): Promise<void>;

	deleteProductSpec(id: number): Promise<void>;
}

export interface IProductService {
	selectAll(productReq: IProductReq, byPage?: ByPage): Promise<PageInfo<IProduct>>;

    // Transactional
	addProduct(product: IProduct): Promise<void>;

	getProductById(id: number): Promise<Nullable<IProduct>>;

    // Transactional
    updateById(product: IProduct): Promise<void>;

    // Transactional
	// 删除商品，SKU，DETAILS
	deleteById(id: number): Promise<void>;

	// 商品审核状态更新
	updateAuditStatus(id: number, auditStatus: number): Promise<void>;

	// 商品上架状态更新
	updateStatus(id: number, status: number): Promise<void>;
}

export interface IProductUnitService {
    findAll(): Promise<IProductUnit[]>;
}