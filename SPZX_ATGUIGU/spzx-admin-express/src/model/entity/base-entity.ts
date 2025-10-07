import { Nullable } from "../../types/basic-type";

export class BaseEntity {
    // 唯一标识
    id: Nullable<number>;

    // 创建时间
    createTime: Nullable<Date>;

    // 修改时间
    updateTime: Nullable<Date>;

    // 是否删除
    isDeleted: Nullable<number>;

	constructor(
		id?: Nullable<number>,
		createTime?: Nullable<Date>,
		updateTime?: Nullable<Date>,
		isDeleted?: Nullable<number>
	) {
		this.id = id;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.isDeleted = isDeleted;
	}

	toJSON() {
		return {
			id: this.id,
			createTime: this.createTime,
			updateTime: this.updateTime,
			isDeleted: this.isDeleted,
		};
	}

	toString(): string {
		return JSON.stringify(this.toJSON());
	}
}

/** 区域实体类 */
export class Region extends BaseEntity {
	code: Nullable<string>; // 区域编码
	parentCode: Nullable<string>; // 父区域编码
	name: Nullable<string>; // 父区域名称
	level: Nullable<number>; // 地区级别：1-省、自治区、直辖市 2-地级市、地区、自治州、盟 3-市辖区、县级市、县

	constructor(
		code?: Nullable<string>,
		parentCode?: Nullable<string>,
		name?: Nullable<string>,
		level?: Nullable<number>,
		id?: Nullable<number>,
		createTime?: Nullable<Date>,
		updateTime?: Nullable<Date>,
		isDeleted?: Nullable<number>
	) {
		super(id, createTime, updateTime, isDeleted);
		this.code = code;
		this.parentCode = parentCode;
		this.name = name;
		this.level = level;
	}

    toJSON() {
        return {
            ...super.toJSON(),
            code: this.code,
            parentCode: this.parentCode,
            name: this.name,
            level: this.level
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

