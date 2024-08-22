const express = require("express");
const {
  insertStudent,
  selectStudent,
  selectStudentById,
  updateStudent,
  deleteStudent,
} = require("../../bl/queries/Q_student");
const {deleteLessonByStudent}=require("../../bl/queries/Q_lesson");
const {deletePassword}=require("../../bl/queries/Q_passwords");

const app = express.Router();

// GET all students
app.get("/students", (req, res) => {
  selectStudent((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

// GET student by ID
app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;
  selectStudentById(studentId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(results[0]);
  });
});

// POST new student
app.post("/students", (req, res) => {
  const { id, clas, specialization_id } = req.body;
  insertStudent(id, clas, specialization_id, (err, insertId) => {
    if (err) {
      return res.status(500).json({ error: "Database insert error" });
    }
    res.json({ id: insertId });
  });
});

// PUT update student
app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const { columnName, newData } = req.body;
  updateStudent(studentId, columnName, newData, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Database update error" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ affectedRows });
  });
});

// DELETE student
app.delete("/students/:id", (req, res) => {
    const studentId = req.params.id;
  
    // Delete lessons associated with the student
    deleteLessonByStudent(studentId, (err, affectedRowsLessons) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting lessons" });
      }
  
      // Delete student from the student table
      deleteStudent(studentId, (err, affectedRowsStudent) => {
        if (err) {
          return res.status(500).json({ error: "Database delete error" });
        }
        if (affectedRowsStudent === 0) {
          return res.status(404).json({ error: "Student not found" });
        }
  
        // Delete password associated with the student
        deletePassword(studentId, (err, affectedRowsPassword) => {
          if (err) {
            return res.status(500).json({ error: "Error deleting password" });
          }
  
          // Delete user associated with the student
          deleteUser(studentId, (err, affectedRowsUser) => {
            if (err) {
              return res.status(500).json({ error: "Error deleting user" });
            }
  
            // Calculate total affected rows
            const totalAffectedRows =
              affectedRowsLessons +
              affectedRowsStudent +
              affectedRowsPassword +
              affectedRowsUser;
  
            // Respond with the total affected rows
            res.json({ affectedRows: totalAffectedRows });
          });
        });
      });
    });
  });

module.exports = app;
