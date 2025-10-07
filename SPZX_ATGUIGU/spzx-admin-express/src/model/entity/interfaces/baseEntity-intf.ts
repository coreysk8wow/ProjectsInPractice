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