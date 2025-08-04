import { useContext } from 'react';
import '../assets/styles/cart.css';
import Boton from '../components/boton';
import { useCart } from '../context/useCart';
import { UserContext } from '../context/UserContext';

const Cart = () => {
  const { token } = useContext(UserContext);
  const { calcularTotal, handleAdd, handleRemove, cart } = useCart();
  const total = calcularTotal();

  // Renderiza un ítem del carrito
  const renderCartItem = ({ id, name, price, count, img }) => (
    <li key={id} className="cart-item">
      <div>
        <img className="imagenProducto" src={img} alt={`Imagen de ${name}`} />
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div className="text-center">
        <p>${price.toLocaleString()}</p>
      </div>
      <div className="cantidad">
        <Boton variante="outline-dark" texto="-" onClick={() => handleRemove(id)} />
        <p className="mx-2">{count}</p>
        <Boton variante="outline-dark" texto="+" onClick={() => handleAdd(id)} />
      </div>
    </li>
  );

  return (
    <div className="carrito">
      <h1>Detalles del pedido</h1>
      <ul className="cart-list">
        {cart.length > 0 ? cart.map(renderCartItem) : <li>El carrito está vacío.</li>}
      </ul>
      <div>
        <h3>Total: ${total.toLocaleString()}</h3>
        <div className="botondepago">
          <Boton
            variante={token ? "outline-dark" : "outline-dark disabled"}
            texto="Pagar"
            disabled={!token}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;