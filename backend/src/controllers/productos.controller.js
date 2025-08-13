import * as productosModel from "../models/productos.model.js";

export const getProducts = async (req, res) => {
    try {
        const productos = await productosModel.getProducts();
        const productosFront = productos.map(p => ({
        id: p.id_producto,
        name: p.nombre,
        price: p.precio,
        stock: p.stock,
        category: p.categoria,
        img: p.img,
        description: p.descripcion
        }));
        res.json(productosFront);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
};
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productosModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        // Mapear campos para el frontend
        const productFront = {
            id: product.id_producto,
            name: product.nombre,
            price: product.precio,
            stock: product.stock,
            category: product.categoria,
            img: product.img,
            description: product.descripcion
        };
        res.json(productFront);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category, img, description } = req.body;
        const newProduct = await productosModel.createProduct({ name, price, stock, category, img, description });
        const productFront = {
            id: newProduct.id_producto,
            name: newProduct.nombre,
            price: newProduct.precio,
            stock: newProduct.stock,
            category: newProduct.categoria,
            img: newProduct.img,
            description: newProduct.descripcion
        };
        res.status(201).json(productFront);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, category, img, description } = req.body;
        const updatedProduct = await productosModel.updateProduct(id, { name, price, stock, category, img, description });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const productFront = {
            id: updatedProduct.id_producto,
            name: updatedProduct.nombre,
            price: updatedProduct.precio,
            stock: updatedProduct.stock,
            category: updatedProduct.categoria,
            img: updatedProduct.img,
            description: updatedProduct.descripcion
        };
        res.json(productFront);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productosModel.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const productFront = {
            id: deletedProduct.id_producto,
            name: deletedProduct.nombre,
            price: deletedProduct.precio,
            stock: deletedProduct.stock,
            category: deletedProduct.categoria,
            img: deletedProduct.img,
            description: deletedProduct.descripcion
        };
        res.json({ message: "Producto eliminado exitosamente", deletedProduct: productFront });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};
