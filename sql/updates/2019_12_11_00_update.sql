-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               8.0.18 - MySQL Community Server - GPL
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Exportiere Struktur von Tabelle ragemp.securitytokens
DROP TABLE IF EXISTS `securitytokens`;
CREATE TABLE IF NOT EXISTS `securitytokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `identifier` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `securitytoken` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Exportiere Daten aus Tabelle ragemp.securitytokens: ~0 rows (ungefähr)
DELETE FROM `securitytokens`;
/*!40000 ALTER TABLE `securitytokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `securitytokens` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle ragemp.team
DROP TABLE IF EXISTS `team`;
CREATE TABLE IF NOT EXISTS `team` (
  `teamID` int(11) NOT NULL AUTO_INCREMENT,
  `teamName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `teamLeaderCharID` int(11) DEFAULT NULL,
  PRIMARY KEY (`teamID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

-- Exportiere Daten aus Tabelle ragemp.team: ~0 rows (ungefähr)
DELETE FROM `team`;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` (`teamID`, `teamName`, `teamLeaderCharID`) VALUES
	(1, 'Projektleitung', 1),
	(2, 'Super Administrator', 0),
	(3, 'Administrator', 0),
	(4, 'Supporter', 0),
	(5, 'Guide', 0);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle ragemp.teamranks
DROP TABLE IF EXISTS `teamranks`;
CREATE TABLE IF NOT EXISTS `teamranks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamID` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `teamRankName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `teamRank` int(11) DEFAULT NULL,
  `canBill` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `canInvite` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `payCheck` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle ragemp.teamranks: ~8 rows (ungefähr)
DELETE FROM `teamranks`;
/*!40000 ALTER TABLE `teamranks` DISABLE KEYS */;
INSERT INTO `teamranks` (`id`, `teamID`, `teamRankName`, `teamRank`, `canBill`, `canInvite`, `payCheck`) VALUES
	(1, '1', 'Projektleitung', 10, 'Y', 'Y', 0);
/*!40000 ALTER TABLE `teamranks` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle ragemp.teamusers
DROP TABLE IF EXISTS `teamusers`;
CREATE TABLE IF NOT EXISTS `teamusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `playerCharID` int(11) DEFAULT NULL,
  `teamID` int(11) DEFAULT NULL,
  `teamRankID` int(11) DEFAULT NULL,
  `playerFractionDuty` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'N',
  `playerFractionCanBuy` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'N',
  `clothes` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportiere Daten aus Tabelle ragemp.teamusers: ~0 rows (ungefähr)
DELETE FROM `teamusers`;
/*!40000 ALTER TABLE `teamusers` DISABLE KEYS */;
INSERT INTO `teamusers` (`id`, `playerCharID`, `teamID`, `teamRankID`, `playerFractionDuty`, `playerFractionCanBuy`, `clothes`) VALUES
	(1, 1, 1, 10, 'Y', 'Y', 'Projektleitung');
/*!40000 ALTER TABLE `teamusers` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
