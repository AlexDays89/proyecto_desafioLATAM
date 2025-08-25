import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export const jwtSign = (payload) => jwt.sign(payload, SECRET, { expiresIn: '30m' })

export const jwtVerify = (token) => jwt.verify(token, SECRET)
