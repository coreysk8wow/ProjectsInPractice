/**
 * 品牌接口
 */
import { IBrand } from "@/model/entity/interfaces/product-entity-intf";
import { PageInfo, Result, ResultCodeEnum } from "@/model/response/common-resp";
import { IBrandService } from "@/services/interfaces/product-service-intf";
import { BrandServiceImpl } from "@/services/product-service-impl";
import express from "express";
import { Container as IoC } from "typedi";

export const brandRouter = express.Router();
const brandService: IBrandService = IoC.get(BrandServiceImpl);

// 分页查询品牌列表
brandRouter.get("/findByPage", async (req, res) => {
    let pageNum = Number(req.query.pageNum)
    if (pageNum <= 0) {
        pageNum = 1;
    }
    let pageSize = Number(req.query.pageSize)
    if (pageSize <= 0) {
        pageSize = 10;
    }

    const brands: PageInfo<IBrand> = await brandService.findByPage(pageNum, pageSize);

    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<PageInfo<IBrand>>(ResultCodeEnum.SUCCESS, brands)
    );
});

// 查询所有品牌列表
brandRouter.get("/findAll", async (req, res) => {
    const brands: IBrand[] = await brandService.findAll();

    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<IBrand[]>(ResultCodeEnum.SUCCESS, brands)
    );
});

// 添加品牌接口
brandRouter.post('/add', async (req, res) => {
    const brand: IBrand = req.body;

    await brandService.addBrand(brand);

    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 更新品牌接口
brandRouter.put('/update', async (req, res) => {
    const brand: IBrand = req.body;

    await brandService.updateBrand(brand);
    
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});

// 删除品牌接口
brandRouter.delete('/deleteById/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        throw new Error("Invalid brand ID");
    }
    await brandService.deleteBrand(id);

    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<void>(ResultCodeEnum.SUCCESS)
    );
});
