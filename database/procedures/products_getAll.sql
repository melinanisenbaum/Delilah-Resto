CREATE DEFINER=`root`@`localhost` PROCEDURE `products_getAll`()
BEGIN
	SELECT * FROM products;
END