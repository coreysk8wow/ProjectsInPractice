import { BaseEntity } from './base-entity.js';
import { Nullable } from '../../types/basic-type.js';

/** 系统菜单实体类 */
export class SysMenu extends BaseEntity {
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
    children: SysMenu[];

    constructor(
        parentId?: Nullable<number>,
        title?: Nullable<string>,
        component?: Nullable<string>,
        sortValue?: Nullable<number>,
        status?: Nullable<number>,
        children: SysMenu[] = [],
        id?: Nullable<number>,
        createTime?: Nullable<Date>,
        updateTime?: Nullable<Date>,
        isDeleted?: Nullable<number>
    ) {
        super(id, createTime, updateTime, isDeleted);
        this.parentId = parentId;
        this.title = title;
        this.component = component;
        this.sortValue = sortValue;
        this.status = status;
        this.children = children;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentId: this.parentId,
            title: this.title,
            component: this.component,
            sortValue: this.sortValue,
            status: this.status,
            children: this.children
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
