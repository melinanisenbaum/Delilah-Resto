CREATE DEFINER=`root`@`localhost` PROCEDURE `users_getById`(
	IN _userId INT
)
BEGIN
	SELECT * FROM users
    WHERE userId = _userId;
END