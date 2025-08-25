import { Router } from 'express'
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  processPurchase,
  getPurchaseHistory,
  getPurchaseDetail
} from '../controllers/cart.controller.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { authMiddleware } from '../../../middlewares/auth.middleware.js'
import cartSchema from '../schemas/cart.schema.js'

const router = Router()

// Todas las rutas del carrito requieren autenticación
router.use(authMiddleware)

// Rutas del carrito activo
router.get('/cart', getCart)
router.post('/cart/add', validateSchema(cartSchema.addToCart), addToCart)
router.put('/cart/update', validateSchema(cartSchema.updateCartItem), updateCartItem)
router.delete('/cart/remove/:producto_id',
  validateSchema(cartSchema.productIdParam, 'params'),
  removeFromCart
)
router.delete('/cart/clear', clearCart)

// Rutas de compras
router.post('/cart/purchase', processPurchase)
router.get('/purchases', getPurchaseHistory)
router.get('/purchases/:compra_id',
  validateSchema(cartSchema.purchaseIdParam, 'params'),
  getPurchaseDetail
)

export default router
