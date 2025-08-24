import { z } from 'zod'

// Esquema para login de usuario
const signIn = z.object({
  mail: z
    .email({ message: 'Debe ser un email válido' })
    .min(5, 'El email debe tener al menos 5 caracteres')
    .max(30, 'El email no debe exceder los 30 caracteres'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(16, 'La contraseña no debe exceder los 16 caracteres')
}).strict()

// Esquema para registro de usuario
const signUp = z.object({
  usuario: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(20, 'El nombre de usuario no debe exceder los 20 caracteres'),
  mail: z
    .email({ message: 'Debe ser un email válido' })
    .min(5, 'El email debe tener al menos 5 caracteres')
    .max(30, 'El email no debe exceder los 30 caracteres'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(16, 'La contraseña no debe exceder los 16 caracteres'),
  direccion: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(255, 'La dirección no debe exceder los 255 caracteres')
}).strict()

export default { signUp, signIn }
