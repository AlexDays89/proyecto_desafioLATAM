import productos from '../data/productos';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Principal() {
    const navigate = useNavigate();

    const handleVerDetalles = (productoId) => {
        navigate(`/producto/${productoId}`);
    };

    return (
        <div className="principal">
            {/* Sección Hero - Título principal y descripción de servicios */}
            <div className="container-fluid mb-4" style={{ 
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.51)), url("/img/herobg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: 'calc(100vh - 130px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                <div className="container text-center text-white">
                    <h1 className="display-4 fw-bold mb-3">Bienvenido a Nuestro Mundo Místico</h1>
                    <p className="lead mb-4">Descubre los secretos del universo a través de nuestras lecturas de tarot y servicios energéticos especializados</p>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <p className="fs-5">Conectamos contigo para brindarte claridad, orientación y respuestas a través de la sabiduría ancestral del tarot</p>
                        </div>
                    </div>
                </div>
                {/* Arrow scroll down animado */}
                <div className="scroll-arrow">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>

            {/* Carrusel de Productos - Muestra los servicios disponibles */}
            <div className="container my-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#764ba2' }}>Nuestros Servicios</h2>
                <style>
                    {`
                        .product-carousel .carousel-control-prev,
                        .product-carousel .carousel-control-next {
                            background-color: rgba(118, 75, 162, 0.8);
                            border-radius: 50%;
                            width: 50px;
                            height: 50px;
                            top: 50%;
                            transform: translateY(-50%);
                            opacity: 0.8;
                            transition: all 0.3s ease;
                        }
                        
                        .product-carousel .carousel-control-prev:hover,
                        .product-carousel .carousel-control-next:hover {
                            background-color: rgba(118, 75, 162, 1);
                            opacity: 1;
                            transform: translateY(-50%) scale(1.1);
                        }
                        
                        .product-carousel .carousel-control-prev {
                            left: -25px;
                        }
                        
                        .product-carousel .carousel-control-next {
                            right: -25px;
                        }
                        
                        .product-carousel .carousel-control-prev-icon,
                        .product-carousel .carousel-control-next-icon {
                            background-size: 20px 20px;
                            filter: brightness(0) invert(1);
                        }
                        
                        .product-carousel .carousel-indicators {
                            bottom: -50px;
                        }
                        
                        .product-carousel .carousel-indicators [data-bs-target] {
                            background-color: #764ba2;
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            margin: 0 5px;
                        }
                    `}
                </style>
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
            {/* Sección Acerca de */}
            <div className="container my-5" id="acerca-de">
                <h2 className="text-center fw-bold mb-5" style={{ color: '#764ba2' }}>Acerca de:</h2>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img
                            src="/img/acerca_de.jpeg"
                            alt="Acerca de nosotros"
                            className="img-fluid rounded shadow w-50px h-auto"
                        />
                    </div>
                    <div className="col-md-6">
                        <p className="lead">
                            Ariana es una Tarotista y Medium muy conocida en el mundo esoterico nacional e internacional, pero no se habla mucho de ella ya que quiere mantener un perfil bajo.<br/><br/>
                            Ella dice que, en su fasceta como Medium, "lo hace mas que nada para ayudar, porque lo que regala Dios es para el binestar de sus hijos". Es por eso que, incluso Mediums, Clarividentes y tarotistas de renombre dentro del circuito espiritual, han solicitado
                            sus servicios, para aconsejarlos y ayudar en lo que le soliciten, reconociendo con esto ultimo, sus gran capacidad y dedicacion a la ayuda de todos sus pacientes.
                        </p>
                    </div>
                </div>
            </div>
            {/* Sección Tipos de Tarot */}
            <div className="container my-5" id="tipos-de-tarot">
                <h2 className="text-center mb-5 fw-bold" style={{ color: '#764ba2' }}>Nuestros Tipos de Tarot</h2>
                <div className="row g-4">
                    {/* Tarot Egipcio */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0" style={{ borderTop: '4px solid #d4af37' }}>
                            {/* Imagen del Tarot Egipcio */}
                            <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                                <img 
                                    src="/img/tipos_tarot/tarot_egipcio.jpg" 
                                    alt="Tarot Egipcio" 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'contain', 
                                        borderRadius: '8px 8px 0 0' 
                                    }}
                                />
                            </div>
                            <div className="card-body text-center p-4">
                                <div className="mb-3">
                                    <i className="fas fa-ankh" style={{ fontSize: '3rem', color: '#d4af37' }}></i>
                                </div>
                                <h4 className="card-title fw-bold mb-3">Tarot Egipcio</h4>
                                <p className="card-text">Basado en la sabiduría del antiguo Egipto, incorpora símbolos y deidades de su panteón. Su simbolismo evoca la profunda espiritualidad de esta civilización milenaria.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tarot Español */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0" style={{ borderTop: '4px solid #c9302c' }}>
                            {/* Imagen del Tarot Español */}
                            <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                                <img 
                                    src="/img/tipos_tarot/tarot_espanol.jpg" 
                                    alt="Tarot Español" 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'contain', 
                                        borderRadius: '8px 8px 0 0' 
                                    }}
                                />
                            </div>
                            <div className="card-body text-center p-4">
                                <div className="mb-3">
                                    <i className="fas fa-crown" style={{ fontSize: '3rem', color: '#c9302c' }}></i>
                                </div>
                                <h4 className="card-title fw-bold mb-3">Tarot Español</h4>
                                <p className="card-text">Con raíces en la Italia del siglo XV, originado como juego para la nobleza. Los arcanos mayores adoptaron significado simbólico asociado con prácticas esotéricas.</p>
                            </div>
                        </div>
                    </div>

                    {/* Tarot Rider-Waite */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm border-0" style={{ borderTop: '4px solid #5cb85c' }}>
                            {/* Imagen del Tarot Rider-Waite */}
                            <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                                <img 
                                    src="/img/tipos_tarot/tarot_rider.jpg" 
                                    alt="Tarot Rider-Waite" 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'contain', 
                                        borderRadius: '8px 8px 0 0' 
                                    }}
                                />
                            </div>
                            <div className="card-body text-center p-4">
                                <div className="mb-3">
                                    <i className="fas fa-eye" style={{ fontSize: '3rem', color: '#5cb85c' }}></i>
                                </div>
                                <h4 className="card-title fw-bold mb-3">Tarot Rider-Waite</h4>
                                <p className="card-text">Creado en 1909 por Arthur Edward Waite y Pamela Colman Smith. Revolucionario por incluir escenas detalladas en todos los Arcanos Menores.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección Tipos de Lectura */}
            <div className="container-fluid py-5" id="tipos-de-lectura" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold" style={{ color: '#764ba2' }}>Tipos de Consulta</h2>
                    <div className="row g-4">
                        {/* Lectura General */}
                        <div className="col-lg-4">
                            <div className="card h-100 shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-circle p-3 me-3" style={{ backgroundColor: '#667eea20' }}>
                                            <i className="fas fa-globe" style={{ color: '#667eea', fontSize: '1.5rem' }}></i>
                                        </div>
                                        <h5 className="card-title fw-bold mb-0">Lectura General</h5>
                                    </div>
                                    <p className="card-text">Una consulta completa que abarca todos los aspectos de tu vida: amor, trabajo, salud y espiritualidad. Ideal para obtener una visión panorámica de tu situación actual.</p>
                                </div>
                            </div>
                        </div>

                        {/* Consulta de Amor */}
                        <div className="col-lg-4">
                            <div className="card h-100 shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-circle p-3 me-3" style={{ backgroundColor: '#e91e6320' }}>
                                            <i className="fas fa-heart" style={{ color: '#e91e63', fontSize: '1.5rem' }}></i>
                                        </div>
                                        <h5 className="card-title fw-bold mb-0">Amor y Relaciones</h5>
                                    </div>
                                    <p className="card-text">Especializada en temas del corazón. Descubre lo que el futuro depara en el amor, resuelve dudas sobre tu relación actual o encuentra el camino hacia el amor verdadero.</p>
                                </div>
                            </div>
                        </div>

                        {/* Orientación Laboral */}
                        <div className="col-lg-4">
                            <div className="card h-100 shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="rounded-circle p-3 me-3" style={{ backgroundColor: '#ff980020' }}>
                                            <i className="fas fa-briefcase" style={{ color: '#ff9800', fontSize: '1.5rem' }}></i>
                                        </div>
                                        <h5 className="card-title fw-bold mb-0">Laboral y Financiera</h5>
                                    </div>
                                    <p className="card-text">Consulta enfocada en tu carrera profesional y situación económica. Recibe orientación sobre decisiones laborales, oportunidades de negocio y prosperidad financiera.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección Call to Action */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h3 className="fw-bold mb-3" style={{ color: '#764ba2' }}>¿Listo para descubrir tu destino?</h3>
                        <p className="lead mb-4">Explora nuestros servicios y encuentra las respuestas que buscas</p>
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            <button className="btn btn-lg px-4 py-2" style={{ backgroundColor: '#667eea', borderColor: '#667eea', color: 'white' }}>
                                Ver Productos
                            </button>
                            <button className="btn btn-outline-secondary btn-lg px-4 py-2">
                                Contactar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Principal