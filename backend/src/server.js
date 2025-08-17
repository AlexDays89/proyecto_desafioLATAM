import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import cors from "cors";
import pool from "../schemas/db.js";
import dotenv from "dotenv";
dotenv.config();

import productosRoute from "./routes/productos.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.send("ok"));

app.use("/productos", productosRoute);
app.use("/usuarios", authRoute);

app.use((err, _req, res, _next) => {
    console.error("ERROR:", err);
    res.status(500).json({ error: err?.message || "internal-error" });
});

export default app;