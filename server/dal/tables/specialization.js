const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  specialization (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
//var sql="DROP TABLE specialization"
//var sql = `  INSERT INTO specialization (name)   VALUES ('degree')`;
// IF NOT EXIST

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});