import { Router } from 'express'
import {
  getProducts,
  getProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct
} from '../controllers/products.controller.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { authMiddleware, adminMiddleware } from '../../../middlewares/auth.middleware.js'
import productsSchema from '../schemas/products.schema.js'

const router = Router()

// Rutas públicas
router.get('/products', getProducts)
router.get('/products/:id', validateSchema(productsSchema.productId, 'params'), getProduct)

// Rutas protegidas (solo admin)
router.post('/products',
  authMiddleware,
  adminMiddleware,
  validateSchema(productsSchema.createProduct),
  createNewProduct
)

router.put('/products/:id',
  authMiddleware,
  adminMiddleware,
  validateSchema(productsSchema.productId, 'params'),
  validateSchema(productsSchema.updateProduct),
  updateExistingProduct
)

router.delete('/products/:id',
  authMiddleware,
  adminMiddleware,
  validateSchema(productsSchema.productId, 'params'),
  deleteExistingProduct
)

export default router
