const { query } = require("express");
const connection = require("../../dal/connectToDB");

//INSERT

function insertSchedule( id_teacher , date ,hour,func) {
  connection.query(
    `INSERT INTO schedule (  id_teacher , date ,hour) VALUES ( ?, ?, ?)`,
    [  id_teacher , date ,hour],
    (err, result) => {
      if (err) {
        return func(err);
      }
      func(null, result.insertId);
    }
  );
}


//SELECT

function selectSchedule(func) {
  let query = `SELECT * FROM schedule`;
  connection.query(query,(err, results) => {
    if (err) {
      return func(err);
    }
    func(null, results);
  });
}


//SELECT  BY ID

function selectScheduleById( id, func) {
   let query = `SELECT * FROM schedule WHERE id=?`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      return func(err);
    }
    func(null, results);
  });
}





//UPDATE

function updateSchedule(id, columnName, newData, func) {
  connection.query(
 
    `UPDATE schedule SET ${columnName} = ? WHERE id = ?`,
    [newData, id],
    (err, result) => {
      if (err) return func(err);
      func(null, result.affectedRows);
    }
  );
}

//DELETE

function deleteSchedule( id, func) {
  connection.query(
    // var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
    `DELETE FROM schedule WHERE id = ?`,
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
  insertSchedule,
  selectSchedule,
  selectScheduleById,
  updateSchedule,
  deleteSchedule
};