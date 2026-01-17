import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config"

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está definido en .env");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);