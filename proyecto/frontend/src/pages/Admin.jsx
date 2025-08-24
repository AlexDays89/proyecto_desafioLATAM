import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { getProductos } from "../services/productosService";

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nuevoProducto, setNuevoProducto] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        img: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editProducto, setEditProducto] = useState({});
    const [showModal, setShowModal] = useState(false);

    // Función para obtener productos (patrón recomendado como en la imagen)
    const getProducts = async () => {
        try {
            const data = await getProductos();
            setProductos(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            setProductos([]);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para cargar productos al montar el componente
    useEffect(() => {
        getProducts();
    }, []);

    // Manejar inputs para nuevo producto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto((prev) => ({ ...prev, [name]: value }));
    };

    // Manejar subida de imagen al crear
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setNuevoProducto((prev) => ({ ...prev, img: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // Añadir producto
    const handleAddProduct = (e) => {
        e.preventDefault();
        setProductos([...productos, { ...nuevoProducto, id: Date.now() }]);
        setNuevoProducto({ name: "", price: "", stock: "", category: "", img: "" });
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Eliminar producto (muestra modal)
    const handleDeleteProduct = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };
    // Confirmar eliminación
    const confirmDeleteProduct = () => {
        setProductos(productos.filter((p) => p.id !== deleteId));
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
        setEditIndex(index);
        setEditProducto(productos[index]);
        setShowModal(true);
    };
    // Manejar inputs en el modal
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProducto((prev) => ({ ...prev, [name]: value }));
    };
    // Manejar subida de imagen en edición
    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditProducto((prev) => ({ ...prev, img: reader.result }));
        };
        reader.readAsDataURL(file);
    };
    // Guardar cambios
    const handleEditSave = (e) => {
        e.preventDefault();
        const updated = productos.map((p, i) =>
            i === editIndex ? { ...editProducto } : p
        );
        setProductos(updated);
        setEditIndex(null);
        setShowModal(false);
    };
    // Cerrar modal
    const handleModalClose = () => {
        setShowModal(false);
        setEditIndex(null);
    };

    // Mostrar loading mientras se cargan los productos
    if (loading) {
        return (
            <>
                <Navbar />
                <main className="container py-5">
                    <div className="text-center">
                        <h2>Cargando productos...</h2>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

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
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                accept="image/*"
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
                                        type="file"
                                        className="form-control mb-2"
                                        onChange={handleEditFileChange}
                                        accept="image/*"
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