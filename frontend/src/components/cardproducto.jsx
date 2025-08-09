import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Boton from "./boton";
import PropTypes from "prop-types";


const CardProducto = ({ id, img, name, price, count, onAdd }) => {
    const navigate = useNavigate();
    
    // Funcion para navegar a la vista detallada del producto
    const handleVerMas = () => {
        navigate(`/producto/${id}`);
    };
    
    return (
        <Card className="h-100 card-custom">
            <div className="card-img-container">
            <Card.Img className = "imgCard" variant="top" src={img} alt={name} />
            </div>
            <Card.Body className="text-center bodyCard">
                <Card.Title>{name}</Card.Title>
                <Card.Text>Precio: ${price}</Card.Text>
                <Card.Text>Stock: {count}</Card.Text>
                
                {/* Contenedor para los botones */}
                <div className="d-flex flex-column gap-2">
                    <Boton 
                    className="rounded-pill"
                    severity="info" 
                    texto="Ver más" 
                    onClick={handleVerMas}
                    raised outlined/>
                    
                    <Boton 
                    className="rounded-pill"
                    severity="secondary" 
                    texto="Agregar al carrito" 
                    onClick={() => onAdd(id)}
                    raised outlined/>
                </div>
            </Card.Body>
        </Card>
    );
};

CardProducto.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default CardProducto;
