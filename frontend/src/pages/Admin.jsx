import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { api } from "../lib/api.js";


const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        img: "",
        description: "",
    });
    const [deleteId, setDeleteId] = useState(null); // ID del producto a Eliminar
    const [editProductId, setEditProductId] = useState(null); // ID del producto a editar
    const [editProducto, setEditProducto] = useState({}); // Producto a editar
    const [showModal, setShowModal] = useState(false); // Mostrar modal de edición
    const [showDeleteModal, setShowDeleteModal] = useState(false);// Mostrar modal de eliminación
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const { token } = useContext(UserContext);

    // Fetch productos al montar el componente
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await api("/productos");
                if (Array.isArray(data)) {
                    setProductos(data);
                } else {
                    setProductos([]);
                }
            } catch {
                setProductos([]);
            }
        };
        fetchProductos();
    }, []);

    // Manejar inputs para nuevo producto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prev) => ({ ...prev, [name]: value }));
    };

    // Añadir producto
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = { ...nuevoProducto, id: Date.now() };
        setProductos([...productos, newProduct]);
        setNuevoProducto({ name: "", price: "", stock: "", category: "", img: "" });
        try {
            const response = await api('/productos', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' , 
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newProduct),
            });

            if (response.error) {
                setError(true);
                setMensaje(response.error || 'Error en el registro');
                return;
            }
            setError(false);
            setMensaje('Producto agregado exitosamente');
            setTimeout(() => {
                setShowModal(false);
            }, 2000);

        } catch (error) {
            setError(true);
            setMensaje('Hubo un error al agregar el producto');
            console.error(error);
        }
    };

    // Eliminar producto (muestra modal)
    const handleDeleteProduct = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };
    // Confirmar eliminación
    const confirmDeleteProduct = async () => {
        setProductos(productos.filter((p) => p.id !== deleteId));
        try {
            await api(`/productos/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        } catch (error) {
            setError(true);
            setMensaje('Hubo un error al eliminar el producto');
            console.error(error);
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    };
    // Cancelar eliminación
    const cancelDeleteProduct = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    // Abrir modal de edición
    const handleEditClick = (index) => {
        const producto = productos[index];
        setEditProductId(producto.id);
        setEditProducto(producto);
        setShowModal(true);
    };
    // Manejar inputs en el modal
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProducto((prev) => ({ ...prev, [name]: value }));
    };
    // Guardar cambios
    const handleEditSave = async (e) => {
        e.preventDefault();
        try {
            const response = await api(`/productos/${editProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editProducto),
            });
            if (response.error) {
                setError(true);
                setMensaje(response.error || 'Error en la actualización');
                return;
            }
            setError(false);
            setMensaje('Producto actualizado exitosamente');
            setProductos(productos.map((p) =>
                p.id === editProductId ? { ...editProducto, id: editProductId } : p ));
            setTimeout(() => {
                setShowModal(false);
            }, 2000);
        } catch (error) {
            setError(true);
            setMensaje('Hubo un error al actualizar el producto');
            console.error(error);
        }
        setEditProductId(null);
        setShowModal(false);
    };
    // Cerrar modal
    const handleModalClose = () => {
        setShowModal(false);
        setEditProductId(null);
    };

    return (
        <>
            <Navbar />
            <main className="container py-5">
                <h2 className="mb-4">Administrar Productos</h2>
                <hr />
                {/* Formulario para añadir producto */}
                <form className="mb-5" onSubmit={handleAddProduct}>
                    <h4>Añadir nuevo producto</h4>
                    <div className="row g-2">
                        <div className="col">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Nombre"
                                value={nuevoProducto.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                name="price"
                                className="form-control"
                                placeholder="Precio"
                                value={nuevoProducto.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <input
                                type="number"
                                name="stock"
                                className="form-control"
                                placeholder="Stock"
                                value={nuevoProducto.stock}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="category"
                                className="form-control"
                                placeholder="Categoría"
                                value={nuevoProducto.category}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="img"
                                className="form-control"
                                placeholder="Imagen"
                                value={nuevoProducto.img}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-success">
                                Añadir
                            </button>
                        </div>
                    </div>
                </form>

                {/* Tabla de productos */}
                <h4>Productos existentes</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((p, i) => (
                            <tr key={p.id}>
                                <td>
                                    <img src={p.img} alt="" width={50} />
                                </td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{p.stock}</td>
                                <td>{p.category}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditClick(i)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteProduct(p.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal de edición */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <form className="modal-content" onSubmit={handleEditSave}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar Producto</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleModalClose}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <img src={editProducto.img} alt="" width={100} className="mb-3" />
                                    <input
                                        type="text"
                                        name="img"
                                        className="form-control mb-2"
                                        onChange={handleEditInputChange}
                                        accept="image/*"
                                        placeholder="Imagen"
                                        value={editProducto.img || ''}
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={editProducto.name || ''}
                                        onChange={handleEditInputChange}
                                        className="form-control mb-2"
                                        placeholder="Nombre"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={editProducto.price || ''}
                                        onChange={handleEditInputChange}
                                        className="form-control mb-2"
                                        placeholder="Precio"
                                    />
                                    <input
                                        type="number"
                                        name="stock"
                                        value={editProducto.stock || ''}
                                        onChange={handleEditInputChange}
                                        className="form-control mb-2"
                                        placeholder="Stock"
                                    />
                                    <input
                                        type="text"
                                        name="category"
                                        value={editProducto.category || ''}
                                        onChange={handleEditInputChange}
                                        className="form-control mb-2"
                                        placeholder="Categoría"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={editProducto.description || ''}
                                        onChange={handleEditInputChange}
                                        className="form-control mb-2"
                                        placeholder="Descripción"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleModalClose}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Modal de confirmación de eliminación */}
                {showDeleteModal && (
                    <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmar eliminación</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={cancelDeleteProduct}
                                    ></button>
                                </div>
                                <div className="modal-body text-center">
                                    <p>¿Estás seguro de que deseas eliminar este producto?</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={cancelDeleteProduct}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={confirmDeleteProduct}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Admin;