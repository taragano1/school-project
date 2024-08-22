const { log } = require("console");
const { query } = require("express");
const connection = require("../../bl/connectToDB");

//INSERT
function insertUsers(id, fname, lname, email, phone, city, birthday, address, gender_id, func) {
  connection.query(
    `INSERT INTO users (id, fname, lname, email, phone, city, birthday, address, gender_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, fname, lname, email, phone, city, birthday, address, gender_id],
    (err, result) => {
      if (err) {
        console.log(id);
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}


//SELECT

function selectUsers(func) {
  let query = `SELECT * FROM users`;
  connection.query(query,(err, results) => {
    if (err) {
      return func(err);
    }
    func(null, results);
  });
}


//SELECT  BY ID
function selectUsersById(id, func) {
  let query = `SELECT * FROM users WHERE id=?`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      return func(err);
    }
    func(null, results);
  });
}

//SELECT  BY CITY

function selectUsersByCity( city, func) {
  let query = `SELECT * FROM users WHERE city=?`;
 connection.query(query, [city], (err, results) => {
   if (err) {
     return func(err);
   }
   func(null, results);
 });
}

//SELECT  BY GENDER

function selectUsersByGender( gender_id, func) {
  let query = `SELECT * FROM users WHERE gender_id=?`;
 connection.query(query, [gender_id], (err, results) => {
   if (err) {
     return func(err);
   }
   func(null, results);
 });
}

//SELECT  BY CITY

function selectUsersByEmail( mail, func) {
  let query = `SELECT * FROM users WHERE email=?`;
 connection.query(query, [mail], (err, results) => {
   if (err) {
     return func(err);
   }
   func(null, results);
 });
}


//UPDATE
function updateUser(id, columnName, newData, func) {
  connection.query(
    `UPDATE users SET ${columnName} = ? WHERE id = ?`,
    [newData, id],
    (err, result) => {
      if (err) return func(err);
      func(null, result.affectedRows);
    }
  );
}

//DELETE

function deleteUser( id, func) {
  connection.query(
    `DELETE FROM users WHERE id = ?`,
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
  insertUsers,
  selectUsers,
  selectUsersById,
  selectUsersByCity,
  selectUsersByCity,
  selectUsersByGender,
  selectUsersByEmail,
  updateUser,
  deleteUser
};