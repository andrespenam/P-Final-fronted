import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(); 
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) setUser(loggedUser);
    }, []);

    const login = (userData) => {
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("loggedUser");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
