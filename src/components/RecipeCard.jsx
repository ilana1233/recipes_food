import React from "react";
import {  Link } from "react-router-dom";
import './RecipeCard.css';

export default function RecipeCard
({ recipe,onDelete,onEdit }) {
    
    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            {recipe.imageUrl && (
            <img src={`http://localhost:5000/api/uploads/${recipe.imageUrl}`}
            alt={recipe.title}
            width="200"
            />
            )}
            <p><strong>תיאור:</strong>
            {recipe.description}</p>

            <Link to={`/recipes/${recipe._id}`}
            className="details-button">לפרטים</Link>

            <button onClick={() => onEdit(recipe)}
            className="edit-button">ערוך</button>
            <button onClick={() => onDelete(recipe._id)}
            className="delete-button">מחק</button>

            
        </div>
        
    );
}
