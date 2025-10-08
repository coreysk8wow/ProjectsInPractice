import { v4 as uuidv4 } from "uuid";
import path from "path";


const dateDir = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const uuid = uuidv4().replace(/-/g, "");
const fileName = `${dateDir}/${uuid}${path.extname('example.png')}`;

console.log(dateDir); // Outputs: YYYYMMDD format, e.g., 20231005
console.log(uuid);    // Outputs: UUID without hyphens
console.log(fileName); // Outputs: Combined file name with date directory and UUID
