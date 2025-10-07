import { ISysUser } from "@/model/entity/interfaces/system-entity-intf";
import { Result, ResultCodeEnum } from "@/model/response/common-resp";
import { NextFunction } from "express";
import { SysUserServiceImpl } from "@/services/system-service-impl";
import { ISysUserService } from "@/services/interfaces/system-service-intf";
import { Container as IoC } from "typedi";
import { Nullable } from "@/types/basic-type";
import { GuiguException } from "@/exceptions/custom-exception";

const sysUserService: ISysUserService = IoC.get(SysUserServiceImpl);

// Extend Express Request interface to include user
/* declare global {
    namespace Express {
        interface Request {
            user?: ISysUser;
        }
    }
} */

export async function loginAuthenticationMW(req: any, res: any, next: any) {
	// Check if the current path should be excluded from authentication
	if (excludeAuthentication(req.path)) {
		next();
		return;
	}

	// Get request method
	const method = req.method;
	// If it's a CORS preflight request, allow it to pass through
	if (method && method.toUpperCase() === "OPTIONS") {
		next();
		return;
	}

	const token: string = req.headers.token as string;
	if (!token || token.trim() === "") {
		// responseNoLoginInfo(res);
		// return;
		throw GuiguException.fromEnum(ResultCodeEnum.LOGIN_AUTH);
	}

	// 如果token不为空，那么此时验证token的合法性
	const sysUser = await sysUserService.getUserInfo(token);
	if (sysUser === null || sysUser === undefined) {
		// responseNoLoginInfo(res);
		// return;
		throw GuiguException.fromEnum(ResultCodeEnum.LOGIN_AUTH);
	}

	// 将用户数据存储到ThreadLocal中
	res.locals.user = sysUser as ISysUser;

	// 设置token的过期时间为30分钟
	await sysUserService.resetUserTimeout(token, 30 * 60);

	next();
}

function excludeAuthentication(path: string): boolean {
	const excludedPaths: string[] = [
		"/admin/system/index/login", // 登录接口
		"/admin/system/index/generateValidateCode", // 获取验证码接口
	];

	if (excludedPaths.includes(path)) {
		return true;
	} else {
		return false;
	}
}

// Response 208 status code to frontend for login authentication failure
/* function responseNoLoginInfo(res) {
	const result = Result.buildFromEnum(ResultCodeEnum.LOGIN_AUTH);
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.status(ResultCodeEnum.LOGIN_AUTH.code).json(result);
} */

// Error handling middleware
export function globalErrorHandlingMW(err: any, req: any, res: any, next: any) {
	try {
		// console.error(err);
		console.error(`------Error message: ${err.message}, error code: ${err.code}------`);

		// Handle custom GuiguException
		if (err.name === "GuiguException") {
			return res.status(err.code).json(Result.build(err.code, err.message));
		}

		// Handle other errors
		return res
			.status(ResultCodeEnum.SYSTEM_ERROR.code)
			.json(Result.buildFromEnum(ResultCodeEnum.SYSTEM_ERROR, "Internal server error"));
	} catch (error) {
		next(error);
	}
}
