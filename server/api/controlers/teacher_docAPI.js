const express = require("express");

const {
    insertDocument, // פונקציה להוספת סיסמאות
} = require("../../bl/queries/Q_teacher_doc");
const app = express.Router();



  // POST - הוספת סיסמא חדשה
app.post("/teacher_doc", (req, res) => {
  const { userId, document } = req.body;
  insertDocument(userId, document, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database insertion error" });
    }
    res.status(201).json({ message: "Password added successfully" });
  });
});

module.exports = app;