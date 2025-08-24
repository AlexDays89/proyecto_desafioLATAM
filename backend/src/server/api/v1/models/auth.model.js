import sqlConnection from '../../../services/database/sqlConnection.js'
import { compare, encrypt } from '../../../../utils/auth/bcrypt.js'

// Función para login - buscar usuario por email y password
const findUserByEmailAndPass = async ({ mail, password }) => {
  const [user] = await sqlConnection('SELECT * FROM usuarios WHERE mail = $1;', [mail])

  if (user === undefined ||
    compare(password, user.password) === false) {
    return []
  }

  return [{
    id: user.id,
    usuario: user.usuario,
    mail: user.mail,
    direccion: user.direccion,
    rol: user.rol
  }]
}

// Función para verificar si existe usuario por email
const findUserByEmail = async ({ mail }) => {
  const [user] = await sqlConnection('SELECT mail FROM usuarios WHERE mail = $1;', [mail])

  if (user === undefined) {
    return []
  }

  return [user]
}

// Función para crear nuevo usuario
const createUser = async ({ usuario, mail, password, direccion }) => {
  const [user] = await sqlConnection(
    'INSERT INTO usuarios (usuario, mail, password, direccion, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
    [usuario, mail, encrypt(password), direccion, 'cliente']
  )

  return [{
    id: user.id,
    usuario: user.usuario,
    mail: user.mail,
    direccion: user.direccion,
    rol: user.rol
  }]
}

// Función para obtener perfil de usuario por ID
const getUserById = async (id) => {
  const [user] = await sqlConnection('SELECT id, usuario, mail, direccion, rol FROM usuarios WHERE id = $1;', [id])

  if (user === undefined) {
    return []
  }

  return [{
    id: user.id,
    usuario: user.usuario,
    mail: user.mail,
    direccion: user.direccion,
    rol: user.rol
  }]
}

export default {
  findUserByEmailAndPass,
  findUserByEmail,
  createUser,
  getUserById
}
