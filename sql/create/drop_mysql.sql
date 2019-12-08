REVOKE ALL PRIVILEGES ON * . * FROM 'ragemp'@'localhost';

REVOKE ALL PRIVILEGES ON `ragemp` . * FROM 'ragemp'@'localhost';

REVOKE GRANT OPTION ON `ragemp` . * FROM 'ragemp'@'localhost';

DROP USER 'ragemp'@'localhost';

DROP DATABASE IF EXISTS `ragemp`;
