import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../models/products.model.js'

// Controlador para obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts()

    return res.status(200).json({
      success: true,
      message: 'Productos obtenidos exitosamente',
      data: {
        products
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

// Controlador para obtener un producto por ID
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params

    const [product] = await getProductById(id)

    if (product === undefined) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Producto obtenido exitosamente',
      data: {
        product
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

// Controlador para crear un nuevo producto (solo admin)
export const createNewProduct = async (req, res) => {
  try {
    const { nombre, precio, stock, descripcion } = req.body

    const [product] = await createProduct({ nombre, precio, stock, descripcion })

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: {
        product
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

// Controlador para actualizar un producto (solo admin)
export const updateExistingProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Verificar que el producto existe
    const [existingProduct] = await getProductById(id)
    if (existingProduct === undefined) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      })
    }

    // Combinar datos existentes con nuevos datos
    const productData = {
      nombre: updateData.nombre || existingProduct.nombre,
      precio: updateData.precio || existingProduct.precio,
      stock: updateData.stock !== undefined ? updateData.stock : existingProduct.stock,
      descripcion: updateData.descripcion || existingProduct.descripcion
    }

    const [product] = await updateProduct(id, productData)

    return res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: {
        product
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

// Controlador para eliminar un producto (solo admin)
export const deleteExistingProduct = async (req, res) => {
  try {
    const { id } = req.params

    const [product] = await deleteProduct(id)

    if (product === undefined) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: {
        product
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
