import { jwtVerify } from '../../utils/auth/jwt.js'

// Middleware para verificar autenticación JWT
export const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers?.authorization

    if (authorizationHeader === '' || authorizationHeader === undefined) {
      return res.status(401).json({})
    }

    const [bearer, token] = authorizationHeader.split(' ')
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({})
    }

    const decoded = jwtVerify(token)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: error })
  }
}

// Middleware para verificar rol de administrador
export const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. Se requieren permisos de administrador'
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al verificar permisos'
    })
  }
}
