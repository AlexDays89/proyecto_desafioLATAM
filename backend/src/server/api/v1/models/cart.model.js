import sqlConnection from '../../../services/database/sqlConnection.js'

// Función para obtener o crear carrito activo del usuario
export const getOrCreateActiveCart = async (usuarioId) => {
  // Buscar carrito activo existente
  let [cart] = await sqlConnection(
    'SELECT * FROM carritos_activos WHERE usuario_id = $1;',
    [usuarioId]
  )

  // Si no existe, crear uno nuevo
  if (cart === undefined) {
    [cart] = await sqlConnection(
      'INSERT INTO carritos_activos (usuario_id) VALUES ($1) RETURNING *;',
      [usuarioId]
    )
  }

  return [cart]
}

// Función para obtener items del carrito activo
export const getActiveCartItems = async (usuarioId) => {
  const items = await sqlConnection(`
    SELECT 
      cai.id,
      cai.producto_id,
      cai.cantidad,
      p.nombre,
      p.precio,
      p.stock,
      p.descripcion,
      (cai.cantidad * p.precio) as subtotal
    FROM carrito_activo_items cai
    JOIN carritos_activos ca ON cai.carrito_activo_id = ca.id
    JOIN productos p ON cai.producto_id = p.id
    WHERE ca.usuario_id = $1
    ORDER BY cai.id;
  `, [usuarioId])

  return items
}

// Función para agregar item al carrito
export const addItemToCart = async (usuarioId, productoId, cantidad) => {
  // Obtener o crear carrito activo
  const [cart] = await getOrCreateActiveCart(usuarioId)

  // Verificar si el item ya existe en el carrito
  const [existingItem] = await sqlConnection(
    'SELECT * FROM carrito_activo_items WHERE carrito_activo_id = $1 AND producto_id = $2;',
    [cart.id, productoId]
  )

  let item
  if (existingItem) {
    // Actualizar cantidad si ya existe
    const newCantidad = existingItem.cantidad + cantidad
    const [item] = await sqlConnection(
      'UPDATE carrito_activo_items SET cantidad = $1 WHERE id = $2 RETURNING *;',
      [newCantidad, existingItem.id]
    )
  } else {
    // Crear nuevo item
    [item] = await sqlConnection(
      'INSERT INTO carrito_activo_items (carrito_activo_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *;',
      [cart.id, productoId, cantidad]
    )
  }

  return [item]
}

// Función para actualizar cantidad de item en carrito
export const updateCartItemQuantity = async (usuarioId, productoId, cantidad) => {
  const [cart] = await getOrCreateActiveCart(usuarioId)

  if (cantidad <= 0) {
    // Si la cantidad es 0 o menor, eliminar el item
    const [deletedItem] = await sqlConnection(
      'DELETE FROM carrito_activo_items WHERE carrito_activo_id = $1 AND producto_id = $2 RETURNING *;',
      [cart.id, productoId]
    )
    return [deletedItem]
  } else {
    // Actualizar cantidad
    const [item] = await sqlConnection(
      'UPDATE carrito_activo_items SET cantidad = $1 WHERE carrito_activo_id = $2 AND producto_id = $3 RETURNING *;',
      [cantidad, cart.id, productoId]
    )
    return [item]
  }
}

// Función para eliminar item del carrito
export const removeItemFromCart = async (usuarioId, productoId) => {
  const [cart] = await getOrCreateActiveCart(usuarioId)

  const [deletedItem] = await sqlConnection(
    'DELETE FROM carrito_activo_items WHERE carrito_activo_id = $1 AND producto_id = $2 RETURNING *;',
    [cart.id, productoId]
  )

  return [deletedItem]
}

// Función para limpiar carrito activo
export const clearActiveCart = async (usuarioId) => {
  const [cart] = await getOrCreateActiveCart(usuarioId)

  await sqlConnection(
    'DELETE FROM carrito_activo_items WHERE carrito_activo_id = $1;',
    [cart.id]
  )

  return true
}

// Función para procesar compra (mover carrito activo a compra)
export const processCartPurchase = async (usuarioId) => {
  const items = await getActiveCartItems(usuarioId)

  if (items.length === 0) {
    return { success: false, message: 'El carrito está vacío' }
  }

  // Calcular total
  const total = items.reduce((sum, item) => sum + item.subtotal, 0)

  // Crear registro de compra
  const [compra] = await sqlConnection(
    'INSERT INTO compras (usuario_id, fecha_compra, total) VALUES ($1, NOW(), $2) RETURNING *;',
    [usuarioId, total]
  )

  // Mover items del carrito a carrito_items
  for (const item of items) {
    await sqlConnection(
      'INSERT INTO carrito_items (compra_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4);',
      [compra.id, item.producto_id, item.cantidad, item.precio]
    )

    // Actualizar stock del producto
    await sqlConnection(
      'UPDATE productos SET stock = stock - $1 WHERE id = $2;',
      [item.cantidad, item.producto_id]
    )
  }

  // Limpiar carrito activo
  await clearActiveCart(usuarioId)

  return { success: true, compra, items, total }
}

// Función para obtener historial de compras del usuario
export const getUserPurchaseHistory = async (usuarioId) => {
  const compras = await sqlConnection(`
    SELECT 
      c.id,
      c.fecha_compra,
      c.total,
      COUNT(ci.id) as total_items
    FROM compras c
    LEFT JOIN carrito_items ci ON c.id = ci.compra_id
    WHERE c.usuario_id = $1
    GROUP BY c.id, c.fecha_compra, c.total
    ORDER BY c.fecha_compra DESC;
  `, [usuarioId])

  return compras
}

// Función para obtener detalles de una compra específica
export const getPurchaseDetails = async (usuarioId, compraId) => {
  const [compra] = await sqlConnection(
    'SELECT * FROM compras WHERE id = $1 AND usuario_id = $2;',
    [compraId, usuarioId]
  )

  if (compra === undefined) {
    return []
  }

  const items = await sqlConnection(`
    SELECT 
      ci.id,
      ci.producto_id,
      ci.cantidad,
      ci.precio_unitario,
      p.nombre,
      p.descripcion,
      (ci.cantidad * ci.precio_unitario) as subtotal
    FROM carrito_items ci
    JOIN productos p ON ci.producto_id = p.id
    WHERE ci.compra_id = $1
    ORDER BY ci.id;
  `, [compraId])

  return [{ ...compra, items }]
}
