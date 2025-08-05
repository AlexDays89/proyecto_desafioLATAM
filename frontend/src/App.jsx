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
import CartProvider from './context/CartProvider';
import './assets/styles/App.css'

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
  const {token, setToken} = useContext(UserContext);
  const handleLogin = () => setToken(true);
  const handleLogout = () => setToken(false);

    return (
        <div>
          <Routes>
              <Route
                path="/"
                element={<Home/>}
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
              path="*"
              element={<NotFound />}
              />
          </Routes>
        </div>
      );
    }
    

export default App
