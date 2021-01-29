CREATE DATABASE IF NOT EXISTS delilahResto;

USE delilahResto;

CREATE TABLE products (
	id INT(3) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    imgURL VARCHAR(60) DEFAULT NULL,
    price INT(11) DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE products;

INSERT INTO products values
	(1, 'Hamburguesa clasica', null, 350),
    (2, 'Sandwich veggie', null, 310),
    (3, 'Veggie avocado', null, 310);

SELECT * FROM products;

CREATE TABLE users (
	id INT(4) NOT NULL AUTO_INCREMENT,
	username VARCHAR(45) DEFAULT NULL,
    nameAndLastname VARCHAR(45) DEFAULT NULL,
    email VARCHAR(45) DEFAULT NULL,
    phone INT(12) DEFAULT NULL,
    adress VARCHAR(45) DEFAULT NULL,
    password  VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE orders (
	id INT(2) NOT NULL AUTO_INCREMENT,
    state ENUM('new'),
    hour TIMESTAMP,
    description VARCHAR(45) DEFAULT NULL,
    payment ENUM('debit') DEFAULT NULL,
    username VARCHAR(45) DEFAULT NULL,
    deliveryAdress VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY(id)
);


