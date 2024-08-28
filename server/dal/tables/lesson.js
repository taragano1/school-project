const connection = require("../connectToDB");

// Define the table schema with the password hashed and salted
var sql = "CREATE TABLE  lesson (id INT AUTO_INCREMENT PRIMARY KEY, id_teacher VARCHAR(9), id_subject INT, id_student VARCHAR(255), rating INT, feedback VARCHAR(255),date VARCHAR(255),hour VARCHAR(255),status Boolean,FOREIGN KEY (id_teacher) REFERENCES teacher(id),FOREIGN KEY (id_student) REFERENCES student(id),FOREIGN KEY (id_subject) REFERENCES subjects(id))";

//var sql="DROP TABLE lesson"


connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});