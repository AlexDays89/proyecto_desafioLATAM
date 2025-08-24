import { z } from 'zod'

// Esquema para agregar item al carrito
const addToCart = z.object({
  producto_id: z
    .number()
    .int('El ID del producto debe ser un número entero')
    .positive('El ID del producto debe ser positivo'),
  cantidad: z
    .number()
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser positiva')
    .max(100, 'La cantidad no puede exceder 100 unidades')
}).strict()

// Esquema para actualizar cantidad en carrito
const updateCartItem = z.object({
  producto_id: z
    .number()
    .int('El ID del producto debe ser un número entero')
    .positive('El ID del producto debe ser positivo'),
  cantidad: z
    .number()
    .int('La cantidad debe ser un número entero')
    .min(0, 'La cantidad no puede ser negativa')
    .max(100, 'La cantidad no puede exceder 100 unidades')
}).strict()

// Esquema para parámetros de producto ID
const productIdParam = z.object({
  producto_id: z
    .string()
    .regex(/^\d+$/, 'El ID del producto debe ser un número válido')
    .transform(val => parseInt(val, 10))
}).strict()

// Esquema para parámetros de compra ID
const purchaseIdParam = z.object({
  compra_id: z
    .string()
    .regex(/^\d+$/, 'El ID de la compra debe ser un número válido')
    .transform(val => parseInt(val, 10))
}).strict()

export default {
  addToCart,
  updateCartItem,
  productIdParam,
  purchaseIdParam
}
