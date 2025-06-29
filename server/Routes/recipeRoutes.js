
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const multer = require('multer');
const path = require('path');

// הגדרת אחסון לקבצים
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ יצירת מתכון חדש
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const imageUrl = req.file ? req.file.filename : '';
    
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      imageUrl
    });

    await recipe.save(); // ✅ תוקן
    res.status(201).json({ message: 'המתכון נוסף בהצלחה', recipe });
  } catch (error) {
    console.error('שגיאה בהוספת מתכון:', error);
    res.status(500).json({ message: 'שגיאה בהוספת מתכון' });
  }
});

// ✅ שליפת כל המתכונים
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error('שגיאה בטעינת מתכונים:', error);
    res.status(500).json({ message: 'שגיאה בטעינת מתכונים' });
  }
});

// // ✅ שליפת מתכון לפי מזהה
// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) return res.status(404).json({ message: 'לא נמצא מתכון' });
//     res.json(recipe);
//   } catch (error) {
//     console.error('שגיאה בטעינת מתכון בודד:', error);
//     res.status(500).json({ message: 'שגיאה בטעינת מתכון בודד' });
//   }
// });

// ✅ מחיקת מתכון
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'המתכון נמחק' });
  } catch (error) {
    console.error('שגיאה במחיקת מתכון:', error);
    res.status(500).json({ message: 'שגיאה במחיקת מתכון' });
  }
});

// ✅ עדכון מתכון קיים
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const imageUrl = req.file ? req.file.filename : '';

    const updatedFields = {
      title,
      description,
      ingredients,
      instructions
    };
    if (imageUrl) updatedFields.imageUrl = imageUrl;

    const updated = await Recipe.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json({ message: 'המתכון עודכן בהצלחה', recipe: updated });
  } catch (error) {
    console.error('שגיאה בעדכון מתכון:', error);
    res.status(500).json({ message: 'שגיאה בעדכון מתכון' });
  }
});

module.exports = router;
