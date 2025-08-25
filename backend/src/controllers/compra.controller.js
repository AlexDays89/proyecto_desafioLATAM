import { crearCompraDB, agregarItemsCarrito, getItemsByCompraDB, getComprasByUsuarioDB } from "../models/compras.model.js";
import { updateProductStock, getProductById } from "../models/productos.model.js";

export const crearCompra = async (req, res) => {
    const { id_usuario, items, total } = req.body;

    if (!id_usuario || !Array.isArray(items) || items.length === 0 || !total) {
        return res.status(400).json({ error: "Datos de compra incompletos" });
    }

    try {
        // 1. Verifica stock de todos los productos
        for (const item of items) {
            const productoActual = await getProductById(item.id_producto);
            if (!productoActual || productoActual.stock < item.cantidad) {
                return res.status(400).json({ error: `No hay stock suficiente para el producto ${item.id_producto}` });
            }
        }

        // 2. Crea la compra e items
        const { id_compra, fecha_compra } = await crearCompraDB(id_usuario, total);
        await agregarItemsCarrito(id_compra, items);

        // 3. Descuenta el stock
        for (const item of items) {
            const productoActual = await getProductById(item.id_producto);
            await updateProductStock(item.id_producto, productoActual.stock - item.cantidad);
        }

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