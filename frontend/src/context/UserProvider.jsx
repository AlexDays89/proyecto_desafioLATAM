import { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [tokenState, setTokenState] = useState(() => localStorage.getItem("token") || null);
    const [userState, setUserState] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setToken = (value) => {
        
        if (value === undefined || value === null || value === "") {
            setTokenState(null);
            localStorage.removeItem("token");
            
        } else {
            setTokenState(value);
            localStorage.setItem("token", value);
            
        }
    };

    const setUser = (value) => {
        
        if (value === undefined || value === null) {
            setUserState(null);
            localStorage.removeItem("user");
            
        } else {
            setUserState(value);
            localStorage.setItem("user", JSON.stringify(value));
            
        }
    };

    return (
        <UserContext.Provider value={{ token: tokenState, setToken, user: userState, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;