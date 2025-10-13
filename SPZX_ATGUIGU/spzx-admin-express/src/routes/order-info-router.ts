/**
 * 订单信息管理接口
 */
import { IOrderStatisticsReq } from "@/model/request/interfaces/order-req-intf";
import { Result, ResultCodeEnum } from "@/model/response/common-resp";
import { IOrderStatisticsResp } from "@/model/response/interfaces/order-resp-intf";
import { IOrderInfoService } from "@/services/interfaces/order-service-intf";
import { OrderInfoServiceImpl } from "@/services/order-service-impl";
import { Nullable } from "@/types/basic-type";
import express from "express";
import { Container as IoC } from "typedi";

export const orderInfoRouter = express.Router();
const orderInfoService: IOrderInfoService = IoC.get(OrderInfoServiceImpl);

// 获取订单统计数据
orderInfoRouter.get("/getOrderStatisticsData", async (req, res) => {
	const orderStatisticsReq: IOrderStatisticsReq = {
		createTimeBegin: req.query.createTimeBegin as Nullable<string>,
		createTimeEnd: req.query.createTimeEnd as Nullable<string>,
	};

	const resp: IOrderStatisticsResp = await orderInfoService.getOrderStatisticsData(
		orderStatisticsReq
	);

	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<IOrderStatisticsResp>(ResultCodeEnum.SUCCESS, resp)
	);
});
