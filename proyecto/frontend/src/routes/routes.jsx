import { Navigate, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import Producto from '../pages/producto';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import Contacto from '../pages/Contacto';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({ token, children, redirectTo = "/login" }) => 
  token ? children : <Navigate to={redirectTo} />;

const GuestRoute = ({ token, children, redirectTo = "/" }) => 
  !token ? children : <Navigate to={redirectTo} />;

export const AppRoutes = ({ token, handlers }) => {
  const { handleLogin, handleLogout } = handlers;
  
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/producto/:id" element={<Producto />} />
      
      <Route path="/register" element={
        <GuestRoute token={token}>
          <Register onRegisterSuccess={handleLogin} />
        </GuestRoute>
      } />
      
      <Route path="/login" element={
        <GuestRoute token={token}>
          <Login onLoginSuccess={handleLogin} />
        </GuestRoute>
      } />
      
      <Route path="/cart" element={<Cart />} />
      
      <Route path="/profile" element={
        <ProtectedRoute token={token}>
          <Profile onLogout={handleLogout} />
        </ProtectedRoute>
      } />
      
      <Route path="/administracion" element={<Admin />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};
