//const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

function insertPassword(id, password_hash) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO passwords (id, password_hash) VALUES (?, ?)`,
      [id, password_hash],
      (err, result) => {
        if (err) {
          console.log("Error inserting password:", err);
          reject(err); // במקרה של שגיאה, ההבטחה תידחה עם השגיאה
        } else {
          console.log("Password inserted with ID:", result.insertId);
          resolve(result.insertId); // במקרה של הצלחה, ההבטחה תתקבל עם ה-ID שנוסף
        }
      }
    );
  });
}



//SELECT

function selectPassword(func) {
    let query = `SELECT * FROM passwords`;
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