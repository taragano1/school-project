const express = require("express");
const {
 selectPasswordById, 
} = require("../../dal/queries/selectPasswordById");
const {
  insertPassword, // פונקציה להוספת סיסמאות
} = require("../../dal/queries/insertPassword");
const app = express.Router();


// GET schedule by ID
app.get("/password/:id", (req, res) => {
    const passwordId = req.params.id;
    selectPasswordById(passwordId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "password not found" });
      }
      res.json(results[0]);
    });
  });

  // POST - הוספת סיסמא חדשה
app.post("/passwords", (req, res) => {
  const { userId, password } = req.body;
  insertPassword(userId, password, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database insertion error" });
    }
    res.status(201).json({ message: "Password added successfully" });
  });
});

module.exports = app;