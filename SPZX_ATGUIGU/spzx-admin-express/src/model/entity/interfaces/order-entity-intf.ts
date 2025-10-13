import { Nullable } from '@/types/basic-type.js';
import { IBaseEntity } from './baseEntity-intf';
import { Big } from 'big.js';

/** OrderInfo */
export interface IOrderInfo extends IBaseEntity {
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
    orderItemList: IOrderItem[];
}

/** 订单项实体类 */
export interface IOrderItem extends IBaseEntity {
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
}

/** 订单日志实体对象 */
export interface IOrderLog extends IBaseEntity {
    // 订单id
    orderId: Nullable<number>;

    // 操作人：用户；系统；后台管理员
    operateUser: Nullable<string>;

    // 订单状态
    processStatus: Nullable<number>;

    // 备注
    note: Nullable<string>;
}

/** 订单统计实体类 */
export interface IOrderStatistics extends IBaseEntity {
    orderDate: Nullable<Date>;
    totalAmount: Nullable<string>;
    totalNum: Nullable<number>;
}
