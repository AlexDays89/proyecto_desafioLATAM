import request from 'supertest';
import app from '../src/server.js';

describe('GET /productos', () => {
    it('debe devolver un array de productos', async () => {
        const res = await request(app).get('/productos');
        console.log('Respuesta:', res.body.slice(0, 2)); // <-- Imprime la respuesta en la consola
        if (res.statusCode !== 200) throw new Error('Status incorrecto');
        if (!Array.isArray(res.body)) throw new Error('No es un array');
        // Ejemplo: verifica que cada producto tenga un id y un nombre
        res.body.forEach(prod => {
            if (!prod.id || !prod.name) throw new Error('Producto incompleto');
        });
    });
});