const express = require("express");
const {selectAllGendersByName } = require("../../dal/queries/Q_gender");
const app = express.Router();

app.get("/genders/names", (req, res) => {
  console.log("hi");
  selectAllGendersByName((err, results) => {
      if (err) {
          return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
  });
});


app.get("/genders", (req, res) => {
  selectAllGenders((err, results) => {
      if (err) {
          return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
  });
});

  module.exports = app;