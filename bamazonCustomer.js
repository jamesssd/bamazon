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
    console.log("connection successful!");
    makeTable();
});


let start = function(res){
    inquirer.prompt([
    {
        name: "start",
        type: "rawlist",
        message: "Welcome, ready to shop?",
        choices: ['YES', 'NO'],
    }
    ])
    .then(function(user){
        if(user.start === 'YES') {
            shopping();
        }else
            console.log("Come again!");
            connection.end();
    });
};

let makeTable = function(){
    connection.query('SELECT * FROM products limit 10', function(err, res){
        for(let i = 0; i < res.length; i++){
            console.log(res[i].item_id + " || " + res[i].product_name + ' || ' + res[i].department_name + ' || ' + res[i].price + ' || ' + res[i].stock_quantity + '\n');
        }
        start(res);
    })
}

function shopping() {
    inquirer
      .prompt([
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
      ])
      .then(function(choice) {
        let query =
          'SELECT item_id, product_name, department_name, price, stock_quantity';
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.log(
            'Item ID',
            + res[i].item_id +
              'Product Name' +
              res[i].product_name +
              'Price' +
              res[i].price +
              'Stock Quantity' +
              res[i].stock_quantity
          );
        });
        let quantityNeed = answer.quantity;
        let idRequested = answer.ID;
        payForOrder(idRequested, quantityNeed);
      });
}
function payForOrder(ID, amt){
    connection.query('SELECT * FROM products WHERE item_id= ' + ID, function(err, res){
        if(err){console.log(err)};
        if(amt <= stock_quantity){
            let totalCost = res[0].price * amt;
            console.log("In Stock");
            console.log('Total for ' + amt + ' ' + res[0].product_name + 'is ' + totalCost + 'Thank you!');

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
		};
    })
    
}