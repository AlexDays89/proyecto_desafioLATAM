import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const hasUrl = !!process.env.DATABASE_URL;

const ssl =
    process.env.DATABASE_SSL === "disable"
    ? false
    : { rejectUnauthorized: false };

const pool = hasUrl
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl, // Supabase/Neon: ON (a menos que pongas DATABASE_SSL=disable)
    })
    : new Pool({
        host: process.env.DATABASE_HOST || "localhost",
        port: Number(process.env.DATABASE_PORT || 5432),
        database: process.env.DATABASE_NAME || "postgres",
        user: process.env.DATABASE_USER || "postgres",
        password: process.env.DATABASE_PASSWORD || "",
        // En local: por defecto sin SSL. Si necesitas SSL, setea DATABASE_SSL=require
        ssl: process.env.DATABASE_SSL === "require" ? { rejectUnauthorized: false } : false,
    });

export default pool;
