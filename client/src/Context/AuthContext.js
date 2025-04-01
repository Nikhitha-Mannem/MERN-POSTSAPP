import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthorized: false,
        username: "",
    });

    useEffect(() => {
        const accessKey = localStorage.getItem("accessKey");
        const username = localStorage.getItem("username");

        if (accessKey) {
            setAuthState({ isAuthorized: true, username: username || "" });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
}
