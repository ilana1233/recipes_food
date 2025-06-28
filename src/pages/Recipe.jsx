import { useState, useEffect } from "react";
import axios from "axios";
import './Recipe.css';
import { useNavigate } from "react-router-dom";
import RecipeCard from '../components/RecipeCard.jsx';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    fetchRecipes();
    //console.log('recipe',recipes);
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes");
      const data = Array.isArray(res.data) ? res.data : [];
      setRecipes(data);
    } catch (err) {
      console.error("שגיאה בטעינת מתכונים", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("את בטוחה שתרצי למחוק את המתכון?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      alert("שגיאה במחיקת מתכון");
    }
  };

  const handleEdit = (recipe) => {
    navigate(`/edit/${recipe._id}`);
  };

  const filteredRecipes = recipes.filter((r) =>
    r.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipes-page">
      <h2>רשימת מתכונים</h2>
      <input
        type="text"
        placeholder="חיפוש לפי כותרת..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((r) => (
            <div className="recipe-card" key={r._id}>
              <RecipeCard 
              key={r._id}
              recipe={r}
              onDelete={handleDelete}
              onEdit={handleEdit}
              />

              <h3>{r.title}</h3>
              {r.imageUrl && (
                <img
                  src={`http://localhost:5000/uploads/${r.imageUrl}`}
                  alt="recipe"
                  width="200"
                />
              )}
              {/* <p><strong>תיאור:</strong> 
              {r.description}</p>

              <p><strong>מצרכים:</strong> 
              {r.ingredients}</p>

              <p><strong>הוראות הכנה:</strong>
               {r.instructions}</p>

              <button onClick={() => handleDelete(r._id)} className="delete-button">מחק</button>

              <button onClick={() => handleEdit(r)} className="edit-button">ערוך</button> */}
            </div>
          ))
        ) : (
          <p>לא נמצאו מתכונים תואמים</p>
        )}
      </div>
    </div>
    );
}


