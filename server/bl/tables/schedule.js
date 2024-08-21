const connection = require("../connectToDB");
// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  schedule (id INT AUTO_INCREMENT PRIMARY KEY, id_teacher VARCHAR(9), date VARCHAR(255),huor VARCHAR(255),FOREIGN KEY (id_teacher) REFERENCES teacher(id))";

//var sql="DROP TABLE schedule"

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});