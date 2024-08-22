const express = require("express");
const {
  insertTeacher,
  selectAllTeacher,
  selectTeacherById,
  updateTeacher,
  deleteTeacher
} = require("../../bl/queries/Q_teacher");
const { deleteLessonByTeacher } = require("../../bl/queries/Q_lesson");
const { deleteUser}= require("../../bl/queries/Q_users");
const { deletePassword } = require("../../bl/queries/Q_passwords");

const app = express.Router();

// GET all teachers
app.get("/teachers", (req, res) => {
  selectAllTeacher((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// GET teacher by ID
app.get("/teachers/:id", (req, res) => {
  const teacherId = req.params.id;
  selectTeacherById(teacherId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(results[0]); // Assuming selectTeacherById returns an array with one teacher object
  });
});

// POST new teacher
app.post("/teachers", (req, res) => {
  const { id, resume, specialization, subject } = req.body;
  insertTeacher(id, resume, specialization, subject, (err, insertId) => {
    if (err) {
      return res.status(500).json({ error: "Database insert error" });
    }
    res.json({ id: insertId });
  });
});

// PUT update teacher
app.put("/teachers/:id", (req, res) => {
  const teacherId = req.params.id;
  const { columnName, newData } = req.body;
  updateTeacher(teacherId, columnName, newData, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Database update error" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Teacher not found or no changes applied" });
    }
    res.json({ affectedRows });
  });
});

// DELETE teacher
app.delete("/teachers/:id", (req, res) => {
    const teacherId = req.params.id;
  
    // First delete all lessons associated with the teacher
    deleteLessonByTeacher(teacherId, (err, affectedRowsLessons) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting lessons" });
      }
  
      // Now delete the teacher itself along with associated records
      deleteTeacher(teacherId, (err, affectedRowsTeacher) => {
        if (err) {
          return res.status(500).json({ error: "Database delete error" });
        }
  
        // Delete user record associated with the teacher
        deleteUser(teacherId, (err, affectedRowsUser) => {
          if (err) {
            return res.status(500).json({ error: "Database delete error" });
          }
  
          // Delete password record associated with the teacher
          deletePassword(teacherId, (err, affectedRowsPasswords) => {
            if (err) {
              return res.status(500).json({ error: "Database delete error" });
            }
  
            // Calculate total affected rows
            const totalAffectedRows =
              affectedRowsLessons +
              affectedRowsTeacher +
              affectedRowsUser +
              affectedRowsPasswords;
  
            if (totalAffectedRows === 0) {
              return res.status(404).json({ error: "Teacher not found" });
            }
  
            res.json({ affectedRows: totalAffectedRows });
          });
        });
      });
    });
  });
module.exports = app;
