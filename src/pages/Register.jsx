
import { useState } from "react";
import api from "../api";
import './Register.css';

export default function Register() {
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, 
        [e.target.name]: e.target.value});
    };
    

    const handleRegister = async () => {
       
        try {
            await api.post(`/auth/register`, formData);
             
            alert("נרשמת בהצלחה כעת אפשר להתחבר");
         } catch (error) {
            console.error('שגיאה בהרשמה',error);
            alert("שגיאה בהרשמה")
        }
    };

    return (
        <div className="container-register">
            <h2>הרשמה</h2>
            <input
            type="text"
            name="name"
            placeholder="שם"
            onChange={handleChange}
            required
            />
            <input
            type="text"
            name="phone"
            placeholder="טלפון"
            onChange={handleChange}
            required
            />
            <input
            type="email"
            name="email"
            placeholder="אימייל"
            onChange={handleChange}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="סיסמא"
            onChange={handleChange}
            required
            />
            <button onClick={handleRegister}>הרשם</button>
        </div>
    );
}

