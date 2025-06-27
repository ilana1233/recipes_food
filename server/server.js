
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifieldTopology: true,
}).then(() => console.log('connect to mongo!'))
.catch(err => console.error('שגיאה בחיבור למונגו:', err));

app.get('/', (req,res) => {
    res.send('Server is running');
});
  

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(patch.join(__dirname, '../client/build')));


app.listen(5000, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});

