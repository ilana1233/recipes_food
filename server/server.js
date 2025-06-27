
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ilana221eilat:Aa1234567@cluster0.mtgqysu.mongodb.net')
.then(() => console.log('connect to mongo!'))
.catch(err => console.error('שגיאה בחיבור למונגו:', err));
  

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(patch.join(__dirname, '../client/build')));


app.listen(5000, () => {
  console.log('🔥 Server running on http://localhost:5000');
});

