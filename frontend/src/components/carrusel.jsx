import { Carousel } from 'react-bootstrap';
import productos from '../data/productos';
import '../assets/styles/carrusel.css';
import { useNavigate } from 'react-router-dom';

const Carrusel = () => {
    const navigate = useNavigate();
    const handleVerDetalles = (productoId) => {
        navigate(`/producto/${productoId}`);
    };

    return (

        <div className="container my-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#764ba2' }}>Nuestros Servicios</h2>
                <Carousel 
                    indicators={true} 
                    controls={true} 
                    interval={4000}
                    className="product-carousel"
                    pause="hover"
                >
                    {productos.map((producto) => (
                        <Carousel.Item key={producto.id}>
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-4">
                                    <div className="card h-100 shadow border-0 mx-auto" style={{ maxWidth: '350px' }}>
                                        <div className="card-img-container" style={{ height: '250px', overflow: 'hidden' }}>
                                            <img
                                                className="d-block w-100 h-100"
                                                src={producto.img}
                                                alt={producto.name}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="card-body text-center p-4">
                                            <h5 className="card-title fw-bold mb-3">{producto.name}</h5>
                                            <p className="card-text mb-3" style={{ color: '#667eea', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                {producto.price === 0 ? 'Precio: Consultar' : `$${producto.price.toLocaleString()}`}
                                            </p>
                                            <p className="card-text text-muted">Categoría: {producto.category}</p>
                                            <button 
                                                className="btn btn-lg px-4 py-2" 
                                                style={{ backgroundColor: '#667eea', borderColor: '#667eea', color: 'white' }}
                                                onClick={() => producto.price === 0 ? null : handleVerDetalles(producto.id)}
                                            >
                                                {producto.price === 0 ? 'Consultar' : 'Ver Detalles'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
export default Carrusel;