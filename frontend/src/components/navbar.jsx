import '../assets/styles/navbar.css'
import Navigation from './Navigation';
import { useContext } from 'react';
import Boton from './boton';
import { useCart } from '../context/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faShoppingCart, faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
const { token, setToken} = useContext(UserContext);
const handleLogout = () => { setToken(false);};
const { calcularTotal } = useCart();
const total = calcularTotal();

return (
    <nav className="navbar d-flex justify-content-between align-items-center px-3 px-md-5">
        <div className="links d-flex gap-3 align-items-center">
            <p className="fw-bold">LOGO</p>
        
        <Navigation to="/">
            <Boton
            className = "boton"
            variante="outline-light text-light bg-dark"
            texto={<><FontAwesomeIcon icon={faPizzaSlice} /> Home</>}
            />
        </Navigation>

        {token ? (
            <>
            <Navigation to="/profile">
            <Boton
                variante="outline-light text-light bg-dark"
                texto={<><FontAwesomeIcon icon={faLockOpen} /> Profile</>}
            />
            </Navigation>
            <Boton
            variante="outline-light text-light bg-dark"
            texto={<><FontAwesomeIcon icon={faLockOpen} /> Logout</>}
            onClick={handleLogout}
            />
            </>
        ) : (
            <>
            <Navigation to="/login">
            <Boton
                variante="outline-light text-light bg-dark"
                texto={<><FontAwesomeIcon icon={faLock} /> Login</>}
            />
            </Navigation>
            <Navigation to="/register">
            <Boton
                variante="outline-light text-light bg-dark"
                texto={<><FontAwesomeIcon icon={faLock} /> Registro</>}
            />
            </Navigation>
            </>
        )}
    </div>

    <Navigation to="/cart">
        <Boton
            variante="outline-light text-light bg-dark"
            texto={<><FontAwesomeIcon icon={faShoppingCart} /> Total: ${total.toLocaleString()}</>}
        />
    </Navigation>
    </nav>
);
};

export default Navbar;