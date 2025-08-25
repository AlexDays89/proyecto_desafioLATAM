import { Router } from 'express'

import validateSchema from '../middlewares/validateSchema.middleware.js'
import { authMiddleware } from '../../../middlewares/auth.middleware.js'
import authSchemas from '../schemas/auth.schema.js'
import * as auth from '../controllers/auth.controller.js'

const router = Router()

// Rutas públicas
router.post('/auth/signin', validateSchema(authSchemas.signIn), auth.signIn)
router.post('/auth/signup', validateSchema(authSchemas.signUp), auth.signUp)

// Rutas protegidas
router.get('/auth/profile', authMiddleware, auth.getProfile)

export default router
