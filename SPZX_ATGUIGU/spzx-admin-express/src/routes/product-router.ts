/**
 * 商品管理接口
 */
import { IProduct } from "@/model/entity/interfaces/product-entity-intf";
import { ByPage } from "@/model/request/interfaces/pagination";
import { IProductReq } from "@/model/request/interfaces/product-req-intf";
import { PageInfo, Result, ResultCodeEnum } from "@/model/response/common-resp";
import { IProductService } from "@/services/interfaces/product-service-intf";
import { ProductServiceImpl } from "@/services/product-service-impl";
import { Nullable } from "@/types/basic-type";
import express from "express";
import { Container as IoC } from "typedi";

export const productRouter = express.Router();
const productService: IProductService = IoC.get(ProductServiceImpl);

// 分页查询商品列表
productRouter.get("/getAll", async (req, res) => {
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

    const productReq: IProductReq = {
        brandId: req.query.brandId ? Number(req.query.brandId) : undefined,
        category1Id: req.query.category1Id ? Number(req.query.category1Id) : undefined,
        category2Id: req.query.category2Id ? Number(req.query.category2Id) : undefined,
        category3Id: req.query.category3Id ? Number(req.query.category3Id) : undefined,
    }

    const pageInfo: PageInfo<IProduct> = await productService.selectAll(productReq, byPage);

    res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<PageInfo<IProduct>>(ResultCodeEnum.SUCCESS, pageInfo)
	);
});

// 添加商品
productRouter.post("/add", async (req, res) => {
    const product = req.body;
    await productService.addProduct(product);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 根据商品ID查询商品接口
productRouter.get("/getById/:id", async (req, res) => {
    const product = await productService.getProductById(Number(req.params.id));
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<Nullable<IProduct>>(ResultCodeEnum.SUCCESS, product)
    );
});

// 根据ID更新商品接口
productRouter.put("/updateById", async (req, res) => {
    const product = req.body;
    await productService.updateById(product);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 根据ID删除商品接口
productRouter.delete("/deleteById/:id", async (req, res) => {
    await productService.deleteById(Number(req.params.id));
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 更新商品审核状态接口
productRouter.put("/updateAuditStatus/:id/:auditStatus", async (req, res) => {
    const id = Number(req.params.id);
    const auditStatus = Number(req.params.auditStatus);
    
    await productService.updateAuditStatus(id, auditStatus);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 更新商品上架状态接口
productRouter.put("/updateStatus/:id/:status", async (req, res) => {
    const id = Number(req.params.id);
    const status = Number(req.params.status);
    
    await productService.updateStatus(id, status);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});
