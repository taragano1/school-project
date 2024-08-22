const express = require('express');
const { selectGenderByName, selectAllGenders, insertGender } = require("../../bl/queries/Q_gender");
const app = express.Router();

app.use(express.json());

// GET request לקבלת גנדר לפי שם
app.get('/genders/names', (req, res) => {
  console.log('hi');
  selectGenderByName((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// GET request לקבלת כל הגנדרים
app.get('/genders', (req, res) => {
  selectAllGenders((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// POST request להוספת גנדר חדש
app.post('/genders', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  insertGender(name, (err, insertId) => {
    if (err) {
      return res.status(500).json({ error: 'Database insert error' });
    }
    res.status(201).json({ id: insertId, name });
  });
});

module.exports = app;
