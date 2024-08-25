const express = require("express");
const { selectSubject } = require("../../bl/queries/Q_subject");
const app = express.Router();

app.get("/api/subjects", (req, res) => {
    selectSubject((err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });
  });