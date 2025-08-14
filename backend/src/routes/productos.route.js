import { Router } from "express";
import * as productosControllers from "../controllers/productos.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", productosControllers.getProducts);
router.get("/:id", productosControllers.getProductById);
router.put("/:id", authMiddleware, adminMiddleware, productosControllers.updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, productosControllers.deleteProduct);
router.post("/", authMiddleware, adminMiddleware, productosControllers.createProduct);

export default router;
