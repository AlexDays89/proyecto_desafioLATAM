import dbConnection from "../../schemas/db.js";

const pool = dbConnection();

const executeQuery = async (query, params) => {
    const result = await pool.query(query, params);
    return result.rows[0];
};

export const register = async (usuario) => {
    const query = `
        INSERT INTO usuarios (username, mail, password, rol, nombre, apellido, direccion)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    return executeQuery(query, [usuario.username, usuario.mail, usuario.password, "user", usuario.nombre, usuario.apellido, usuario.direccion]);
};

export const login = async ({ mail, password }) => {
    const query = "SELECT * FROM usuarios WHERE mail = $1 AND password = $2";
    return executeQuery(query, [mail, password]);
};

export const getProfile = async (id) => {
    const query = `
        SELECT id_username, username, mail, rol, nombre, apellido, direccion 
        FROM usuarios WHERE id_username = $1
    `;
    return executeQuery(query, [id]);
};

export const updateProfile = async (id, { nombre, apellido, direccion }) => {
    const query = `
        UPDATE usuarios SET nombre = $1, apellido = $2, direccion = $3 
        WHERE id_username = $4 
        RETURNING id_username, username, mail, rol, nombre, apellido, direccion
    `;
    return executeQuery(query, [nombre, apellido, direccion, id]);
};