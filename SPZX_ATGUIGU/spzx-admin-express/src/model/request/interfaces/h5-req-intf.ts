import { IBaseEntity } from '@/model/entity/interfaces/baseEntity-intf';
import { Nullable } from '@/types/basic-type.js';

/** 系统菜单实体类 */
export interface ISysMenu extends IBaseEntity {
    // 父节点id
    parentId: Nullable<number>;

    // 节点标题
    title: Nullable<string>;

    // 组件名称
    component: Nullable<string>;

    // 排序值
    sortValue: Nullable<number>;

    // 状态(0:禁止,1:正常)
    status: Nullable<number>;

    // 子节点
    children: ISysMenu[];
}
