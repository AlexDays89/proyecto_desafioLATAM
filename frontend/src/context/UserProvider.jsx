import { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [tokenState, setTokenState] = useState(() => localStorage.getItem("token") || null);
    const [userState, setUserState] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const setToken = (value) => {
        console.log('[UserProvider] setToken llamado con:', value);
        if (value === undefined || value === null || value === "") {
            setTokenState(null);
            localStorage.removeItem("token");
            console.log('[UserProvider] Token eliminado de localStorage');
        } else {
            setTokenState(value);
            localStorage.setItem("token", value);
            console.log('[UserProvider] Token guardado en localStorage:', value);
        }
    };

    const setUser = (value) => {
        console.log('[UserProvider] setUser llamado con:', value);
        if (value === undefined || value === null) {
            setUserState(null);
            localStorage.removeItem("user");
            console.log('[UserProvider] Usuario eliminado de localStorage');
        } else {
            setUserState(value);
            localStorage.setItem("user", JSON.stringify(value));
            console.log('[UserProvider] Usuario guardado en localStorage:', value);
        }
    };

    return (
        <UserContext.Provider value={{ token: tokenState, setToken, user: userState, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;