import { Link } from "react-router-dom";
import './Navbar.css';
import './RecipeCard.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">מתכונים</Link>
            <Link to="/addRecipes">הוסף מתכון</Link>

            <Link to="/login">התחבר</Link>
            <Link to="/register">הרשמה</Link>

            <Link to={"/recipe"}>צפה במתכון</Link>
            
        </nav>
    );
}


