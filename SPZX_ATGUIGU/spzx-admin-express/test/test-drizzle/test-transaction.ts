// import "dotenv/config";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { brand as brandTbl } from "../../src/db/schema.js";

// Specify custom .env path
config({ path: "../.env" });

const db = drizzle(process.env.DATABASE_URL!);

async function testTransaction() {
	const objInsert = { name: "BrandY", logo: "logogogo" };
	//

	try {
		await db.transaction(async (tx) => {
			const insertResult = await tx.insert(brandTbl).values(objInsert);
			const insertedId = insertResult[0].insertId;
			console.log("Insert Result:", insertedId);

			const objUpdate = { id: insertedId, logo: "newlogo" };

			await tx.update(brandTbl).set(objUpdate).where(eq(brandTbl.id, insertedId));

			throw new Error("Simulated error to test rollback");
		});
	} catch (error) {
		console.error("Transaction failed and rolled back:", error);
	}
}

await testTransaction();

process.exit(0);
