import React from "react";
import { useNavigate } from "react-router-dom";
import './RecipeCard.css';

export default function RecipeCard({ recipe,onDelete,onEdit }) {
    const navigate = useNavigate();

    const handleDetails = () => {
        navigate(`/recipes/${recipe._id}`);
    };

    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            {recipe.imageUrl && (
            <img src={`http://localhost:5000/uploads/${recipe.imageUrl}`}
            alt={recipe.title}
            width="200"
            />
            )}
            <p><strong>תיאור:</strong>
            {recipe.description}</p>
            <button onClick={handleDetails}>לפרטים</button>
            <button onClick={() => onEdit(recipe)}
            className="edit-button">ערוך</button>
            <button onClick={() => onDelete(recipe._id)}
            className="delete-button">מחק</button>
        </div>
    );
}
