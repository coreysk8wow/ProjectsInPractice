import { BaseEntity } from "./base-entity";
import { Nullable } from "@/types/basic-type";


/** 用户地址实体类 */
export class UserAddress extends BaseEntity {
    // 用户ID
    userId: Nullable<number>;

    // name
    name: Nullable<string>;

    // 电话
    phone: Nullable<string>;

    // 标签名称
    tagName: Nullable<string>;

    // provinceCode
    provinceCode: Nullable<string>;

    // cityCode
    cityCode: Nullable<string>;

    // districtCode
    districtCode: Nullable<string>;

    // 详细地址
    address: Nullable<string>;

    // 完整地址
    fullAddress: Nullable<string>;

    // 是否默认地址（0：否 1：是）
    isDefault: Nullable<number>;

    constructor(
        userId?: Nullable<number>,
        name?: Nullable<string>,
        phone?: Nullable<string>,
        tagName?: Nullable<string>,
        provinceCode?: Nullable<string>,
        cityCode?: Nullable<string>,
        districtCode?: Nullable<string>,
        address?: Nullable<string>,
        fullAddress?: Nullable<string>,
        isDefault?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.tagName = tagName;
        this.provinceCode = provinceCode;
        this.cityCode = cityCode;
        this.districtCode = districtCode;
        this.address = address;
        this.fullAddress = fullAddress;
        this.isDefault = isDefault;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            userId: this.userId,
            name: this.name,
            phone: this.phone,
            tagName: this.tagName,
            provinceCode: this.provinceCode,
            cityCode: this.cityCode,
            districtCode: this.districtCode,
            address: this.address,
            fullAddress: this.fullAddress,
            isDefault: this.isDefault
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/** 用户实体类 */
export class UserInfo extends BaseEntity {
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

    constructor(
        username?: Nullable<string>,
        password?: Nullable<string>,
        nickName?: Nullable<string>,
        avatar?: Nullable<string>,
        sex?: Nullable<number>,
        phone?: Nullable<string>,
        memo?: Nullable<string>,
        openId?: Nullable<string>,
        unionId?: Nullable<string>,
        lastLoginIp?: Nullable<string>,
        lastLoginTime?: Nullable<Date>,
        status?: Nullable<number>,
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.username = username;
        this.password = password;
        this.nickName = nickName;
        this.avatar = avatar;
        this.sex = sex;
        this.phone = phone;
        this.memo = memo;
        this.openId = openId;
        this.unionId = unionId;
        this.lastLoginIp = lastLoginIp;
        this.lastLoginTime = lastLoginTime;
        this.status = status;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            username: this.username,
            password: this.password,
            nickName: this.nickName,
            avatar: this.avatar,
            sex: this.sex,
            phone: this.phone,
            memo: this.memo,
            openId: this.openId,
            unionId: this.unionId,
            lastLoginIp: this.lastLoginIp,
            lastLoginTime: this.lastLoginTime,
            status: this.status
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }

    
}