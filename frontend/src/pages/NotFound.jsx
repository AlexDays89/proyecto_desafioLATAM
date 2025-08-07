import Navigation from '../components/navigation';
import Boton from '../components/boton';

function NotFound() {
  return (
    <main className="notFound">
        <h1>404</h1>
        <h2>Lo siento, no encontramos la página que buscas</h2>
        <Navigation to="/">
            <Boton
            variante="outline-dark text-dark"
            texto={<>Volver a la página principall</>}
            />
          </Navigation>
    </main>
  )
}

export default NotFound;