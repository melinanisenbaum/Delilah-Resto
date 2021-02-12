CREATE PROCEDURE productAddOrEddit (
	IN productId INT,
    IN name VARCHAR(45),
    IN imgURL VARCHAR(60),
	IN price INT(11)
)
BEGIN
	IF productId = 0 THEN
		INSERT INTO products (name, imageURL, price);
        VALUES (_name, _imageURL, _price);
		SET productId = LAST_INSERT_ID()
    ELSE
		UPDATE products
        SET
			name = _name,
            imageURL = _imageURL,
            price = _price
            WHERE productId = _id:
		END IF
        
        SELECT _id AS productId
	END

CREATE PROCEDURE userAddOrEddit (
	IN userId INT(4),
    IN username VARCHAR(45),
    IN nameAndLastname VARCHAR(45),
	IN email VARCHAR(45)
    IN phone INT(12),
    IN adress VARCHAR(45),
	IN password VARCHAR(45)
)
BEGIN
	IF userId = 0 THEN
		INSERT INTO users (username, nameAndLastname, email, phone, adress);
        VALUES (_name, _imageURL, _price);
		SET userId = LAST_INSERT_ID()
    ELSE
		UPDATE users
        SET
			username = _username,
            nameAndLastname = _nameAndLastname
            WHERE userId = _userId:
		END IF
        
        SELECT _id AS userId
	END
