const { log } = require("console");
const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT
function insertUsers(id, fname, lname, email, phone, city, birthday, address, gender_id, typeOfUser, status, func = () => {}) {
  // בדיקה אם כל הנתונים הנדרשים קיימים
  if (!id || !fname || !lname || !email || !phone || !city || !birthday || !address || !gender_id || typeOfUser === undefined || status === undefined) {
    return func(new Error("All fields are required"));
  }

  // הכנסת הנתונים לטבלה
  connection.query(
    `INSERT INTO users (id, fname, lname, email, phone, city, birthday, address, gender_id, typeOfUser, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, fname, lname, email, phone, city, birthday, address, gender_id, typeOfUser, status],
    (err, result) => {
      if (err) {
        console.log("Error inserting user:", err);
        return func(err);
      }
      console.log("User inserted with ID:", result.insertId);
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
function selectUsersById(id) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users WHERE id=?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error("Database query error:", err); // הדפס את השגיאה
        return reject(err); // דחיית ה-Promise במקרה של שגיאה
      }
      console.log("Query results:", results); // הדפס את התוצאות
      resolve(results); // החזרת התוצאה במקרה של הצלחה
    });
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
//פונקציות כלליות שהערכת זקוקה להן בעבור טבלה זו
function checkUserIdExists(id, func) {
  connection.query(
    `SELECT COUNT(*) AS count FROM users WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        return func(err);
      }
      const exists = result[0].count > 0;
      func(null, exists);
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
  checkUserIdExists,
  deleteUser
};