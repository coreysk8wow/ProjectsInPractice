import { Nullable } from "@/types/basic-type";
import { IBaseEntity } from "./baseEntity-intf";


/** 用户地址实体类 */
export interface IUserAddress extends IBaseEntity {
    // 用户ID
    userId: number;

    // name
    name: string;

    // 电话
    phone: string;

    // 标签名称
    tagName: Nullable<string>;

    // provinceCode
    provinceCode: Nullable<string>;

    // cityCode
    cityCode: Nullable<string>;

    // districtCode
    districtCode: Nullable<string>;

    // 详细地址
    address: string;

    // 完整地址
    fullAddress: Nullable<string>;

    // 是否默认地址（0：否 1：是）
    isDefault: number;
}

/** 用户实体类 */
export interface IUserInfo extends IBaseEntity {
    // 用户名
    username: Nullable<string>;

    // 密码
    password: Nullable<string>;

    // 昵称
    nickName: Nullable<string>;

    // 头像
    avatar: Nullable<string>;

    // 性别
    sex: Nullable<number>;

    // 电话号码
    phone: Nullable<string>;

    // 备注
    memo: Nullable<string>;

    // 微信open id
    openId: Nullable<string>;

    // 微信开放平台unionID
    unionId: Nullable<string>;

    // 最后一次登录ip
    lastLoginIp: Nullable<string>;

    // 最后一次登录时间
    lastLoginTime: Nullable<Date>;

    // 状态：1为正常，0为禁止
    status: Nullable<number>;
}