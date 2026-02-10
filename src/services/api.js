const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

const parseBody = async (res) => {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

const getErrorMessage = (data, status) => {
    if (data && typeof data === "object" && data.message) return data.message;
    if (typeof data === "string" && data) return data;
    return `API ${status}`;
};

export async function request(path, options = {}) {
    const token = getToken();

    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    const data = await parseBody(res);

    if (!res.ok) {
        throw new Error(getErrorMessage(data, res.status));
    }

    return data;
}

export const getProducts = () => request("/products", { method: "GET" });
export const getFeaturedProducts = () => request("/products/featured", { method: "GET" });

export const createOrder = (payload) =>
    request("/orders", { method: "POST", body: JSON.stringify(payload) });

export const loginRequest = (payload) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(payload) });

export const registerRequest = (payload) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(payload) });