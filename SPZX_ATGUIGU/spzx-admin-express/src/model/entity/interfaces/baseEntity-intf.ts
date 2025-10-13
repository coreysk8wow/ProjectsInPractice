import { Nullable } from "@/types/basic-type";

export interface IBaseEntity {
    // 唯一标识
    id: Nullable<number>;

    // 创建时间
    createTime: Nullable<Date>;

    // 修改时间
    updateTime: Nullable<Date>;

    // 删除标记（0:不可用 1:可用）
    isDeleted: number;
}

export interface IRegion extends IBaseEntity {
    code: Nullable<string>; // 区域编码
    parentCode: Nullable<string>; // 父区域编码
    name: Nullable<string>; // 父区域名称
    level: Nullable<number>; // 地区级别：1-省、自治区、直辖市 2-地级市、地区、自治州、盟 3-市辖区、县级市、县
}