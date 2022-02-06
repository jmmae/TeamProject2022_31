var mysql = require('mysql');
fs = require('fs');
const readline = require('readline');

const readFileLocation = "../Database/DatabaseFile.txt";


// // Test: Read File Line By Line
// const text = fs.createReadStream(readFileLocation);

// const rl = readline.createInterface({
//     input: text
// });

// rl.on("line", (out) => {
//     console.log("Line from file: " + out);
// })

// // Test: Read File All at once
// fs.readFile('../Database/DatabaseFile.txt', 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(data);
//   });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "teamproject",
  database: "oaxaca"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // // Drop Database
    // con.query("DROP DATABASE IF EXISTS oaxaca", function (err, result){
    //   if(err) throw err;
    //   console.log("Database dropped");
    // });

    // Create Database if it doesn't exist
    con.query("CREATE DATABASE IF NOT EXISTS oaxaca", function (err, result) {
      if (err) throw err;
      console.log("Database present");
    });

    // Drop Table if existed previously
    con.query("DROP TABLE IF EXISTS menu", function(err, result) {
        if (err) throw err;
        console.log("Table not present");
    });

    // Create Table if doesn't exist
    con.query("CREATE TABLE IF NOT EXISTS menu (foodtest VARCHAR(100), pricetest FLOAT)", function(err, result) {
        if (err) throw err;
        console.log("Table present");
    });

    // Inserts into Table from File

    // End Connection
    con.end(function(err) {
        if (err) throw err;
    });
  });

