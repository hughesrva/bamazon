drop database if exists bamazon;

create database bamazon;

use bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(6 , 2 ) NOT NULL,
    stock_quantity INTEGER(3) NOT NULL,
    PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Puppo Dog Food", "Pet Supplies", 40, 20),
("Bazer Wireless Mouse", "Electronics", 55, 20),
("'How To Influence Your Enemies', Hardcover", "Books", 29.95, 20),
("Three-A-Day Vitamins", "Medicine", 18, 20),
("Blamo Dog Toy", "Pet Supplies", 12, 20),
("Wool Socks, 6-Pack", "Clothing", 15, 20),
("'Very Wild Monsters', Paperback", "Books", 8, 20),
("Brrreezy Thermal Jacket", "Clothing", 44.95, 20),
("Badvil Pain Relief, 20 Caplets", "Medicine", 6, 20),
("Thunder Port Charging Cord", "Electronics", 14.99, 20)
;
