const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  passwords (id VARCHAR(9) PRIMARY KEY, password_hash VARCHAR(255), FOREIGN KEY (id) REFERENCES users(id))";

//var sql="DROP TABLE passwords"

//var sql = `  INSERT INTO passwords (userId, username, password_hash)   VALUES (1, 'exampleUser', 'hashedPassword')`;
// IF NOT EXIST

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
