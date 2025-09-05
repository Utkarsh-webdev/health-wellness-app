import axios from "axios";

console.log("API Base URL:", import.meta.env.VITE_API_URL); // ✅ Debug log

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ use env variable
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("healthSyncUser");
  if (raw) {
    const user = JSON.parse(raw);
    if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
