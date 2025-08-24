import { Routes } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import CartProvider from './context/CartProvider';
import { AppRoutes } from './routes/routes';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import './assets/styles/App.css';

const AppComponent = () => {
  const { token, setToken, setUser } = useContext(UserContext);
  
  const handlers = {
    handleLogin: (token, user) => {
      setToken(token);
      setUser(user);
    },
    handleLogout: () => {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <Routes>
      <AppRoutes token={token} handlers={handlers} />
    </Routes>
  );
};

const App = () => (
  <UserProvider>
    <CartProvider>
      <AppComponent />
    </CartProvider>
  </UserProvider>
);

export default App;
