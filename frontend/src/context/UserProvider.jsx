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
        username: "alejandrodiaz@gmail.com",
        displayName: "Alejandro Diaz",
        password: "123456",
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
