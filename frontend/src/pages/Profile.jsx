import React, { useContext, useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Boton from '../components/boton';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { api } from '../lib/api';

function Profile() {
    const { setToken, user, setUser, token } = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({
        mail: '',
        nombre: '',
        apellido: '',
        direccion: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                mail: user.mail || '',
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                direccion: user.direccion || ''
            });
        }
    }, [user]);

    const handleLogout = () => {
        
        setToken(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setEdit(true);
    };

    const handleCancel = () => {
        setEdit(false);
        setMensaje('');
        setError(false);
        setForm({
            mail: user.mail || '',
            nombre: user.nombre || '',
            apellido: user.apellido || '',
            direccion: user.direccion || ''
        });
    };

    const handleSave = async () => {
        try {
            const response = await api('usuarios/perfil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                const data = await response.json();
                setError(true);
                setMensaje(data.error || 'Error al actualizar perfil');
                return;
            }
            const data = await response.json();
            setUser({ ...user, ...data });
            setMensaje('Perfil actualizado con éxito');
            setError(false);
            setEdit(false);
        } catch {
            setError(true);
            setMensaje('Error de conexión');
        }
    };

    return (
        <div className="contenedor-home">
            <Navbar />
            <div className="row px-5 py-5">
                <div className="datosUsuario col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">Perfil de usuario</h4>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="mail"
                                    value={form.mail}
                                    disabled={!edit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    value={form.nombre}
                                    disabled={!edit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="apellido"
                                    value={form.apellido}
                                    disabled={!edit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="direccion"
                                    value={form.direccion}
                                    disabled={!edit}
                                    onChange={handleChange}
                                />
                            </div>
                            {mensaje && (
                                <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`}>{mensaje}</div>
                            )}
                            <div className="d-flex gap-2">
                                {!edit ? (
                                    <Boton texto="Editar" variante="outline-dark text-dark" onClick={handleEdit} />
                                ) : (
                                    <>
                                        <Boton texto="Guardar" variante="outline-success" onClick={handleSave} />
                                        <Boton texto="Cancelar" variante="outline-secondary" onClick={handleCancel} />
                                    </>
                                )}
                                <Navigation to="/">
                                    <Boton
                                        variante="outline-dark text-dark"
                                        texto={<>Cerrar sesión</>}
                                        onClick={handleLogout}
                                    />
                                </Navigation>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;