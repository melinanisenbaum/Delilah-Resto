CREATE DATABASE IF NOT EXISTS DelilahDB;
USE DelilahDB;

CREATE TABLE IF NOT EXISTS products (
	productId INT NOT NULL AUTO_INCREMENT,
    pName VARCHAR(45) NOT NULL UNIQUE,
    imgURL VARCHAR(60),
    price INT(8),
    PRIMARY KEY(productId)
);

INSERT INTO products (pName, imgURL, price)
VALUES 
	('Hamburguesa clasica', null, 350),
    ('Sandwich veggie', null, 310),
    ('Veggie avocado', null, 310);

CREATE TABLE IF NOT EXISTS users (
	userId INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(45) NOT NULL UNIQUE,
    fullname VARCHAR(60) NOT NULL,
    email VARCHAR(60) UNIQUE,
    phone VARCHAR(15),
    adress VARCHAR(60) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(userId)
);

INSERT INTO users (username, fullname, email, phone, adress, passwd)
VALUES
	('queen_freddie', 'Freddie Mercury', 'freddiemercury@gmail.com', +447712345678, '1 Logan PIKensingtn, Loondon W8 ^DE, UK', '111djgfjhgf'),
    ('melina', 'Meli Nisen', 'melinap@hotmail.com', +542234567890, 'mi direccion en mdp 7600 ba', 'jhgrfjhdgf333');

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

CREATE TABLE IF NOT EXISTS order_product (
	op_id INT NOT NULL AUTO_INCREMENT,
    op_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    stat_id INT,
    order_datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paym_id INT,
    userId INT,
    delivery_adress VARCHAR(60),
    PRIMARY KEY(orderId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (order_status) REFERENCES order_status(stat_id),
    FOREIGN KEY (payment) REFERENCES payment(paym_id),
    FOREIGN KEY (delivery_adress) REFERENCES users(adress)
);

CREATE TABLE IF NOT EXISTS auths (
	authId INT NOT NULL AUTO_INCREMENT,
    auth_pass TEXT,
    userId INT DEFAULT NULL,
    PRIMARY KEY (authId),
    KEY (userId),
    CONSTRAINT auths_fk_1 FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE SET NULL ON UPDATE CASCADE
);



