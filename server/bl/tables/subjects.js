const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  subjects (id INT AUTO_INCREMENT PRIMARY KEY, subject VARCHAR(255))";
//var sql = `  INSERT INTO passwords (userId, username, password_hash)   VALUES (1, 'exampleUser', 'hashedPassword')`;
// IF NOT EXIST

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});