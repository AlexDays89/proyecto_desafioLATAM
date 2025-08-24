import sqlConnection from '../../../services/database/sqlConnection.js'

// Función para obtener todos los productos
export const getAllProducts = async () => {
  const products = await sqlConnection('SELECT * FROM productos ORDER BY id;')
  return products
}

// Función para obtener un producto por ID
export const getProductById = async (id) => {
  const [product] = await sqlConnection('SELECT * FROM productos WHERE id = $1;', [id])

  if (product === undefined) {
    return []
  }

  return [product]
}

// Función para crear un nuevo producto (solo admin)
export const createProduct = async ({ nombre, precio, stock, descripcion }) => {
  const [product] = await sqlConnection(
    'INSERT INTO productos (nombre, precio, stock, descripcion) VALUES ($1, $2, $3, $4) RETURNING *;',
    [nombre, precio, stock, descripcion]
  )

  return [product]
}

// Función para actualizar un producto (solo admin)
export const updateProduct = async (id, { nombre, precio, stock, descripcion }) => {
  const [product] = await sqlConnection(
    'UPDATE productos SET nombre = $1, precio = $2, stock = $3, descripcion = $4 WHERE id = $5 RETURNING *;',
    [nombre, precio, stock, descripcion, id]
  )

  if (product === undefined) {
    return []
  }

  return [product]
}

// Función para eliminar un producto (solo admin)
export const deleteProduct = async (id) => {
  const [product] = await sqlConnection(
    'DELETE FROM productos WHERE id = $1 RETURNING *;',
    [id]
  )

  if (product === undefined) {
    return []
  }

  return [product]
}

// Función para actualizar stock de producto
export const updateProductStock = async (id, newStock) => {
  const [product] = await sqlConnection(
    'UPDATE productos SET stock = $1 WHERE id = $2 RETURNING *;',
    [newStock, id]
  )

  if (product === undefined) {
    return []
  }

  return [product]
}
