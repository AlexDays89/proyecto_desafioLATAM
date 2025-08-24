import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useCart } from "../context/useCart";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Boton from "../components/boton";
import { getProductoPorId } from "../services/productosService";

const LoadingState = () => (
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

const NotFoundState = ({ navigate }) => (
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

const BackButton = ({ onVolver }) => (
    <Row className="mb-4">
        <Col>
            <Boton
                className="rounded-pill"
                severity="secondary"
                texto="← Volver a productos"
                onClick={onVolver}
                outlined
            />
        </Col>
    </Row>
);

const ProductImage = ({ producto }) => (
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
);

const PriceDisplay = ({ precio }) => {
    const formatearPrecio = (precio) => {
        if (precio === 0) {
            return "Precio a consultar";
        }
        return `$${precio.toLocaleString()}`;
    };

    return (
        <div className="mb-3">
            <h5 className="text-muted mb-1">Precio:</h5>
            <h3 className="text-success fw-bold">
                {formatearPrecio(precio)}
            </h3>
        </div>
    );
};

const StockDisplay = ({ stock }) => {
    const getStockColor = (stock) => {
        if (stock > 20) return 'text-success';
        if (stock > 5) return 'text-warning';
        return 'text-danger';
    };

    return (
        <div className="mb-3">
            <h5 className="text-muted mb-1">Stock disponible:</h5>
            <h4 className={`fw-bold ${getStockColor(stock)}`}>
                {stock} unidades
            </h4>
        </div>
    );
};

const ProductInfo = ({ producto, handleAdd }) => (
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
                        <PriceDisplay precio={producto.price} />
                    </Col>
                    <Col sm={6}>
                        <StockDisplay stock={producto.stock} />
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
);

const Producto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleAdd } = useCart();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const data = await getProductoPorId(id);
                setProducto(data);
            } catch (error) {
                setProducto(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProducto();
    }, [id]);

    const handleVolver = () => {
        navigate('/productos');
    };

    if (loading) {
        return <LoadingState />;
    }

    if (!producto) {
        return <NotFoundState navigate={navigate} />;
    }

    return (
        <>
            <Navbar />
            <Container className="my-5">
                <BackButton onVolver={handleVolver} />
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="shadow-lg border-0">
                            <Row className="g-0">
                                <ProductImage producto={producto} />
                                <ProductInfo producto={producto} handleAdd={handleAdd} />
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