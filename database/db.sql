CREATE DATABASE IF NOT EXISTS DelilahDB;
USE DelilahDB;

CREATE TABLE IF NOT EXISTS products (
	productId INT NOT NULL AUTO_INCREMENT,
    pName VARCHAR(45) NOT NULL UNIQUE,
    imgURL VARCHAR(60),
    price INT(8),
    PRIMARY KEY(productId)
);

DESCRIBE products;

INSERT INTO products (pName, imgURL, price)
VALUES 
	('Hamburguesa clasica', null, 350),
    ('Sandwich veggie', null, 310),
    ('Veggie avocado', null, 310);

SELECT * FROM products;

CREATE TABLE IF NOT EXISTS users (
	userId INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(45) NOT NULL UNIQUE,
    fullname VARCHAR(60) NOT NULL,
    email VARCHAR(60),
    phone VARCHAR(15),
    adress VARCHAR(60) NOT NULL,
    passwd  VARCHAR(60) NOT NULL,
    PRIMARY KEY(userId)
);

DESCRIBE users;

INSERT INTO users (username, fullname, email, phone, adress, passwd)
VALUES
	('queen_freddie', 'Freddie Mercury', 'freddiemercury@gmail.com', +447712345678, '1 Logan PIKensingtn, Loondon W8 ^DE, UK', '111djgfjhgf'),
    ('melina', 'Meli Nisen', 'melinap@hotmail.com', +542234567890, 'mi direccion en mdp 7600 ba', 'jhgrfjhdgf333');

SELECT * FROM users;

ALTER TABLE users
ADD UNIQUE(email);

CREATE TABLE IF NOT EXISTS order_status (
	stat_id INT NOT NULL AUTO_INCREMENT,
    stat_name VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY(stat_id)
);

INSERT INTO order_status (stat_name)
VALUES
	('nuevo'),
    ('confirmado'),
    ('preparando'),
    ('enviando'),
    ('cancelado'),
    ('entregado');

SELECT * FROM order_status;

CREATE TABLE IF NOT EXISTS payment (
	paym_id INT NOT NULL AUTO_INCREMENT,
    paym_name VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (paym_id)
    );

INSERT INTO payment (paym_name)
VALUES
	('efectivo'),
    ('debito'),
    ('credito');

SELECT * FROM payment;

CREATE TABLE IF NOT EXISTS order_product (
	op_id INT NOT NULL AUTO_INCREMENT,
    op_datetime DATETIME NOT NULL,
    productId INT NOT NULL,
    orderId INT NOT NULL,
    userId INT NOT NULL,
    op_quantity INT(2) NOT NULL,
    op_price FLOAT NOT NULL,
    PRIMARY KEY (op_id),
	FOREIGN KEY (productId) REFERENCES products(productId),
    FOREIGN KEY (orderId) REFERENCES orders(orderId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE IF NOT EXISTS orders (
	orderId INT NOT NULL AUTO_INCREMENT,
    order_status INT,
    order_datetime DATETIME NOT NULL,
    payment INT,
    userId INT,
    delivery_adress VARCHAR(60),
    PRIMARY KEY(orderId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (order_status) REFERENCES order_status(stat_id),
    FOREIGN KEY (payment) REFERENCES payment(paym_id),
    FOREIGN KEY (delivery_adress) REFERENCES users(adress)
);


