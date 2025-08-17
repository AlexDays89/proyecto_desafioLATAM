import { api } from "../lib/api.js";

export async function getProductos() {
    const res = await api("/productos");
    if (res.error) throw new Error("Error al obtener productos");
    return res.json();
}

export async function getProductoPorId(id) {
    const res = await api(`/productos/${id}`);
    if (res.error) throw new Error("Producto no encontrado");
    return res.json();
}