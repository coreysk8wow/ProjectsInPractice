import { Result, ResultCodeEnum } from "@/model/response/common-resp";
import { FileUploadServiceImpl } from "@/services/file-upload-service-impl";
import { IFileUploadService } from "@/services/interfaces/file-upload-service-intf";
import express from "express";
import multer from "multer";
import { Container as IoC } from "typedi";

export const uploadRouter = express.Router();
const fileUploadService: IFileUploadService = IoC.get(FileUploadServiceImpl);

// Multer setup for file uploads, multipart/form-data
// const upload = multer({ storage: multer.memoryStorage() });
const upload = multer();

// 上传文件到MinIO
uploadRouter.post("/uploadFile", upload.single("file"), async (req, res) => {
	try {
        if (!req.file) {
            return res.status(ResultCodeEnum.SYSTEM_ERROR.code).json(
                Result.buildFromEnum<string>(ResultCodeEnum.SYSTEM_ERROR, "No file uploaded.")
            );
        }

		const fileUrl = await fileUploadService.uploadMinio(req.file);
		res.status(ResultCodeEnum.SUCCESS.code).json(
			Result.buildFromEnum<string>(ResultCodeEnum.SUCCESS, fileUrl)
		);
	} catch (error) {
		console.error("File upload error:", error);
		res.status(ResultCodeEnum.SYSTEM_ERROR.code).json(
			Result.buildFromEnum<string>(ResultCodeEnum.SYSTEM_ERROR, "File upload failed.")
		);
	}
});
