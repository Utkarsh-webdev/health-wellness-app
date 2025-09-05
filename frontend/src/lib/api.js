import axios from "axios";


console.log("👉 API baseURL (from env) =", import.meta.env.VITE_API_URL);
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // should be https://health-wellness-app.onrender.com
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
