import { Card } from "react-bootstrap";
import Boton from "./boton";
import PropTypes from "prop-types";


const CardProducto = ({ id, img, name, price, count, onAdd }) => (
    <Card className="h-100 card-custom">
        <div className="card-img-container">
        <Card.Img className = "imgCard" variant="top" src={img} alt={name} />
        </div>
        <Card.Body className="text-center bodyCard">
            <Card.Title>{name}</Card.Title>
            <Card.Text>Precio: ${price}</Card.Text>
            <Card.Text>Stock: {count}</Card.Text>
            <Boton 
            className="rounded-pill"
            severity="secondary" 
            texto="Agregar al carrito" 
            onClick={() => onAdd(id)}
            raised outlined/>
        </Card.Body>
    </Card>
);

CardProducto.propTypes = {
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default CardProducto;
