const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT
function insertDocument( id_teacher,document ,func) {
    connection.query(
      `INSERT INTO teaching_profession (  id_teacher, document) VALUES ( ?,?)`,
      [ id_teacher,document],
      (err, result) => {
        if (err) {
          return func(err);
        }
        func(null, result.insertId);
      }
    );
  }