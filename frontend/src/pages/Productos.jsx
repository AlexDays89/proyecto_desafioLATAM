import Navbar from '../components/navbar'
import VistaProductos from '../components/vistaProductos'
import Footer from '../components/footer'

function Productos() {
    return (
        <div className="contenedor-home">
            <Navbar />
            <VistaProductos/>
            <Footer />
        </div>
    )
}

export default Productos