import axios from "axios";
// import loaderService from "./services/loaderService";

const privateAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default privateAPI;




// Request Interceptor
privateAPI.interceptors.request.use((config) => {

  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



// Response Interceptor
privateAPI.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);