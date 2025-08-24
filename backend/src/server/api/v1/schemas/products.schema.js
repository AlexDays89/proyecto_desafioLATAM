import { z } from 'zod'

// Esquema para crear producto
const createProduct = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),
  precio: z
    .number()
    .positive('El precio debe ser un número positivo')
    .max(999999.99, 'El precio no debe exceder los 999999.99'),
  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo'),
  descripcion: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no debe exceder los 500 caracteres')
}).strict()

// Esquema para actualizar producto
const updateProduct = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no debe exceder los 100 caracteres')
    .optional(),
  precio: z
    .number()
    .positive('El precio debe ser un número positivo')
    .max(999999.99, 'El precio no debe exceder los 999999.99')
    .optional(),
  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .min(0, 'El stock no puede ser negativo')
    .optional(),
  descripcion: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no debe exceder los 500 caracteres')
    .optional()
}).strict().refine(data => Object.keys(data).length > 0, {
  message: 'Al menos un campo debe ser proporcionado para actualizar'
})

// Esquema para parámetros de ID
const productId = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'El ID debe ser un número válido')
    .transform(val => parseInt(val, 10))
}).strict()

export default { createProduct, updateProduct, productId }
