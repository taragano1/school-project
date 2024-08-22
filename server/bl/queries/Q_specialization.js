const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

function insertSpecialization( name ,func) {
  connection.query(
    `INSERT INTO specialization ( name ) VALUES ( ?)`,
    [ name],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}

//SELECT

function selectSpecialization(func) {
    let query = `SELECT * FROM specialization`;
    connection.query(query,(err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }
  
  //UPDATE

function updateSpecialization(id, columnName, newData, func) {
    connection.query(
   
      `UPDATE specialization SET ${columnName} = ? WHERE id = ?`,
      [newData, id],
      (err, result) => {
        if (err) return func(err);
        func(null, result.affectedRows);
      }
    );
  }
  
  //DELETE
  
  function deleteSpecialization( id, func) {
    connection.query(
      // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      `DELETE FROM specialization WHERE id = ?`,
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
    insertSpecialization,
    selectSpecialization,
    updateSpecialization,
    deleteSpecialization
  };