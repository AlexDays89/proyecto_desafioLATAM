export async function getProductos() {
    const res = await fetch("http://localhost:3000/productos");
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}

export async function getProductoPorId(id) {
    const res = await fetch(`http://localhost:3000/productos/${id}`);
    if (!res.ok) throw new Error("Producto no encontrado");
    return res.json();
}