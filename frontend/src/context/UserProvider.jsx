import { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(false); // false por defecto si no está logueado
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;