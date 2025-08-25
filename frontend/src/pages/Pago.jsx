import { useContext, useState } from 'react';
import '../assets/styles/cart.css';
import { Dialog } from 'primereact/dialog';
import Boton from '../components/boton';
import { useCart } from '../context/useCart';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';

const Pago = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { total, cart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const { user } = useContext(UserContext);

  const handlePagoExitoso = async () => {
    if (!user || !user.id) return;
    try {
      const compraPayload = {
        id_usuario: user.id,
        items: cart.map(item => ({
          id_producto: item.id,
          cantidad: item.count,
          precio_unitario: item.price
        })),
        total
      };
      await api("/compras", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: compraPayload
      });
      // Vaciar el carrito
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('cart');
      }
      setShowPopup(true);
    } catch {
      alert("Hubo un error al procesar la compra");
    }
  };

  const handleAceptar = () => {
    setShowPopup(false);
    navigate("/profile");
  };

  const renderCartItem = ({ name, price, img }) => (
    <li className="cart-item">
      <div className="resumen_carrito">
        <div>
          <img className="imagenProducto" src={img} alt={`Imagen de ${name}`} />
        </div>
        <div>
          <p>{name}</p>
        </div>
        <div className="text-center">
          <p className="precio">${price.toLocaleString()}</p>
        </div>
      </div>
    </li>
  );

  return (
    <div className="contenedor-home carrito-section">
      <Navbar />
    <div className="carrito">
      <h1>Detalles del pedido</h1>
      <ul className="cart-list">
        {cart.length > 0 ? cart.map(item => renderCartItem({ ...item, key: item.id })) : <li>El carrito está vacío.</li>}
      </ul>
      <div>
        <h3 className="total">Total: ${total.toLocaleString()}</h3>
        <div className="botondepago">
          <Boton
            severity="secondary" rounded raised outlined
            texto="Pago Exitoso"
            disabled={!token}
            onClick={handlePagoExitoso}
          />
        </div>
          <Dialog
            visible={showPopup}
            onHide={handleAceptar}
            header="¡Pago exitoso!"
            footer={
              <div className="d-flex justify-content-center">
                <Boton
                  severity="secondary" rounded raised outlined
                  texto="Aceptar"
                  onClick={handleAceptar}
                />
              </div>
            }
          >
            <p>Gracias por tu compra. ¡Que tengas un buen día!</p>
          </Dialog>
        <div className="botondepago">
          <Boton
            severity="secondary" rounded raised outlined
            texto="Pago Fallido"
            disabled={!token}
            onClick={() => navigate("/cart")}
          />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Pago;