import tempo from '../../utils/tempo.js'

export const notFound = (req, res, next) => {
  res.status(404).json({
    status: false,
    code: 404,
    error: {
      message: 'Lo sentimos, el recurso específico que buscas no se pudo encontrar.'
    },
    timestamp: tempo()
  })
}

export default notFound
