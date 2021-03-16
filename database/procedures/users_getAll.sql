CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getAll`()
BEGIN
	SELECT * FROM users;
END