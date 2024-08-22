const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT
function insertGender(name ,func) {
    connection.query(
      `INSERT INTO gender (name) VALUES (?)`,
      [name],
      (err, result) => {
        if (err) {
          return func(err);
        }
        func(null, result.insertId);
      }
    );
  }

  //SELECT
function selectAllGenders(func) {
    let query = `SELECT * FROM gender`;
    connection.query(query,(err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }

  function selectGenderById(id, func) {
    let query =`SELECT * FROM ${tableName} WHERE id=?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }

  function selectGenderByName(name, func) {
    let query =`SELECT * FROM gender WHERE name=?`;
    connection.query(query, [name], (err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }

//UPDATE
//זה זהה לעידכון של משתמשים
function updateGender(id, columnName, newData, func) {
    connection.query(
   
      `UPDATE gender SET ${columnName} = ? WHERE id = ?`,
      [newData, id],
      (err, result) => {
        if (err) return func(err);
        func(null, result.affectedRows);
      }
    );
  }

  //DELETE
  function deleteGender(tableName, columnName, value, func) {
    connection.query(
      // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      `DELETE FROM ${tableName} WHERE ${columnName} = ?`,
      [value],
      (err, result) => {
        if (err) {
          return func(err);
        }
        func(null, result.affectedRows);
      }
    );
  }
  
  module.exports = {
    deleteGender,
    updateGender,
    selectAllGenders,
    selectGenderById,
    selectGenderByName,
    insertGender
  };