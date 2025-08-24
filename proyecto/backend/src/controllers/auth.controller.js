import * as authModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => jwt.sign(
    { id: user.id_username, rol: user.rol }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1d" }
);

const sendResponse = (res, statusCode, data) => res.status(statusCode).json(data);

export const register = async (req, res) => {
    try {
        const { username, mail, password, nombre, apellido, direccion } = req.body;
        const user = await authModel.register({ username, mail, password, nombre, apellido, direccion });
        const token = generateToken(user);
        sendResponse(res, 201, { usuario: user, token });
    } catch (error) {
        sendResponse(res, 500, { error: 'Error al registrar el usuario' });
    }
};

export const login = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await authModel.login({ mail, password });
        
        if (!user) {
            return sendResponse(res, 401, { error: 'Credenciales inválidas' });
        }
        
        const token = generateToken(user);
        sendResponse(res, 200, { usuario: user, token });
    } catch (error) {
        sendResponse(res, 500, { error: 'Error al iniciar sesión' });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await authModel.getProfile(req.user.id);
        sendResponse(res, 200, user);
    } catch (error) {
        sendResponse(res, 500, { error: "Error al obtener perfil" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        await authModel.updateProfile(req.user.id, req.body);
        sendResponse(res, 200, { status: true });
    } catch (error) {
        sendResponse(res, 500, { status: false, error: error.message });
    }
};