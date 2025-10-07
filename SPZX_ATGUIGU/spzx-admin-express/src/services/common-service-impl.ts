import { GuiguException } from "@/exceptions/custom-exception";
import { redisClient } from "@/utils/redis-util";
import svgCaptcha from "svg-captcha";
import { IValidateCodeResp } from "@/model/response/interfaces/system-resp-intf";
import { v4 as uuidv4 } from "uuid";
import { Service } from "typedi";
import { IValidationCodeService } from "./interfaces/common-service-intf";
import { CODEKEY_PREFIX } from "@/constants/redis-constants";

@Service()
export class ValidationCodeServiceImpl implements IValidationCodeService {
	async generateCaptcha(): Promise<IValidateCodeResp> {
		const captcha = svgCaptcha.create({
			size: 4, // length of random string
			ignoreChars: "0O1ilI", // optional: remove confusing chars
			noise: 2, // number of noise lines
			color: true, // whether to set font color (leave false for plain)
			background: "#ffffff", // optional background
			charPreset: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		});

		const codeValue = captcha.text; // 获取验证码文本内容

		// 生成uuid作为图片验证码的key
		const codeKey = uuidv4().replace(/-/g, "");
		console.log(`captcha codekey: ${codeKey}`);

		// 将验证码存入redis，设置过期时间为5分钟
		const redisSetResult = await redisClient.setEx(
			`${CODEKEY_PREFIX}${codeKey}`,
			300,
			codeValue
		);
		if (redisSetResult !== "OK") {
			throw new GuiguException(500, "Failed to store captcha in Redis");
		}

		// Convert SVG to base64 data URL
		const svgBase64 = Buffer.from(captcha.data).toString("base64");
		const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

		return {
			codeKey: codeKey,
			codeValue: dataUrl,
		} as IValidateCodeResp;
	}
}
