import { GuiguException } from "@/exceptions/custom-exception";
import { ISysUser } from "@/model/entity/interfaces/system-entity-intf";
import { ILoginReq } from "@/model/request/interfaces/system-req-intf";
import { Result, ResultCodeEnum } from "@/model/response/common-resp";
import { ILoginResp, IValidateCodeResp } from "@/model/response/interfaces/system-resp-intf";
import { ValidationCodeServiceImpl } from "@/services/common-service-impl";
import { IValidationCodeService } from "@/services/interfaces/common-service-intf";
import { ISysUserService } from "@/services/interfaces/system-service-intf";
import { SysUserServiceImpl } from "@/services/system-service-impl";
import { Nullable } from "@/types/basic-type";
import express from "express";
import { Container as IoC } from "typedi";

export const indexRouter = express.Router();
const sysUserService: ISysUserService = IoC.get(SysUserServiceImpl);

// 登录接口
indexRouter.post("/login", async function (req, res) {
	// More explicit conversion with error handling
	const loginRequest: ILoginReq = {
		userName: req.body.userName,
		password: req.body.password,
		captcha: req.body.captcha,
		codeKey: req.body.codeKey,
		// Add other properties as defined in ILoginReq
	};

	// Validation
	if (!loginRequest.userName || !loginRequest.password || !loginRequest.captcha) {
		throw new GuiguException(
			ResultCodeEnum.USER_PASSWORD_CAPTCHA_EMPTY.code,
			ResultCodeEnum.USER_PASSWORD_CAPTCHA_EMPTY.message
		);
	} else if (!loginRequest.codeKey) {
		throw new GuiguException(
			ResultCodeEnum.SYSTEM_ERROR.code,
			ResultCodeEnum.SYSTEM_ERROR.message + " (Missing codeKey)"
		);
	}

	// Process login logic here
	console.log("Processing login for user:", loginRequest.userName);

	const loginResp: Nullable<ILoginResp> = await sysUserService.login(loginRequest);

	if (loginResp) {
		res.status(ResultCodeEnum.SUCCESS.code).json(
			Result.buildFromEnum<ILoginResp>(ResultCodeEnum.SUCCESS, loginResp)
		);
	} else {
		throw new GuiguException(
			ResultCodeEnum.SYSTEM_ERROR.code,
			ResultCodeEnum.SYSTEM_ERROR.message
		);
	}
});

// 登出接口
indexRouter.get("/logout", async function (req, res) {
	await sysUserService.logout(req.headers.token as string);
	res.status(ResultCodeEnum.SUCCESS.code).json(Result.buildFromEnum(ResultCodeEnum.SUCCESS));
});

// 生成验证码接口
indexRouter.get("/generateValidateCode", async function (req, res) {
	const validationCodeService: IValidationCodeService = IoC.get(ValidationCodeServiceImpl);
	const response: IValidateCodeResp = await validationCodeService.generateCaptcha();
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<IValidateCodeResp>(ResultCodeEnum.SUCCESS, response)
	);
});

// 获取用户信息接口
indexRouter.get("/getUserInfo", function (req, res) {
	console.log("Fetching user info for user:", res.locals.user);
	res.status(ResultCodeEnum.SUCCESS.code).json(
		Result.buildFromEnum<ISysUser>(ResultCodeEnum.SUCCESS, res.locals.user)
	);
});
