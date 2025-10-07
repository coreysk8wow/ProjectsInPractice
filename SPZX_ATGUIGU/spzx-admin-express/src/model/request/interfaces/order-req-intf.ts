import { Nullable } from "@/types/basic-type";

export interface IOrderStatisticsReq {
    // "开始时间"
    createTimeBegin: Nullable<string>;

    //"结束时间"
    createTimeEnd: Nullable<string>;
}
