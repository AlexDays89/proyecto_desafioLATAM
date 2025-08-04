import { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(true);
    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserValidated = ({ children }) => {
    const [user, setUser] = useState({
        username: "Usuario",
        displayName: "Usuario",
        password: "*******",
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
