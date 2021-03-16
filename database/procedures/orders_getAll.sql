CREATE DEFINER=`root`@`localhost` PROCEDURE `orders_getAll`()
BEGIN
	SELECT * FROM orders;
END