// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://recipe-food-yvy7.onrender.com//api",
});

export default api;