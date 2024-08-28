const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

function insertStudent(id, clas, specialization_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO student (id, class, specialization_id) VALUES (?, ?, ?)`,
      [id, clas, specialization_id],
      (err, result) => {
        if (err) {
          console.log("Error inserting student:", err);
          reject(err); // במקרה של שגיאה, ההבטחה תידחה עם השגיאה
        } else {
          console.log("Student inserted with ID:", result.id);
          resolve(result.insertId); // במקרה של הצלחה, ההבטחה תתקבל עם ה-ID שנוסף
        }
      }
    );
  });
}


//SELECT

function selectStudent() {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM student`;
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err); // דחיית ה-Promise במקרה של שגיאה
      }
      resolve(results); // החזרת התוצאה במקרה של הצלחה
    });
  });
}



  
//SELECT PART OF STUDENT BY ID

function selectStudentById( id, func) {
    let query = `SELECT * FROM student WHERE id=?`;
   connection.query(query, [id], (err, results) => {
     if (err) {
       return func(err);
     }
     func(null, results);
   });
 }
  
  //UPDATE

function updateStudent(id, columnName, newData, func) {
    connection.query(
   
      `UPDATE student SET ${columnName} = ? WHERE id = ?`,
      [newData, id],
      (err, result) => {
        if (err) return func(err);
        func(null, result.affectedRows);
      }
    );
  }
  
  //DELETE
  
  function deleteStudent( id, func) {
    connection.query(
      // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      `DELETE FROM student WHERE id = ?`,
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
    insertStudent,
    selectStudent,
    selectStudentById,
    updateStudent,
    deleteStudent
  };