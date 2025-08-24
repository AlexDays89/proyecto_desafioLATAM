import 'dotenv/config'
import { describe, test, expect } from 'vitest'

import request from 'supertest'
import app from '../src/server/server.js'

describe('SERVER APP', () => {
  test('[ALL] /* | Deberia retornar un error 404, si la ruta no existe en el servidor', async () => {
    const response = await request(app).get('/fake_url').send()

    expect(response.statusCode).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('[ALL] /health | Deberia retornar un 200, si el servidor esta operativo', async () => {
    const response = await request(app).get('/health').send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('[POST] /api/v1/auth/signup | Deberia retornar un mensaje de error si en el payload faltan propiedades o no cumplen la norma ', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      email: '',
      pass: '',
      firstname: '',
      lastname: '',
      nickname: ''
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('[POST] /api/v1/auth/signup | Deberia retornar un mensaje de exito al crear un usuario', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      email: 'raulfaria@gmail.com',
      pass: 'claveSegura123',
      firstname: 'Raul',
      lastname: 'Farias',
      nickname: 'rafariass'
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('[POST] /api/v1/auth/signup | Deberia retornar un error si el user ya existe', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      email: 'raulfaria@gmail.com',
      pass: 'claveSegura123',
      firstname: 'Raul',
      lastname: 'Farias',
      nickname: 'rafariass'
    })

    expect(response.statusCode).toBe(409)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('[POST] /api/v1/auth/signin | Deberia retornar un mensaje de error si en el payload faltan propiedades o no cumplen la norma', async () => {
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: '',
      pass: ''
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('[POST] /api/v1/auth/signin | Deberia retornar un mensaje de error si el user o pass son incorrectos', async () => {
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: '__raulfaria@gmail.com',
      pass: '__claveSegura123'
    })

    expect(response.statusCode).toBe(401)
    expect(response.body).toBeInstanceOf(Object)
  })

  test('[POST] /api/v1/auth/signin | Deberia retornar un token valido si el user corresponde', async () => {
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: 'raulfaria@gmail.com',
      pass: 'claveSegura123'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })
})
