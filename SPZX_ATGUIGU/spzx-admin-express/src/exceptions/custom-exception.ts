import { ResultCodeEnum } from "@/model/response/common-resp";

export class GuiguException extends Error {
    readonly name: string = "GuiguException";
    code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }

    static fromEnum(resultCodeEnum: ResultCodeEnum): GuiguException {
        return new GuiguException(resultCodeEnum.code, resultCodeEnum.message);
    }

}