const express = require("express");
const {
 selectPasswordById, 
} = require("../../bl/queries/Q_passwords");
const {
  insertPassword, // פונקציה להוספת סיסמאות
} = require("../../bl/queries/Q_passwords");
const app = express.Router();
const saltRounds = 10; // קביעת מספר סיבובי ההצפנה
const bcrypt = require('bcrypt');

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
  app.post("/passwords", async (req, res) => {
    try {
      const { userId, password } = req.body;
      
      // ממתינים לסיום תהליך ההצפנה
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("api-hash: " + hashedPassword);
      
      // ממתינים לסיום תהליך הכנסת הסיסמה לטבלה
      await insertPassword(userId, hashedPassword);
      
      res.status(201).json({ message: "Password added successfully" });
    } catch (err) {
      console.error("Error during password insertion:", err);
      res.status(500).json({ error: "Database insertion error" });
    }
  });
  

module.exports = app;