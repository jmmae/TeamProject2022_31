//used https://expressjs.com/ documentaion as a guide as well as https://www.w3schools.com/

var mysql = require('mysql')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "teamproject",
  database: "oaxaca"
});
//Bellow is the database connection when using the jawsdatabase on heroku
//var con = mysql.createConnection(process.env.JAWSDB_URL);

const express = require('express')
const app = express()
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
} //the port this server is watching
var cors = require('cors')
var bodyParser = require('body-parser');
const { TIME, TIME2 } = require('mysql/lib/protocol/constants/types');
var jsonParser = bodyParser.json()//jsonParser is used to be able to read the incoming data when encoded in json format
var urlencodedParser = bodyParser.urlencoded({ extended: true })//urlencodedParser is used to be able to read the incoming data when encoded in url format
const path = "../HTML Re-Work"

var waiterRequests = new Array();
var dishRequests = new Array();

var nextOrderID = 0
var OrderedDishID = 0

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static('HTML Re-Work'))
app.use(express.static('HTML Re-Work/resources'))

//get is used when no data needs to be sent
//'/' is the path that is beeing checked
//req is not used here
//res is what is returned
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/HTML Re-Work/MainMenu.html")
})

app.get('/CustomerMenu', function (req, res) {
  res.sendFile(__dirname + "/HTML Re-Work/CustomerMenu.html")
})

//post is used when the client is sending data
//req.body.[paramiter name] is how you get the data
//res is what is returned
//urlencodedParser is used to be able to read the incoming data when encoded in url format
app.post('/menu', urlencodedParser, function (req, res) {
  console.log(req.body.menuFood);
  sqlQuery("DELETE FROM menu where DishID='" + req.body.menuFood + "'");
});

//updates menu, changes 'Available' field in SQL database to 'No' for input food
//takes 'req.body' as a parameter, containing the food
//returns the food being marked unavailable, as a string to the console
app.post('/menu/outofstock', urlencodedParser, function (req, res) {
  console.log(req.body);
  sqlQuery("UPDATE menu SET Available = 'No' WHERE DishID='" + req.body.menuFood + "'");
});

//updates menu, changes 'Available' field in SQL database to 'Yes' for input food
//takes 'req.body' as a parameter, containing the food
//returns the food being marked available, as a string to the console
app.post('/menu/instock', urlencodedParser, function (req, res) {
  console.log(req.body);
  let text = JSON.stringify(req.body);
  let food = text.substring(2, text.length - 5);
  console.log(food);
  sqlQuery("UPDATE menu SET Available = 'Yes' WHERE DishID='" + req.body.menuFood + "'");
});

//updates menu, creates new record in menu database, with name of food, price and availability
//takes 'req.body' as a parameter, containing the food, price and availability
//returns the food being added to the database, as a string to the console
app.post('/menu/addedDishes', urlencodedParser, function (req, res) {
  let text = JSON.stringify(req.body);
  let item = text.substring(14, text.length - 3);
  con.query("SELECT COUNT(*) AS num FROM menu;", function (err, result, fields){
    if (err) throw err;
    nextOrderID = result[0].num;
    nextOrderID = nextOrderID + 1;
  food = item.split(",");
  sqlQuery("INSERT INTO menu (DishID, DishName , GroupTags , Description , Calories , DietaryReq , Allergies, Price, Available) VALUES ('"
  + nextOrderID + "','" + food[0] + "','" + food[1] + "','" + food[2] + "','" + food[3] + "','" + food[4] + "','" + food[5] + "','" 
   + food[6] + "','" + food[7] + "')");
  })
});

//gets full menu from database
//returns string to console
app.get('/menu/addedDishes', function (req, res) {
  console.log("added items request recieved");
  selectquery("SELECT * FROM menu;", res)
})

//gets full menu from database
//returns string to console
app.get('/menu', function (req, res) {
  console.log("menu request recieved");
  selectquery("SELECT * FROM menu;", res)
})

//gets menu from database, where the food is available
//returns string to console
app.get('/menu/available', function (req, res) {
  console.log("Available menu request recieved");
  selectquery("SELECT * FROM menu WHERE available IS TRUE ;", res)
})

//sends new item order to waiter
//returns string to console
app.post('/order/requestWaiter/add', urlencodedParser, function (req, res) {
  console.log("Waiter add request recieved");
  if (waiterRequests.includes(req.body.table) == false) {
    waiterRequests.push(req.body.table);
  }
  res.send("Waiter add request recived")
})

//goes through all dish requests and outputs them to waiter
//returns string to console
app.post('/order/unconfirmed', urlencodedParser, function (req, res) {
  // console.log("Waiter add request recieved");
  // dishRequests.push(req.body.table);
  // console.log(dishRequests);
  // var array = req.body[1];
  // console.log(array);
  // console.log(req.body.dishes[0]);
  // for (var i = 0; i < req.body.dishes.length; i++) {
  //   console.log(req.body.dishes[i]);
  //   dishRequests.push(req.body.dishes[i]);
  // }

  //   query(/*delete all entries related to req.body.*/)

  con.query("SELECT MAX(OrderID) AS OID FROM orders", function (err, result, fields) {
    if (err) throw err;
    nextOrderID = result[0].OID;
    nextOrderID = nextOrderID + 1;

    sqlQuery("INSERT INTO orders (OrderID,TimeEntered, TableNumber, Confirmed) VALUES (" + nextOrderID + ", (SELECT NOW()) ," + req.body.table + ", 'No' );")
    con.query("SELECT MAX(OrderedDishID) AS ODID FROM OrderedDish", function (err, result, fields) {
      if (err) throw err;
      OrderedDishID = result[0].ODID;
      for (var i = 0; i < req.body.dishes.length; i++) {
        
        OrderedDishID = OrderedDishID + 1;
        var entries = req.body.dishes[i].split("+")
        console.log(OrderedDishID);
        sqlQuery("INSERT INTO OrderedDish (OrderedDishID, OrderID, DishID, Comments, Delivered) VALUES (" + OrderedDishID + "," + nextOrderID + "," + entries[0] + ",'" + entries[1] + "',0);")
      }
    });
  });
  res.send("Order recived")
})

//gives list available to order
//takes 'req.body' as a parameter, containing the food
//returns food item as a string to the console
// app.post('/order/getDishes', function (req, res){
//   console.log(req.body);
//   let text = JSON.stringify(req.body);
//   let food = text.substring(2, text.length - 5);
//   console.log(text.substring(2, text.length - 5));
//   // sqlQuery("UPDATE menu SET Available = 'No' WHERE DishName='" + food + "'");
// })

//sends order to waiter
//returns 'dishRequests', output to console
app.get('/order/getDishes', function (req, res) {
  // console.log("Waiter add request recieved");
  // console.log(dishRequests);
  // res.send(dishRequests);
  // add a selectquery which returns the orders table and the associated dishes which have not been confirmed delivered.
  //selectquery("SELECT * FROM OrderedDish INNER JOIN orders ON OrderedDish.OrderID = orders.OrderID INNER JOIN menu ON OrderedDish.DishID = menu.dishID;", res)
  selectquery("SELECT * FROM OrderedDish INNER JOIN orders ON OrderedDish.OrderID = orders.OrderID INNER JOIN menu ON OrderedDish.DishID = menu.dishID;", res)
})

app.post('/order/getDishes/table', urlencodedParser, function (req, res) {

  // console.log("Waiter add request recieved");
  // console.log(dishRequests);
  // res.send(dishRequests);
  // add a selectquery which returns the orders table and the associated dishes which have not been confirmed delivered.
  //selectquery("SELECT * FROM OrderedDish INNER JOIN orders ON OrderedDish.OrderID = orders.OrderID INNER JOIN menu ON OrderedDish.DishID = menu.dishID;", res)
  console.log(req.body);
  selectquery("SELECT * FROM OrderedDish INNER JOIN orders ON OrderedDish.OrderID = orders.OrderID INNER JOIN menu ON OrderedDish.DishID = menu.dishID WHERE TableNumber = "+req.body.table+ " GROUP BY orders.OrderID LIMIT 1;", res)
})

//tells kitchen which dishes need to be prepared
app.get('/kitchen/getDishes', function (req, res) {
  selectquery("SELECT DishID, OrderID FROM orderDish WHERE Delivered == 0;", res)
})

//tells waiter which dishes are ready to be taken
app.get('/waiter/getDishes', function (req, res) {
  selectquery("SELECT DishID, OrderID FROM orderDish WHERE Delivered == 1;", res)
})

//removes request for waiter
//returns string to console
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

//sends a request for a waiter
app.get('/waiter/waiterRequests', function (req, res) {
  //console.log("request recieved");
  //console.log(waiterRequests);
  res.send(waiterRequests);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// function which runs the sql query and returns the data from the table
function selectquery(sql, res, columns) {

  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.send(result)
  });

};

// function which runs the sql queries which is given as the sql parameter
function sqlQuery(sql, res, columns) {

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
  });

};









