// Middleware para validar esquemas Zod
export const validateSchema = (schema, target = 'body') => (req, res, next) => {
  const dataToValidate = target === 'params' ? req.params : req.body
  const result = schema.safeParse(dataToValidate)

  if (result.success === false) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }))

    return res.status(400).json({
      success: false,
      message: 'Datos de entrada inválidos',
      errors
    })
  }

  if (target === 'params') {
    req.params = result.data
  } else {
    req.body = result.data
  }

  next()
}

export default validateSchema
