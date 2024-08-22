const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  gender (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
//var sql="DROP TABLE gender"
//var sql = `  INSERT INTO gender ( name)   VALUES ("female")`;
// IF NOT EXIST

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});