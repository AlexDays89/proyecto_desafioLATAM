import React, { useState, useContext } from "react";
import Boton from '../components/boton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';
import { login } from '../services/userServices';

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
        setMensaje('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    try {
        const data = await login({ mail: username, password });
        
        if (data.usuario) {
            setUser(data.usuario);
        }
        if (typeof setToken === 'function' && data.token) {
            setToken(data.token);
        }
        setError(false);
        setMensaje('Ingreso Exitoso');
        setTimeout(() => {
            onLoginSuccess(data.token, data.usuario);
        }, 2000);
    } catch (error) {
        setError(true);
        setMensaje(error.message || 'Error de conexión con el servidor');
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
                    className="outline-dark text-dark mt-4 auth-btn"
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