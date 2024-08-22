const { query } = require("express");
const connection = require("../../bl/connectToDB");

//INSERT
function insertDocument( id_teacher,document ,func) {
  connection.query(
    `INSERT INTO teacher_documents (  id_teacher, document) VALUES ( ?,?)`,
    [ id_teacher,document],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}

//SELECT
function selectAllDocument(func) {
  let query = `SELECT * FROM teacher_documents`;
  connection.query(query,(err, results) => {
    if (err) {
      return func(err);
    }
    func(null, results);
  });
}

function selectDocumentById( id, func) {
  let query = `SELECT * FROM teacher_documents WHERE id=?`;
 connection.query(query, [id], (err, results) => {
   if (err) {
     return func(err);
   }
   func(null, results);
 });
}

function selectDocumentByTeacherId( id_teacher, func) {
  let query = `SELECT * FROM teacher_documents WHERE id_teacher=?`;
 connection.query(query, [id_teacher], (err, results) => {
   if (err) {
     return func(err);
   }
   func(null, results);
 });
}

 //UPDATE
 function updateTeacherDocuments(id, columnName, newData, func) {
  connection.query(
 
    `UPDATE teacher_documents SET ${columnName} = ? WHERE id = ?`,
    [newData, id],
    (err, result) => {
      if (err) return func(err);
      func(null, result.affectedRows);
    }
  );
}

//DELETE
function deleteDocument( id, func) {
  connection.query(
    // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
    `DELETE FROM teacher_documents WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.affectedRows);
    }
  );
}

function deleteTeacherDocuments( id_teacher, func) {
  connection.query(
    // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
    `DELETE FROM teacher_documents WHERE id_teacher = ?`,
    [id_teacher],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.affectedRows);
    }
  );
}

module.exports = {
  insertDocument,
  selectAllDocument,
  selectDocumentById,
  selectDocumentByTeacherId,
  updateTeacherDocuments,
  deleteDocument,
  deleteTeacherDocuments
};