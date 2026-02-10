import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest, registerRequest } from "../services/api";

const AuthContext = createContext(null);

const readJSON = (key) => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [user, setUser] = useState(() => readJSON("user"));

    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    const login = async (email, password) => {
        const data = await loginRequest({ email, password });
        if (data?.token) setToken(data.token);
        if (data?.user) setUser(data.user);
        return data;
    };

    const register = async (name, email, password) => {
        const data = await registerRequest({ name, email, password });
        if (data?.token) setToken(data.token);
        if (data?.user) setUser(data.user);
        return data;
    };

    const logout = () => {
        setToken("");
        setUser(null);
    };

    const value = useMemo(() => ({ token, user, login, register, logout }), [token, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);