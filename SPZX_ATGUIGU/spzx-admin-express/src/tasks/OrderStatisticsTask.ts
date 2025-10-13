import { db } from "@/config/db-config";
import { orderInfo as orderInfoTbl, orderStatistics as orderStatisticsTbl } from "@/db/schema";
import { config } from "dotenv";
import { and, count, eq, sql, sum } from "drizzle-orm";
import { DateTime } from "luxon";
import cron from "node-cron";

// Specify custom .env path
config({ path: ".env" });

async function orderTotalAmountStatistics() {
	console.log("----------------------Running order statistics task...----------------------");
	const createTime: string = DateTime.now().minus({ days: 1 }).toFormat("yyyy-MM-dd");
	await db.transaction(async (tx) => {
		// 1. 统计昨天的订单数据
		// const yesterdayStart = DateTime.now().minus({ days: 1 }).startOf('day').toJSDate();
		// const yesterdayEnd = DateTime.now().minus({ days: 1 }).endOf('day').toJSDate();

		const orderStats = (
			await tx
				.select({
					orderDate: sql`DATE_FORMAT(${orderInfoTbl.createTime}, '%Y-%m-%d')`,
					totalAmount: sum(orderInfoTbl.totalAmount),
					totalNum: count(orderInfoTbl.id),
				})
				.from(orderInfoTbl)
				.where(
					and(
						eq(sql`DATE_FORMAT(${orderInfoTbl.createTime}, '%Y-%m-%d')`, createTime),
						eq(orderInfoTbl.isDeleted, 0)
					)
				)
                .groupBy(sql`DATE_FORMAT(${orderInfoTbl.createTime}, '%Y-%m-%d')`)
		)[0];
		// .groupBy(sql`DATE_FORMAT(${oi.createTime}, '%Y-%m-%d')`);

		// 2. 保存统计数据
		if (orderStats) {
			await tx.insert(orderStatisticsTbl).values({
				orderDate: new Date(orderStats.orderDate as string),
				totalAmount: orderStats.totalAmount?.toString(),
				totalNum: orderStats.totalNum,
			});
		}
	});

	console.log("------------------Ending order statistics task...----------------------");
}


export function startScheduledTask() {
    // 订单数据统计
    cron.schedule("0 2 * * *", orderTotalAmountStatistics);

}
