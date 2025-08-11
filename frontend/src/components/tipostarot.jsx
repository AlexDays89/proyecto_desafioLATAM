import barajas from '../data/tiposbarajas';

const TiposTarot = () => {
    return (
        <div className="container my-5 tipos-de-tarot">
            <h2 className="text-center mb-5 fw-bold">Nuestros Tipos de Tarot</h2>
            <div className="row g-4">
                {barajas.map(baraja => (
                    <div className="col-md-4" key={baraja.id}>
                        <div className="card h-100 shadow-sm card-baraja" style={{ borderTopColor: baraja.color }}>
                            <div className="contenedor-img-baraja">
                                <img 
                                    src={baraja.img} 
                                    alt={baraja.name} 
                                />
                            </div>
                            <div className="card-body text-center p-4">
                            <div className="mb-3">
                                    <i className={baraja.emoji} style={{ color: baraja.color }}></i>
                                </div>
                                <h4 className="card-title fw-bold mb-3">{baraja.name}</h4>
                                <p className="card-text">{baraja.descripcion}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TiposTarot;