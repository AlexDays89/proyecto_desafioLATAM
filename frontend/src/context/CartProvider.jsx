import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import productosMock from "../data/productos";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const calcularTotal = () => {
        return cart.reduce((total, { price, stock }) => total + price * stock, 0);
    };

    const [productos, setProductos] = useState([]);

    const consultarApi = async () => {
        try {
            const url = "http://localhost:3000/api/productos";
            const res = await fetch(url);
            if (!res.ok) throw new Error('API error');
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.warn("Fallo la API, usando mock de productos:", error);
            setProductos(productosMock);
        }
    };

    useEffect(() => {
        consultarApi();
    }, []);

    const handleAdd = (id) => {
        setCart((prevCart) => {
            const productoInCart = prevCart.find((p) => p.id === id);
            if (productoInCart) {
                return prevCart.map((p) =>
                    p.id === id ? { ...p, stock: p.stock + 1 } : p
                );
            } else {
                const newProducto = productos.find((p) => p.id === id);
                if (newProducto) {
                    const { id, name, price, img } = newProducto;
                    return [...prevCart, { id, name, price, img, stock: 1 }];
                }
            }
            return prevCart;
        });
    };

    const handleRemove = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((producto) =>
                    producto.id === id ? { ...producto, stock: producto.stock - 1 } : producto
                )
                .filter((producto) => producto.stock > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, productos, consultarApi, handleAdd, handleRemove, calcularTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
