import { useState, useEffect } from "react";
import { useParms } from 'react-router-dom';
import axios from 'axios';
import { FacebookShareButton, 
         WhatsappShareButton,
        FacebookIcon,
        WhatsappIcon,}
     from 'react-share';
import './RecipeDetails.css';


    export default function RecipeDetails(){
        const { id } = useParms();
        const [recipe, setRecipe] = useState(null);

        const pageUrl = `http:/ilana221eilat:Aa1234567@cluster0.mtgqysu.mongodb.net/${id}`;

        useEffect(() => {
            axios
            .get(`http://localhost:5000/api/recipes`)
            .then((res) => setRecipe(res.data))
            .catch((err) => console.error('שגיאה באעינת מתכון:',err));
        }, []);

        if (!recipe) return <p> טוען מתכון...</p>;
    
        return (
            <div className="recipe-details">
                <h2>{recipe.title}</h2>
                 {recipe.imageUrl && (
                    <img src={`http://localhost:5000/uploads/${recipe.imageUrl}`}
                    alt={recipe.title}
                    width="300"
                    /> 
                 )}
                <p><strong>תיאור:</strong>
                {recipe.description}</p>

                <p><strong>מצרכים:</strong>
                {recipe.ingredients}</p>

                <p><strong>הוראות הכנה:</strong>
                {recipe.instructions}</p>

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

