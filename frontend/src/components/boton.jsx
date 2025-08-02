import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

function Boton ({ variante, texto, onClick, type, size}) {
    return (
        <Button variant={variante} onClick={onClick} type={type} size={size}>
            {texto}
        </Button>
    );
};

Boton.propTypes = {
    variante: PropTypes.string.isRequired,
    link: PropTypes.string,
    texto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        ]),
    onClick: PropTypes.func,
    type: PropTypes.string,
    size: PropTypes.string
};

export default Boton;