import React, { useState, useContext } from "react";
import Boton from '../components/boton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarpassword, setConfirmarpassword] = useState('');
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const { setUser, setToken } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !confirmarpassword.trim()) {
      setError(true);
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      setError(true);
      setMensaje('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmarpassword) {
      setError(true);
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      username: username,
      mail: username,
      password: password,
      rol: 'user',
      nombre: null,
      apellido: null,
      direccion: null
    };
  
    try {
      const response = await fetch('http://localhost:3000/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(true);
        setMensaje(data.error || 'Error en el registro');
        return;
      }
  
      const data = await response.json();
      setUser(data.usuario);
      if (typeof setToken === 'function' && data.token) {
        setToken(data.token);
      }
      setError(false);
      setMensaje('Registro Exitoso');
      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);
      // Redirigir o limpiar formulario si quieres
    } catch (error) {
      console.error(error);
      setError(true);
      setMensaje('Error de conexión con el servidor');
    }
  };

  return (
    <>
    <div className="contenedor-home">
    <Navbar />
    {/* Seccion principal de registro con fondo animado */}
    <section className="register-section">
      <div className="register-box">
        <h2>REGISTRO</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de email con icono y label flotante */}
          <div className="input-box">
  <span className="icon">
    <FontAwesomeIcon icon={faEnvelope} />
  </span>
  <input
    type="email"
    id="username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />
  <label htmlFor="username">Email</label>
</div>

          {/* Campo de contraseña con icono y label flotante */}
          <div className="input-box">
  <span className="icon">
    <FontAwesomeIcon icon={faLock} />
  </span>
  <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <label htmlFor="password">Contraseña</label>
</div>

          {/* Campo de confirmar contraseña con icono y label flotante */}
          <div className="input-box">
  <span className="icon">
    <FontAwesomeIcon icon={faLock} />
  </span>
  <input
    type="password"
    id="confirmarpassword"
    value={confirmarpassword}
    onChange={(e) => setConfirmarpassword(e.target.value)}
    required
  />
  <label htmlFor="confirmarpassword">Confirmar Contraseña</label>
</div>

          {/* Boton de registro */}
          <Boton
            texto="Registrarse"
            type="submit"
            variante="outline-dark text-dark mt-4 auth-btn"
          />

          {/* Mensajes de error y exito */}
          {error && <div className="alert alert-danger">{mensaje}</div>}
          {!error && mensaje && (
            <div className="alert alert-success">{mensaje}</div>
          )}
        </form>
      </div>
    </section>
    <Footer />
    </div>
    </>
  );
};

export default Register;