//used https://expressjs.com/ documentaion as a guide as well as https://www.w3schools.com/

var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "teamproject",
  database: "mysql"
});


const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log("request recieved");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function query(sql){
    return con.connect(function(err) {
        if (err) throw err;
        //console.log("Connected!");
        return con.query(sql, function (err, result){
            if(err) throw err;
            //console.log("Done");
            return result;
        });
        
    });
}