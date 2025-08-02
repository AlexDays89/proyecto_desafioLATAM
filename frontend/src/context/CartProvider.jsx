import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const calcularTotal = () => {
        return cart.reduce((total, { price, count }) => total + price * count, 0);
    };

    const [pizzas, setPizzas] = useState([]);

    const consultarApi = async () => {
        try {
            const url = "http://localhost:5000/api/pizzas";
            const res = await fetch(url);
            const data = await res.json();
            setPizzas(data);
        } catch (error) {
            console.error("Error al consultar la API", error);
        }
    };

    useEffect(() => {
        consultarApi();
    }, []);

    const handleAdd = (id) => {
        setCart((prevCart) => {
            const pizzaInCart = prevCart.find((p) => p.id === id);
            if (pizzaInCart) {
                return prevCart.map((p) =>
                    p.id === id ? { ...p, count: p.count + 1 } : p
                );
            } else {
                const newPizza = pizzas.find((p) => p.id === id);
                if (newPizza) {
                    const { id, name, price, img } = newPizza;
                    return [...prevCart, { id, name, price, img, count: 1 }];
                }
            }
            return prevCart;
        });
    };

    const handleRemove = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((pizza) =>
                    pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza
                )
                .filter((pizza) => pizza.count > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, pizzas, consultarApi, handleAdd, handleRemove, calcularTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
