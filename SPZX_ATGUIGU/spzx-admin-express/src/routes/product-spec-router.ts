/**
 * 商品规格管理接口
 */
import { IProductSpec } from "@/model/entity/interfaces/product-entity-intf";
import { ByPage } from "@/model/request/interfaces/pagination";
import { PageInfo, Result, ResultCodeEnum } from "@/model/response/common-resp";
import { IProductSpecService } from "@/services/interfaces/product-service-intf";
import { ProductSpecServiceImpl } from "@/services/product-service-impl";
import express from "express";
import { Container as IoC } from "typedi";

export const productSpecRouter = express.Router();
const productSpecService: IProductSpecService = IoC.get(ProductSpecServiceImpl);

// 分页获取所有商品规格
productSpecRouter.get("/getAll", async (req, res) => {
	let pageNum = Number(req.query.pageNum);
	if (pageNum <= 0) {
		pageNum = 1;
	}
	let pageSize = Number(req.query.pageSize);
	if (pageSize <= 0) {
		pageSize = 10;
	}

	const byPage: ByPage = {
		pageNum: pageNum,
		pageSize: pageSize,
	};
	const pageInfo: PageInfo<IProductSpec> = await productSpecService.getAllProductSpecs(byPage);
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<PageInfo<IProductSpec>>(ResultCodeEnum.SUCCESS, pageInfo)
	);
});

// 获取所有商品规格
productSpecRouter.get("/findAll", async (req, res) => {
	const pageInfo: PageInfo<IProductSpec> = await productSpecService.getAllProductSpecs();
	const productSpecArray = pageInfo.list;
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<IProductSpec[]>(ResultCodeEnum.SUCCESS, productSpecArray)
	);
});

// 添加商品规格
productSpecRouter.post("/add", async (req, res) => {
	const productSpec: IProductSpec = req.body;
	await productSpecService.addProductSpec(productSpec);
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
	);
});

// 更新商品规格
productSpecRouter.put("/updateById", async (req, res) => {
	const productSpec: IProductSpec = req.body;
	if (!productSpec || productSpec.id === null || productSpec.id === undefined) {
		res.status(ResultCodeEnum.PARAM_ERROR.code).json(
			Result.buildFromEnum<string>(ResultCodeEnum.PARAM_ERROR, "商品规格ID不能为空")
		);
		return;
	}
	await productSpecService.updateProductSpec(productSpec);
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
	);
});

// 删除商品规格
productSpecRouter.delete("/deleteById/:id", async (req, res) => {
	await productSpecService.deleteProductSpec(Number(req.params.id));
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
	);
});

