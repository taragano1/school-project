const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

// פונקציה לבדוק אם מקצוע קיים
function checkSubjectExists(subject) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM subjects WHERE subject = ?`;
    connection.query(query, [subject], (err, results) => {
      if (err) {
        return reject(err); // דחיית ה-Promise במקרה של שגיאה
      }
      resolve(results[0].count > 0); // מחזיר true אם מקצוע קיים, אחרת false
    });
  });
}

// פונקציה להכניס מקצוע רק אם הוא לא קיים
function insertSubject(subject) {
  return new Promise(async (resolve, reject) => {
    try {
      const exists = await checkSubjectExists(subject);
      if (exists) {
        return reject(new Error("Subject already exists")); // אם מקצוע קיים, דחיית ה-Promise עם שגיאה
      }

      connection.query(
        `INSERT INTO subjects (subject) VALUES (?)`,
        [subject],
        (err, result) => {
          if (err) {
            return reject(err); // דחיית ה-Promise במקרה של שגיאה
          }
          resolve(result.insertId); // החזרת ה-ID שהוזן במקרה של הצלחה
        }
      );
    } catch (error) {
      reject(error); // טיפול בשגיאות של פונקציות אסינכרוניות
    }
  });
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