import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No se proporcionó un token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }
        req.user = user;
        next();
    });
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({ error: "No tienes permiso para realizar esta acción" });
    }
    next();
};

export const logoutMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No se proporcionó un token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }
        req.user = user;
        next();
    });
};
