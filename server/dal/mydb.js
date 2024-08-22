var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shirSql.123",
  port: 3306,
  database: "mydb"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});