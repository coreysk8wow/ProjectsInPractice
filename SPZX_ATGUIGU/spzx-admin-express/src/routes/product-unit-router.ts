/**
 * 商品单位接口
 */
import { IProductUnit } from "@/model/entity/interfaces/product-entity-intf";
import { Result, ResultCodeEnum } from "@/model/response/common-resp";
import { IProductUnitService } from "@/services/interfaces/product-service-intf";
import { ProductUnitServiceImpl } from "@/services/product-service-impl";
import express from "express";
import { Container as IoC } from "typedi";

export const productUnitRouter = express.Router();
const productUnitService: IProductUnitService = IoC.get(ProductUnitServiceImpl);

// 查询所有商品单位接口
productUnitRouter.get("/findAll", async (req, res) => {
	const units = await productUnitService.findAll();
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<IProductUnit[]>(ResultCodeEnum.SUCCESS, units)
	);
});
