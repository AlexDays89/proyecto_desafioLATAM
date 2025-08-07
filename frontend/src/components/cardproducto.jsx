import { Card } from "react-bootstrap";
import Boton from "./boton";
import PropTypes from "prop-types";


// Componente de tarjeta de producto/servicio con manejo especial para servicios de precio variable
const CardProducto = ({ id, img, name, price, count, onAdd }) => {
    // Determinar si es un servicio de precio variable (Limpieza Energética)
    const esPrecioVariable = price === 0;
    
    return (
        <Card className="h-100 card-custom">
            <div className="card-img-container">
                <Card.Img className="imgCard" variant="top" src={img} alt={name} />
            </div>
            <Card.Body className="text-center bodyCard">
                <Card.Title>{name}</Card.Title>
                {/* Mostrar precio o mensaje de precio variable */}
                <Card.Text>
                    {esPrecioVariable ? "Precio: Consultar" : `Precio: $${price}`}
                </Card.Text>
                <Card.Text>Stock: {count}</Card.Text>
                {/* Botón diferente según el tipo de servicio */}
                <Boton 
                    className="rounded-pill"
                    severity="secondary" 
                    texto={esPrecioVariable ? "Consultar servicio" : "Agregar al carrito"}
                    onClick={() => esPrecioVariable ? alert("Para consultar sobre este servicio, contáctanos directamente.") : onAdd(id)}
                    raised outlined
                />
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
