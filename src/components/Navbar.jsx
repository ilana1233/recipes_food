import { Link } from "react-router-dom";
import './Navbar.css';


export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/recipe">מתכונים</Link>
            <Link to="/addRecipes">הוסף מתכון</Link>

            <Link to="/login">התחבר</Link>
            <Link to="/register">הרשמה</Link>
            
        </nav>
    );
}


