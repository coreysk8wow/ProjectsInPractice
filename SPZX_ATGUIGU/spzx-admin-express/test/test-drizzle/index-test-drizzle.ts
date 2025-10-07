// import "dotenv/config";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { brand, brand as brandTbl } from "../../src/db/schema.js";

// Specify custom .env path
config({ path: "../.env" });

const db = drizzle(process.env.DATABASE_URL!);

async function query() {
	const cols = { id: brandTbl.id, name: brandTbl.name, logo: brandTbl.logo };

	const result = await db
		// .select({ name: brandTable.name, logo: brandTable.logo })
		.select(cols)
		.from(brandTbl)
		.where(eq(brandTbl.id, 1));


	console.log(result);
	// console.log(cols);
	// console.log(Array.isArray(result.toString()));

	/* const brand = new Brand();
	Object.assign(brand, result[0]);

	console.log(brand); */
}

await query();


async function insert() {
	const newBrand = { name: "New Brand", logo: null };
	await db.insert(brandTbl).values(newBrand);
}
// await insert();


async function insert2() {
    type BrandType = {
        id: number,
        name: string,
        logo: string
    }
    
    const newBrand: BrandType = { id: 22, name: "BrandX", logo: "http://brandx.logo" };

    const {id, ...brandWithoutId} = newBrand;
}


async function update() {
    const brandToUpdate = { id: 3338, name: "2Updated Brand", logo: null };

    await db.update(brandTbl).set(brandToUpdate).where(eq(brandTbl.id, brandToUpdate.id!));
}

// await update();

process.exit(0);
