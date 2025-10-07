import { Nullable } from "@/types/basic-type";

export class OrderStatisticsReq {
    // "开始时间"
    createTimeBegin: Nullable<string>;

    //"结束时间"
    createTimeEnd: Nullable<string>;

    constructor(createTimeBegin?: Nullable<string>, createTimeEnd?: Nullable<string>) {
        this.createTimeBegin = createTimeBegin;
        this.createTimeEnd = createTimeEnd;
    }

    toJSON() {
        return {
            createTimeBegin: this.createTimeBegin,
            createTimeEnd: this.createTimeEnd
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
