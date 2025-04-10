import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema.js";
import { DATABASE_URL } from "../config.js";

const sql = neon(DATABASE_URL);

const db = drizzle(sql, { schema });

export default db;
