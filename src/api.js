import axios from "axios";

const api = axios.create({
    baseURL:
    process.env.REACT_APP_API_URL ||
    'https://recipes-food-i2xb.onrender.com/api',});

export default api;
