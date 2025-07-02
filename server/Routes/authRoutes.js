const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 📝 רישום משתמש חדש
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // בדיקה אם קיים כבר משתמש עם אותו מייל
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).send({ message: 'המייל כבר קיים במערכת' });
    }

    const user = new User({ name, email, password, phone });
    await user.save();

    res.status(201).send({ message: 'נרשמת בהצלחה' });
  } catch (error) {
    console.error('שגיאה בהרשמה:', error);
    res.status(500).send({ message: 'שגיאה בשרת ההרשמה' });
  }
});

// 🔐 התחברות משתמש קיים
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // מציאת משתמש לפי אימייל
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'משתמש לא נמצא' });
    }

    // השוואת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'סיסמה שגויה' });
    }

    // יצירת טוקן
    const token = jwt.sign({ userId: user._id }, 'secretkey123', { expiresIn: '2h' });
    res.send({ message: 'התחברת בהצלחה', token });
  } catch (error) {
    console.error('שגיאה בהתחברות:', error);
    res.status(500).send({ message: 'שגיאה בשרת ההתחברות' });
  }
});

module.exports = router;

