import axios from "axios";

const API = axios.create({
  baseURL: "baseURL: import.meta.env.VITE_API_URL",
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

