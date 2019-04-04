#CREATE DATABASE bamazon_db;

USE bamazon_db;

/*CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT=1,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL (6, 2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);*/

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 
    ('DOVE', 'Health', '2.50', 10),
    ('Hot Cheetos', 'Food', 3.50, 10),
    ('iPhone Charger', 'Electronics', 9.99, 10),
    ('Head & Shoulder Shampoo', 'Health', 5.50, 10),
    ('Banana', 'Food', 1.50, 10),
    ('Apple', 'Food', 2.00, 10),
    ('TV', 'Electronics', 99.99, 10),
    ('Snickers', 'Food', 6.00, 10),
    ('Paper Towels', 'Utility', 4.00, 10),
    ('Paper Plates', "Utility", 4.99, 10);



