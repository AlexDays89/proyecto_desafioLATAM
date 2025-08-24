import {
  getActiveCartItems,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearActiveCart,
  processCartPurchase,
  getUserPurchaseHistory,
  getPurchaseDetails
} from '../models/cart.model.js'
import { getProductById } from '../models/products.model.js'

// Controlador para obtener carrito activo del usuario
export const getCart = async (req, res) => {
  try {
    const { id: usuarioId } = req.user

    const items = await getActiveCartItems(usuarioId)
    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    return res.status(200).json({
      success: true,
      message: 'Carrito obtenido exitosamente',
      data: {
        items,
        total,
        total_items: items.length
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}

// Controlador para agregar item al carrito
export const addToCart = async (req, res) => {
  try {
    const { id: usuarioId } = req.user
    const { producto_id, cantidad } = req.body

    // Verificar que el producto existe y tiene stock suficiente
    const [product] = await getProductById(producto_id)
    if (product === undefined) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      })
    }

    if (product.stock < cantidad) {
      return res.status(400).json({
        success: false,
        message: `Stock insuficiente. Stock disponible: ${product.stock}`
      })
    }

    await addItemToCart(usuarioId, producto_id, cantidad)

    // Obtener carrito actualizado
    const items = await getActiveCartItems(usuarioId)
    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    return res.status(200).json({
      success: true,
      message: 'Producto agregado al carrito exitosamente',
      data: {
        items,
        total,
        total_items: items.length
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}

// Controlador para actualizar cantidad de item en carrito
export const updateCartItem = async (req, res) => {
  try {
    const { id: usuarioId } = req.user
    const { producto_id, cantidad } = req.body

    // Si la cantidad es mayor a 0, verificar stock
    if (cantidad > 0) {
      const [product] = await getProductById(producto_id)
      if (product === undefined) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        })
      }

      if (product.stock < cantidad) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente. Stock disponible: ${product.stock}`
        })
      }
    }

    const [updatedItem] = await updateCartItemQuantity(usuarioId, producto_id, cantidad)

    if (updatedItem === undefined) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado en el carrito'
      })
    }

    // Obtener carrito actualizado
    const items = await getActiveCartItems(usuarioId)
    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    return res.status(200).json({
      success: true,
      message: cantidad > 0 ? 'Cantidad actualizada exitosamente' : 'Item eliminado del carrito',
      data: {
        items,
        total,
        total_items: items.length
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}

// Controlador para eliminar item del carrito
export const removeFromCart = async (req, res) => {
  try {
    const { id: usuarioId } = req.user
    const { producto_id } = req.params

    const [deletedItem] = await removeItemFromCart(usuarioId, producto_id)

    if (deletedItem === undefined) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado en el carrito'
      })
    }

    // Obtener carrito actualizado
    const items = await getActiveCartItems(usuarioId)
    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    return res.status(200).json({
      success: true,
      message: 'Item eliminado del carrito exitosamente',
      data: {
        items,
        total,
        total_items: items.length
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}

// Controlador para limpiar carrito
export const clearCart = async (req, res) => {
  try {
    const { id: usuarioId } = req.user

    await clearActiveCart(usuarioId)

    return res.status(200).json({
      success: true,
      message: 'Carrito limpiado exitosamente',
      data: {
        items: [],
        total: 0,
        total_items: 0
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}

// Controlador para procesar compra
export const processPurchase = async (req, res) => {
  try {
    const { id: usuarioId } = req.user

    const result = await processCartPurchase(usuarioId)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Compra procesada exitosamente',
      data: {
        compra: {
          id: result.compra.id,
          fecha_compra: result.compra.fecha_compra,
          total: result.total,
          items: result.items
        }
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}

// Controlador para obtener historial de compras
export const getPurchaseHistory = async (req, res) => {
  try {
    const { id: usuarioId } = req.user

    const compras = await getUserPurchaseHistory(usuarioId)

    return res.status(200).json({
      success: true,
      message: 'Historial de compras obtenido exitosamente',
      data: {
        compras
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}

// Controlador para obtener detalles de una compra específica
export const getPurchaseDetail = async (req, res) => {
  try {
    const { id: usuarioId } = req.user
    const { compra_id } = req.params

    const [compra] = await getPurchaseDetails(usuarioId, compra_id)

    if (compra === undefined) {
      return res.status(404).json({
        success: false,
        message: 'Compra no encontrada'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Detalles de compra obtenidos exitosamente',
      data: {
        compra
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error inesperado',
      error: error.message
    })
  }
}
