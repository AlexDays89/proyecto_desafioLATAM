import Acciones from './acciones';
import '../assets/styles/principal.css';
import TiposTarot from './tipostarot';
import Carrusel from './carrusel';

function Principal() {

    return (
        <div className="principal">
            {/* Sección Hero - Título principal y descripción de servicios */}
            <div className="container-fluid mb-4 contenedor-hero">
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
                    <i className="fas fa-chevron-down" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}></i>
                </div>
            </div>
            {/* Carrusel de Productos - Muestra los servicios disponibles */}
            <Carrusel />

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
            <TiposTarot />

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
            <Acciones />
        </div>
    )
}

export default Principal