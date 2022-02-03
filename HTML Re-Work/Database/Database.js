var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Manpreet145"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("DROP DATABASE IF EXISTS mydb", function (err, result){
    if(err) throw err;
    console.log("Database dropped");
  });
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});






