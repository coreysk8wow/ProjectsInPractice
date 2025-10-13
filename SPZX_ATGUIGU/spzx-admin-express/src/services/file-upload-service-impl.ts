import { minioClient } from "@/config/minio-config";
import { config } from "dotenv";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { IFileUploadService } from "./interfaces/file-upload-service-intf";

// Specify custom .env path
config({ path: ".env" });

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME!;

@Service()
export class FileUploadServiceImpl implements IFileUploadService {
	/**
	 * @param file mutlter file object
	 * @return fileUrl in MinIO
	 */
	async uploadMinio(file: any): Promise<string> {
		try {
			// Check if bucket exists, create if not
			const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
			if (!bucketExists) {
				await minioClient.makeBucket(BUCKET_NAME);
				console.log(`Bucket ${BUCKET_NAME} created successfully`);
			} else {
				console.log(`Bucket ${BUCKET_NAME} already exists.`);
			}

			// Generate file name with date and UUID
			const dateDir = new Date().toISOString().slice(0, 10).replace(/-/g, "");
			const uuid = uuidv4().replace(/-/g, "");
			const fileName = `${dateDir}/${uuid}${file.originalname}`;

			console.log(`Uploading file: ${fileName} to bucket: ${BUCKET_NAME}`);

			// Upload file to MinIO
			await minioClient.putObject(BUCKET_NAME, fileName, file.buffer, file.size);

			// Return file URL
			const fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${fileName}`;
			console.log(`File uploaded successfully. Accessible at: ${fileUrl}`);

			return fileUrl;
		} catch (err) {
			console.error("Error uploading file to MinIO:", err);
			throw new Error("File upload failed");
		}
	}
}
