//packages needed to run the file
let mysql = require('mysql');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',

    user:'root',

    password: 'Kingme94',
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start(){
    inquirer.prompt([
    {
        name: "start",
        type: "rawlist",
        message: "Welcome, ready to shop?",
        choices: ['YES', 'NO']
    }
    ])
    .then(function(user){
        if(user.start === 'YES') {
            shopping();
        }else(user.start === 'NO') 
        console.log("Come again!");
        connection.end();
    });
};

function shopping(){
    let query = 'SELECT item_id, product_name, department_name, price, stock_quantity';
    connection.query(query, function(err, res){
        if (err) throw err;
    });
    
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What would you like to buy? *Please enter item ID",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                }
                console.log('Press numerical keys to buy');
                return false;
            }
        }, 
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ]).then(function(){
            let quantityNeed = answer.quantity;
            let idRequested = answer.ID;
            payForOrder(idRequested, quantityNeed);
            }
        ) 
    
}

function payForOrder(ID, amt){
    connection.query('SELECT * FROM products WHERE item_id= ' + ID, function(err, res){
        if(err){console.log(err)};
        if(amt <= res[0].price * stock_quantity){
            let totalCost = res[0].price * amt;
            console.log("In Stock");
            console.log('Total for ' + amt + ' ' + res[0].product_name + 'is ' + totalCost + 'Thank you!');

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
		} else{
			console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");
		};
    })
}