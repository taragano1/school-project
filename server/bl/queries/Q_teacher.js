const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

function insertTeacher(id , resume, specialization , subject ,func) {
  connection.query(
    `INSERT INTO teacher ( id , resume, specialization , subject ) VALUES (?, ?,?,?)`,
    [id , resume, specialization , subject],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}

//SELECT

function selectAllTeacher(func) {
    let query = `SELECT * FROM teacher`;
    connection.query(query,(err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }

  
//SELECT PART OF TEACHER BY ID

function selectTeacherById( id, func) {
    let query = `SELECT * FROM teacher WHERE id=?`;
   connection.query(query, [id], (err, results) => {
     if (err) {
       return func(err);
     }
     func(null, results);
   });
 }
  
  //UPDATE

function updateTeacher(id, columnName, newData, func) {
    connection.query(
   
      `UPDATE teacher SET ${columnName} = ? WHERE id = ?`,
      [newData, id],
      (err, result) => {
        if (err) return func(err);
        func(null, result.affectedRows);
      }
    );
  }
  
  //DELETE
  
  function deleteTeacher( id, func) {
    connection.query(
      `DELETE FROM teacher WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return func(err);
        }
        func(null, result.affectedRows);
      }
    );
  }

  module.exports = {
    insertTeacher,
    selectAllTeacher,
    selectTeacherById,
    updateTeacher,
    deleteTeacher
  };