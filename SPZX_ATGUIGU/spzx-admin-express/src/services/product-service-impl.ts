import { db } from "@/config/db-config";
import {
	brand as brandTbl,
	categoryBrand as categoryBrandTbl,
	category as categoryTbl,
	productDetails as productDetailsTbl,
	productSku as productSkuTbl,
	productSpec as productSpecTbl,
	product as productTbl,
	productUnit as productUnitTbl,
} from "@/db/schema";
import {
	IBrand,
	ICategory,
	ICategoryBrand,
	IProduct,
	IProductDetails,
	IProductSku,
	IProductSpec,
	IProductUnit,
} from "@/model/entity/interfaces/product-entity-intf";
import {
	IBrandService,
	ICategoryBrandService,
	ICategoryService,
	IProductService,
	IProductSpecService,
	IProductUnitService,
} from "@/services/interfaces/product-service-intf";
import { Nullable } from "@/types/basic-type";
import { and, asc, count, eq } from "drizzle-orm";
import { Service } from "typedi";

import { GuiguException } from "@/exceptions/custom-exception";
import { ByPage } from "@/model/request/interfaces/pagination";
import { ICategoryBrandReq, IProductReq } from "@/model/request/interfaces/product-req-intf";
import { PageInfo, Result, ResultCodeEnum } from "@/model/response/common-resp";
import { alias } from "drizzle-orm/mysql-core";
import ExcelJS from "exceljs";
import { Response } from "express";

@Service()
export class CategoryServiceImpl implements ICategoryService {
	async findByParentId(parentId: number): Promise<ICategory[]> {
		const catArr = await db
			.select()
			.from(categoryTbl)
			.where(and(eq(categoryTbl.parentId, parentId), eq(categoryTbl.isDeleted, 0)))
			.orderBy(asc(categoryTbl.id));

		if (catArr === null || catArr === undefined) return [];

		const catArrExtra: ICategory[] = catArr.map((cat) => ({
			...cat,
			hasChildren: false,
			children: [],
		}));

		for (const cat of catArrExtra) {
			if (cat.id === null || cat.id === undefined) continue;
			// 设置是否有子节点
			const cnt = (
				await db
					.select({ cnt: count(categoryTbl.id) })
					.from(categoryTbl)
					.where(and(eq(categoryTbl.parentId, cat.id), eq(categoryTbl.isDeleted, 0)))
			)[0].cnt;
			cat.hasChildren = cnt > 0;
		}

		return catArrExtra;
	}

	// 以EXCEL形式导出category数据
	async exportDataAsExcel(res: Response): Promise<void> {
		try {
			// 1. 获取所有分类数据
			const categories = await db
				.select()
				.from(categoryTbl)
				.where(eq(categoryTbl.isDeleted, 0))
				.orderBy(asc(categoryTbl.id));

			// 2. Create a new workbook and worksheet
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("分类数据");

			// 3. Define columns
			worksheet.columns = [
				{ header: "ID", key: "id", width: 10 },
				{ header: "名称", key: "name", width: 30 },
				{ header: "图片URL", key: "imageUrl", width: 80 },
				{ header: "上级ID", key: "parentId", width: 10 },
				{ header: "状态", key: "status", width: 10 },
				{ header: "排序", key: "orderNum", width: 10 },
			];

			// 4. Add rows
			categories.forEach((category) => worksheet.addRow(category));

			// 5. Set response headers
			res.setHeader(
				"Content-Type",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			);
			res.setHeader("Content-Disposition", 'attachment; filename="categories.xlsx"');

			// 6. Write workbook to response
			await workbook.xlsx.write(res);
		} catch (err) {
			console.error("Error exporting category data to Excel:", err);
			res.status(ResultCodeEnum.SYSTEM_ERROR.code).json(
				Result.buildFromEnum<string>(ResultCodeEnum.SYSTEM_ERROR, "导出分类数据失败")
			);
		}
	}

	// 导入分类数据从Excel
	async importData(file: any): Promise<void> {
		// Create workbook from buffer
		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.load(file.buffer);

		// Get first worksheet
		const worksheet = workbook.getWorksheet(1);

		const categories: any = [];
		const BATCH_SIZE = 20;

		if (!worksheet) {
			throw GuiguException.fromEnum(
				ResultCodeEnum.DATA_ERROR,
				"No worksheet found in the Excel file."
			);
		}

		// Process rows (skip header row)
		worksheet.eachRow(async (row, rowNumber) => {
			if (rowNumber > 1) {
				// Skip header row
				const category = {
					name: row.getCell(2).value as string,
					imageUrl: row.getCell(3).value as string,
					parentId: row.getCell(4).value as number,
					status: row.getCell(5).value as number,
					orderNum: row.getCell(6).value as number,
					createTime: new Date(),
					updateTime: new Date(),
					isDeleted: 0,
				};

				categories.push(category);

				// Batch insert every BATCH_SIZE records
				if (categories.length >= BATCH_SIZE) {
					await db.insert(categoryTbl).values(categories);
					categories.length = 0; // Clear array
				}
			}
		});

		// Insert remaining categories
		if (categories.length > 0) {
			await db.insert(categoryTbl).values(categories);
			categories.length = 0; // Clear array
		}
	}
}

@Service()
export class BrandServiceImpl implements IBrandService {
	async findByPage(pageNum: number, pageSize: number): Promise<PageInfo<IBrand>> {
		const offset = (pageNum - 1) * pageSize;
		const brands: IBrand[] = await db
			.select()
			.from(brandTbl)
			.where(eq(brandTbl.isDeleted, 0))
			.orderBy(asc(brandTbl.id))
			.limit(pageSize)
			.offset(offset);

		const total = (
			await db
				.select({ cnt: count(brandTbl.id) })
				.from(brandTbl)
				.where(eq(brandTbl.isDeleted, 0))
		)[0].cnt;

		return new PageInfo<IBrand>(brands, total);
	}

	async findAll(): Promise<IBrand[]> {
		const brands: IBrand[] = await db.select().from(brandTbl).where(eq(brandTbl.isDeleted, 0));
		return brands;
	}

	async addBrand(brand: IBrand): Promise<void> {
		const now = new Date();
		const brandData = {
			id: undefined,
			name: brand.name,
			logo: brand.logo,
			createTime: now,
			updateTime: now,
			isDeleted: brand.isDeleted,
		};

		await db.insert(brandTbl).values(brandData);
	}

	async updateBrand(brand: IBrand): Promise<void> {
		if (brand.id === null || brand.id === undefined) {
			throw new Error("Brand ID is required for update.");
		}

		const brandData = {
			id: brand.id,
			name: brand.name,
			logo: brand.logo,
			createTime: undefined,
			updateTime: new Date(),
			isDeleted: brand.isDeleted,
		};

		await db
			.update(brandTbl)
			.set(brandData)
			.where(and(eq(brandTbl.id, brandData.id), eq(brandTbl.isDeleted, 0)));
	}

	async deleteBrand(id: number): Promise<void> {
		await db.update(brandTbl).set({ isDeleted: 1 }).where(eq(brandTbl.id, id));
	}
}

/**
 * 分类和品牌关系服务实现类
 */
@Service()
export class CategoryBrandServiceImpl implements ICategoryBrandService {
	async find(
		categoryBrandReq: ICategoryBrandReq,
		byPage?: ByPage
	): Promise<PageInfo<ICategoryBrand>> {
		const whereConditions = [];
		if (categoryBrandReq.categoryId !== null && categoryBrandReq.categoryId !== undefined) {
			whereConditions.push(eq(categoryBrandTbl.categoryId, categoryBrandReq.categoryId));
		}
		if (categoryBrandReq.brandId !== null && categoryBrandReq.brandId !== undefined) {
			whereConditions.push(eq(categoryBrandTbl.brandId, categoryBrandReq.brandId));
		}
		whereConditions.push(eq(categoryBrandTbl.isDeleted, 0));

		const query = db
			.select({
				id: categoryBrandTbl.id,
				categoryId: categoryBrandTbl.categoryId,
				brandId: categoryBrandTbl.brandId,
				categoryName: categoryTbl.name,
				brandName: brandTbl.name,
				logo: brandTbl.logo,
				createTime: categoryBrandTbl.createTime,
				updateTime: categoryBrandTbl.updateTime,
				isDeleted: categoryBrandTbl.isDeleted,
			})
			.from(categoryBrandTbl)
			.innerJoin(categoryTbl, eq(categoryBrandTbl.categoryId, categoryTbl.id))
			.innerJoin(brandTbl, eq(categoryBrandTbl.brandId, brandTbl.id))
			.where(and(...whereConditions))
			.orderBy(asc(categoryBrandTbl.id));

		if (byPage) {
			const offset = (byPage.pageNum - 1) * byPage.pageSize;
			query.limit(byPage.pageSize).offset(offset);
		}

		const categoryBrandArray: ICategoryBrand[] = await query;

		const total = (
			await db
				.select({ cnt: count(categoryBrandTbl.id) })
				.from(categoryBrandTbl)
				.innerJoin(categoryTbl, eq(categoryBrandTbl.categoryId, categoryTbl.id))
				.innerJoin(brandTbl, eq(categoryBrandTbl.brandId, brandTbl.id))
				.where(and(...whereConditions))
		)[0].cnt;

		return new PageInfo<ICategoryBrand>(categoryBrandArray, total);
	}

	async add(categoryId: number, brandId: number): Promise<void> {
		const now = new Date();
		await db.insert(categoryBrandTbl).values({
			id: undefined,
			categoryId: categoryId,
			brandId: brandId,
			createTime: now,
			updateTime: now,
			isDeleted: 0,
		});
	}

	async updateById(categoryBrand: ICategoryBrand): Promise<void> {
		if (categoryBrand.id === null || categoryBrand.id === undefined) {
			throw new Error("CategoryBrand ID is required for update.");
		}
		await db
			.update(categoryBrandTbl)
			.set({
				categoryId: categoryBrand.categoryId,
				brandId: categoryBrand.brandId,
				updateTime: new Date(),
			})
			.where(
				and(eq(categoryBrandTbl.id, categoryBrand.id), eq(categoryBrandTbl.isDeleted, 0))
			);
	}

	async deleteById(id: number): Promise<void> {
		await db.update(categoryBrandTbl).set({ isDeleted: 1 }).where(eq(categoryBrandTbl.id, id));
	}

	async findBrandByCategoryId(categoryId: number): Promise<IBrand[]> {
		const brands: IBrand[] = await db
			.select({
				id: brandTbl.id,
				name: brandTbl.name,
				logo: brandTbl.logo,
				createTime: brandTbl.createTime,
				updateTime: brandTbl.updateTime,
				isDeleted: brandTbl.isDeleted,
			})
			.from(categoryBrandTbl)
			.innerJoin(brandTbl, eq(categoryBrandTbl.brandId, brandTbl.id))
			.where(
				and(
					eq(categoryBrandTbl.categoryId, categoryId),
					eq(categoryBrandTbl.isDeleted, 0),
					eq(brandTbl.isDeleted, 0)
				)
			)
			.orderBy(asc(brandTbl.id));

		return brands;
	}
}

@Service()
export class ProductSpecServiceImpl implements IProductSpecService {
	/**
	 * 获取所有商品规格，支持分页
	 * @param byPage
	 */
	async getAllProductSpecs(byPage?: ByPage): Promise<PageInfo<IProductSpec>> {
		const query = db
			.select()
			.from(productSpecTbl)
			.where(eq(productSpecTbl.isDeleted, 0))
			.orderBy(asc(productSpecTbl.id));

		let total;

		if (byPage) {
			const offset = (byPage.pageNum - 1) * byPage.pageSize;
			query.limit(byPage.pageSize).offset(offset);

			total = (
				await db
					.select({ cnt: count(productSpecTbl.id) })
					.from(productSpecTbl)
					.where(eq(productSpecTbl.isDeleted, 0))
			)[0].cnt;
		}

		const productSpecArray: IProductSpec[] = await query;

		return new PageInfo<IProductSpec>(productSpecArray, total);
	}

	async addProductSpec(productSpec: IProductSpec): Promise<void> {
		const now = new Date();
		await db.insert(productSpecTbl).values({
			id: undefined,
			specName: productSpec.specName,
			specValue: productSpec.specValue,
			createTime: now,
			updateTime: now,
			isDeleted: 0,
		});
	}

	async updateProductSpec(productSpec: IProductSpec): Promise<void> {
		if (!productSpec || productSpec.id === null || productSpec.id === undefined) {
			throw new Error("商品规格ID不能为空");
		}

		await db
			.update(productSpecTbl)
			.set({
				id: productSpec.id,
				specName: productSpec.specName,
				specValue: productSpec.specValue,
				updateTime: new Date(),
			})
			.where(and(eq(productSpecTbl.id, productSpec.id), eq(productSpecTbl.isDeleted, 0)));
	}

	async deleteProductSpec(id: number): Promise<void> {
		await db.update(productSpecTbl).set({ isDeleted: 1 }).where(eq(productSpecTbl.id, id));
	}
}

@Service()
export class ProductServiceImpl implements IProductService {
	async selectAll(productReq: IProductReq, byPage?: ByPage): Promise<PageInfo<IProduct>> {
		// Create aliases for the category table since we're joining it multiple times
		const cat1 = alias(categoryTbl, "cat1");
		const cat2 = alias(categoryTbl, "cat2");
		const cat3 = alias(categoryTbl, "cat3");

		const whereConditions = [];
		if (productReq.brandId !== null && productReq.brandId !== undefined) {
			whereConditions.push(eq(productTbl.brandId, productReq.brandId));
		}
		if (productReq.category1Id !== null && productReq.category1Id !== undefined) {
			whereConditions.push(eq(productTbl.category1Id, productReq.category1Id));
		}
		if (productReq.category2Id !== null && productReq.category2Id !== undefined) {
			whereConditions.push(eq(productTbl.category2Id, productReq.category2Id));
		}
		if (productReq.category3Id !== null && productReq.category3Id !== undefined) {
			whereConditions.push(eq(productTbl.category3Id, productReq.category3Id));
		}
		whereConditions.push(eq(productTbl.isDeleted, 0));

		const query = db
			.select({
				id: productTbl.id,
				name: productTbl.name,
				brandId: productTbl.brandId,
				category1Id: productTbl.category1Id,
				category2Id: productTbl.category2Id,
				category3Id: productTbl.category3Id,
				unitName: productTbl.unitName,
				sliderUrls: productTbl.sliderUrls,
				specValue: productTbl.specValue,
				status: productTbl.status,
				auditStatus: productTbl.auditStatus,
				auditMessage: productTbl.auditMessage,
				createTime: productTbl.createTime,
				updateTime: productTbl.updateTime,
				isDeleted: productTbl.isDeleted,
				brandName: brandTbl.name,
				category1Name: cat1.name,
				category2Name: cat2.name,
				category3Name: cat3.name,
			})
			.from(productTbl)
			.leftJoin(brandTbl, eq(productTbl.brandId, brandTbl.id))
			.leftJoin(cat1, eq(productTbl.category1Id, cat1.id))
			.leftJoin(cat2, eq(productTbl.category2Id, cat2.id))
			.leftJoin(cat3, eq(productTbl.category3Id, cat3.id))
			.where(and(...whereConditions))
			.orderBy(asc(productTbl.id));

		let total;
		if (byPage) {
			const offset = (byPage.pageNum - 1) * byPage.pageSize;
			query.limit(byPage.pageSize).offset(offset);

			total = (
				await db
					.select({ cnt: count(productTbl.id) })
					.from(productTbl)
					.where(eq(productTbl.isDeleted, 0))
			)[0].cnt;
		}

		const products: IProduct[] = await query;

		return new PageInfo<IProduct>(products, total);
	}

	// Transactional
	async addProduct(product: IProduct): Promise<void> {
		const now = new Date();
		if (product === null || product === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.PARAM_ERROR, "商品信息不能为空");
		}

		try {
			await db.transaction(async (tx) => {
				// 保存商品数据
				await tx.insert(productTbl).values({
					id: undefined,
					name: product.name,
					brandId: product.brandId,
					category1Id: product.category1Id,
					category2Id: product.category2Id,
					category3Id: product.category3Id,
					unitName: product.unitName,
					sliderUrls: product.sliderUrls,
					specValue: product.specValue,
					status: 0,
					auditStatus: 0,
					auditMessage: product.auditMessage,
					createTime: now,
					updateTime: now,
					isDeleted: 0,
				});

				// 保存商品sku数据
				if (
					product.productSkuList === null ||
					product.productSkuList === undefined ||
					product.productSkuList.length === 0
				) {
					throw GuiguException.fromEnum(
						ResultCodeEnum.PARAM_ERROR,
						"商品SKU信息不能为空"
					);
				}
				const skus = product.productSkuList;
				for (let i = 0; i < skus.length; i++) {
					const sku: IProductSku = skus[i];
					const skuToInsert = {
						id: undefined,
						skuCode: `${product.id}_${i}`,
						skuName: `${product.name}${sku.skuSpec}`,
						productId: product.id,
						thumbImg: sku.thumbImg,
						salePrice: sku.salePrice?.toString() || null,
						marketPrice: sku.marketPrice?.toString() || null,
						costPrice: sku.costPrice?.toString() || null,
						stockNum: sku.stockNum,
						saleNum: 0,
						skuSpec: sku.skuSpec,
						weight: sku.weight?.toString() || null,
						volume: sku.volume?.toString() || null,
						status: 0,
						createTime: now,
						updateTime: now,
						isDeleted: 0,
					};
					await tx.insert(productSkuTbl).values(skuToInsert);

					// 保存商品详情数据
					await tx.insert(productDetailsTbl).values({
						productId: product.id,
						imageUrls: product.detailsImageUrls,
						id: undefined,
						createTime: now,
						updateTime: now,
						isDeleted: 0,
					});
				}
			});
		} catch (error) {
			console.error("Transaction failed and rolled back:", error);
			throw error;
		}
	}

	async getProductById(id: number): Promise<Nullable<IProduct>> {
		// 根据id查询商品数据
		const cat1 = alias(categoryTbl, "cat1");
		const cat2 = alias(categoryTbl, "cat2");
		const cat3 = alias(categoryTbl, "cat3");
		const productArr = await db
			.select({
				id: productTbl.id,
				name: productTbl.name,
				brandId: productTbl.brandId,
				category1Id: productTbl.category1Id,
				category2Id: productTbl.category2Id,
				category3Id: productTbl.category3Id,
				unitName: productTbl.unitName,
				sliderUrls: productTbl.sliderUrls,
				specValue: productTbl.specValue,
				status: productTbl.status,
				auditStatus: productTbl.auditStatus,
				auditMessage: productTbl.auditMessage,
				createTime: productTbl.createTime,
				updateTime: productTbl.updateTime,
				isDeleted: productTbl.isDeleted,
				brandName: brandTbl.name,
				category1Name: cat1.name,
				category2Name: cat2.name,
				category3Name: cat3.name,
			})
			.from(productTbl)
			.leftJoin(brandTbl, eq(productTbl.brandId, brandTbl.id))
			.leftJoin(cat1, eq(productTbl.category1Id, cat1.id))
			.leftJoin(cat2, eq(productTbl.category2Id, cat2.id))
			.leftJoin(cat3, eq(productTbl.category3Id, cat3.id))
			.where(and(eq(productTbl.id, id), eq(productTbl.isDeleted, 0)));

		if (productArr === null || productArr === undefined || productArr.length === 0) {
			return null;
		}

		const product: IProduct = productArr[0];

		// 根据商品的id查询sku数据
		const skus: IProductSku[] = await db
			.select()
			.from(productSkuTbl)
			.where(and(eq(productSkuTbl.productId, id), eq(productSkuTbl.isDeleted, 0)));
		if (skus === null || skus === undefined) {
			product.productSkuList = [];
		} else {
			product.productSkuList = skus;
		}

		// 根据商品的id查询商品详情数据
		const detailsArr: IProductDetails[] = await db
			.select()
			.from(productDetailsTbl)
			.where(and(eq(productDetailsTbl.productId, id), eq(productDetailsTbl.isDeleted, 0)));
		if (detailsArr !== null && detailsArr !== undefined && detailsArr.length > 0) {
			product.detailsImageUrls = detailsArr[0].imageUrls;
		}

		return product;
	}

	// Transactional
	async updateById(product: IProduct): Promise<void> {
		await db.transaction(async (tx) => {
			if (product.id === null || product.id === undefined) {
				throw GuiguException.fromEnum(ResultCodeEnum.PARAM_ERROR, "商品ID不能为空");
			}

			const productSetData: any = {};
			if (product.name !== null && product.name !== undefined) {
				productSetData.name = product.name;
			}
			if (product.brandId !== null && product.brandId !== undefined) {
				productSetData.brandId = product.brandId;
			}
			if (product.category1Id !== null && product.category1Id !== undefined) {
				productSetData.category1Id = product.category1Id;
			}
			if (product.category2Id !== null && product.category2Id !== undefined) {
				productSetData.category2Id = product.category2Id;
			}
			if (product.category3Id !== null && product.category3Id !== undefined) {
				productSetData.category3Id = product.category3Id;
			}
			if (product.unitName !== null && product.unitName !== undefined) {
				productSetData.unitName = product.unitName;
			}
			if (product.sliderUrls !== null && product.sliderUrls !== undefined) {
				productSetData.sliderUrls = product.sliderUrls;
			}
			if (product.specValue !== null && product.specValue !== undefined) {
				productSetData.specValue = product.specValue;
			}
			if (product.status !== null && product.status !== undefined) {
				productSetData.status = product.status;
			}
			if (product.auditStatus !== null && product.auditStatus !== undefined) {
				productSetData.auditStatus = product.auditStatus;
			}
			if (product.auditMessage !== null && product.auditMessage !== undefined) {
				productSetData.auditMessage = product.auditMessage;
			}

			productSetData.updateTime = new Date();

			// 修改商品基本数据
			await tx
				.update(productTbl)
				.set(productSetData)
				.where(and(eq(productTbl.id, product.id), eq(productTbl.isDeleted, 0)));

			// 修改商品sku数据
			if (
				product.productSkuList !== null &&
				product.productSkuList !== undefined &&
				product.productSkuList.length > 0
			) {
				const skus: IProductSku[] = product.productSkuList;
				for (const sku of skus) {
					if (sku.id === null || sku.id === undefined) {
						throw GuiguException.fromEnum(
							ResultCodeEnum.PARAM_ERROR,
							"商品SKU ID不能为空"
						);
					}

					const skuSetData: any = {};
					if (sku.skuCode !== null && sku.skuCode !== undefined) {
						skuSetData.skuCode = sku.skuCode;
					}
					if (sku.skuName !== null && sku.skuName !== undefined) {
						skuSetData.skuName = sku.skuName;
					}
					if (sku.productId !== null && sku.productId !== undefined) {
						skuSetData.productId = sku.productId;
					}
					if (sku.thumbImg !== null && sku.thumbImg !== undefined) {
						skuSetData.thumbImg = sku.thumbImg;
					}
					if (sku.salePrice !== null && sku.salePrice !== undefined) {
						skuSetData.salePrice = sku.salePrice;
					}
					if (sku.marketPrice !== null && sku.marketPrice !== undefined) {
						skuSetData.marketPrice = sku.marketPrice;
					}
					if (sku.costPrice !== null && sku.costPrice !== undefined) {
						skuSetData.costPrice = sku.costPrice;
					}
					if (sku.stockNum !== null && sku.stockNum !== undefined) {
						skuSetData.stockNum = sku.stockNum;
					}
					if (sku.skuSpec !== null && sku.skuSpec !== undefined) {
						skuSetData.skuSpec = sku.skuSpec;
					}
					if (sku.weight !== null && sku.weight !== undefined) {
						skuSetData.weight = sku.weight;
					}
					if (sku.volume !== null && sku.volume !== undefined) {
						skuSetData.volume = sku.volume;
					}
					if (sku.status !== null && sku.status !== undefined) {
						skuSetData.status = sku.status;
					}

					skuSetData.updateTime = new Date();

					await tx
						.update(productSkuTbl)
						.set(skuSetData)
						.where(and(eq(productSkuTbl.id, sku.id), eq(productSkuTbl.isDeleted, 0)));
				}
			}

			// 修改商品的详情数据
			/* const prodDetailsArr = await tx
				.select()
				.from(productDetailsTbl)
				.where(
					and(
						eq(productDetailsTbl.productId, product.id),
						eq(productDetailsTbl.isDeleted, 0)
					)
				); */
			/* if (
				prodDetailsArr !== null &&
				prodDetailsArr !== undefined &&
				prodDetailsArr.length > 0
			) {
				const prodDetails: IProductDetails = prodDetailsArr[0];
				if (prodDetails.id === null || prodDetails.id === undefined) {
					throw GuiguException.fromEnum(ResultCodeEnum.PARAM_ERROR, "商品详情ID不能为空");
				}
				prodDetails.imageUrls = product.detailsImageUrls;
				tx.update(productDetailsTbl)
					.set({
                        productId: product.id,
						imageUrls: prodDetails.imageUrls,
						updateTime: new Date(),
					})
					.where(
						and(
							eq(productDetailsTbl.id, prodDetails.id),
							eq(productDetailsTbl.isDeleted, 0)
						)
					);
			} */

			tx.update(productDetailsTbl)
				.set({
					productId: product.id,
					imageUrls: product.detailsImageUrls,
					updateTime: new Date(),
				})
				.where(
					and(eq(productDetailsTbl.id, product.id), eq(productDetailsTbl.isDeleted, 0))
				);
		});
	}

	// Transactional
	/**
	 *
	 * @param id 商品ID, product id
	 */
	async deleteById(id: number): Promise<void> {
		await db.transaction(async (tx) => {
			// 1. 删除商品基本信息
			tx.update(productTbl).set({ isDeleted: 1 }).where(eq(productTbl.id, id));

			// 2. 根据商品id删除商品的sku数据
			tx.update(productSkuTbl).set({ isDeleted: 1 }).where(eq(productSkuTbl.productId, id));

			// 3. 根据商品的id删除商品的详情数据
			tx.update(productDetailsTbl)
				.set({ isDeleted: 1 })
				.where(eq(productDetailsTbl.productId, id));
		});
	}

	/**
	 * 更改审核状态
	 * @param id 商品ID, product id
	 * @param auditStatus 审核状态：0-初始值，1-通过，-1-未通过
	 */
	async updateAuditStatus(id: number, auditStatus: number): Promise<void> {
		if (id === null || id === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.PARAM_ERROR, "商品ID不能为空");
		}

		// 修改商品基本数据
		await db
			.update(productTbl)
			.set({ auditStatus: auditStatus, updateTime: new Date() })
			.where(and(eq(productTbl.id, id), eq(productTbl.isDeleted, 0)));
	}

	/**
	 * 更改上下架状态
	 * @param id 商品ID, product id
	 * @param status 线上状态：0-初始值，1-上架，-1-自主下架
	 */
	async updateStatus(id: number, status: number): Promise<void> {
		if (id === null || id === undefined) {
			throw GuiguException.fromEnum(ResultCodeEnum.PARAM_ERROR, "商品ID不能为空");
		}

		let statusVal;
		if (status === 1) {
			statusVal = 1; // 上架
		} else if (status === -1) {
			statusVal = -1; // 自主下架
		} else {
			throw GuiguException.fromEnum(ResultCodeEnum.PARAM_ERROR, "商品状态值错误");
		}

		await db
			.update(productTbl)
			.set({ status: statusVal, updateTime: new Date() })
			.where(and(eq(productTbl.id, id), eq(productTbl.isDeleted, 0)));
	}
}

@Service()
export class ProductUnitServiceImpl implements IProductUnitService {
	async findAll(): Promise<IProductUnit[]> {
		const units = await db.select().from(productUnitTbl).where(eq(productUnitTbl.isDeleted, 0));

		if (units === null || units === undefined || units.length === 0) return [];

		return units;
	}
}
