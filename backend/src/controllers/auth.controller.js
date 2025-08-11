import * as authModel from "../models/auth.model.js";

export const register = async (req, res) => {
    try {
        const { username, mail, password } = req.body;
        const rol = req.body.rol || "user";
        const user = await authModel.register({ username, mail, password, rol });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar el usuario"});
    }
};

export const login = async (req, res) => {
    const { mail, password } = req.body;
    const user = await authModel.login({ mail, password });
    if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.json(user);
};