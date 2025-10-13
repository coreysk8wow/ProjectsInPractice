import { db } from "@/config/db-config";
import { orderStatistics as orderStatisticsTbl } from "@/db/schema";
import { IOrderStatisticsReq } from "@/model/request/interfaces/order-req-intf";
import { IOrderStatisticsResp } from "@/model/response/interfaces/order-resp-intf";
import { Big } from "big.js";
import { and, asc, eq, gte, lte } from "drizzle-orm";
import { DateTime } from "luxon";
import { IOrderInfoService } from "./interfaces/order-service-intf";
import { Service } from "typedi";

@Service()
export class OrderInfoServiceImpl implements IOrderInfoService {
	async getOrderStatisticsData(
		orderStatisticsReq: IOrderStatisticsReq
	): Promise<IOrderStatisticsResp> {
		const whereConditions = [];
		if (orderStatisticsReq.createTimeBegin) {
			whereConditions.push(
				gte(orderStatisticsTbl.createTime, new Date(orderStatisticsReq.createTimeBegin))
			);
		}
		if (orderStatisticsReq.createTimeEnd) {
			whereConditions.push(
				lte(orderStatisticsTbl.createTime, new Date(orderStatisticsReq.createTimeEnd))
			);
		}
		whereConditions.push(eq(orderStatisticsTbl.isDeleted, 0));

		// 查询统计结果数据
		const dbResults = await db
			.select({
				orderDate: orderStatisticsTbl.orderDate,
				totalAmount: orderStatisticsTbl.totalAmount,
				totalNum: orderStatisticsTbl.totalNum,
			})
			.from(orderStatisticsTbl)
			.where(and(...whereConditions))
			.orderBy(asc(orderStatisticsTbl.orderDate));

		//日期列表
		const dateArr = dbResults.map((stat) =>
			DateTime.fromJSDate(stat.orderDate!).toFormat("yyyy-MM-dd")
		);

		//统计金额列表
		const amountArr = dbResults.map((stat) => Big(stat.totalAmount!));

		// 创建OrderStatisticsVo对象封装响应结果数据

		return {
			dateList: dateArr,
			amountList: amountArr,
		} as IOrderStatisticsResp;
	}
}
