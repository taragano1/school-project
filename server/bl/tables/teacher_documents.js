const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  teacher_documents (id INT AUTO_INCREMENT PRIMARY KEY, id_teacher VARCHAR(9),document VARCHAR(255),FOREIGN KEY (id_teacher) REFERENCES teacher(id))";
//var sql = `  INSERT INTO passwords (userId, username, password_hash)   VALUES (1, 'exampleUser', 'hashedPassword')`;
// IF NOT EXIST

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});