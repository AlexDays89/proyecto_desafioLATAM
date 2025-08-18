import request from 'supertest';
import app from '../src/server.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

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
    let token;
    before(async () => {

        const loginRes = await request(app).post('/usuarios/login').send({
            mail: 'admin@admin.com',
            password: 'admin123'
        });
        token = loginRes.body.token;
    });

    it('debe crear un nuevo producto', async () => {
        const res = await request(app)
            .post('/productos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Producto A',
                price: 1000,
                stock: 10,
                category: 'Electrónica',
                img: 'https://ejemplo.com/img.jpg',
                description: 'Descripción del producto'
            });
        console.log('Respuesta:', res.body);
        if (res.statusCode !== 201) {
            console.error('Status recibido:', res.statusCode, 'Body:', res.body);
            throw new Error('Status incorrecto');
        }
        if (res.body.id) {
            await request(app)
                .delete(`/productos/${res.body.id}`)
                .set('Authorization', `Bearer ${token}`);
        }
    });
});

describe('PUT /usuarios/perfil', () => {
    let token;
    let originalProfile;

    before(async () => {
        // Login para obtener token
        const loginRes = await request(app).post('/usuarios/login').send({
            mail: 'admin@admin.com',
            password: 'admin123'
        });
        token = loginRes.body.token;

        // Obtener perfil original
        const profileRes = await request(app)
            .get('/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`);
        originalProfile = profileRes.body;
    });

    it('debe actualizar el perfil y luego restaurar los datos', async () => {
        // Actualizar perfil
        const updateRes = await request(app)
            .put('/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'NuevoNombreTest',
                apellido: 'NuevoApellidoTest',
                direccion: 'Nueva Direccion Test',
                mail: originalProfile.mail // no cambiamos el mail
            });
        console.log('Respuesta update:', updateRes.body);
        if (updateRes.statusCode !== 200) throw new Error('Status incorrecto al actualizar');

        // Verificar cambio
        const verifyRes = await request(app)
            .get('/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`);
        if (verifyRes.body.nombre !== 'NuevoNombreTest') throw new Error('No se actualizó el nombre');

        // Rollback: restaurar datos originales
        await request(app)
            .put('/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: originalProfile.nombre,
                apellido: originalProfile.apellido,
                direccion: originalProfile.direccion,
                mail: originalProfile.mail
            });

        // Verificar rollback
        const rollbackRes = await request(app)
            .get('/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`);
        if (rollbackRes.body.nombre !== originalProfile.nombre) throw new Error('No se restauró el nombre original');
    });
});