import axios from "../config/axios.config";
import { useState, useEffect, useMemo } from "react";
import { CartContext } from "./CartContext";
import productosMock from "../data/productos";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const total = useMemo(
    () => cart.reduce((acc, { price, count }) => acc + price * count, 0),
    [cart]
  );

  const [productos, setProductos] = useState([]);

  const consultarApi = async () => {
    try {
      const { data } = await axios.get("/productos");
      setProductos(data);
    } catch (error) {
      setProductos(productosMock);
    }
  };

  useEffect(() => {
    consultarApi();
  }, []);

  const handleAdd = (id) => {
    setCart((prevCart) => {
      const foundProduct = prevCart.find((p) => p.id === id);
      if (foundProduct) {
        return prevCart.map((p) =>
          p.id === id ? { ...p, count: p.count + 1 } : p
        );
      }
      const productToAdd = productos.find((p) => p.id === id);
      if (productToAdd) {
        const { id: productId, name, price, img } = productToAdd;
        return [...prevCart, { id: productId, name, price, img, count: 1 }];
      }
      return prevCart;
    });
  };

  const handleRemove = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((p) => (p.id === id ? { ...p, count: p.count - 1 } : p))
        .filter((p) => p.count > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, productos, consultarApi, handleAdd, handleRemove, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
