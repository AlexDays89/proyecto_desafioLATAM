import { Pool } from "pg";

if (!process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL is required in production");
}

const useUrl = !!process.env.DATABASE_URL;

const pool = useUrl
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Supabase/Neon
    })
  : new Pool({
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT || 5432),
      database: process.env.DATABASE_NAME || "postgres",
      user: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "",
      ssl: process.env.DATABASE_SSL === "require" ? { rejectUnauthorized: false } : false,
    });

export default pool;