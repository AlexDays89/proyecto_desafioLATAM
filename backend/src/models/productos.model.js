import pool from "../../schemas/db.js";

export const getProducts = async () => {
    const result = await pool.query("SELECT * FROM productos ORDER BY id_producto ASC");
    return result.rows;
};

export const getProductById = async (id) => {
    const result = await pool.query("SELECT * FROM productos WHERE id_producto = $1", [id]);
    return result.rows[0] || null;
};

export const createProduct = async (product) => {
    // Mapear los nombres del frontend a los nombres de la base de datos
    const dbProduct = {
        nombre: product.name,
        precio: product.price,
        stock: product.stock,
        categoria: product.category,
        img: product.img,
        descripcion: product.description
    };
    const result = await pool.query(
        "INSERT INTO productos (nombre, precio, stock, categoria, img, descripcion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [dbProduct.nombre, dbProduct.precio, dbProduct.stock, dbProduct.categoria, dbProduct.img, dbProduct.descripcion]
    );
    return result.rows[0];
};

export const updateProduct = async (id, product) => {
    const result = await pool.query(
        "UPDATE productos SET nombre = $2, precio = $3, stock = $4, categoria = $5, img = $6, descripcion = $7 WHERE id_producto = $1 RETURNING *",
        [id, product.name, product.price, product.stock, product.category, product.img, product.description]
    );
    return result.rows[0] ? { id: result.rows[0].id_producto, nombre: result.rows[0].nombre, precio: result.rows[0].precio, stock: result.rows[0].stock, categoria: result.rows[0].categoria, img: result.rows[0].img, description: result.rows[0].descripcion } : null;
};
    
export const deleteProduct = async (id) => {
    const result = await pool.query("DELETE FROM productos WHERE id_producto = $1 RETURNING *", [id]);
    return result.rows[0];
};

export const updateProductStock = async (id, newStock) => {
    const result = await pool.query(
        "UPDATE productos SET stock = $2 WHERE id_producto = $1 RETURNING *",
        [id, newStock]
    );
    return result.rows[0] ? { id: result.rows[0].id_producto, stock: result.rows[0].stock } : null;
};