const { query } = require("express");
const connection = require("../../bl/connectToDB");

//INSERT
function insertLesson(id_teacher , id_subject , id_student , rating , feedback ,date , hour ,func) {
  connection.query(
    `INSERT INTO users ( id_teacher , id_subject , id_student , rating , feedback ,date , hour) VALUES (?, ?, ?, ?, ?,? ,?)`,
    [id_teacher , id_subject , id_student , rating , feedback ,date , hour],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}

//SELECT
function selectAllLessons(func) {
    let query = `SELECT * FROM lesson`;
    connection.query(query,(err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }

  function selectLessonByid( id, func) {
    let query = `SELECT * FROM lesson WHERE id=?`;

    connection.query(query, [id], (err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }
  
  function selectLessonByTeacher( id_teacher, func) {
    let query = `SELECT * FROM lesson WHERE id_teacher=?`;

    connection.query(query, [id_teacher], (err, results) => {
      if (err) {
        return func(err);
      }
      func(null, results);
    });
  }

  //UPDATE
  function updateLesson(id, columnName, newData, func) {
    connection.query(
   
      `UPDATE lesson SET ${columnName} = ? WHERE id = ?`,
      [newData, id],
      (err, result) => {
        if (err) return func(err);
        func(null, result.affectedRows);
      }
    );
  }

   //DELETE
   function deleteLesson( id, func) {
    connection.query(
      // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      `DELETE FROM lesson WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return func(err);
        }
        func(null, result.affectedRows);
      }
    );
  }

  function deleteLessonByTeacher( id_teacher, func) {
    connection.query(
      // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      `DELETE FROM lesson WHERE id_teacher = ?`,
      [id_teacher],
      (err, result) => {
        if (err) {
          return func(err);
        }
        func(null, result.affectedRows);
      }
    );
  }

  function deleteLessonByStudent( id_student, func) {
    connection.query(
      // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      `DELETE FROM lesson WHERE id_student = ?`,
      [id_student],
      (err, result) => {
        if (err) {
          return func(err);
        }
        func(null, result.affectedRows);
      }
    );
  }

  module.exports = {
    insertLesson,
    selectAllLessons,
    selectLessonByid,
    selectLessonByTeacher,
    updateLesson,
    deleteLesson,
    deleteLessonByTeacher,
    deleteLessonByStudent
  };

