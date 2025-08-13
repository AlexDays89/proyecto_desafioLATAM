import { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [tokenState, setTokenState] = useState(() => localStorage.getItem("token") || null);
    const [userState, setUserState] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setToken = (value) => {
        setTokenState(value);
        if (value !== null) {
            localStorage.setItem("token", value);
        } else {
            localStorage.removeItem("token");
        }
    };

    const setUser = (value) => {
        setUserState(value);
        if (value !== null) {
            localStorage.setItem("user", JSON.stringify(value));
        } else {
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