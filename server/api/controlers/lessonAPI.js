const express = require("express");
const app = express.Router();
const { selectLessonById, selectAllLessons, selectLessonByTeacher, insertLesson, updateLesson, deleteLesson  } = require("../../dal/queries/Q_lesson");

app.get("/lesson/:id", (req, res) => {
  const lessonId = req.params.id;
  selectLessonById(lessonId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
     res.json(results);
  });
});

app.get("/lessons", (req, res) => {
  selectAllLessons((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    
    res.json(results);
  });
});

app.get("/lesson/:teacher", (req, res) => {
    const lessonId = req.params.id_teacher;
      selectLessonByTeacher(lessonId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
    });
});

app.post("/lesson", (req, res) => {
    const { id_teacher, id_subject, id_student, rating, feedback, date, hour } = req.body;
    insertLesson(id_teacher, id_subject, id_student, rating, feedback, date, hour, (err, insertId) => {
      if (err) {
        return res.status(500).json({ error: "Database insert error" });
      }
      res.json({ id: insertId });
    });
  });

  app.put("/lesson/:id", (req, res) => {
    const lessonId = req.params.id; // Extract lesson ID from URL parameter
    const { columnName, newData } = req.body; // Extract columnName and newData from request body
  
    // Call updateLesson function to update lesson data in the database
    updateLesson(lessonId, columnName, newData, (err, affectedRows) => {
      if (err) {
        // Handle database update error
        return res.status(500).json({ error: "Database update error" });
      }
      
      // If update is successful, return the number of affected rows
      res.json({ affectedRows });
    });
  });

  app.delete("/lesson/:id", (req, res) => {
    const lessonId = req.params.id; // Extract lesson ID from URL parameter
  
    // Call deleteLesson function to delete the lesson from the database
    deleteLesson(lessonId, (err, affectedRows) => {
      if (err) {
        // Handle database delete error
        return res.status(500).json({ error: "Database delete error" });
      }
      
      // If delete is successful, return the number of affected rows
      res.json({ affectedRows });
    });
  });
module.exports = app;