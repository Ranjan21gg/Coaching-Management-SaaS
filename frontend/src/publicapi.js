import axios from "axios";

const publicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies
});

export default publicAPI;