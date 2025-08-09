import { Container, Row, Col, Card } from "react-bootstrap";

function CuadroContacto() {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-5">
                            {/* Titulo principal */}
                            <div className="text-center mb-5">
                                <h1 className="display-4 text-primary mb-3">Ariana Tarot</h1>
                                <p className="lead text-muted">Conecta conmigo para consultas y servicios espirituales</p>
                            </div>
                            
                            {/* Informacion de contacto */}
                            <Row className="g-4">
                                {/* Telefono */}
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-primary text-white rounded-circle p-3 me-3">
                                            <i className="fas fa-phone fa-lg"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">Teléfono</h5>
                                            <a href="tel:+56954063557" className="text-decoration-none">
                                                +56 9 5406 3557
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                                
                                {/* Correo electronico */}
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-success text-white rounded-circle p-3 me-3">
                                            <i className="fas fa-envelope fa-lg"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">Correo</h5>
                                            <a href="mailto:contacto@aritarot.cl" className="text-decoration-none">
                                                contacto@aritarot.cl
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                                
                                {/* WhatsApp */}
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-success text-white rounded-circle p-3 me-3">
                                            <i className="fab fa-whatsapp fa-lg"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-1">WhatsApp</h5>
                                            <a 
                                                href="https://wa.me/56954063557" 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-decoration-none"
                                            >
                                                +56 9 5406 3557
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            
                            {/* Separador */}
                            <hr className="my-5" />
                            
                            {/* Redes sociales */}
                            <div className="text-center">
                                <h3 className="mb-4 text-primary">Sígueme en Redes Sociales</h3>
                                <Row className="justify-content-center">
                                    {/* TikTok - centrado como unica red social */}
                                    <Col sm={8} md={6} lg={4} className="mb-3">
                                        <a 
                                            href="https://www.tiktok.com/@caroline_777ari?_t=ZM-8yjt2gNaeQ9&_r=1" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-decoration-none"
                                        >
                                            <div className="bg-dark text-white rounded-3 p-4 h-100 d-flex flex-column align-items-center justify-content-center">
                                                <i className="fab fa-tiktok fa-2x mb-2"></i>
                                                <h5 className="mb-1">TikTok</h5>
                                                <small>@caroline_777ari</small>
                                            </div>
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CuadroContacto