import { IValidateCodeResp } from "@/model/response/interfaces/system-resp-intf";


export interface IValidationCodeService {
    // 获取验证码图片
    generateCaptcha(): Promise<IValidateCodeResp>;
}