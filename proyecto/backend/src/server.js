import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import cors from "cors";

import productosRoute from "./routes/productos.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.use("/productos", productosRoute);
app.use("/usuarios", authRoute);

export default app;