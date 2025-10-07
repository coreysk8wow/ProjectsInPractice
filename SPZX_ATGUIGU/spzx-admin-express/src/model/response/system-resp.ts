import { Nullable } from "../../types/basic-type";

export class LoginResp {
    token: Nullable<string>; // 令牌
    refresh_token: Nullable<string>; // 刷新令牌,可以为空

    constructor(token?: Nullable<string>, refresh_token?: Nullable<string>) {
        this.token = token;
        this.refresh_token = refresh_token;
    }

    toJSON() {
        return {
            token: this.token,
            refresh_token: this.refresh_token
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/**
 * 系统菜单响应结果实体类
 */
export class SysMenuResp {
    title: Nullable<string>; // 系统菜单标题
    name: Nullable<string>; // 系统菜单名称
    children: SysMenuResp[]; // 系统菜单子菜单列表

    constructor(title?: Nullable<string>, name?: Nullable<string>, children: SysMenuResp[] = []) {
        this.title = title;
        this.name = name;
        this.children = children;
    }

    toJSON() {
        return {
            title: this.title,
            name: this.name,
            children: this.children
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

/**
 * 验证码响应结果实体类
 */
export class ValidateCodeResp {
    codeKey: Nullable<string>; // 验证码key
    codeValue: Nullable<string>; // 验证码值

    constructor(codeKey?: Nullable<string>, codeValue?: Nullable<string>) {
        this.codeKey = codeKey;
        this.codeValue = codeValue;
    }

    toJSON() {
        return {
            codeKey: this.codeKey,
            codeValue: this.codeValue
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
