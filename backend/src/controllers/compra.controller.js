import { crearCompraDB, agregarItemsCarrito, getItemsByCompraDB, getComprasByUsuarioDB } from "../models/compras.model.js";

// Crea una compra y sus items asociados
export const crearCompra = async (req, res) => {
    const { id_usuario, items, total } = req.body;

    if (!id_usuario || !Array.isArray(items) || items.length === 0 || !total) {
        return res.status(400).json({ error: "Datos de compra incompletos" });
    }

    try {
        // Crear compra principal y obtener id_compra
        const { id_compra, fecha_compra } = await crearCompraDB(id_usuario, total);
        // Agregar items al carrito_items
        await agregarItemsCarrito(id_compra, items);
        res.status(201).json({ id_compra, fecha_compra });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getComprasByUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const compras = await getComprasByUsuarioDB(id);
        res.json(compras);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemsByCompra = async (req, res) => {
    const { id } = req.params;
    try {
        const items = await getItemsByCompraDB(id);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    