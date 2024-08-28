const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

function insertTeacher(id, resume, specialization) {
  console.log(specialization+"q")
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO teacher (id, resume, specialization) VALUES (?, ?, ?)`,
      [id, resume, specialization],
      (err, result) => {
        if (err) {
          console.log("Error inserting teacher:", err);
          reject(err); // במקרה של שגיאה, ההבטחה תידחה עם השגיאה
        } else {
          console.log("Teacher inserted with ID:", result.insertId);
          resolve(result.insertId); // במקרה של הצלחה, ההבטחה תתקבל עם ה-ID שנוסף
        }
      }
    );
  });
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