import Navbar from '../components/navbar'
import Principal from '../components/principal'
import Footer from '../components/footer'

function Home() {
    return (
        <div className="contenedor-home">
            <Navbar />
            <Principal/>
            <Footer />
        </div>
    )
}

export default Home