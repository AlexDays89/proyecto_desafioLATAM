import { useContext } from 'react';
import '../assets/styles/cart.css';
import Boton from '../components/boton';
import { useCart } from '../context/useCart';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { total, handleAdd, handleRemove, cart } = useCart();


  const renderCartItem = ({ id, name, price, count, img }) => (
    <li key={id} className="cart-item">
      <div>
        <img className="imagenProducto" src={img} alt={`Imagen de ${name}`} />
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div className="text-center">
        <p className="precio">${price.toLocaleString()}</p>
      </div>
      <div className="cantidad">
        <Boton severity="secondary" rounded raised outlined texto="-" onClick={() => handleRemove(id)} />
        <p className="mx-2">{count}</p>
        <Boton severity="secondary" rounded raised outlined texto="+" onClick={() => handleAdd(id)} />
      </div>
    </li>
  );

  return (
    <div className="contenedor-home carrito-section">
      <Navbar />
    <div className="carrito">
      <h1>Detalles del pedido</h1>
      <ul className="cart-list">
        {cart.length > 0 ? cart.map(renderCartItem) : <li>El carrito está vacío.</li>}
      </ul>
      <div>
        <h3 className="total">Total: ${total.toLocaleString()}</h3>
        <div className="botondepago">
          <Boton
            severity="secondary" rounded raised outlined
            texto="Pagar"
            disabled={!token}
            onClick={() => navigate("/pago")}
          />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Cart;