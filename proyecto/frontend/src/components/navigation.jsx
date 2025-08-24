import { NavLink } from 'react-router-dom';

function Navigation({ to, children }) {

    return (
    <NavLink to={to}>
        {children}
    </NavLink>
    );
}

export default Navigation;