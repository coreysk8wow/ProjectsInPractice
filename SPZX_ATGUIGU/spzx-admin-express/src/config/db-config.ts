import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";

// Specify custom .env path
config({ path: ".env" });

export const db = drizzle(process.env.DATABASE_URL!, { logger: false });
console.log("Database connected with URL:", process.env.DATABASE_URL);
