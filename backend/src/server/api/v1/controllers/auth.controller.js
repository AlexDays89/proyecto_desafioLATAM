import authModel from '../models/auth.model.js'
import { jwtSign } from '../../../../utils/auth/jwt.js'
import { sendEmail } from '../../../services/mailer/resend.js'
import logger from '../../../../utils/logger.js'
import tempo from '../../../../utils/tempo.js'

// Controlador para login de usuario
export const signIn = async (req, res) => {
  try {
    const { mail, password } = req.body

    const [user] = await authModel.findUserByEmailAndPass({ mail, password })

    if (user === undefined) {
      logger.warn(`[auth/signIn] Intento de login fallido para: ${mail}`)
      return res.status(401).json({
        status: false,
        code: 401,
        error: {
          message: 'Correo o contraseña inválidos. Intenta nuevamente.'
        },
        timestamp: tempo()
      })
    }

    const token = jwtSign({ id: user.id, mail: user.mail, rol: user.rol })

    // Enviar email de notificación usando la estructura original
    await sendEmail.signIn({
      email: user.mail,
      usuario: user.usuario
    })

    logger.info(`[auth/signIn] Login exitoso para: ${user.mail}`)
    return res.status(200).json({
      status: true,
      code: 200,
      data: {
        message: 'Has iniciado sesión con éxito.',
        token,
        user: {
          id: user.id,
          usuario: user.usuario,
          mail: user.mail,
          direccion: user.direccion,
          rol: user.rol
        }
      },
      timestamp: tempo()
    })
  } catch (error) {
    logger.error(`[auth/signIn] Error: ${error.message}`)
    return res.status(500).json({
      status: false,
      code: 500,
      error: {
        message: 'Error interno del servidor. Intenta nuevamente más tarde.'
      },
      timestamp: tempo()
    })
  }
}

// Controlador para registro de usuario
export const signUp = async (req, res) => {
  try {
    const { usuario, mail, password, direccion } = req.body

    const [existingUser] = await authModel.findUserByEmail({ mail })

    if (existingUser !== undefined) {
      logger.warn(`[auth/signUp] Intento de registro con email existente: ${mail}`)
      return res.status(409).json({
        status: false,
        code: 409,
        error: {
          message: 'El correo electrónico ya está registrado. Intenta con otro.'
        },
        timestamp: tempo()
      })
    }

    const [user] = await authModel.createUser({ usuario, mail, password, direccion })

    const token = jwtSign({ id: user.id, mail: user.mail, rol: user.rol })

    // Enviar email de bienvenida usando la estructura original
    await sendEmail.signUp({
      email: user.mail,
      usuario: user.usuario
    })

    logger.info(`[auth/signUp] Usuario registrado exitosamente: ${user.mail}`)
    return res.status(201).json({
      status: true,
      code: 201,
      data: {
        message: 'Tu cuenta ha sido creada con éxito. Ya puedes iniciar sesión.',
        token,
        user: {
          id: user.id,
          usuario: user.usuario,
          mail: user.mail,
          direccion: user.direccion,
          rol: user.rol
        }
      },
      timestamp: tempo()
    })
  } catch (error) {
    logger.error(`[auth/signUp] Error: ${error.message}`)
    return res.status(500).json({
      status: false,
      code: 500,
      error: {
        message: 'Error interno del servidor. Intenta nuevamente más tarde.'
      },
      timestamp: tempo()
    })
  }
}

// Controlador para obtener perfil de usuario
export const getProfile = async (req, res) => {
  try {
    const { id } = req.user // Viene del middleware de autenticación

    const [user] = await authModel.getUserById(id)

    if (user === undefined) {
      logger.warn(`[auth/getProfile] Usuario no encontrado con ID: ${id}`)
      return res.status(404).json({
        status: false,
        code: 404,
        error: {
          message: 'Usuario no encontrado.'
        },
        timestamp: tempo()
      })
    }

    logger.info(`[auth/getProfile] Perfil obtenido para usuario: ${user.mail}`)
    return res.status(200).json({
      status: true,
      code: 200,
      data: {
        message: 'Perfil obtenido exitosamente.',
        user: {
          id: user.id,
          usuario: user.usuario,
          mail: user.mail,
          direccion: user.direccion,
          rol: user.rol
        }
      },
      timestamp: tempo()
    })
  } catch (error) {
    logger.error(`[auth/getProfile] Error: ${error.message}`)
    return res.status(500).json({
      status: false,
      code: 500,
      error: {
        message: 'Error interno del servidor. Intenta nuevamente más tarde.'
      },
      timestamp: tempo()
    })
  }
}
