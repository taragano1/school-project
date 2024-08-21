const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  `student` (`id` VARCHAR(9),`class` VARCHAR(255), `specialization_id` INT, FOREIGN KEY (id) REFERENCES users(id),FOREIGN KEY (specialization_id) REFERENCES specialization(id))";
//var sql="DROP TABLE student"


connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});