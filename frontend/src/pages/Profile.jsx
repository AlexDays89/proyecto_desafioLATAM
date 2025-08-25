import React, { useContext, useState, useEffect } from 'react';
import Navigation from '../components/navigation';
import Boton from '../components/boton';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { api } from '../lib/api.js';

const Profile = () => {
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
    const [compras, setCompras] = useState([]);
    const [detalle, setDetalle] = useState(null);
    const [loading, setLoading] = useState(false);

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
        
        setToken(null);
        setUser(null);
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
            if (response.error) {
                setError(true);
                setMensaje(response.error || 'Error al actualizar perfil');
                return;
            }
            setUser({ ...user, ...response });
            setMensaje('Perfil actualizado con éxito');
            setError(false);
            setEdit(false);
        } catch {
            setError(true);
            setMensaje('Error de conexión');
        }
    };

    useEffect(() => {
        if (!user) return;
        const fetchCompras = async () => {
            setLoading(true);
            try {
                const data = await api(`/compras/usuario/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCompras(data);
            } catch {
                setCompras([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCompras();
    }, [user, token]);

    const verDetalle = async (id_compra) => {
        try {
            const data = await api(`/compras/${id_compra}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDetalle({ id_compra, items: data });
        } catch {
            setDetalle({ id_compra, items: [] });
        }
    };

    const cerrarDetalle = () => setDetalle(null);

    return (
        <div className="contenedor-home">
            <Navbar />
            <div className="row px-5 py-5">
                <div className="col-md-6 mb-3 mb-md-0">
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
                {/* Columna 2: Historial de compras */}
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-body">
                            <h4 className="mb-3">Historial de compras</h4>
                            {loading ? <p>Cargando...</p> : compras.length === 0 ? <p>No hay compras registradas.</p> : (
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Fecha</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log('compras:', compras)}
                                        {compras.map(c => (
                                            <tr key={c.id_compra}>
                                                <td>
                                                    <button className="btn btn-link p-0" onClick={() => verDetalle(c.id_compra)}>{c.id_compra}</button>
                                                </td>
                                                <td>{new Date(c.fecha_compra).toLocaleString()}</td>
                                                <td>${c.total.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {detalle && (
                                <div className="mt-3">
                                    <h5>Detalle de compra #{detalle.id_compra}</h5>
                                    {detalle.items && detalle.items.length > 0 ? (
                                        <ul>
                                            {console.log('detalle.items:', detalle.items)}
                                            {detalle.items.map(item => (
                                                <li key={item.id_item}>
                                                    {item.nombre} (x{item.cantidad}) - ${item.precio_unitario.toLocaleString()} c/u
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No hay productos en esta compra.</p>
                                    )}
                                    <button className="btn btn-secondary" onClick={cerrarDetalle}>Cerrar</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    
};

export default Profile;
