import { Nullable } from "../../types/basic-type";
import { BaseEntity } from "./base-entity";

/** 支付信息实体类 */
export class PaymentInfo extends BaseEntity {
    // 用户id
    userId: Nullable<number>;

    // 订单号
    orderNo: Nullable<string>;

    // 付款方式：1-微信 2-支付宝
    payType: Nullable<number>;

    // 交易编号（微信或支付）
    outTradeNo: Nullable<string>;

    // 支付金额
    amount: Nullable<number>;

    // 交易内容
    content: Nullable<string>;

    // 支付状态：0-未支付 1-已支付
    paymentStatus: Nullable<number>;

    // 回调时间
    callbackTime: Nullable<Date>;

    // 回调信息
    callbackContent: Nullable<string>;

    constructor(
        userId?: Nullable<number>,
        orderNo?: Nullable<string>,
        payType?: Nullable<number>,
        outTradeNo?: Nullable<string>,
        amount?: Nullable<number>,
        content?: Nullable<string>,
        paymentStatus?: Nullable<number>,
        callbackTime?: Nullable<Date>,
        callbackContent?: Nullable<string>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.userId = userId;
        this.orderNo = orderNo;
        this.payType = payType;
        this.outTradeNo = outTradeNo;
        this.amount = amount;
        this.content = content;
        this.paymentStatus = paymentStatus;
        this.callbackTime = callbackTime;
        this.callbackContent = callbackContent;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            userId: this.userId,
            orderNo: this.orderNo,
            payType: this.payType,
            outTradeNo: this.outTradeNo,
            amount: this.amount,
            content: this.content,
            paymentStatus: this.paymentStatus,
            callbackTime: this.callbackTime,
            callbackContent: this.callbackContent
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}