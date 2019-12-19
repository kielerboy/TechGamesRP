-- Account Update table row name
ALTER TABLE `accounts`
	CHANGE COLUMN `isAlpha` `isWhitelisted` ENUM('Y','N') NULL DEFAULT 'N' COLLATE 'utf8_general_ci' AFTER `isTeam`;