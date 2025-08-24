import { Router } from 'express'
import auth from './auth.router.js'
import productsRouter from './products.router.js'
import cartRouter from './cart.router.js'

const router = Router()

// Rutas de autenticación
router.use(auth)

// Rutas de productos
router.use(productsRouter)

// Rutas de carrito y compras
router.use(cartRouter)

export default router
