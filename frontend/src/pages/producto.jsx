import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useCart } from "../context/useCart";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Boton from "../components/boton";
import { api } from "../lib/api.js";

const Producto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleAdd } = useCart();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const res = await api(`/productos/${id}`);
                if (!res.ok) throw new Error("No se encontró el producto");
                const data = await res.json();
                setProducto(data);
            } catch {
                setProducto(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProducto();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Container className="my-5">
                    <div className="text-center">
                        <h2>Cargando producto...</h2>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    if (!producto) {
        return (
            <>
                <Navbar />
                <Container className="my-5">
                    <div className="text-center">
                        <h2>Producto no encontrado</h2>
                        <p>El producto que buscas no existe o ha sido eliminado.</p>
                        <Boton
                            texto="← Volver a productos"
                            onClick={() => navigate('/productos')}
                            className="mb-3"
                        />
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    const handleVolver = () => {
        navigate('/productos');
    };

    const formatearPrecio = (precio) => {
        if (precio === 0) {
            return "Precio a consultar";
        }
        return `$${precio.toLocaleString()}`;
    };

    return (
        <>
            <Navbar />
            <Container className="my-5">
                <Row className="mb-4">
                    <Col>
                        <Boton
                            className="rounded-pill"
                            severity="secondary"
                            texto="← Volver a productos"
                            onClick={handleVolver}
                            outlined
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="shadow-lg border-0">
                            <Row className="g-0">
                                <Col md={6}>
                                    <div className="p-4">
                                        <img
                                            src={producto.img}
                                            alt={producto.name}
                                            className="img-fluid rounded shadow"
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Card.Body className="p-4">
                                        <div className="mb-3">
                                            <span className="badge bg-primary fs-6 mb-3">
                                                {producto.category}
                                            </span>
                                        </div>
                                        <h1 className="mb-4 text-primary">
                                            {producto.name}
                                        </h1>
                                        <div className="mb-4">
                                            <h5 className="text-muted mb-2">Descripción:</h5>
                                            <p className="lead text-justify">
                                                {producto.description}
                                            </p>
                                        </div>
                                        <div className="mb-4">
                                            <Row>
                                                <Col sm={6}>
                                                    <div className="mb-3">
                                                        <h5 className="text-muted mb-1">Precio:</h5>
                                                        <h3 className="text-success fw-bold">
                                                            {formatearPrecio(producto.price)}
                                                        </h3>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className="mb-3">
                                                        <h5 className="text-muted mb-1">Stock disponible:</h5>
                                                        <h4 className={`fw-bold ${
                                                            producto.stock > 20 ? 'text-success' :
                                                            producto.stock > 5 ? 'text-warning' : 'text-danger'
                                                        }`}>
                                                            {producto.stock} unidades
                                                        </h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="d-grid">
                                            <Boton
                                                className="btn-lg rounded-pill"
                                                severity="success"
                                                texto={producto.price === 0 ? "Solicitar cotización" : "Agregar al carrito"}
                                                onClick={() => handleAdd(producto.id)}
                                                disabled={producto.stock === 0}
                                                raised
                                            />
                                        </div>
                                        {producto.stock === 0 && (
                                            <div className="alert alert-warning mt-3" role="alert">
                                                <i className="fas fa-exclamation-triangle me-2"></i>
                                                Este servicio no está disponible en este momento.
                                            </div>
                                        )}
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Producto;