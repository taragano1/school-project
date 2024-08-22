const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

function insertSubject( subject ,func) {
  connection.query(
    `INSERT INTO subject (  subject ) VALUES ( ?)`,
    [ subject],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}

//SELECT

function selectSubject(func) {
    let query = `SELECT * FROM subject`;
    connection.query(query,(err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }
  
  //UPDATE

function updateSubject(id, columnName, newData, func) {
    connection.query(
   
      `UPDATE subject SET ${columnName} = ? WHERE id = ?`,
      [newData, id],
      (err, result) => {
        if (err) return func(err);
        func(null, result.affectedRows);
      }
    );
  }
  
  //DELETE
  
  function deleteSubject( id, func) {
    connection.query(
      // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      `DELETE FROM subject WHERE id = ?`,
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
    insertSubject,
    selectSubject,
    updateSubject,
    deleteSubject
  };