const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  teacher (id VARCHAR(9) , resume VARCHAR(255), specialization INT, subject INT, FOREIGN KEY (id) REFERENCES users(id), FOREIGN KEY (specialization) REFERENCES specialization(id), FOREIGN KEY (subject) REFERENCES subjects(id))";
//var sql="DROP TABLE teacher"


connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});