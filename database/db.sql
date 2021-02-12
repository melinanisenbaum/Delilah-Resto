CREATE DATABASE IF NOT EXISTS delilahResto;

USE delilahResto;

CREATE TABLE products (
	productId INT(3) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    imgURL VARCHAR(60) DEFAULT NULL,
    price INT(11) NOT NULL,
    PRIMARY KEY(productId)
);

DESCRIBE products;

INSERT INTO products values
	(1, 'Hamburguesa clasica', null, 350),
    (2, 'Sandwich veggie', null, 310),
    (3, 'Veggie avocado', null, 310);

SELECT * FROM products;

CREATE TABLE users (
	userId INT(4) NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) DEFAULT NULL,
    nameAndLastname VARCHAR(45) DEFAULT NULL,
    email VARCHAR(45) DEFAULT NULL,
    phone INT(12) DEFAULT NULL,
    adress VARCHAR(45) DEFAULT NULL,
    password  VARCHAR(60) DEFAULT NULL,
    PRIMARY KEY(userId)
);

INSERT INTO users values
	(1, 'queen_freddie', 'Freddie Mercury', 'freddiemercury@gmail.com', +447712345678, '1 Logan PIKensingtn, Loondon W8 ^DE, UK', '111djgfjhgf'),
    (2, 'melina', 'Meli Nisen', 'melinap@hotmail.com', +542234567890, 'mi direccion en mdp 7600 ba, 'jhgrfjhdgf333');
    
CREATE TABLE orders (
	orderId INT(2) NOT NULL AUTO_INCREMENT,
    state ENUM('new'),
    hour TIMESTAMP NOT NULL DEFAULT current_timestamp,
    products VARCHAR(45) DEFAULT NULL,
    payment ENUM('debit') DEFAULT NULL,
    userId INT(4),
    deliveryAdress VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY(orderId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

INSERT INTO orders
	(72, new, 12:30PM, '1xHAmClass 1xSandVegg', 'debit $660', 'Freddie Mercury', '1 Logan PIKensingtn, Loondon W8 ^DE, UK')
