import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // baseURL: "http://127.0.0.1:8000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");

  // attach token ONLY if exists
 if (token && !req.url.includes("login")) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
export default API;

