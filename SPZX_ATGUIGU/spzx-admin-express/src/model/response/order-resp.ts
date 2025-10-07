import { Nullable } from "../../types/basic-type";

export class OrderStatisticsResp {
    dateList: Nullable<string[]>;
    amountList: Nullable<number[]>;

    constructor(dateList?: Nullable<string[]>, amountList?: Nullable<number[]>) {
        this.dateList = dateList;
        this.amountList = amountList;
    }
    
    toJSON() {
        return {
            dateList: this.dateList,
            amountList: this.amountList
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
