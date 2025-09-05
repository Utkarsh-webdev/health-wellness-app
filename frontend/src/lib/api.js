import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ env से ले रहा है
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
