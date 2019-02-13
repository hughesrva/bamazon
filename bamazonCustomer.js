var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Asaavd101",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  connection.query("SELECT item_id,product_name,price FROM PRODUCTS", function(
    err,
    results
  ) {
    if (err) throw err;
    console.log(
      "\nWelcome to Bamazon!\nWe currently have the following available for sale:\n"
    );
    for (i = 0; i < results.length; i++) {
      console.log("Item ID: " + results[i].item_id);
      console.log("Product Name: " + results[i].product_name);
      console.log("Price: $" + results[i].price + "\n");
    }

    inquirer
      .prompt([
        {
          name: "choice",
          type: "input",
          message: "What is the ID for the item you would like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      // stores the selected product id as chosenItem if it matches an ID in the DB
      .then(function(answer) {
        connection.query("select * from products", function(err, results) {
          if (err) throw error;
          var chosenItem;
          var currentStock;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_id == answer.choice) {
              chosenItem = results[i].item_id;
              currentStock = results[i].stock_quantity;
            }
          }
          //   updates stock in DB based on amount purchased
          if (answer.quantity <= currentStock) {
            var newStock = currentStock - answer.quantity;
            connection.query(
              "UPDATE products SET ? WHERE ? ",
              [
                {
                  stock_quantity: newStock
                },
                {
                  item_id: chosenItem
                }
              ],
              function(err) {
                if (err) throw err;
              }
            );
            console.log("Chosen: " + chosenItem);
            connection.query(
              "SELECT price FROM products where ?",
              { item_id: chosenItem },
              function(err, results) {
                if (err) throw err;
                var totalCost = 0;
                totalCost += answer.quantity * results[0].price;
                console.log(
                  "You bought " +
                    answer.quantity +
                    ". Your total cost is $" +
                    totalCost
                );
                inquirer
                  .prompt([
                    {
                      name: "continue",
                      type: "confirm",
                      message: "Do you want to buy something else?"
                    }
                  ])
                  .then(function(answer) {
                    if (answer.continue === true) {
                      start();
                    } else {
                      console.log("Thanks for shopping with us! Goodbye :)");
                      connection.end();
                    }
                  });
              }
            );
          } else {
            console.log(
              "You can't purchase that many! We only have " +
                currentStock +
                " in stock."
            );
            start();
          }
        });
      });
  });
}
