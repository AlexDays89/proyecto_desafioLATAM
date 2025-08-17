import { Pool } from "pg";

let pool;

if (process.env.DATABASE_URL) {
    const { URL } = globalThis;
    const url = new URL(process.env.DATABASE_URL);

    const port = url.port ? Number(url.port) : 5432;
    const database = url.pathname.replace(/^\//, "");

    pool = new Pool({
    host: address,
    port,
    database,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
    });

} else {
    pool = new Pool({
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT || 5432),
    database: process.env.DATABASE_NAME || "postgres",
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "",
    ssl: process.env.DATABASE_SSL === "require" ? { rejectUnauthorized: false } : false,
    });
}
export default pool;