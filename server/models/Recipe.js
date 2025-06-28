
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: String,
  //כאן נשמור שם הקובץ
  
  ingredients: String,
  instructions: String,
}, {
  timestamps: true //מוסיף עדכון תאריך \יצירה אוטומטי
});



module.exports = mongoose.models('Recipes', recipeSchema);


