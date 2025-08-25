import express from "express";
import { crearCompra, getComprasByUsuario, getItemsByCompra } from "../controllers/compra.controller.js";

const router = express.Router();

// Registrar una compra exitosa
router.post("/", crearCompra);
router.get("/usuario/:id", getComprasByUsuario);
router.get("/:id", getItemsByCompra);

export default router;
