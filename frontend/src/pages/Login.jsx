import { InputText } from 'primereact/inputtext';
import React, { useState } from "react";
import '../assets/styles/login.css';
import Boton from '../components/boton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    if (!username.trim() || !password.trim()) {
        setError(true);
        setMensaje('Todos los campos son obligatorios');
        return;
    }

    if (password.length < 6) {
        setError(true);
        setMensaje('Contraseña incorrecta');
        return;
    }

    setError(false);
    setMensaje('Ingreso Exitoso');

    setTimeout(() => {
        onLoginSuccess();
    }, 2000);
};

return (
    <>
    <Navbar className="navbar" />
    <form onSubmit={handleSubmit} className="contenedor-login">
    <h1>LOG-IN</h1>

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

    <Boton variante="outline-dark text-dark" texto="Login" type="submit" size="lg" />

    {error && <div className="alert alert-danger">{mensaje}</div>}
    {!error && mensaje && (
        <div className="alert alert-success">{mensaje}</div>
    )}
    </form>
    <Footer />
    </>
);
};

export default Login;