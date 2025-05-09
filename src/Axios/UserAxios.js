// userAxios.js
import axios from "axios";

const userAxios = axios.create({
  baseURL: "https://swiftbus-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

userAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default userAxios;
