
const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const bcrypt = require('bcryptjs');
console.log(bcrypt);
const cors = require('cors');

const path = require('path');
require('dotenv').config();

const authRoutes = require('./Routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
// const Router = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
 
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes); // 👈 הכרחי!

app.get('/api/recipes/:id', async (req,res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post('/api/recipe', async (req,res) => {
  const { title,ingredients,instructions } = req.body;
  if ( !title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Missing fields '});
  }

  try{
    const newRecipe = new Recipe({ title,ingredients,instructions });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:'Server error'});
  }
});

// Static files from React
app.use(express.static(path.join(__dirname, 'build')));

// For React SPA routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});


