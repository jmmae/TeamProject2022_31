var mysql = require('mysql');
fs = require('fs');
const readline = require('readline');

const readFileLocation = "../HTML Re-Work/Database/DatabaseFile.txt";
const readStaffFileLocation = "../HTML Re-Work/Database/StaffTable.txt";


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "teamproject",
  database: "oaxaca"
});

// Connect to server
function connectToServer(con) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

// Drop Database
function dropDB(con) {
    con.query("DROP DATABASE IF EXISTS oaxaca", function (err, result){
    if(err) throw err;
    console.log("Database dropped");
    });
}

// Create Database if it doesn't exist
function createDB(con) {
    con.query("CREATE DATABASE IF NOT EXISTS oaxaca", function (err, result) {
        if (err) throw err;
        console.log("Database present");
        });
}

// Drop Table if existed previously
function dropTable(con) {
    con.query("DROP TABLE IF EXISTS menu", function(err, result) {
        if (err) throw err;
        console.log("Table not present");
    });
}

// Create Table if doesn't exist
function createTable(con) {
    con.query("CREATE TABLE IF NOT EXISTS menu (foodtest VARCHAR(100), pricetest FLOAT, Available VARCHAR(5))", function(err, result) {
        if (err) throw err;
        console.log("Table present");
    });
}

// Inserts into Table from File
function fileToTable(con) {
    const txt = fs.createReadStream(readFileLocation);
    const rl = readline.createInterface({
        input: txt
    });
    rl.on("line", (out) => {
        const outList = out.split(",")
        con.query("INSERT INTO menu (foodtest, pricetest, Available) VALUES (" + "'" + outList[0] + "', '" + outList[1] + "', '" + outList[2] + "')", function(err, result) {
            if (err) throw err;
            console.log("Filled one row from file");
        });
    })
    
}


function deleteItem(con, food){
    con.query("DELETE FROM menu WHERE foodtest='" + food + "'", function(err, result){
        if (err) throw err;
        console.log(food + " Deleted from the database");
    });
}

// function fileToStaffTable(con) {
//     const txt = fs.createReadStream(readStaffFileLocation);
//     const rl = readline.createInterface({
//         input: txt
//     });
//     rl.on("line", (out) => {
//         const outList = out.split(",")
//         con.query("INSERT INTO menu (staffID, username, password) VALUES (" + "'" + outList[0] + "', '" + outList[1] + "', '" + outList[2] + "')", function(err, result) {
//             if (err) throw err;
//             console.log("Filled one row from file");
//         });
//     })
// }


connectToServer(con);
createDB(con);
dropTable(con);
createTable(con);
fileToTable(con);


