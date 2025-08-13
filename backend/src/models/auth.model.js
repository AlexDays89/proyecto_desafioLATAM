import pool from "../../schemas/db.js";

export const register = async (usuario) => {
    const result = await pool.query(
        `INSERT INTO usuarios (username, mail, password, rol, nombre, apellido, direccion)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [usuario.username, usuario.mail, usuario.password, usuario.rol, usuario.nombre, usuario.apellido, usuario.direccion]
    );
    return result.rows[0];
};

export const login = async ({ mail, password }) => {
    const result = await pool.query(
        "SELECT * FROM usuarios WHERE mail = $1 AND password = $2",
        [mail, password]
    );
    return result.rows[0];
};

export const getProfile = async (id) => {
    const result = await pool.query(
        `SELECT id_username, username, mail, rol, nombre, apellido, direccion FROM usuarios WHERE id_username = $1`,
        [id]
    );
    return result.rows[0];
};

export const updateProfile = async (id, { nombre, apellido, direccion, mail }) => {
    const result = await pool.query(
        `UPDATE usuarios SET nombre = $1, apellido = $2, direccion = $3, mail = $4, username = $4 WHERE id_username = $5 RETURNING id_username, username, mail, rol, nombre, apellido, direccion`,
        [nombre, apellido, direccion, mail, id]
    );
    return result.rows[0];
};