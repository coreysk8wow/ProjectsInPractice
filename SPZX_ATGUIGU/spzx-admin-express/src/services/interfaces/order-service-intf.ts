import { IOrderStatisticsReq } from "@/model/request/interfaces/order-req-intf";
import { IOrderStatisticsResp } from "@/model/response/interfaces/order-resp-intf";

export interface IOrderInfoService {
    getOrderStatisticsData(orderStatisticsReq: IOrderStatisticsReq): Promise<IOrderStatisticsResp>;
}