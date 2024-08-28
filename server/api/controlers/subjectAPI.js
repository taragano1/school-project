const express = require("express");
const { selectSubject } = require("../../bl/queries/Q_subject");
const app = express.Router();

app.get("/subjects", async (req, res) => {
  try {
    const results = await selectSubject();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Database query error" });
  }
});

  app.post("/subjects", async (req, res) => {
    const { subject } = req.body; // קבלת המידע מהבקשה
    try {
      const insertId = await insertSubject(subject); // קריאה לפונקציה
      res.json({ id: insertId }); // שליחת ה-ID ללקוח
    } catch (error) {
      res.status(500).json({ error: "Database insertion error" }); // טיפול בשגיאה
    }
  });
  module.exports = app;