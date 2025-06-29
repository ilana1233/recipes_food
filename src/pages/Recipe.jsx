import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ודאי ש־api מוגדר עם baseURL
import './Recipe.css';
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await api.get('/recipes'); // שולח ל־/api/recipes דרך api.js
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
      await api.delete(`/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
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
            <RecipeCard
              key={r._id}
              recipe={r}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>לא נמצאו מתכונים תואמים</p>
        )}
      </div>
    </div>
  );
}
