import { InputText } from 'primereact/inputtext';
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
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
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

    setError(false);
    setMensaje('Registro Exitoso');
    setUser({
      username: username,
      password: password,
      rol: 'user'
    });

    setTimeout(() => {
      onRegisterSuccess();
    }, 2000);
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
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <InputText
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
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <InputText
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
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <InputText
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
            variante="outline-dark text-dark mt-4"
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