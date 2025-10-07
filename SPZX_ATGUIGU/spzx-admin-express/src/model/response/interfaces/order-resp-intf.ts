import { Nullable } from "@/types/basic-type";

export interface IOrderStatisticsResp {
    dateList: Nullable<string[]>;
    amountList: Nullable<number[]>;
}
