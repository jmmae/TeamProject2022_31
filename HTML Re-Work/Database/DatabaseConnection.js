//used https://expressjs.com/ documentaion as a guide as well as https://www.w3schools.com/

var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "teamproject",
  database: "oaxaca"
});


const express = require('express')
const app = express()
const port = 3000 //the port this server is watching
var cors = require('cors')
var bodyParser = require('body-parser');
const { TIME, TIME2 } = require('mysql/lib/protocol/constants/types');
var jsonParser = bodyParser.json()//jsonParser is used to be able to read the incoming data when encoded in json format
var urlencodedParser = bodyParser.urlencoded({ extended: false })//urlencodedParser is used to be able to read the incoming data when encoded in url format

var waiterRequests = new Array();
var dishRequests = new Array();

var nextOrderID = 0

app.use(cors());
app.use(express.json({ limit: '1mb' }));

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
app.post('/menu', urlencodedParser, function (req, res) {
  // console.log(req.bodyParser);
  let text = JSON.stringify(req.body);
  let food = text.substring(2, text.length - 5);
  console.log(text.substring(2, text.length - 5));
  deletequery("DELETE FROM menu where foodtest='" + food + "'");
});

app.get('/menu', function (req, res) {
  console.log("menu request recieved");

  selectquery("SELECT * FROM menu;", res)
})

app.get('/menu/available', function (req, res) {
  console.log("Available menu request recieved");
  selectquery("SELECT * FROM menu WHERE available IS TRUE ;", res)
})


app.post('/order/requestWaiter/add', urlencodedParser, function (req, res) {
  console.log("Waiter add request recieved");
  if (waiterRequests.includes(req.body.table) == false) {
    waiterRequests.push(req.body.table);

  }
  res.send("Waiter add request recived")
})

app.post('/order/unconfirmed', urlencodedParser, function (req, res) {
  console.log("Waiter add request recieved");
  dishRequests.push(req.body.table);
  for (var i = 0; req.body.dishes[i] < req.body.dishes.length; i++) {
    dishRequests.push(req.body.dishes[i]);
  }
  //query(/*delete all entries related to req.body.*/)
  //  query("INSERT INTO order (/* fields */) VALUES ("+nextOrderID+","+TIME+ "," +req.body.table+"False)")
  //  for (var i = 0; req.body.dishes[i] < req.body.dishes.length; i++) {
  //    var entries = req.body.dishes[i].split("+")
  //    query("INSERT INTO OrderedDish VALUES (" + entries[0] + "," + entries[1] + ",False)")
  //  }

  //  if (waiterRequests.includes(req.body.table) == false) {
  //    waiterRequests.push(req.body.table);

  //  }
  //  res.send("Waiter add request recived")
})

app.get('/order/getDishes', urlencodedParser, function (req, res) {
  console.log("Waiter add request recieved");
  res.push(dishRequests);

  //query(/*delete all entries related to req.body.*/)
  //  query("INSERT INTO order (/* fields */) VALUES ("+nextOrderID+","+TIME+ "," +req.body.table+"False)")
  //  for (var i = 0; req.body.dishes[i] < req.body.dishes.length; i++) {
  //    var entries = req.body.dishes[i].split("+")
  //    query("INSERT INTO OrderedDish VALUES (" + entries[0] + "," + entries[1] + ",False)")
  //  }

  //  if (waiterRequests.includes(req.body.table) == false) {
  //    waiterRequests.push(req.body.table);

  //  }
  //  res.send("Waiter add request recived")
})

app.post('/order/requestWaiter/remove', urlencodedParser, function (req, res) {
  if (!waiterRequests.includes(req.body.table)) {
    //waiterRequests.splice(waiterRequests.indexOf(req.body.table,1))

  } else {

    waiterRequests.splice(waiterRequests.indexOf(req.body.table), 1)
  }
  console.log("Waiter remove request recieved");
  //console.log(waiterRequests);
  res.send("Waiter remove request recived")
})

app.get('/waiter/waiterRequests', function (req, res) {
  //console.log("request recieved");
  //console.log(waiterRequests);
  res.send(waiterRequests);
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

function deletequery(sql, res, columns) {

  con.query(sql, function (err, result, fields) {

    // console.log(result[1].foodtest);
  });

};




