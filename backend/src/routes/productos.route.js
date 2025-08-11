import { Router } from "express";
import * as productosControllers from "../controllers/productos.controllers.js";
const router = Router();

router.get("/", productosControllers.getProducts);

router.get("/:id", productosControllers.getProductById);

router.post("/", productosControllers.createProduct);

router.put("/:id", productosControllers.updateProduct);

router.delete("/:id", productosControllers.deleteProduct);

export default router;
