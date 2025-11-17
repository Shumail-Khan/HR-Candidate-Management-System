import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // change if needed
    timeout: 10000
});

// attach token automatically
api.interceptors.request.use(cfg => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) cfg.headers.Authorization = `Bearer ${user.token}`;
    return cfg;
}, err => Promise.reject(err));

export default api;