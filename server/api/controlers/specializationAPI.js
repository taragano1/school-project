const express = require("express");
const { insertSpecialization } = require("../../bl/queries/Q_specialization");
const app = express.Router();


app.post("/specializations", (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
  
    insertSpecialization(name, (err, insertId) => {
      if (err) {
        console.error("Error inserting specialization:", err);
        return res.status(500).json({ error: "Database insert error" });
      }
      res.status(201).json({ id: insertId, name });
    });
  });

  module.exports = app;