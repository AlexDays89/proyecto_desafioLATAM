import jwt from "jsonwebtoken";

const sendError = (res, statusCode, message) => res.status(statusCode).json({ error: message });

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return sendError(res, 401, "No se proporcionó un token");
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return sendError(res, 401, "Token inválido");
        }
        req.user = user;
        next();
    });
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.rol !== "admin") {
        return sendError(res, 403, "No tienes permiso para realizar esta acción");
    }
    next();
};