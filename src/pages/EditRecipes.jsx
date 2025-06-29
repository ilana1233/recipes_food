
import { useState, useEffect } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import './EditRecipes.css';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    api.get(`/api/recipes/${id}`)
      .then(res => setForm(res.data))
      .catch(err => alert('שגיאה בטעינת מתכון'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/recipes/${id}`, form);
      alert('המתכון עודכן בהצלחה');
      navigate('/recipes');
    } catch (err) {
      alert('שגיאה בעדכון');
    }
  };

  return (
    <div className="edit-recipe-container">
      <h2>עריכת מתכון</h2>
      <input name="title" value={FormData.title} onChange={handleChange} placeholder="כותרת" />
      <textarea name="description" value={FormData.description} onChange={handleChange} placeholder="תיאור" />
      <textarea name="ingredients" value={FormData.ingredients} onChange={handleChange} placeholder="מצרכים" />
      <textarea name="instructions" value={FormData.instructions} onChange={handleChange} placeholder="הוראות" />
      <button onClick={handleSave}>שמור</button>
    </div>
  );
}


