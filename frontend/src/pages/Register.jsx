import { InputText } from 'primereact/inputtext';
import React, { useState } from "react";
import '../assets/styles/register.css';
import Boton from '../components/boton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarpassword, setConfirmarpassword] = useState('');
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('');

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

    setTimeout(() => {
      onRegisterSuccess();
    }, 2000);
  };

  return (
    <>
    <Navbar className="navbar" />
    <form onSubmit={handleSubmit} className="contenedor-register">
      <h1>REGISTRO</h1>

      <div className="input p-field p-fluid">
        <label htmlFor="username">e-Mail</label>
        <InputText
          placeholder="Introduce tu e-Mail"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input p-field p-fluid">
        <label htmlFor="password">Password</label>
        <InputText
          placeholder="Contraseña"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input p-field p-fluid">
        <label htmlFor="confirmarpassword">Confirmar Password</label>
        <InputText
          placeholder="Confirmar Contraseña"
          type="password"
          id="confirmarpassword"
          value={confirmarpassword}
          onChange={(e) => setConfirmarpassword(e.target.value)}
        />
      </div>

      <Boton variante="outline-dark text-dark" texto="Registro" type="submit" size="lg" />

      {error && <div className="alert alert-danger">{mensaje}</div>}
      {!error && mensaje && (
        <div className="alert alert-success">{mensaje}</div>
      )}
    </form>
    <Footer />
    </>
  );
};

export default Register;