const express = require("express");
const app = express.Router();
const { selectLessonById, selectAllLessons, selectLessonByTeacher, insertLesson, updateLesson, deleteLesson  } = require("../../bl/queries/Q_lesson");

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

app.get("/lessons/teacher/:id_teacher", async (req, res) => {
  const id_teacher = req.params.id_teacher;
  try {
    const results = await selectLessonByTeacher(id_teacher);
    res.json(results); // שליחת התוצאה ללקוח
  } catch (error) {
    res.status(500).json({ error: "Database query error" }); // טיפול בשגיאה
  }
});


app.post("/lesson", async (req, res) => {
  const { id_teacher, id_subject, id_student, rating, feedback, date, hour } = req.body;
  
  try {
    const insertId = await insertLesson(id_teacher, id_subject, id_student, rating, feedback, date, hour);
    res.json({ id: insertId });
  } catch (error) {
    res.status(500).json({ error: "Database insert error" });
  }
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

  app.put("/lesson/:id/feedback", (req, res) => {
    const lessonId = req.params.id;
    const { feedback } = req.body;
  
    updateFeedback(lessonId, feedback, (err, affectedRows) => {
      if (err) {
        return res.status(500).json({ error: "Database update error" });
      }
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
