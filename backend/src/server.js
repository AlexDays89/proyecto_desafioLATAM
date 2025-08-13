import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import productosRoute from "./routes/productos.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/productos", productosRoute);
app.use("/usuarios", authRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;