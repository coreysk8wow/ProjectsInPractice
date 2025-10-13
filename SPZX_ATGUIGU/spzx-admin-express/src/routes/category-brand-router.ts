/**
 * 分类和品牌关系接口
 */
import { IBrand, ICategoryBrand } from "@/model/entity/interfaces/product-entity-intf";
import { ByPage } from "@/model/request/interfaces/pagination";
import { ICategoryBrandReq } from "@/model/request/interfaces/product-req-intf";
import { PageInfo, Result, ResultCodeEnum } from "@/model/response/common-resp";
import { ICategoryBrandService } from "@/services/interfaces/product-service-intf";
import { CategoryBrandServiceImpl } from "@/services/product-service-impl";
import express from "express";
import { Container as IoC } from "typedi";

export const categoryBrandRouter = express.Router();
const categoryBrandService: ICategoryBrandService = IoC.get(CategoryBrandServiceImpl);

// 分页查询分类品牌接口
categoryBrandRouter.get("/findByPage", async (req, res) => {
	let pageNum = Number(req.query.pageNum);
	if (pageNum <= 0) {
		pageNum = 1;
	}
	let pageSize = Number(req.query.pageSize);
	if (pageSize <= 0) {
		pageSize = 10;
	}

	// Springboot @ModelAttribute equivalent: directly using query parameters
	const categoryBrandReq: ICategoryBrandReq = {
		categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
		brandId: req.query.brandId ? Number(req.query.brandId) : undefined,
	};

	const pageInfo: PageInfo<ICategoryBrand> = await categoryBrandService.find(categoryBrandReq, {
		pageNum,
		pageSize,
	} as ByPage);

	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<PageInfo<ICategoryBrand>>(ResultCodeEnum.SUCCESS, pageInfo)
	);
});

// 添加分类品牌接口
categoryBrandRouter.post("/add", async (req, res) => {
	const catIdStr = req.body.categoryId;
	const brandIdStr = req.body.brandId;
	if (
		catIdStr === null ||
		catIdStr === undefined ||
		brandIdStr === null ||
		brandIdStr === undefined
	) {
		res.status(ResultCodeEnum.PARAM_ERROR.code).json(
			Result.buildFromEnum<string>(
				ResultCodeEnum.PARAM_ERROR,
				"Category ID and Brand ID are required"
			)
		);
		return;
	}
	await categoryBrandService.add(Number(catIdStr), Number(brandIdStr));
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<string>(ResultCodeEnum.SUCCESS, "添加成功")
	);
});

// 更新分类品牌接口
categoryBrandRouter.put("/updateById", async (req, res) => {
	const categoryBrand: ICategoryBrand = req.body;
	if (!categoryBrand.id) {
		res.status(ResultCodeEnum.PARAM_ERROR.code).json(
			Result.buildFromEnum<string>(
				ResultCodeEnum.PARAM_ERROR,
				"CategoryBrand ID is required for update"
			)
		);
		return;
	}

	await categoryBrandService.updateById(categoryBrand);

	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<string>(ResultCodeEnum.SUCCESS, "更新成功")
	);
});

// 逻辑删除分类品牌接口
categoryBrandRouter.delete("/deleteById/:id", async (req, res) => {
	const idStr = req.params.id;
	if (idStr === null || idStr === undefined) {
		res.status(ResultCodeEnum.PARAM_ERROR.code).json(
			Result.buildFromEnum<string>(
				ResultCodeEnum.PARAM_ERROR,
				"CategoryBrand ID is required for deletion"
			)
		);
		return;
	}

	await categoryBrandService.deleteById(Number(idStr));

	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<string>(ResultCodeEnum.SUCCESS, "删除成功")
	);
});

// 根据第三级分类的ID查询品牌接口
categoryBrandRouter.get("/findBrandByCategoryId/:categoryId", async (req, res) => {
	const categoryIdStr = req.params.categoryId;
	if (categoryIdStr === null || categoryIdStr === undefined) {
		res.status(ResultCodeEnum.PARAM_ERROR.code).json(
			Result.buildFromEnum<string>(ResultCodeEnum.PARAM_ERROR, "Category ID is required")
		);
		return;
	}

	const brands = await categoryBrandService.findBrandByCategoryId(Number(categoryIdStr));
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<IBrand[]>(ResultCodeEnum.SUCCESS, brands)
	);
});
