import React, { useState, useContext } from "react";
import Boton from '../components/boton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import usuarios from '../data/usuarios';
import { UserContext } from '../context/UserContext';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const { setUser } = useContext(UserContext);

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

    const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.username === username && usuario.password === password
    );

    if (!usuarioEncontrado) {
        setError(true);
        setMensaje('Usuario o contraseña incorrectos');
        return;
    }

    if (usuarioEncontrado) {
        setUser(usuarioEncontrado); // <-- setUser viene de tu UserContext
        setError(false);
        setMensaje('Ingreso Exitoso');
        setTimeout(() => {
            onLoginSuccess();
        }, 2000);
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
                    texto="Login"
                    onClick={handleSubmit}
                    variante="outline-dark text-dark mt-4"
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