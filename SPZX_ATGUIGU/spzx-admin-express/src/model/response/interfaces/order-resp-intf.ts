import { Nullable } from "@/types/basic-type";
import { Big } from "big.js";

export interface IOrderStatisticsResp {
    dateList: string[];
    amountList: Big[];
}
