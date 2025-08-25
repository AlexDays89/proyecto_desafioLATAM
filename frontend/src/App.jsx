import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import UserProvider from './context/UserProvider';
import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Productos from './pages/Productos';
import Producto from './pages/producto';
import Contacto from './pages/Contacto';
import CartProvider from './context/CartProvider';
import './assets/styles/App.css'
import Admin from './pages/Admin';
import Pago from './pages/Pago.jsx';

function App() {
  return (
  <UserProvider>
    <CartProvider>
      <AppComponent />
    </CartProvider>
  </UserProvider>
    );
}

function AppComponent() {
  const { token, setToken, setUser } = useContext(UserContext);
  // Handler para login exitoso: setea token y usuario
  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
  };
  // Handler para logout: limpia token y usuario
  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

    return (
        <div>
          <Routes>
              <Route
                path="/"
                element={<Home/>}
              />
              <Route
                path="/productos"
                element={<Productos/>}
              />
              <Route
                path="/producto/:id"
                element={<Producto/>}
              />
              <Route
                path="/register"
                element={token ? <Navigate to="/" /> : <Register onRegisterSuccess={handleLogin} />}
              />
              <Route
                path="/login"
                element={token ? <Navigate to="/" /> : <Login onLoginSuccess={handleLogin} />}
              />
              <Route
                path="/cart"
                element={<Cart />}  
              />
              <Route
                path="/profile"
                element={token ? <Profile onLogout={handleLogout}/> : <Navigate to="/login" />}
              />
              <Route
                path="/administracion"
                element={<Admin />}  
              />
              <Route
                path="/contacto"
                element={<Contacto/>}
              />
              <Route
                path="/pago"
                element={<Pago/>}
              />
              <Route
              path="*"
              element={<NotFound />}
              />
          </Routes>
        </div>
      );
    }
    

export default App
