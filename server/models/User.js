
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String,require:true, unique: true },
  password: { type: String, require: true},
  phone: String
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await
     bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model('User', userSchema);



