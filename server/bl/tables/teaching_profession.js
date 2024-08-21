const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  teaching_profession (id INT AUTO_INCREMENT PRIMARY KEY,id_teacher VARCHAR(9), id_subject INT, is_beginner BOOLEAN,is_advenced BOOLEAN,is_college BOOLEAN,is_academic BOOLEAN, FOREIGN KEY (id_teacher) REFERENCES teacher(id),FOREIGN KEY (id_subject) REFERENCES subjects(id))";

//var sql="DROP TABLE teaching_profession"

//var sql = `  INSERT INTO passwords (userId, username, password_hash)   VALUES (1, 'exampleUser', 'hashedPassword')`;
// IF NOT EXIST

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});