import { BaseEntity } from './base-entity.js';
import { Nullable } from '../../types/basic-type.js';

/** OrderInfo */
export class OrderInfo extends BaseEntity {
    // 会员_id
    userId: Nullable<number>;

    // 昵称
    nickName: Nullable<string>;

    // 订单号
    orderNo: Nullable<string>;

    // 使用的优惠券
    couponId: Nullable<number>;

    // 订单总额
    totalAmount: Nullable<number>;

    // 优惠券
    couponAmount: Nullable<number>;

    // 原价金额
    originalTotalAmount: Nullable<number>;

    // 运费
    feightFee: Nullable<number>;

    // 支付方式【1->微信】
    payType: Nullable<number>;

    // 订单状态【0->待付款；1->待发货；2->已发货；3->待用户收货，已完成；-1->已取消】
    orderStatus: Nullable<number>;

    // 收货人姓名
    receiverName: Nullable<string>;

    // 收货人电话
    receiverPhone: Nullable<string>;

    // 收货人地址标签
    receiverTagName: Nullable<string>;

    // 省份/直辖市
    receiverProvince: Nullable<string>;

    // 城市
    receiverCity: Nullable<string>;

    // 区
    receiverDistrict: Nullable<string>;

    // 详细地址
    receiverAddress: Nullable<string>;

    // 支付时间
    paymentTime: Nullable<Date>;

    // 发货时间
    deliveryTime: Nullable<Date>;

    // 确认收货时间
    receiveTime: Nullable<Date>;

    // 订单备注
    remark: Nullable<string>;

    // 取消订单时间
    cancelTime: Nullable<Date>;

    // 取消订单原因
    cancelReason: Nullable<string>;

    // 订单项列表
    orderItemList: OrderItem[];

    constructor(
        userId?: Nullable<number>,
        nickName?: Nullable<string>,
        orderNo?: Nullable<string>,
        couponId?: Nullable<number>,
        totalAmount?: Nullable<number>,
        couponAmount?: Nullable<number>,
        originalTotalAmount?: Nullable<number>,
        feightFee?: Nullable<number>,
        payType?: Nullable<number>,
        orderStatus?: Nullable<number>,
        receiverName?: Nullable<string>,
        receiverPhone?: Nullable<string>,
        receiverTagName?: Nullable<string>,
        receiverProvince?: Nullable<string>,
        receiverCity?: Nullable<string>,
        receiverDistrict?: Nullable<string>,
        receiverAddress?: Nullable<string>,
        paymentTime?: Nullable<Date>,
        deliveryTime?: Nullable<Date>,
        receiveTime?: Nullable<Date>,
        remark?: Nullable<string>,
        cancelTime?: Nullable<Date>,
        cancelReason?: Nullable<string>,
        orderItemList: OrderItem[] = [],
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.userId = userId;
        this.nickName = nickName;
        this.orderNo = orderNo;
        this.couponId = couponId;
        this.totalAmount = totalAmount;
        this.couponAmount = couponAmount;
        this.originalTotalAmount = originalTotalAmount;
        this.feightFee = feightFee;
        this.payType = payType;
        this.orderStatus = orderStatus;
        this.receiverName = receiverName;
        this.receiverPhone = receiverPhone;
        this.receiverTagName = receiverTagName;
        this.receiverProvince = receiverProvince;
        this.receiverCity = receiverCity;
        this.receiverDistrict = receiverDistrict;
        this.receiverAddress = receiverAddress;
        this.paymentTime = paymentTime;
        this.deliveryTime = deliveryTime;
        this.receiveTime = receiveTime;
        this.remark = remark;
        this.cancelTime = cancelTime;
        this.cancelReason = cancelReason;
        this.orderItemList = orderItemList;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            userId: this.userId,
            nickName: this.nickName,
            orderNo: this.orderNo,
            couponId: this.couponId,
            totalAmount: this.totalAmount,
            couponAmount: this.couponAmount,
            originalTotalAmount: this.originalTotalAmount,
            feightFee: this.feightFee,
            payType: this.payType,
            orderStatus: this.orderStatus,
            receiverName: this.receiverName,
            receiverPhone: this.receiverPhone,
            receiverTagName: this.receiverTagName,
            receiverProvince: this.receiverProvince,
            receiverCity: this.receiverCity,
            receiverDistrict: this.receiverDistrict,
            receiverAddress: this.receiverAddress,
            paymentTime: this.paymentTime,
            deliveryTime: this.deliveryTime,
            receiveTime: this.receiveTime,
            remark: this.remark,
            cancelTime: this.cancelTime,
            cancelReason: this.cancelReason,
            orderItemList: this.orderItemList
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 订单项实体类 */
export class OrderItem extends BaseEntity {
    // 订单id
    orderId: Nullable<number>;

    // 商品sku编号
    skuId: Nullable<number>;

    // 商品sku名字
    skuName: Nullable<string>;

    // 商品sku图片
    thumbImg: Nullable<string>;

    // 商品sku价格
    skuPrice: Nullable<number>;

    // 商品购买的数量
    skuNum: Nullable<number>;

    constructor(
        orderId?: Nullable<number>,
        skuId?: Nullable<number>,
        skuName?: Nullable<string>,
        thumbImg?: Nullable<string>,
        skuPrice?: Nullable<number>,
        skuNum?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.orderId = orderId;
        this.skuId = skuId;
        this.skuName = skuName;
        this.thumbImg = thumbImg;
        this.skuPrice = skuPrice;
        this.skuNum = skuNum;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            orderId: this.orderId,
            skuId: this.skuId,
            skuName: this.skuName,
            thumbImg: this.thumbImg,
            skuPrice: this.skuPrice,
            skuNum: this.skuNum
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 订单日志实体对象 */
export class OrderLog extends BaseEntity {
    // 订单id
    orderId: Nullable<number>;

    // 操作人：用户；系统；后台管理员
    operateUser: Nullable<string>;

    // 订单状态
    processStatus: Nullable<number>;

    // 备注
    note: Nullable<string>;

    constructor(
        orderId?: Nullable<number>,
        operateUser?: Nullable<string>,
        processStatus?: Nullable<number>,
        note?: Nullable<string>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.orderId = orderId;
        this.operateUser = operateUser;
        this.processStatus = processStatus;
        this.note = note;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            orderId: this.orderId,
            operateUser: this.operateUser,
            processStatus: this.processStatus,
            note: this.note
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 订单统计实体类 */
export class OrderStatistics extends BaseEntity {
    orderDate: Nullable<Date>;
    totalAmount: Nullable<number>;
    totalNum: Nullable<number>;

    constructor(
        orderDate?: Nullable<Date>,
        totalAmount?: Nullable<number>,
        totalNum?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.totalNum = totalNum;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            orderDate: this.orderDate,
            totalAmount: this.totalAmount,
            totalNum: this.totalNum
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}