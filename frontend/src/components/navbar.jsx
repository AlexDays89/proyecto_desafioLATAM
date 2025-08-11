import Navigation from './navigation';
import { useContext } from 'react';
import Boton from './boton';
import { useCart } from '../context/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';
import { SplitButton } from 'primereact/splitbutton';
import categorias from '../data/categorias';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const { token, setToken, user, setUser} = useContext(UserContext);
const navigate = useNavigate();
const handleLogout = () => { 
  setToken(false);
  setUser(null);};
const { total } = useCart();

// Función para hacer scroll suave a las secciones
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Items del menú de navegación interna
const menuItems = [
  {
    label: 'Acerca de',
    command: () => {
      navigate('/');
      setTimeout(() => scrollToSection('acerca-de'), 100);
    }
  },
  {
    label: 'Nuestros Tipos de Tarot',
    command: () => {
      navigate('/');
      setTimeout(() => scrollToSection('tipos-de-tarot'), 100);
    }
  },
  {
    label: 'Tipos de Consulta',
    command: () => {
      navigate('/');
      setTimeout(() => scrollToSection('tipos-de-lectura'), 100);
    }
  }
];

return (
    <nav className="navbar d-flex justify-content-between align-items-center px-3 px-md-5">
        <div className="links d-flex gap-3 align-items-center">
          <img src="/img/logo.png" alt="logo" className="logo"/>
        <Navigation to="/">
          <Boton
            severity="secondary" rounded raised outlined
            texto="Home"
          />
        </Navigation>

        {/* SplitButton de PrimeReact para navegación interna */}
        <SplitButton
          label="Menu"
          onClick={() => navigate('/')}
          model={menuItems}
          severity="secondary"
          rounded raised outlined
          appendTo="self"
          text
        />
        <Navigation to="/contacto">
          <Boton
            severity="secondary" rounded raised outlined
            texto="Contacto"
          />
        </Navigation>

        <SplitButton
          label="Tienda"
          onClick={() => navigate('/productos')}
          model={categorias.map(cat => ({
            label: cat.nombre,
            command: () => navigate(`/productos?categoria=${encodeURIComponent(cat.nombre)}`)
          }))}
          rounded raised outlined
          appendTo="self"
        />

        {token ? (
          <>
            <Navigation to="/profile">
              <Boton
                severity="secondary" rounded raised outlined
                texto={<><FontAwesomeIcon icon={faLockOpen} /> Profile</>}
            />
            </Navigation>
            <Boton
            severity="secondary" rounded raised outlined
            texto={<><FontAwesomeIcon icon={faLockOpen} /> Logout</>}
            onClick={handleLogout}
            />
            {user?.rol === 'admin' && (
            <Navigation to="/administracion">
            <Boton
                severity="secondary" rounded raised outlined
                texto={<><FontAwesomeIcon icon={faLockOpen} /> Administracion</>}
            />
            </Navigation>
            )}
            </>
          ) : (
            <>
            <Navigation to="/login">
            <Boton
                severity="secondary" rounded raised outlined
                texto={<><FontAwesomeIcon icon={faLock} /> Login</>}
            />
            </Navigation>
            <Navigation to="/register">
            <Boton
                severity="secondary" rounded raised outlined
                texto={<><FontAwesomeIcon icon={faLock} /> Registro</>}
            />
            </Navigation>
            </>
          )}
    </div>

    <Navigation to="/cart">
        <Boton
            severity="secondary" rounded raised outlined
            texto={<><FontAwesomeIcon icon={faShoppingCart} /> Total: ${total.toLocaleString()}</>}
        />
    </Navigation>
    </nav>
);
};

export default Navbar;