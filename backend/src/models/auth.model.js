import pool from "../../schemas/db.js";

export const register = async (usuario) => {
    const result = await pool.query(
        "INSERT INTO usuarios (username, mail, password, rol) VALUES ($1, $2, $3, $4) RETURNING *",
        [usuario.username, usuario.mail, usuario.password, usuario.rol]
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