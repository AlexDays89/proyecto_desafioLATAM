import { Pool } from "pg";

const dbConnection = () => {
    const dbConfig = {
        host: process.env.DATABASE_HOST || "localhost",
        port: process.env.DATABASE_PORT || 5432,
        database: process.env.DATABASE_NAME || "aritarot_db",
        user: process.env.DATABASE_USER || "postgres",
        password: process.env.DATABASE_PASSWORD || "postgres",
        allowExitOnIdle: true,
        ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
    };
    
    return new Pool(dbConfig);
};

export default dbConnection;
