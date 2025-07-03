const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./Routes/authRoutes');
const recipeRoutes = require('./Routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin:"http://recipe-food-yvy7.onrender.com",
    credentials: true
}));
// app.options('*', cors());

app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes); // 👈 זה מנהל הכל (get, post וכו')

// Static file serving (React)
app.use(express.static(path.join(__dirname, 'build')));

// SPA fallback (React routing)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
