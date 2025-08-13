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

describe('GET /productos/:id', () => {
    it('debe devolver un producto por id', async () => {
        const res = await request(app).get('/productos/1');
        console.log('Detalle producto:', res.body);
        if (res.statusCode !== 200) throw new Error('Status incorrecto');
        if (!res.body.id || !res.body.name) throw new Error('Faltan campos');
    });
});

describe('POST /productos', () => {
    it('debe crear un nuevo producto', async () => {
        const res = await request(app).post('/productos').send({
            name: 'Producto A',
            price: 1000,
            stock: 10,
            category: 'Electrónica',
            img: 'https://ejemplo.com/img.jpg',
            description: 'Descripción del producto'
        });
        console.log('Respuesta:', res.body);
        if (res.statusCode !== 201) throw new Error('Status incorrecto');
        if (!res.body.id || !res.body.name) throw new Error('Faltan campos');
    });
});