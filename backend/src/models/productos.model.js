import pool from "../../schemas/db.js";

export const getProducts = async () => {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
};

export const getProductById = async (id) => {
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    return result.rows[0] || null;
};

export const createProduct = async (product) => {
    const result = await pool.query(
        "INSERT INTO products (name, price, stock, category, img) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [product.name, product.price, product.stock, product.category, product.img]
    );
    return result.rows[0];
};

export const updateProduct = async (id, product) => {
    const result = await pool.query(
        "UPDATE products SET name = $2, price = $3, stock = $4, category = $5, img = $6 WHERE id = $1 RETURNING *",
        [id, product.name, product.price, product.stock, product.category, product.img]
    );
    return result.rows[0] ? { id: result.rows[0].id, name: result.rows[0].name, price: result.rows[0].price, stock: result.rows[0].stock, category: result.rows[0].category, img: result.rows[0].img } : null;
};

export const deleteProduct = async (id) => {
    const result = await pool.query("DELETE FROM productos WHERE id_producto = $1 RETURNING *", [id]);
    return result.rows[0];
};