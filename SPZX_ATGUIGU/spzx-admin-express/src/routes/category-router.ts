/**
 * 商品分类接口
 */
import { ICategory } from "@/model/entity/interfaces/product-entity-intf";
import { Result, ResultCodeEnum } from "@/model/response/common-resp";
import { ICategoryService } from "@/services/interfaces/product-service-intf";
import { CategoryServiceImpl } from "@/services/product-service-impl";
import express from "express";
import { Container as IoC } from "typedi";
import multer from "multer";

const upload = multer();

export const categoryRouter = express.Router();
const categoryService: ICategoryService = IoC.get(CategoryServiceImpl);

// 根据parentId获取下级节点
categoryRouter.get('/findByParentId/:parentId', async (req, res) => {
    const { parentId } = req.params;
    const pid = Number(parentId);

    const categories: ICategory[] = await categoryService.findByParentId(pid);

    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum<ICategory[]>(ResultCodeEnum.SUCCESS, categories)
    );
});

// 导出分类数据为Excel
categoryRouter.get('/exportData', async (req, res) => {
    await categoryService.exportDataAsExcel(res);
    res.end();
});

// 导入分类数据从Excel
categoryRouter.post('/importData', upload.single('file'), async (req, res) => {
    await categoryService.importData(req.file);
    res.status(ResultCodeEnum.SUCCESS.code).json(
        Result.buildFromEnum(ResultCodeEnum.SUCCESS)
    );
});
