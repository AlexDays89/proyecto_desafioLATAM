import * as productosModel from "../models/productos.model.js";

const mapProductToFrontend = (dbProduct) => ({
    id: dbProduct.id_producto,
    name: dbProduct.nombre,
    price: dbProduct.precio,
    stock: dbProduct.stock,
    category: dbProduct.categoria,
    img: dbProduct.img,
    description: dbProduct.descripcion
});

const validateProductData = (name, price, stock, category) => {
    if (!name || !category) {
        return "Nombre y categoría son obligatorios";
    }
    if (typeof price !== 'number' || price < 0) {
        return "Precio debe ser un número positivo";
    }
    if (typeof stock !== 'number' || stock < 0) {
        return "Stock debe ser un número positivo";
    }
    return null;
};

const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
};

const sendSuccessResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};

const validateNumericId = (id) => {
    return id && !isNaN(parseInt(id));
};

const handleCRUDOperation = async (res, operation, successStatus = 200) => {
    try {
        const result = await operation();
        if (result === null) {
            return sendErrorResponse(res, 404, "Producto no encontrado");
        }
        const productFront = mapProductToFrontend(result);
        sendSuccessResponse(res, successStatus, productFront);
    } catch (error) {
        sendErrorResponse(res, 500, `Error en la operación: ${error.message}`);
    }
};

const handleValidatedOperation = async (res, validationFn, operationFn, successStatus = 200) => {
    try {
        const validationError = validationFn();
        if (validationError) {
            return sendErrorResponse(res, 400, validationError);
        }
        
        const result = await operationFn();
        if (result === null) {
            return sendErrorResponse(res, 404, "Producto no encontrado");
        }
        
        const productFront = mapProductToFrontend(result);
        sendSuccessResponse(res, successStatus, productFront);
    } catch (error) {
        sendErrorResponse(res, 500, `Error en la operación: ${error.message}`);
    }
};

export const getProducts = async (req, res) => {
    try {
        const productos = await productosModel.getProducts();
        const productosFront = productos.map(mapProductToFrontend);
        sendSuccessResponse(res, 200, productosFront);
    } catch (error) {
        sendErrorResponse(res, 500, "Error al obtener productos");
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    await handleCRUDOperation(
        res,
        () => productosModel.getProductById(id)
    );
};

export const createProduct = async (req, res) => {
    const { name, price, stock, category, img, description } = req.body;
    
    await handleValidatedOperation(
        res,
        () => validateProductData(name, price, stock, category),
        () => productosModel.createProduct({ name, price, stock, category, img, description }),
        201
    );
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, category, img, description } = req.body;
    
    await handleValidatedOperation(
        res,
        () => validateProductData(name, price, stock, category),
        () => productosModel.updateProduct(id, { name, price, stock, category, img, description })
    );
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!validateNumericId(id)) {
            return sendErrorResponse(res, 400, "ID del producto debe ser un número válido");
        }
        
        const deletedProduct = await productosModel.deleteProduct(id);
        if (!deletedProduct) {
            return sendErrorResponse(res, 404, "Producto no encontrado");
        }
        
        const productFront = mapProductToFrontend(deletedProduct);
        sendSuccessResponse(res, 200, { 
            message: "Producto eliminado exitosamente", 
            deletedProduct: productFront 
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Error al eliminar el producto");
    }
};
