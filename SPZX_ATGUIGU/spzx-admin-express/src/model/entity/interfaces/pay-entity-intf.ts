import { Nullable } from "@/types/basic-type";
import { IBaseEntity } from "./baseEntity-intf";

/** 支付信息实体类 */
export interface IPaymentInfo extends IBaseEntity {
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
}