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
const port = 3000 //the port this server is watching
var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()//jsonParser is used to be able to read the incoming data when encoded in json format
var urlencodedParser = bodyParser.urlencoded({ extended: false })//urlencodedParser is used to be able to read the incoming data when encoded in url format

app.use(cors())

//get is used when no data needs to be sent
//'/' is the path that is beeing checked
//req is not used here
//res is what is returned
app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log("request recieved");
})

//post is used when the client is sending data
//req.body.[paramiter name] is how you get the data
//res is what is returned
//urlencodedParser is used to be able to read the incoming data when encoded in url format
app.post('/postexample', urlencodedParser, function (req, res) {
  console.log("request recieved");
  res.send(req.body.param1 + req.body.param2)
})

app.get('/menu', function (req, res) {
  console.log("menu request recieved");

  selectquery("SELECT * FROM menu;", res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function selectquery(sql, res, columns) {

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    
    console.log(result[0].foodtest);
    res.send(result)
  });

};
  



