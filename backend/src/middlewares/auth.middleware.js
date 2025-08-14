import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    console.log('--- [authMiddleware] ---');
    console.log('Authorization header recibido:', req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    console.log('Token extraído:', token);
    if (!token) {
        console.log('No se proporcionó un token');
        return res.status(401).json({ error: "No se proporcionó un token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Error al verificar el token:', err.message);
            return res.status(401).json({ error: "Token inválido" });
        }
        console.log('Token decodificado, usuario:', user);
        req.user = user;
        next();
    });
};

export const adminMiddleware = (req, res, next) => {
    console.log('--- [adminMiddleware] ---');
    console.log('Rol del usuario autenticado:', req.user?.rol);
    if (req.user.rol !== "admin") {
        console.log('Acceso denegado: usuario no es admin');
        return res.status(401).json({ error: "No tienes permiso para realizar esta acción" });
    }
    next();
};