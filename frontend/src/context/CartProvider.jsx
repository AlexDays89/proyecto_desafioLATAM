import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const calcularTotal = () => {
        return cart.reduce((total, { price, count }) => total + price * count, 0);
    };

    const [productos, setProductos] = useState([]);

    const consultarApi = async () => {
        try {
            const url = "http://localhost:3000/api/productos";
            const res = await fetch(url);
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error("Error al consultar la API", error);
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
                    p.id === id ? { ...p, count: p.count + 1 } : p
                );
            } else {
                const newProducto = productos.find((p) => p.id === id);
                if (newProducto) {
                    const { id, name, price, img } = newProducto;
                    return [...prevCart, { id, name, price, img, count: 1 }];
                }
            }
            return prevCart;
        });
    };

    const handleRemove = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((producto) =>
                    producto.id === id ? { ...producto, count: producto.count - 1 } : producto
                )
                .filter((producto) => producto.count > 0)
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
