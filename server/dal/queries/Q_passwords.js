const { query } = require("express");
const connection = require("../../bl/connectToDB");

//INSERT

function insertPassword( subject ,func) {
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

function selectPassword(func) {
    let query = `SELECT * FROM subject`;
    connection.query(query,(err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }


  function selectPasswordById( id, func) {
    let query = `SELECT * FROM passwords WHERE id=?`;
   connection.query(query, [id], (err, results) => {
     if (err) {
       return func(err);
     }
     func(null, results);
   });
 }
  
  //UPDATE

function updatePassword(id, columnName, newData, func) {
    connection.query(
   
      `UPDATE passwords SET ${columnName} = ? WHERE id = ?`,
      [newData, id],
      (err, result) => {
        if (err) return func(err);
        func(null, result.affectedRows);
      }
    );
  }
  
  //DELETE
  
  function deletePassword( id, func) {
    connection.query(
      `DELETE FROM passwords WHERE id = ?`,
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
    insertPassword,
    selectPassword,
    selectPasswordById,
    updatePassword,
    deletePassword
  };