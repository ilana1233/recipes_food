import { useState } from "react";
import axios from "axios";
import './AddRecipes.css';

export default function AddRecipes() {
    const [title,setTitle] = useState('');
    const [ingredients,setIngredients] = useState('');
    const [instructions,setInstructions] = useState('');
    const [description,setDescription] = useState('');
    const [image,setImage] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        formData.append('image', image);

        try  {
            await
             axios.post('http://localhost:5000/api/recipes',formData,{
                headers: {
                    'Content-Type': 'multipart/formData',
                    'Authorization':`Bearar ${localStorage.getItem('token')}`
                }
            });
            alert('המתכון נוסף בהצלחה');
            setTitle('');
            setDescription('');
            setIngredients('');
            setInstructions('');
            setImage(null);
        } catch (err) {
            alert('שגיאת בהוספת מתכון');
        }
    };

    return (
        <div className="add-recipe-container">
            <h2>הוספת מתכון</h2>
            <input placeholder="כותרת"
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>

            <textarea placeholder="תיאור"
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>

            <textarea
            placeholder="מצרכים"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            />

            <textarea
            placeholder="הוראות הכנה"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            />

            <input type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}/>

            <button onClick={handleSubmit}>שמור</button>
        </div>
    );
}

