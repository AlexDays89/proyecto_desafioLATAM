import tempo from '../../utils/tempo.js'

export const health = (req, res, next) => {
  res.status(200).json({
    status: true,
    code: 200,
    data: {
      message: 'El servidor se encuentra en funcionamiento y responde correctamente.'
    },
    timestamp: tempo()
  })
}

export default health
