import bcrypt from 'bcryptjs'

export const encrypt = (password) => bcrypt.hashSync(password, 10)

export const compare = (password, hash) => bcrypt.compareSync(password, hash)
