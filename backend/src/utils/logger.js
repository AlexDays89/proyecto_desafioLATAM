import { format } from '@formkit/tempo'
import winston from 'winston'

const logFormat = winston.format.printf(({ level, message }) => (
  `${format(new Date(), { date: 'full', time: 'full' })} ${level}: ${JSON.stringify(message)}`
))

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: 'logs/server.log'
    })
  ]
})

export default logger
