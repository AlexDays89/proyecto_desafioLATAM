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

const AuthButtons = ({ token, user, onLogout }) => {
  if (token) {
    return (
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
          onClick={onLogout}
        />
        {user?.rol === 'admin' && (
          <Navigation to="/administracion">
            <Boton
              severity="secondary" rounded raised outlined
              texto={<><FontAwesomeIcon icon={faLockOpen} /> Administrador</>}
            />
          </Navigation>
        )}
      </>
    );
  }

  return (
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
  );
};

const MainNavigation = ({ navigate, menuItems }) => (
  <>
    <Navigation to="/">
      <Boton
        severity="secondary" rounded raised outlined
        texto="Home"
      />
    </Navigation>

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
  </>
);

const CartButton = ({ total }) => (
  <Navigation to="/cart">
    <Boton
      severity="secondary" rounded raised outlined
      texto={<><FontAwesomeIcon icon={faShoppingCart} /> Total: ${total.toLocaleString()}</>}
    />
  </Navigation>
);

const Navbar = () => {
  const { token, setToken, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { total } = useCart();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
        <img src="/img/logo.png" alt="logo" className="logo" />
        
        <MainNavigation navigate={navigate} menuItems={menuItems} />
        
        <AuthButtons token={token} user={user} onLogout={handleLogout} />
      </div>

      <CartButton total={total} />
    </nav>
  );
};

export default Navbar;