export interface IFileUploadService {
    /**
     * @param file multer file object
     * @return fileUrl in MinIO
     */
	uploadMinio(file: any): Promise<string>;
}
