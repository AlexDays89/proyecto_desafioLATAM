import React, { useState, useContext } from "react";
import Boton from '../components/boton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const { setUser, setToken } = useContext(UserContext);

    const handleSubmit = async (e) => {
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

    try {
        const response = await fetch('http://localhost:3000/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail: username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(true);
            setMensaje(data.error || 'Usuario o contraseña incorrectos');
            return;
        }

        console.log('data.usuario:', data.usuario, 'typeof:', typeof data.usuario);
        if (data.usuario) 
            setUser(data.usuario);
        console.log('data.token:', data.token, 'typeof:', typeof data.token);
        if (typeof setToken === 'function' && data.token) {
            setToken(data.token);
        }
        setError(false);
        setMensaje('Ingreso Exitoso');
        setTimeout(() => {
            onLoginSuccess(data.token, data.usuario);
        }, 2000);
    } catch {
        setError(true);
        setMensaje('Error de conexión con el servidor');
    }
};


return (
    <>
    <Navbar />
    <section className="login-section">
        <div className="login-box">
            <form onSubmit={handleSubmit}>
                <h2>LOGIN</h2>
                
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
                    <label htmlFor="password">Password</label>
                </div>

                <div className="remember-forget">
                    <label>
                        <input type="checkbox" />
                        Recordarme
                    </label>
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>

                <Boton
                    texto="Ingresar"
                    type="submit"
                    variante="outline-dark text-dark mt-4 auth-btn"
                    onClick={handleSubmit}
                />

                <div className="register-link">
                    <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
                </div>

                {error && <div className="alert alert-danger">{mensaje}</div>}
                {!error && mensaje && (
                    <div className="alert alert-success">{mensaje}</div>
                )}
            </form>
        </div>
    </section>
    <Footer />
    </>
    );
}

export default Login;