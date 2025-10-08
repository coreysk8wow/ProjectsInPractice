/**
 * Create MinIO client, at the start of the app, not per each request.
 */

import { Client } from "minio";
import { config } from 'dotenv';

// Specify custom .env path
config({ path: ".env" });


// MinIO configuration
export const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT!, 
    port: parseInt(process.env.MINIO_PORT!),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

