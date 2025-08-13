import * as authModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { mail, password, nombre, apellido, direccion } = req.body;
        const rol = req.body.rol || "user";
        const user = await authModel.register({ mail, password, rol, nombre, apellido, direccion });
        const token = jwt.sign({ id: user.id_username, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({
            usuario: {
                id: user.id_username,
                username: user.username,
                mail: user.mail,
                rol: user.rol,
                nombre: user.nombre,
                apellido: user.apellido,
                direccion: user.direccion
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

export const login = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await authModel.login({ mail, password });
        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        const token = jwt.sign({ id: user.id_username, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            usuario: {
                id: user.id_username,
                username: user.username,
                mail: user.mail,
                rol: user.rol,
                nombre: user.nombre,
                apellido: user.apellido,
                direccion: user.direccion
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await authModel.getProfile(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener perfil" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { nombre, apellido, direccion, mail } = req.body;
        const updated = await authModel.updateProfile(req.user.id, { nombre, apellido, direccion, mail });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar perfil" });
    }
};