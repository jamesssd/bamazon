//packages needed to run the file
require("dotenv").config();
let mysql = require('mysql');
let inquirer = require('inquirer');
var keys = require("./keys.js");
let connection = mysql.createConnection({
    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASS,

    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    // console.log("connection successful!");
    makeTable();
});


let start = function(res){
  inquirer.prompt([
  {
    name: "start",
    type: "confirm",
    message: "Welcome, ready to shop?"
  }
  ])
  .then(function(user){
    if(user.start === true) {
      shopping();
    }else
      console.log("Come again!");
    });
};

function shopping() {
    inquirer.prompt([
    {
      name: 'ID',
      type: 'input',
      message: 'What would you like to buy? ==Please enter item ID=== ',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log('===Press numerical keys to buy===');
        return false;
      }
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'How many would you like to buy?',
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(" ===Must input a number!===");
        return false; 
      }
    }
  ]).then(function(answer) {
    let quantityNeed = parseInt(answer.quantity);
    let idRequested = parseInt(answer.ID);
    payForOrder(idRequested, quantityNeed);
    });
}

let makeTable = function(){
  connection.query('SELECT * FROM products limit 10', function(err, res){
    console.table(res);
    start(res);
  })
}

function payForOrder(ID, amt){
  connection.query('SELECT * FROM products WHERE item_id= ' + ID, function(err, res){
    if(err){console.log(err)};
    console.table(res)
    if(amt <= res[0].stock_quantity){
      let totalCost = res[0].price * amt;
      console.log("In Stock");
      console.log('Total for ' + amt + ' ' + res[0].product_name + ' is $' + (totalCost).toFixed(2) + ' Thank you!');
      inquirer.prompt([
        {
          name: 'shopagain',
          type: 'confirm',
          message: "Would you like to shop again?"
        }
      ]).then(function(user){
        if(user.shopagain === true) {
          return shopping();
        }else
          console.log("Come again!");
          connection.end();
        })
  } else{
    console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
  };
  })
}