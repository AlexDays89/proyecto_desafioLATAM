import Navbar from '../components/navbar'
import CuadroContacto from '../components/cuadrocontacto'
import Footer from '../components/footer'

function Contacto() {
    return (
        <div className="contacto-section">
            <div className="w-100">
                <Navbar />
                <CuadroContacto />
                <Footer />
            </div>
        </div>
    )
}

export default Contacto