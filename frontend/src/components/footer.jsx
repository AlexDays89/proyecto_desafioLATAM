import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navigation from './navigation';
import '../assets/styles/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Ariana Tarot</h3>
                    <p>Descubre tu destino a través de las cartas del tarot. Consultas personalizadas con lectores expertos para guiarte en tu camino espiritual.</p>
                </div>
                
                <div className="footer-section">
                    <h4>Enlaces Útiles</h4>
                    <ul>
                        <li><Navigation to="/">Home</Navigation></li>
                        <li><Navigation to="/productos">Productos</Navigation></li>
                        <li><Navigation to="/contacto">Contacto</Navigation></li>
                        <li><Navigation to="/profile">Mi Perfil</Navigation></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <div className="contact-info">
                        <p><FontAwesomeIcon icon={faPhone} /> +56 9 5406 3557</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> contacto@aritarot.cl</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Santiago, Chile</p>
                        <p><Navigation to="https://wa.me/56954063557" target="_blank" rel="noopener noreferrer">WhatsApp: +56 9 5406 3557</Navigation></p>
                    </div>
                </div>
                
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-links">
                        <Navigation to="https://www.tiktok.com/@caroline_777ari?_t=ZM-8yjt2gNaeQ9&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok @caroline_777ari"><FontAwesomeIcon icon={faTiktok} /></Navigation>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2025 Ariana Tarot. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer