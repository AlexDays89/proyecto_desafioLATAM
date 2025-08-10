import Navigation from '../components/navigation';
import Boton from '../components/boton';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function Profile() {
    const { setToken, } = useContext(UserContext);
    const handleLogout = () => { setToken(false);}
    const { user } = useContext(UserContext);

    return (
    <div className="contenedor-home">
        <Navbar />
        <div className="row px-5 py-5">
            <div className="datosUsuario col-sm-6 mb-3 mb-sm-0">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label mb-4">Datos de usuario</label>
                            <p className="mb-0">Email</p>
                            <input 
                            type="email" 
                            className="form-control" 
                            id="exampleFormControlInput1"
                            value={user?.username || "Usuario"}
                            placeholder="" disabled />
                        </div>
                        <Navigation to="/">
                            <Boton
                                variante="outline-dark text-dark mt-4"
                                texto={<>Cerrar sesión</>}
                                onClick={handleLogout}/>
                        </Navigation>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default Profile;