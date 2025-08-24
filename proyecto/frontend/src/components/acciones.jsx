import Navigation from './navigation';

const Acciones = () => {
    return (
        <>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h3 className="fw-bold mb-3">¿Listo para descubrir tu destino?</h3>
                    <p className="lead mb-4">Explora nuestros servicios y encuentra las respuestas que buscas</p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Navigation to="/Productos">
                            <button className="btn btn-lg px-4 py-2 botonverproductos">
                            Ver Productos
                            </button>
                        </Navigation>
                        <Navigation to="/Contacto">
                            <button className="btn btn-outline-secondary btn-lg px-4 py-2">
                            Contactar
                            </button>
                        </Navigation>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Acciones