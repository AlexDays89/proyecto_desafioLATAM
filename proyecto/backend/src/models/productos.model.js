import dbConnection from "../../schemas/db.js";

const pool = dbConnection();

const executeQuery = async (query, params = []) => {
    const result = await pool.query(query, params);
    return result.rows;
};

const executeSingleQuery = async (query, params = []) => {
    const result = await pool.query(query, params);
    return result.rows[0];
};

export const getProducts = async () => executeQuery("SELECT * FROM productos");

export const getProductById = async (id) => executeSingleQuery("SELECT * FROM productos WHERE id_producto = $1", [id]);

export const createProduct = async (product) => {
    const query = `
        INSERT INTO productos (nombre, precio, stock, categoria, img, descripcion) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const params = [product.name, product.price, product.stock, product.category, product.img, product.description];
    return executeSingleQuery(query, params);
};

export const updateProduct = async (id, product) => {
    const query = `
        UPDATE productos SET nombre = $2, precio = $3, stock = $4, categoria = $5, img = $6, descripcion = $7 
        WHERE id_producto = $1 RETURNING *
    `;
    const params = [id, product.name, product.price, product.stock, product.category, product.img, product.description];
    return executeSingleQuery(query, params);
};

export const deleteProduct = async (id) => executeSingleQuery("DELETE FROM productos WHERE id_producto = $1 RETURNING *", [id]);