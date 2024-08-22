const { query } = require("express");
const connection = require("../../bl/connectToDB");

//INSERT

function insertStudent(id , clas,specialization_id,func) {
  connection.query(
    `INSERT INTO student ( id ,class, specialization_id ) VALUES (?, ?,?)`,
    [id , clas , specialization_id],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}

//SELECT

function selectStudent(func) {
    let query = `SELECT * FROM student`;
    connection.query(query,(err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
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