import PropTypes from 'prop-types';
import { Button } from 'primereact/button';

function Boton({ texto, ...props }) {
    return (
        <Button {...props} label={texto}/>
    );
}

Boton.propTypes = {
    texto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    onClick: PropTypes.func,
    severity: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
    variante: PropTypes.string
};

export default Boton;