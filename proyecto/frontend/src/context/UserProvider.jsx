import { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [tokenState, setTokenState] = useState(() => localStorage.getItem("token") || null);
    const [userState, setUserState] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setToken = (value) => {
        const hasValue = value && value !== "";
        
        if (hasValue) {
            setTokenState(value);
            localStorage.setItem("token", value);
        } else {
            setTokenState(null);
            localStorage.removeItem("token");
        }
    };

    const setUser = (value) => {
        const hasValue = value && value !== null;
        
        if (hasValue) {
            setUserState(value);
            localStorage.setItem("user", JSON.stringify(value));
        } else {
            setUserState(null);
            localStorage.removeItem("user");
        }
    };

    return (
        <UserContext.Provider value={{ token: tokenState, setToken, user: userState, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;