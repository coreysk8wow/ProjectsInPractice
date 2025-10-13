import { ResultCodeEnum } from "@/model/response/common-resp";

export class GuiguException extends Error {
    readonly name: string = "GuiguException";
    code: number;
    msg?: string;

    constructor(code: number, message: string, msg?: string) {
        super(message);
        this.code = code;
        this.msg = msg;
    }

    static fromEnum(resultCodeEnum: ResultCodeEnum, msg?: string): GuiguException {
        return new GuiguException(resultCodeEnum.code, resultCodeEnum.message, msg);
    }

}