import { useState } from "react";
import bcryptt from 'bcryptjs';
import api from "../api";
import '../pages/Login.css';



export default function Login () {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const handleLogin = async () => {
        const { data } = await api.post('/api/auth/login', {
            email,password
        });

        localStorage.setItem('token', data.token);
        alert("נרשמת בהצלחה");

    };


    return (
        <div className="container-login">
            <h2 className="text">התחברות</h2>
            <input
            type="email"
            name="email"
            placeholder="מייל"
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="סיסמא"
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button onClick={handleLogin}>התחבר</button>
        </div>
    );

}



