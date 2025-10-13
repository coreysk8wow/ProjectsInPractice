import { Nullable } from "@/types/basic-type.js";

export class Result<T> {
    code: Nullable<number>;
    message: Nullable<string>;
    data: Nullable<T>;

    constructor(code?: Nullable<number>, message?: Nullable<string>, data?: Nullable<T>) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static build<T>(code: Nullable<number>, message: Nullable<string>, data?: Nullable<T>): Result<T> {
        return new Result<T>(code, message, data);
    }

    static buildFromEnum<T>(resultCodeEnum: ResultCodeEnum, data?: Nullable<T>): Result<T> {
        return this.build(resultCodeEnum.code, resultCodeEnum.message, data);
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message,
            data: this.data
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

export class ResultCodeEnum {
    static readonly SUCCESS = new ResultCodeEnum(200, "操作成功");
    static readonly WRONG_PASSWORD = new ResultCodeEnum(201, "密码错误");//用户名或者密码错误
    static readonly WRONG_VALIDATECODE = new ResultCodeEnum(202, "验证码错误");
    static readonly USER_PASSWORD_CAPTCHA_EMPTY = new ResultCodeEnum(203, "用户、密码、验证码不能为空");
    static readonly LOGIN_AUTH = new ResultCodeEnum(208, "用户未登录");
    static readonly USER_NAME_IS_EXISTS = new ResultCodeEnum(209, "用户名已经存在");
    static readonly USER_NOT_EXISTS = new ResultCodeEnum(210, "用户不存在");
    static readonly USERNAME_CHANGING_FORBIDDEN = new ResultCodeEnum(210, "用户名username不可以修改");
    static readonly SYSTEM_ERROR = new ResultCodeEnum(999, "系统异常，请稍后再试");
    static readonly NODE_ERROR = new ResultCodeEnum(217, "该节点下有子节点，不可以删除，请先删除子菜单。");
    static readonly DELETE_ROLE_USER_EXIST = new ResultCodeEnum(218, "该角色下有用户，不可以删除，请先删除用户。");
    static readonly DATA_ERROR = new ResultCodeEnum(204, "数据异常");
    static readonly ACCOUNT_STOP = new ResultCodeEnum(216, "账号已停用");
    static readonly STOCK_LESS = new ResultCodeEnum(219, "库存不足");
    static readonly PARAM_ERROR = new ResultCodeEnum(400, "参数错误");

    #code;
    #message;

    private constructor(code: number, message: string) {
        this.#code = code;
        this.#message = message;
    }

    get code(): number {
        return this.#code;
    }

    get message(): string {
        return this.#message;
    }

    toJSON() {
        return {
            code: this.#code,
            message: this.#message
        };
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
}

export class PageInfo<T> {
    list: T[];
    total?: number;

    constructor(list: T[], total?: number) {
        this.list = list;
        this.total = total;
    }
}

// Test code ------------------------------------------------------------

function test1() {
    const SUCCESS = new Result<string>(200, 'success', 'hello world');
    const useNotExist = Result.buildFromEnum(ResultCodeEnum.USER_NOT_EXISTS);
    const systemError = Result.buildFromEnum<string>(ResultCodeEnum.SYSTEM_ERROR, "hello error");
    console.log(SUCCESS.toString()); // Implicitly calls toString()
    console.log(useNotExist.toString()); // Implicitly calls toString()
    console.log(systemError.toString()); // Implicitly calls toString()


    // ResultCodeEnum.SUCCESS = new ResultCodeEnum(300, "操作成功");
    console.log(ResultCodeEnum.SUCCESS.toString());
}

// test1();