const express = require("express");
const {
 selectPasswordById
} = require("../../dal/queries/selectPasswordById");

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

  
module.exports = app;