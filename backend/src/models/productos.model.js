import pool from "../../schemas/db.js";

export const getProducts = async () => {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
};

export const getProductById = async (id) => {
    const result = await pool.query("SELECT * FROM productos WHERE id_producto = $1", [id]);
    return result.rows[0] || null;
};

export const createProduct = async (product) => {
    const result = await pool.query(
        "INSERT INTO productos (nombre, precio, stock, categoria, img) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [product.nombre, product.precio, product.stock, product.categoria, product.img]
    );
    return result.rows[0];
};

export const updateProduct = async (id, product) => {
    const result = await pool.query(
        "UPDATE productos SET nombre = $2, precio = $3, stock = $4, categoria = $5, img = $6 WHERE id_producto = $1 RETURNING *",
        [id, product.nombre, product.precio, product.stock, product.categoria, product.img]
    );
    return result.rows[0] ? { id: result.rows[0].id_producto, nombre: result.rows[0].nombre, precio: result.rows[0].precio, stock: result.rows[0].stock, categoria: result.rows[0].categoria, img: result.rows[0].img } : null;
};

export const deleteProduct = async (id) => {
    const result = await pool.query("DELETE FROM productos WHERE id_producto = $1 RETURNING *", [id]);
    return result.rows[0];
};