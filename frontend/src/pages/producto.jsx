import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useCart } from "../context/useCart";
import productos from "../data/productos";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Boton from "../components/boton";

const Producto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleAdd } = useCart();
    
    // Funcion para volver a la pagina de productos
    const handleVolver = () => {
        navigate('/productos');
    };
    
    // Buscar el producto por ID en el array de productos
    const producto = productos.find(p => p.id === parseInt(id));
    
    // Si no se encuentra el producto, mostrar mensaje de error
    if (!producto) {
        return (
            <>
                <Navbar />
                <Container className="my-5">
                    <div className="text-center">
                        <h2>Producto no encontrado</h2>
                        <p>El producto que buscas no existe o ha sido eliminado.</p>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }
    
    // Funcion para formatear el precio
    const formatearPrecio = (precio) => {
        if (precio === 0) {
            return "Precio a consultar";
        }
        return `$${precio.toLocaleString('es-CL')}`;
    };
    
    return (
        <>
            <Navbar />
            <Container className="my-5">
                {/* Boton volver en la parte superior */}
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
                                {/* Columna izquierda - Imagen del producto */}
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
                                
                                {/* Columna derecha - Detalles del producto */}
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
                                                            producto.count > 20 ? 'text-success' : 
                                                            producto.count > 5 ? 'text-warning' : 'text-danger'
                                                        }`}>
                                                            {producto.count} unidades
                                                        </h4>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        {/* Boton para agregar al carrito */}
                                        <div className="d-grid">
                                            <Boton 
                                                className="btn-lg rounded-pill"
                                                severity="success"
                                                texto={producto.price === 0 ? "Solicitar cotización" : "Agregar al carrito"}
                                                onClick={() => handleAdd(producto.id)}
                                                disabled={producto.count === 0}
                                                raised
                                            />
                                        </div>
                                        
                                        {producto.count === 0 && (
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