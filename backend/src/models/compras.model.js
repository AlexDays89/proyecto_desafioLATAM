import pool from "../../schemas/db.js";

export const crearCompraDB = async (id_usuario, total) => {
    const resultCompra = await pool.query(
        `INSERT INTO compras (id_usuario, fecha_compra, total) VALUES ($1, NOW(), $2) RETURNING id_compra, fecha_compra` ,
        [id_usuario, total]
    );
    return resultCompra.rows[0];
};

export const getComprasByUsuarioDB = async (id_usuario) => {
    const result = await pool.query(
        `SELECT id_compra, fecha_compra, total FROM compras WHERE id_usuario = $1 ORDER BY fecha_compra ASC`,
        [id_usuario]
    );
    return result.rows;
};

export const getItemsByCompraDB = async (id_compra) => {
    const result = await pool.query(
        `SELECT ci.id_item, ci.id_producto, p.nombre, ci.cantidad, ci.precio_unitario
            FROM carrito_items ci
            JOIN productos p ON ci.id_producto = p.id_producto
            WHERE ci.id_compra = $1`,
        [id_compra]
    );
    return result.rows;
};

export const agregarItemsCarrito = async (id_compra, items) => {
    for (const item of items) {
        await pool.query(
            `INSERT INTO carrito_items (id_compra, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)` ,
            [id_compra, item.id_producto, item.cantidad, item.precio_unitario]
        );
    }
};