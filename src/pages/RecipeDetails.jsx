import { useState, useEffect } from "react";
import { Navigate, useParams } from 'react-router-dom';
import api from "../api";
import { FacebookShareButton, 
         WhatsappShareButton,
        FacebookIcon,
        WhatsappIcon,}
     from 'react-share';
import './RecipeDetails.css';


    export default function RecipeDetails(){
        const { id } = useParams();
        const [recipe, setRecipe] = useState(null);

        // const pageUrl = `https://recipes-food-i2xb.onrender.com/addRecipes${id}`;

        useEffect(() => {
            const fetchRecipes = async () => {
                try {
                    const res = await
            api.get(`/recipes/${id}`);
                    setRecipe(res.data);
                } catch(err) {
                    console.error('שגיאה באעינת מתכון:',err);
                }  
            }; 

        fetchRecipes();
         }, [id]);

        if (!recipe)  return  <p>טוען מתכון...</p>;
    
        return (
            <div className="recipe-details">
                <h2>{recipe.title}</h2>
                 {recipe.imageUrl && (
                    <img src={`http://localhost:5000/uploads/${recipe.pageUrl}`}
                    alt={recipe.title}
                    width="300"
                    /> 
                 )}
                <p><strong>תיאור:</strong>
                {recipe.description}</p>

                <p><strong>מצרכים:</strong>
                {recipe.ingredients}</p>
                <ul>
                    {recipe.ingredients?.split('.').map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
                </ul>

                <p><strong>הוראות הכנה:</strong>
                {recipe.instructions}</p>

                <button onClick={() => Navigate('/recipes')} className="back-button">חזור לרשימת המתכונים</button>

                <div className="share-button">
                     <h4>שיתוף מתכון:</h4>
                    { <FacebookShareButton  quote={recipe.title}>
                        <FacebookIcon size={40} round />
                    </FacebookShareButton> }

                    { <WhatsappShareButton  quote={recipe.title}>
                        <WhatsappIcon size={40} round />
                    </WhatsappShareButton> } 
                 </div>
                </div>
        );
    }

