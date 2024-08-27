const connection = require('../connectToDB')

var sql = "CREATE TABLE users (id VARCHAR(9) PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), email VARCHAR(255), phone VARCHAR(255),city VARCHAR(50), birthday VARCHAR(100),address VARCHAR(255), gender_id INT,typeOfUser INT, status Boolean ,FOREIGN KEY (gender_id) REFERENCES gender(id))";

//var sql="DROP TABLE users"

connection.query(sql, function (err, result) {
  if (err) throw err;
  //console.log("Table created");
  console.log("1 record inserted");
});