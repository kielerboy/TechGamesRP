-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Dez 2019 um 11:29
-- Server-Version: 10.4.8-MariaDB
-- PHP-Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `ragemp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(63) DEFAULT NULL,
  `email` varchar(127) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `socialClub` varchar(63) DEFAULT NULL,
  `currentSessionhash` varchar(255) DEFAULT NULL,
  `maxWhitelistTries` int(11) DEFAULT 2,
  `isTeam` enum('Y','N') DEFAULT 'N',
  `isAlpha` enum('Y','N') DEFAULT 'N',
  `isDev` enum('Y','N') DEFAULT 'N',
  `isBanned` enum('Y','N') NOT NULL DEFAULT 'N',
  `nextwhitelist` varchar(50) DEFAULT NULL,
  `TSclientIP` varchar(50) DEFAULT NULL,
  `hwid` varchar(1000) DEFAULT 'none',
  `createdAt` datetime DEFAULT current_timestamp(),
  `verificationKey` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `actions`
--

CREATE TABLE `actions` (
  `id` int(11) NOT NULL,
  `ped` int(11) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `fraktionsAktion` varchar(50) DEFAULT NULL,
  `krz` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `actions`
--

INSERT INTO `actions` (`id`, `ped`, `action`, `fraktionsAktion`, `krz`) VALUES
(4, 4, 'bank', 'none', 'fl1'),
(5, 5, 'garage', 'none', 'garage1'),
(6, 6, 'garage', 'none', 'garage2'),
(7, 7, 'garage', 'none', 'garage3'),
(8, 8, 'garage', 'none', 'garage4'),
(9, 9, 'garage', 'none', 'garage5'),
(10, 10, 'garage', 'none', 'garage6'),
(11, 11, 'garage', 'none', 'garage7'),
(12, 12, 'garage', 'none', 'garage8'),
(13, 13, 'garage', 'none', 'garage9'),
(14, 14, 'garage', 'none', 'garage10'),
(15, 15, 'garage', 'none', 'garage11'),
(16, 16, 'garage', 'none', 'garage12'),
(17, 17, 'garage', 'none', 'garage13'),
(18, 18, 'shop', 'none', 'shop1'),
(19, 19, 'shop', 'none', 'shop2'),
(20, 20, 'shop', 'none', 'shop2'),
(21, 21, 'shop', 'none', 'ammunation1'),
(22, 22, 'shop', 'none', 'shop4'),
(23, 23, 'shop', 'none', 'shop5'),
(24, 24, 'shop', 'none', 'shop6'),
(25, 25, 'shop', 'Ammunation', 'shopammu'),
(26, 26, 'shop', 'none', 'shop7'),
(28, 28, 'shop', 'none', 'shop8'),
(29, 29, 'shop', 'none', 'shop9'),
(30, 30, 'shop', 'none', 'shop10'),
(31, 31, 'shop', 'none', 'shop11'),
(32, 32, 'shop', 'none', 'shop12'),
(33, 33, 'shop', 'none', 'shop13'),
(34, 34, 'shop', 'none', 'shop14'),
(35, 35, 'shop', 'none', 'shop15'),
(37, 37, 'shop', 'none', 'liqour'),
(38, 38, 'weed', 'none', 'weeddealer'),
(39, 39, 'garage', 'none', 'PoliceGarage'),
(40, 40, 'garage', 'none', 'MedicGarage'),
(41, 41, 'garage', 'none', 'MIBGarage'),
(42, 42, 'garage', 'none', 'TaxiGarage'),
(43, 43, 'garage', 'none', 'DOJGarage'),
(44, 44, 'shop', 'LSPD', 'ammunationlspd'),
(45, 45, 'shop', 'Department of Justice', 'ammunationdoj'),
(46, 46, 'shop', 'Bahama Mamas', 'shopbahama'),
(47, 47, 'shop', 'Yellow Jack', 'shopyellow'),
(48, 48, 'shop', 'Vanilla Unicorn', 'shopvanilla'),
(49, 49, 'world', 'none', 'WeedBearb'),
(50, 50, 'world', 'none', 'WeedSell'),
(51, 51, 'world', 'none', 'MushroomBearb'),
(52, 52, 'world', 'none', 'MushroomSell'),
(53, 53, 'garage', 'none', 'LSCGarage'),
(54, 54, 'world', 'none', 'vehKeys'),
(55, 55, 'garage', 'none', 'Bennys'),
(56, 56, 'garage', 'none', 'Beekers'),
(57, 57, 'garage', 'none', 'TrashForCashGarage'),
(58, 58, 'garage', 'none', 'LuckyCarsGarage'),
(59, 59, 'garage', 'none', 'LSPDHeli'),
(60, 60, 'garage', 'none', 'MedicHeli'),
(61, 61, 'shop', 'none', 'objWaterdispenser'),
(62, 62, 'shop', 'none', 'objSnacks'),
(63, 63, 'shop', 'none', 'objDrinks'),
(64, 64, 'shop', 'none', 'objCoffee'),
(65, 65, 'shop', 'none', 'objKippen'),
(66, 66, 'world', 'none', 'manyduty'),
(67, 67, 'garage', 'none', 'boomeranggar'),
(68, 68, 'world', 'none', 'phoneshop'),
(69, 69, 'bank', 'none', 'fl2'),
(71, 71, 'shop', 'none', 'stadtshop1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `adminlogs`
--

CREATE TABLE `adminlogs` (
  `id` int(11) NOT NULL,
  `playername` varchar(255) DEFAULT NULL,
  `log` varchar(255) DEFAULT NULL,
  `socialclub` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `datum` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `adminlogs`
--

INSERT INTO `adminlogs` (`id`, `playername`, `log`, `socialclub`, `ip`, `datum`) VALUES
(1, 'Joshua Gerke', 'Joshua Gerke hatJoshua_Gerke  geheilt', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 05:45:25'),
(2, 'Joshua Gerke', 'Joshua Gerke hat sich zuJoshua_Gerke  teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 05:47:27'),
(3, 'Joshua Gerke', 'Joshua Gerke hatJoshua_Gerke  geheilt', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 05:47:34'),
(4, 'Joshua Gerke', 'Joshua Gerke hat sich teleportiert zu: lspd', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 14:24:29'),
(5, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt pol718', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:05:00'),
(6, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_assaultrifle', 'RealCryPixel', '93.198.197.166', '2019-11-25 20:12:05'),
(7, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_knuckle', 'RealCryPixel', '93.198.197.166', '2019-11-25 20:12:15'),
(8, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault4', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:19:32'),
(9, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:19:37'),
(10, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault4', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:19:46'),
(11, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:20:02'),
(12, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:29:42'),
(13, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:35:42'),
(14, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_rpg', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:37:14'),
(15, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_stickybomb', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:37:23'),
(16, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:39:46'),
(17, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_granade', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:43:36'),
(18, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_knife', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:43:41'),
(19, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_flashlight', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:44:09'),
(20, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt 2019m5', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 21:39:48'),
(21, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 21:46:35'),
(22, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault4', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 21:46:37'),
(23, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt pol718', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:16:45'),
(24, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt 2019m5', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:17:24'),
(25, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-26 18:26:44'),
(26, 'Joshua Gerke', 'Joshua Gerke hat sich zu1444.6049, 6333.1186, 23.8875 teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:27:55'),
(27, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt 2019m5', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:28:26'),
(28, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:28:30'),
(29, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:29:49'),
(30, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault4', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:34:11'),
(31, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt flashlight', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:38:18'),
(32, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_flashlight', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:38:22'),
(33, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt buzzard', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:38:35'),
(34, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_stungun', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:44:20'),
(35, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:56:58'),
(36, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:21:31'),
(37, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt 2019M5', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:23:53'),
(38, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault4', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:23:55'),
(39, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_stungun', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:25:33'),
(40, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:25:49'),
(41, 'Joshua Gerke', 'Joshua Gerke hat sich zu-550, 5890, 32 teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:26:48'),
(42, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:27:03'),
(43, 'Jens Prada', 'Jens Prada hat sich teleportiert zu: Joshua_Gerke', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:27:03'),
(44, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:28:36'),
(45, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:29:38'),
(46, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt pol718', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:44:33'),
(47, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_stungun', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:47:37'),
(48, 'Daniel Elskamp', 'Daniel Elskamp hat sich zuJens_Prada  teleportiert', 'umut32a', '84.119.145.205', '2019-11-26 23:16:45'),
(49, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_assaultrifle', 'RealCryPixel', '93.198.197.166', '2019-11-26 23:16:55'),
(50, 'Daniel Elskamp', 'Daniel Elskamp hat sich zuJens_Prada teleportiert', 'umut32a', '84.119.145.205', '2019-11-26 23:16:57'),
(51, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_knuckle', 'RealCryPixel', '93.198.197.166', '2019-11-26 23:17:00'),
(52, 'Daniel Elskamp', 'Daniel Elskamp hat sich ein TempVeh gespawnt fbi', 'umut32a', '127.0.0.1', '2019-11-27 02:18:02'),
(53, 'Joshua Gerke', 'Joshua Gerke hat sich zuDaniel_Elskamp teleportiert', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:18:12'),
(54, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault4', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:31:51'),
(55, 'Daniel Elskamp', 'Daniel Elskamp hat sich ein TempVeh gespawnt rhino', 'umut32a', '127.0.0.1', '2019-11-27 02:33:31'),
(56, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_stungun', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:34:15'),
(57, 'Daniel Elskamp', 'Daniel Elskamp hat sich ein TempVeh gespawnt fbi', 'umut32a', '127.0.0.1', '2019-11-27 02:34:18'),
(58, 'Daniel Elskamp', 'Daniel Elskamp hat sich teleportiert zu: lspd', 'umut32a', '127.0.0.1', '2019-11-27 02:35:51'),
(59, 'Daniel Elskamp', 'Daniel Elskamp hatJoshua_Gerke zu sich Teleportiert', 'umut32a', '127.0.0.1', '2019-11-27 02:36:07'),
(60, 'Daniel Elskamp', 'Daniel Elskamp hat sich ein TempVeh gespawnt renault4', 'umut32a', '127.0.0.1', '2019-11-27 02:38:17'),
(61, 'Daniel Elskamp', 'Daniel Elskamp hat sich ein TempVeh gespawnt fbi', 'umut32a', '127.0.0.1', '2019-11-27 02:42:55'),
(62, 'Daniel Elskamp', 'Daniel Elskamp hat sich ein TempVeh gespawnt rhino', 'umut32a', '127.0.0.1', '2019-11-27 02:43:14'),
(63, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt pol718', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:53:33'),
(64, 'Joshua Gerke', 'Joshua Gerke hat sich ein TempVeh gespawnt renault4', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:53:56'),
(65, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:54:06'),
(66, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:05:34'),
(67, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:05:56'),
(68, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:06:59'),
(69, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:07:05'),
(70, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:07:19'),
(71, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:07:40'),
(72, 'Joshua Gerke', 'Joshua Gerke hat sich teleportiert zu: lspd', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:12:19'),
(73, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt Sanchez', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:27:38'),
(74, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt Sanchez', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:28:25'),
(75, 'Jens Prada', 'Jens Prada hat den Dienst angetreten als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:28:54'),
(76, 'Jens Prada', 'Jens Prada hat den Dienst angetreten als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:28:59'),
(77, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt Sanchez', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:29:03'),
(78, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt Sanchez', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:29:32'),
(79, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt 2019M5', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:43:02'),
(80, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_stungun', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 18:35:21'),
(81, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt 2019BMW5', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:33:05'),
(82, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt 2019BMW5', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:33:14'),
(83, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt 2019BMWM5', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:33:22'),
(84, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt T20', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:33:30'),
(85, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_appistol', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:35:06'),
(86, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_c4', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:36:00'),
(87, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_rpg', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:36:09'),
(88, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_minigun', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:36:23'),
(89, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:38:34'),
(90, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_sniperrifle', 'RealCryPixel', '93.198.197.166', '2019-11-29 19:42:05'),
(91, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:14:18'),
(92, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_minigun', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:15:40'),
(93, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:16:50'),
(94, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_minigun', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:17:19'),
(95, 'Jens Prada', 'Jens Prada hat den Dienst verlassen als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:19:58'),
(96, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_granate', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:20:33'),
(97, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:22:58'),
(98, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_minigun', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:25:06'),
(99, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_sniperrifle', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:29:24'),
(100, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:32:39'),
(101, 'Jens Prada', 'Jens Prada hat sich zuJoshua_gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:32:51'),
(102, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:32:53'),
(103, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:32:57'),
(104, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_appistol', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:33:33'),
(105, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 20:50:41'),
(106, 'Jens Prada', 'Jens Prada hat den Dienst angetreten als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:51:22'),
(107, 'Jens Prada', 'Jens Prada hat den Dienst angetreten als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:51:23'),
(108, 'Jens Prada', 'Jens Prada hat den Dienst angetreten als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:51:25'),
(109, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:51:46'),
(110, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt t20', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:00:48'),
(111, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:09:48'),
(112, 'Jens Prada', 'Jens Prada hat den Dienst angetreten als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:17:18'),
(113, 'Jens Prada', 'Jens Prada hat den Dienst angetreten als NOOSE Agent', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:17:22'),
(114, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt Sanchez', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:21:22'),
(115, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:27:59'),
(116, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt Journey', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:35:06'),
(117, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt Journey', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:36:07'),
(118, 'Jens Prada', 'Jens Prada hat sich ein TempVeh gespawnt t20', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:47:41'),
(119, 'Jens Prada', 'Jens Prada hat sich zuJoshua_Gerke teleportiert', 'RealCryPixel', '93.198.197.166', '2019-11-30 19:54:58'),
(120, 'Joshua Gerke', 'Joshua Gerke hat sich zuJens_Prada teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-30 19:58:38'),
(121, 'Joshua Gerke', 'Joshua Gerke hatJens_Prada zu sich Teleportiert', 'CommanderDonkey2', '127.0.0.1', '2019-11-30 19:59:30'),
(122, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_rpg', 'CommanderDonkey2', '127.0.0.1', '2019-11-30 20:00:08'),
(123, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_knife', 'CommanderDonkey2', '127.0.0.1', '2019-11-30 20:01:51'),
(124, 'Joshua Gerke', 'Joshua Gerke hat sich eine Waffe gegeben: weapon_pistol', 'CommanderDonkey2', '127.0.0.1', '2019-11-30 20:03:45'),
(125, 'Jens Prada', 'Jens Prada hat sich eine Waffe gegeben: weapon_minigun', 'RealCryPixel', '93.198.197.166', '2019-11-30 20:07:33'),
(126, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.7', '2019-12-02 17:34:59'),
(127, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.7', '2019-12-02 17:35:01'),
(128, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.7', '2019-12-02 17:35:03'),
(129, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.7', '2019-12-02 17:35:05'),
(130, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt fk8', 'Amaazen', '88.130.60.7', '2019-12-02 17:36:42'),
(131, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt mrpd', 'Amaazen', '88.130.60.7', '2019-12-02 17:37:20'),
(132, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt mrpd', 'Amaazen', '88.130.60.7', '2019-12-02 17:37:30'),
(133, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt pol718', 'Amaazen', '88.130.60.7', '2019-12-02 17:37:40'),
(134, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt manches', 'Amaazen', '88.130.60.7', '2019-12-02 17:47:13'),
(135, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt manchez', 'Amaazen', '88.130.60.7', '2019-12-02 17:47:16'),
(136, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt t20', 'Amaazen', '88.130.60.7', '2019-12-02 17:50:01'),
(137, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt sg4', 'Amaazen', '88.130.60.7', '2019-12-02 17:51:24'),
(138, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt list', 'Amaazen', '88.130.60.7', '2019-12-02 17:51:26'),
(139, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt pariah', 'Amaazen', '88.130.60.7', '2019-12-02 17:51:38'),
(140, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.7', '2019-12-02 17:53:27'),
(141, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt pariah', 'Amaazen', '88.130.60.7', '2019-12-02 17:53:45'),
(142, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.164', '2019-12-02 23:47:05'),
(143, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.164', '2019-12-02 23:47:07'),
(144, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.164', '2019-12-02 23:47:08'),
(145, 'Maddox Knight', 'Maddox Knight hat den Dienst angetreten als NOOSE Agent', 'Amaazen', '88.130.60.164', '2019-12-02 23:47:09'),
(146, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt tornado', 'Amaazen', '88.130.60.164', '2019-12-02 23:50:52'),
(147, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt p1', 'Amaazen', '88.130.60.164', '2019-12-02 23:51:02'),
(148, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt pd1', 'Amaazen', '88.130.60.164', '2019-12-02 23:51:04'),
(149, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt xpro80', 'Amaazen', '88.130.60.164', '2019-12-02 23:51:09'),
(150, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt pro80', 'Amaazen', '88.130.60.164', '2019-12-02 23:51:12'),
(151, 'Maddox Knight', 'Maddox Knight hat sich ein TempVeh gespawnt raiden', 'Amaazen', '88.130.60.164', '2019-12-02 23:51:19'),
(152, 'Dirk Schmirk', 'Dirk Schmirk hat sich ein TempVeh gespawnt fk8', 'LukaruHD', '46.90.222.237', '2019-12-03 14:28:46'),
(153, 'Dirk Schmirk', 'Dirk Schmirk hat sich ein TempVeh gespawnt mrpd', 'LukaruHD', '46.90.222.237', '2019-12-03 14:28:57'),
(154, 'Dirk Schmirk', 'Dirk Schmirk hat den Dienst angetreten als NOOSE Agent', 'LukaruHD', '46.90.222.237', '2019-12-03 18:31:32'),
(155, 'Dirk Schmirk', 'Dirk Schmirk hat sich ein TempVeh gespawnt fk8', 'LukaruHD', '46.90.222.237', '2019-12-03 18:31:55'),
(156, 'Dirk Schmirk', 'Dirk Schmirk hat sich ein TempVeh gespawnt pol718', 'LukaruHD', '46.90.222.237', '2019-12-03 18:36:48'),
(157, 'Dirk Schmirk', 'Dirk Schmirk hat sich ein TempVeh gespawnt mrpd', 'LukaruHD', '46.90.222.237', '2019-12-03 18:38:23'),
(158, 'Dirk Schmirk', 'Dirk Schmirk hat sich ein TempVeh gespawnt mrpd', 'LukaruHD', '46.90.222.237', '2019-12-03 18:38:38');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bank_konten`
--

CREATE TABLE `bank_konten` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) DEFAULT 0,
  `amout` decimal(38,2) DEFAULT 0.00,
  `kontonummer` varchar(50) DEFAULT NULL,
  `beschreibung` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `bank_konten`
--

INSERT INTO `bank_konten` (`id`, `ownerId`, `amout`, `kontonummer`, `beschreibung`) VALUES
(1, 1, '436685.43', '1337', 'Girokonto'),
(2, 2, '454775.65', '1338', 'Girokonto'),
(3, 3, '505623.00', '1339', 'Girokonto');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `blips`
--

CREATE TABLE `blips` (
  `id` int(11) NOT NULL,
  `sprite` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `posX` double DEFAULT NULL,
  `posY` double DEFAULT NULL,
  `posZ` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `blips`
--

INSERT INTO `blips` (`id`, `sprite`, `title`, `color`, `posX`, `posY`, `posZ`) VALUES
(2, '207', 'Fleeca Bank', '2', -1212.2474365234375, -330.2540588378906, 37.787086486816406),
(3, '446', 'LSC', '7', -336, -134, 39),
(5, '225', 'Gebrauchtwagen', '51', -41.146305084228516, -1675.3028564453125, 29.435382843017578),
(8, '52', 'Shop', '4', -48.000640869140625, -1757.4271240234375, 29.42100715637207),
(9, '52', 'Shop', '4', -707.4088745117188, -914.0997314453125, 19.215587615966797),
(10, '361', 'Tankstelle', '1', -723.22998046875, -935.1588134765625, 19.21392822265625),
(11, '110', 'Ammunation', '4', -662.9613647460938, -933.6107177734375, 21.829214096069336),
(12, '52', 'Shop', '4', 1164.871337890625, -323.8148498535156, 69.20515441894531),
(13, '52', 'Liqourladen', '4', 1134.1392822265625, -982.592041015625, 46.415802001953125),
(14, '110', 'Ammunation', '4', 253.9395751953125, -50.1750373840332, 69.94105529785156),
(15, '52', 'Shop', '4', 372.5933837890625, 326.70977783203125, 103.56636810302734),
(16, '110', 'Ammunation', '4', 2569.630859375, 292.4542236328125, 108.73486328125),
(17, '52', 'Shop', '4', 2555.534912109375, 380.8191833496094, 108.62293243408203),
(18, '52', 'Shop', '4', 549.310791015625, 2669.538818359375, 42.156490325927734),
(19, '52', 'Shop', '4', -1820.138671875, 793.3545532226562, 139.232666015625),
(20, '110', 'Ammunation', '4', -3174.239501953125, 1086.67041015625, 20.838748931884766),
(23, '642', 'Gärtner', '4', -1341.696, 58.822, 55.2456),
(24, '351', 'Department of Justice', '4', 234.92, -407.44, 47.92),
(25, '73', 'Discount', '46', 77.86, -1391.36, 29),
(26, '73', 'Suburban', '46', -1201.63, -778.18, 17.33),
(27, '52', 'Liqourladen', '4', -1491.14, -383.65, 40.16),
(28, '73', 'Ponsonbys', '46', -714.031, -155.1, 37.41),
(29, '207', 'Fleeca Bank', '2', 150.11, -1039.71, 29.37),
(30, '526', 'LSPD', '63', 443.4938659667969, -983.3740844726562, 30.689605712890625),
(31, '609', 'FIB', '37', 104.96219635009766, -744.386474609375, 45.75474166870117),
(32, '61', 'Medical Center', '25', 302.8407287597656, -1439.9625244140625, 29.79932403564453),
(33, '50', 'Garage', '37', 214.02804565429688, -809.2930908203125, 31.014892578125),
(34, '108', 'Zentralbank', '25', 235.93690490722656, 217.28968811035156, 106.28669738769531),
(35, '50', 'Garage', '37', 100.4239273071289, -1072.9090576171875, 29.37411880493164),
(36, '498', 'Rathaus', '37', -1080.4423828125, -248.18162536621094, 37.763328552246094),
(38, '586', 'Richman Hotel', '37', -1274.540771484375, 314.6220397949219, 65.51178741455078),
(39, '50', 'Garage', '37', -178.80679321289062, 315.5001525878906, 97.9544906616211),
(40, '50', 'Garage', '37', 1036.2972412109375, -763.0496826171875, 57.992984771728516),
(41, '307', 'Flughafen', '37', -1037.6270751953125, -2737.595458984375, 20.16927146911621),
(42, '50', 'Garage', '37', -1050.5343017578125, -2650.705078125, 13.345600128173828),
(43, '188', 'JVA', '37', 1693.8648681640625, 2604.23291015625, 45.06172180175781),
(44, '50', 'Garage', '37', -1659.667236328125, -952.2337646484375, 7.717881202697754),
(45, '50', 'Garage', '37', -904.6412963867188, -144.60011291503906, 41.88425064086914),
(46, '50', 'Garage', '37', -1159.2119140625, -740.2392578125, 19.88991928100586),
(47, '50', 'Garage', '37', -72.8980712890625, -2004.299072265625, 18.275279998779297),
(48, '50', 'Garage', '37', 1098.6314697265625, 2657.378662109375, 38.1408805847168),
(49, '50', 'Garage', '37', 1870.1717529296875, 3755.9130859375, 32.98725128173828),
(50, '50', 'Garage', '37', -93.3106689453125, 6323.08251953125, 31.490365982055664),
(51, '52', 'Shop', '37', -1223.2608642578125, -906.6627807617188, 12.326347351074219),
(52, '361', 'Tankstelle', '1', 268.19866943359375, -1257.0950927734375, 29.142894744873047),
(53, '361', 'Tankstelle', '1', -526.823974609375, -1211.0894775390625, 18.184833526611328),
(54, '361', 'Tankstelle', '1', 2578.198486328125, 363.1302490234375, 107.9538803100586),
(55, '52', 'Shop', '37', 2678.539306640625, 3280.610595703125, 55.24113082885742),
(56, '52', 'Shop', '37', 1729.5606689453125, 6415.78515625, 35.037227630615234),
(57, '361', 'Tankstelle', '1', 184.0997772216797, 6603.70654296875, 31.345060348510742),
(58, '361', 'Tankstelle', '1', -2552.932373046875, 2330.32470703125, 32.555702209472656),
(59, '52', 'Shop', '37', -2967.894775390625, 390.5069274902344, 15.043313026428223),
(60, '361', 'Tankstelle', '1', -2091.760498046875, -312.99676513671875, 12.2582368850708),
(61, '71', 'Friseur', '37', 1931.4090576171875, 3730.171142578125, 32.84443283081055),
(62, '361', 'Tankstelle', '1', 2005.4737548828125, 3773.950439453125, 32.403934478759766),
(63, '52', 'Shop', '37', 1963.96337890625, 3743.746337890625, 32.3437385559082),
(64, '71', 'Friseur', '37', -32.727020263671875, -152.77320861816406, 57.076507568359375),
(65, '110', 'Ammunation', '4', 19.417722702026367, -1108.671630859375, 29.79702377319336),
(66, '110', 'Ammunation', '4', 843.7813720703125, -1033.9339599609375, 28.194860458374023),
(67, '361', 'Tankstelle', '1', 1179.3487548828125, -327.6301574707031, 69.1746597290039),
(68, '52', 'Shop', '37', 28.95821762084961, -1344.1158447265625, 29.497024536132812),
(69, '361', 'Tankstelle', '1', -63.94716262817383, -1764.3455810546875, 28.79763412475586),
(70, '362', 'Maskenhändler', '37', -1336.3984375, -1277.1861572265625, 4.879312038421631),
(71, '73', 'Ponsonbys', '46', -164.77420043945312, -302.2771911621094, 39.7332878112793),
(72, '73', 'Suburban', '46', 126.70987701416016, -225.06369018554688, 54.557830810546875),
(73, '73', 'Ponsonbys', '46', -1449.54736328125, -238.81390380859375, 49.8134765625),
(74, '73', 'Suburban', '46', -3169.615234375, 1042.619140625, 20.863210678100586),
(75, '73', 'Discount', '46', -1102.4102783203125, 2711.68896484375, 19.107866287231445),
(76, '73', 'Suburban', '46', 612.7442016601562, 2763.61767578125, 42.0881233215332),
(77, '52', 'Shop', '4', 549.35546875, 2669.331298828125, 42.156494140625),
(78, '73', 'Discount', '46', 1196.7745361328125, 2711.706298828125, 38.22262954711914),
(79, '52', 'Shop', '4', 1165.2696533203125, 2710.872802734375, 38.15770721435547),
(80, '73', 'Discount', '46', 1695.4073486328125, 4822.7939453125, 42.06308364868164),
(81, '52', 'Shop', '4', 1697.4423828125, 4923.34912109375, 42.06367492675781),
(82, '73', 'Discount', '46', 5.8737077713012695, 6511.37841796875, 31.877853393554688),
(83, '361', 'Tankstelle', '1', 618.04736328125, 269.4142150878906, 103.08946228027344),
(84, '225', 'Airport Carshop', '51', -1011.875, -2687.733, 13.97),
(85, '1', 'Tabak-Beeren Farm', '4', 1839.7, 5033, 56.9),
(86, '467', 'Tabak Verarbeiter', '4', 758.57, -815.89, 26.29),
(87, '434', 'Tabak Verkäufer', '4', 1710, 4728, 42.15),
(88, '1', 'Trauben Farm', '4\r\n', -1933, 1904, 175.8),
(89, '467', 'Trauben Verarbeiter', '4', -51, 1905.52, 195.4),
(90, '434', 'Trauben Verkäufer', '4', -1890.2, 2051, 141),
(91, '93', 'Bahama Mamas', '48', -1390, -600, 27),
(92, '93', 'Yellow Jack', '1', 1982.4, 3053, 44),
(93, '121', 'Vanilla Unicorn', '1', 130, -1282, 26),
(95, '75', 'Blazing Tattoo', '67', 319, 180, 103),
(96, '75', 'The Pit', '67', -1152, -1423, 4.95),
(99, '75', 'Tattoo Studio Ink Inc.', '67', -3170, 1072, 20),
(101, '255', 'Schlüsseldienst', '48', 170.073, -1799.45, 29.31),
(103, '50', 'Garage', '37', 275.1404113769531, -344.7073974609375, 45.17341613769531),
(105, '207', 'Fleeca Bank', '2', -2963.061, 482.294, 15.703),
(106, '685', 'Stadtpark', '39', 213.72299194335938, -922.786865234375, 60.70951843261719),
(107, '361', 'Tankstelle', '1', -318.6043701171875, -1471.4288330078125, 30.548494338989258);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `business`
--

CREATE TABLE `business` (
  `businessID` int(11) NOT NULL,
  `businessName` varchar(255) DEFAULT NULL,
  `businessLeaderCharId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `business`
--

INSERT INTO `business` (`businessID`, `businessName`, `businessLeaderCharId`) VALUES
(1, 'Bennys Werkstatt', 550),
(2, 'Los Santos Customs', 539),
(3, 'Los Santos Meteor', 783),
(4, 'Bahama Mamas', 272),
(5, 'Tequilala', 0),
(6, 'Vanilla Unicorn', 590),
(7, 'Yellow Jack', 1403),
(8, 'Ammunation', 223),
(9, 'Blazing Tattoo', 1),
(10, 'The Pit', 0),
(11, 'Lucky Cars', 0),
(12, 'Cash for Trash', 1),
(13, 'Tattoo Studio Ink Inc.', 0),
(14, 'Beekers Garage & Part', 1350),
(15, 'Legal Care', 0),
(16, 'Autohaus Boomerang', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `businessranks`
--

CREATE TABLE `businessranks` (
  `id` int(11) NOT NULL,
  `businessID` varchar(50) DEFAULT NULL,
  `businessRankName` varchar(50) DEFAULT NULL,
  `businessRank` int(11) DEFAULT NULL,
  `canBill` enum('Y','N') DEFAULT NULL,
  `canInvite` enum('Y','N') DEFAULT NULL,
  `payCheck` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `businessranks`
--

INSERT INTO `businessranks` (`id`, `businessID`, `businessRankName`, `businessRank`, `canBill`, `canInvite`, `payCheck`) VALUES
(1, '1', 'Eigentümer', 5, 'Y', 'Y', 0),
(2, '1', 'Geschäftsführer', 4, 'Y', 'Y', 0),
(3, '1', 'Meister', 3, 'Y', 'N', 0),
(4, '1', 'Mechaniker', 2, 'Y', 'N', 0),
(5, '1', 'Azubi', 1, 'Y', 'N', 0),
(6, '1', 'Praktikant', 0, 'N', 'N', 0),
(7, '2', 'Eigentümer', 5, 'Y', 'Y', 0),
(8, '2', 'Geschäftsführer', 4, 'Y', 'Y', 0),
(9, '2', 'Meister', 3, 'Y', 'N', 0),
(10, '2', 'Mechaniker', 2, 'Y', 'N', 0),
(11, '2', 'Azubi', 1, 'Y', 'N', 0),
(12, '2', 'Praktikant', 0, 'N', 'N', 0),
(13, '3', 'Journalist', 0, 'N', 'N', 0),
(14, '3', 'Stellv. Redaktionsleiter', 1, 'N', 'N', 0),
(15, '3', 'Redaktionsleiter', 2, 'N', 'Y', 0),
(16, '3', 'Verlagsleiter', 3, 'N', 'Y', 0),
(17, '6', 'Chef', 3, 'Y', 'Y', 0),
(18, '6', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(19, '6', 'Angestellter', 1, 'N', 'N', 0),
(20, '7', 'Chef', 3, 'Y', 'Y', 0),
(21, '7', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(22, '7', 'Angestellter', 1, 'N', 'N', 0),
(23, '8', 'Chef', 3, 'Y', 'Y', 0),
(24, '8', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(25, '8', 'Angestellter', 1, 'N', 'N', 0),
(26, '4', 'Chef', 3, 'Y', 'Y', 0),
(27, '4', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(28, '4', 'Angestellter', 1, 'N', 'N', 0),
(29, '9', 'Chef', 3, 'Y', 'Y', 0),
(30, '9', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(31, '9', 'Angestellter', 1, 'N', 'N', 0),
(32, '10', 'Chef', 3, 'Y', 'Y', 0),
(33, '10', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(34, '10', 'Angestellter', 1, 'N', 'N', 0),
(35, '11', 'Chef', 3, 'Y', 'Y', 0),
(36, '11', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(37, '11', 'Angestellter', 1, 'N', 'N', 0),
(38, '12', 'Chef', 3, 'Y', 'Y', 0),
(39, '12', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(40, '12', 'Angestellter', 1, 'N', 'N', 0),
(41, '13', 'Chef', 3, 'Y', 'Y', 0),
(42, '13', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(43, '13', 'Angestellter', 1, 'N', 'N', 0),
(44, '14', 'Chef', 3, 'Y', 'Y', 0),
(45, '14', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(46, '14', 'Angestellter', 1, 'N', 'N', 0),
(47, '15', 'Chef', 3, 'Y', 'Y', 0),
(48, '15', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(49, '15', 'Angestellter', 1, 'N', 'N', 0),
(50, '16', 'Chef', 3, 'Y', 'Y', 0),
(51, '16', 'Stellv. Chef', 2, 'Y', 'Y', 0),
(52, '16', 'Angestellter', 1, 'N', 'N', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `businessusers`
--

CREATE TABLE `businessusers` (
  `id` int(11) NOT NULL,
  `playerCharID` int(11) DEFAULT NULL,
  `businessID` int(11) DEFAULT NULL,
  `businessRankID` int(11) DEFAULT NULL,
  `playerBusinessDuty` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buyed_clothes`
--

CREATE TABLE `buyed_clothes` (
  `id` int(11) NOT NULL,
  `playerCharID` int(11) NOT NULL DEFAULT 0,
  `clothesID` int(11) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `zone` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `buyed_clothes`
--

INSERT INTO `buyed_clothes` (`id`, `playerCharID`, `clothesID`, `name`, `zone`) VALUES
(32, 1, 40, 'schulterfreies Shirt4', 'Oberteile'),
(33, 1, 40, 'schulterfreies Shirt4', 'Oberteile'),
(34, 1, 3, 'Torso', 'Torsos'),
(35, 1, 38, 'schulterfreies Shirt3', 'Oberteile'),
(36, 1, 3, 'Torso', 'Torsos'),
(37, 1, 60, 'Sneakers7', 'Schuhe'),
(38, 1, 80, 'Stiftrock1', 'Hosen'),
(39, 1, 0, 'Torso', 'Torsos'),
(40, 1, 249, 'Poloshirt8', 'Oberteile'),
(41, 1, 80, 'Stiftrock1', 'Hosen'),
(42, 1, 60, 'Sneakers7', 'Schuhe'),
(43, 1, 249, 'Poloshirt8', 'Oberteile'),
(44, 1, 0, 'Torso', 'Torsos'),
(45, 1, 80, 'Stiftrock1', 'Hosen'),
(46, 1, 60, 'Sneakers7', 'Schuhe'),
(47, 1, 14, 'Poloshirt1', 'Oberteile'),
(48, 1, 0, 'Torso', 'Torsos'),
(49, 1, 80, 'Stiftrock1', 'Hosen'),
(50, 1, 60, 'Sneakers7', 'Schuhe'),
(51, 1, 60, 'Sneakers7', 'Schuhe'),
(52, 1, 14, 'Poloshirt1', 'Oberteile'),
(53, 1, 14, 'Torso', 'Torsos'),
(54, 1, 80, 'Stiftrock1', 'Hosen'),
(55, 1, 14, 'Torso', 'Torsos'),
(56, 1, 14, 'Torso', 'Torsos'),
(57, 1, 195, 'Oberteil26', 'Oberteile'),
(58, 1, 105, 'Bademantel', 'Oberteile'),
(59, 1, 121, 'kariertes Hemd2', 'Oberteile'),
(60, 1, 80, 'BoyfriendJeans', 'Hosen'),
(61, 1, 121, 'kariertes Hemd2', 'Oberteile'),
(62, 1, 80, 'BoyfriendJeans', 'Hosen'),
(63, 1, 223, 'Oberteil29', 'Oberteile'),
(64, 1, 16, 'Stiftrock2', 'Hosen'),
(65, 1, 4, 'Torso', 'Torsos'),
(66, 1, 170, 'Oberteil22', 'Oberteile'),
(67, 1, 4, 'Torso', 'Torsos'),
(68, 1, 0, 'Torso', 'Torsos'),
(69, 1, 14, 'Poloshirt1', 'Oberteile'),
(70, 1, 14, 'Poloshirt1', 'Oberteile'),
(71, 1, 0, 'Torso', 'Torsos'),
(72, 1, 14, 'Torso', 'Torsos'),
(73, 1, 14, 'Poloshirt1', 'Oberteile'),
(74, 1, 128, 'Poloshirt5', 'Oberteile'),
(75, 1, 10, 'Faltenrock', 'Hosen'),
(76, 1, 128, 'Poloshirt5', 'Oberteile'),
(77, 1, 10, 'Faltenrock', 'Hosen'),
(78, 1, 60, 'Sneakers7', 'Schuhe'),
(79, 17, 25, 'Minirock4', 'Hosen'),
(80, 17, 16, 'Top2', 'Oberteile'),
(81, 17, 0, 'High Heels1', 'Schuhe'),
(82, 1, 10, 'Faltenrock', 'Hosen'),
(83, 1, 4, 'Torso', 'Torsos'),
(84, 1, 170, 'Oberteil22', 'Oberteile'),
(85, 1, 60, 'Sneakers7', 'Schuhe'),
(86, 1, 170, 'Oberteil22', 'Oberteile'),
(87, 1, 4, 'Torso', 'Torsos'),
(88, 1, 10, 'Faltenrock', 'Hosen'),
(89, 1, 60, 'Sneakers7', 'Schuhe'),
(90, 17, 16, 'Top2', 'Oberteile'),
(91, 17, 25, 'Minirock4', 'Hosen'),
(92, 17, 0, 'High Heels1', 'Schuhe'),
(93, 17, 16, 'Top2', 'Oberteile'),
(94, 17, 14, 'Tanzschuhe', 'Schuhe'),
(95, 17, 25, 'Minirock4', 'Hosen'),
(96, 17, 65, 'Unterhemd', 'Unterhemden'),
(97, 17, 25, 'Minirock4', 'Hosen'),
(98, 17, 7, 'Stiefeletten1', 'Schuhe'),
(99, 17, 65, 'Unterhemd', 'Unterhemden'),
(100, 17, 25, 'Minirock4', 'Hosen'),
(101, 17, 7, 'Stiefeletten1', 'Schuhe'),
(102, 17, 65, 'Unterhemd', 'Unterhemden'),
(103, 17, 25, 'Minirock4', 'Hosen'),
(104, 17, 7, 'Stiefeletten1', 'Schuhe'),
(105, 17, 80, 'Anzughose1', 'Hosen'),
(106, 17, 4, 'Top1', 'Oberteile'),
(107, 17, 6, 'High Heels spitz1', 'Schuhe'),
(108, 18, 38, 'schulterfreies Shirt3', 'Oberteile'),
(109, 18, 80, 'Anzughose1', 'Hosen'),
(110, 18, 2, 'Torso', 'Torsos'),
(111, 18, 3, 'Chucks1', 'Schuhe'),
(112, 18, 3, 'Chucks1', 'Schuhe'),
(113, 18, 30, 'schulterfreies Shirt2', 'Oberteile'),
(114, 18, 1, 'Torso', 'Torsos'),
(115, 18, 80, 'BoyfriendJeans', 'Hosen'),
(116, 18, 3, 'Chucks1', 'Schuhe'),
(117, 18, 38, 'schulterfreies Shirt3', 'Oberteile'),
(118, 18, 1, 'Torso', 'Torsos'),
(119, 18, 80, 'BoyfriendJeans', 'Hosen'),
(120, 18, 1, 'Torso', 'Torsos'),
(121, 18, 40, 'schulterfreies Shirt4', 'Oberteile'),
(122, 18, 3, 'Chucks1', 'Schuhe'),
(123, 18, 80, 'BoyfriendJeans', 'Hosen'),
(124, 15, 27, 'Sakko Zweireiher2', 'Oberteile'),
(125, 15, 1, 'Torso', 'Torsos'),
(126, 15, 25, 'Boots2', 'Schuhe'),
(127, 15, 10, 'Anzughose1', 'Hosen'),
(128, 20, 24, 'Sakko zu3', 'Oberteile'),
(129, 20, 4, 'Jeans2', 'Hosen'),
(130, 20, 31, 'Laufschuhe1', 'Schuhe'),
(131, 17, 170, 'Oberteil17', 'Oberteile'),
(132, 17, 2, 'Torso', 'Torsos'),
(133, 17, 103, 'Cargohose6', 'Hosen'),
(134, 20, 2, 'Torso', 'Torsos'),
(135, 20, 107, 'Tang', 'Oberteile'),
(136, 20, 56, 'Bademantel', 'Hosen'),
(137, 20, 6, 'Adiletten1', 'Schuhe'),
(138, 20, 107, 'Tang', 'Oberteile'),
(139, 20, 1, 'Torso', 'Torsos'),
(140, 20, 56, 'Bademantel', 'Hosen'),
(141, 20, 6, 'Adiletten1', 'Schuhe'),
(142, 2, 73, 'Tshirt rund7', 'Oberteile'),
(143, 2, 73, 'Tshirt rund7', 'Oberteile'),
(144, 2, 2, 'Torso', 'Torsos'),
(145, 2, 83, 'Hose18', 'Hosen'),
(146, 2, 29, 'Sneakers1', 'Schuhe'),
(147, 2, 78, 'Hose14', 'Hosen'),
(148, 2, 29, 'Sneakers1', 'Schuhe'),
(149, 2, 2, 'Torso', 'Torsos'),
(150, 2, 73, 'Tshirt rund7', 'Oberteile'),
(151, 2, 73, 'Tshirt rund7', 'Oberteile'),
(152, 2, 2, 'Torso', 'Torsos'),
(153, 2, 78, 'Hose14', 'Hosen'),
(154, 2, 29, 'Sneakers1', 'Schuhe'),
(155, 1, 24, 'Boots1', 'Schuhe'),
(156, 1, 2, 'Torso', 'Torsos'),
(157, 1, 76, 'Jeans6', 'Hosen'),
(158, 1, 173, 'Oberteil18', 'Oberteile'),
(159, 2, 111, 'Bandana2', 'Masken'),
(160, 2, 133, 'Hockeymaske6', 'Masken'),
(161, 1, 10, 'Lackschuhe1', 'Schuhe'),
(162, 1, 0, 'Torso', 'Torsos'),
(163, 1, 10, 'Anzughose1', 'Hosen'),
(164, 1, 113, 'Jacke10', 'Oberteile'),
(165, 3, 97, 'Tshirt rund8', 'Oberteile'),
(166, 3, 0, 'Torso', 'Torsos'),
(167, 3, 4, 'Jeans2', 'Hosen'),
(168, 1, 1, 'Torso', 'Torsos'),
(169, 2, 45, 'Anzughose4', 'Hosen'),
(170, 2, 45, 'Anzughose4', 'Hosen'),
(171, 2, 93, 'Polo Shirt3', 'Oberteile'),
(172, 2, 45, 'Anzughose4', 'Hosen'),
(173, 2, 0, 'Torso', 'Torsos'),
(174, 2, 93, 'Polo Shirt3', 'Oberteile'),
(175, 2, 10, 'Lackschuhe1', 'Schuhe'),
(176, 2, 20, 'Stoffhose3', 'Hosen'),
(177, 2, 10, 'Lackschuhe1', 'Schuhe'),
(178, 2, 54, 'Tshirt1', 'Masken');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `charactermodel`
--

CREATE TABLE `charactermodel` (
  `id` int(11) NOT NULL,
  `internalId` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `parents` text DEFAULT NULL,
  `feature` text DEFAULT NULL,
  `appearance` text DEFAULT NULL,
  `hair` text DEFAULT NULL,
  `data` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `charactermodel`
--

INSERT INTO `charactermodel` (`id`, `internalId`, `gender`, `parents`, `feature`, `appearance`, `hair`, `data`) VALUES
(1, 1, NULL, NULL, NULL, '{\"clothes\":[null,{\"drawable\":0,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":2,\"texture\":0},{\"drawable\":6,\"palette\":0,\"texture\":0},{\"drawable\":1,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":0,\"texture\":0},{\"drawable\":1,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":1,\"texture\":237},{\"drawable\":15,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":119,\"texture\":246},{\"drawable\":255,\"palette\":0,\"texture\":1},{\"drawable\":41,\"palette\":0,\"texture\":0}],\"props\":[{\"drawable\":255,\"texture\":119},{\"drawable\":255,\"texture\":1},{\"drawable\":255,\"texture\":0},null,null,null,{\"drawable\":255,\"texture\":0},{\"drawable\":255,\"texture\":30}]}', NULL, '{\"Gender\":0,\"Parents\":{\"Father\":14,\"Mother\":30,\"Similarity\":1,\"SkinSimilarity\":1},\"Features\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"Appearance\":[{\"Value\":255,\"Opacity\":1},{\"Value\":10,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1}],\"Hair\":[8,29,0,0,0,0,0,0,0]}'),
(2, 2, NULL, NULL, NULL, '', NULL, ''),
(3, 3, NULL, NULL, NULL, '{\"clothes\":[null,{\"drawable\":0,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":2,\"texture\":0},{\"drawable\":15,\"palette\":0,\"texture\":0},{\"drawable\":73,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":116,\"texture\":101},{\"drawable\":3,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":67,\"texture\":32},{\"drawable\":16,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":116,\"texture\":99},{\"drawable\":255,\"palette\":110,\"texture\":111},{\"drawable\":16,\"palette\":0,\"texture\":0}],\"props\":[{\"drawable\":255,\"texture\":0},{\"drawable\":255,\"texture\":0},{\"drawable\":255,\"texture\":0},null,null,null,{\"drawable\":255,\"texture\":0},{\"drawable\":255,\"texture\":0}]}', NULL, '{\"Gender\":1,\"Parents\":{\"Father\":0,\"Mother\":21,\"Similarity\":0,\"SkinSimilarity\":0},\"Features\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\"Appearance\":[{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1},{\"Value\":255,\"Opacity\":1}],\"Hair\":[0,0,0,0,0,0,0,0,0]}'),
(4, 4, NULL, NULL, NULL, '', NULL, '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL DEFAULT 0,
  `commandName` varchar(127) NOT NULL DEFAULT '0',
  `ingameName` varchar(127) NOT NULL DEFAULT '0',
  `money` decimal(38,2) NOT NULL DEFAULT 0.00,
  `health` int(11) NOT NULL DEFAULT 100,
  `armor` int(11) NOT NULL DEFAULT 0,
  `food` int(11) NOT NULL DEFAULT 100,
  `drink` int(11) NOT NULL DEFAULT 100,
  `posX` float NOT NULL DEFAULT 0,
  `posY` float NOT NULL DEFAULT 0,
  `posZ` float NOT NULL DEFAULT 0,
  `dimension` int(11) NOT NULL DEFAULT 0,
  `telefonnummer` varchar(9) DEFAULT NULL,
  `isCreator` enum('Y','N') NOT NULL DEFAULT 'Y',
  `isWhitelisted` int(11) NOT NULL DEFAULT 0,
  `isOnline` enum('Y','N') NOT NULL DEFAULT 'N',
  `fraktion` varchar(50) DEFAULT 'arbeitslos',
  `fraktionRank` varchar(50) DEFAULT 'none',
  `currentOnlineId` int(11) NOT NULL DEFAULT 0,
  `inventory` double DEFAULT 20,
  `weight` decimal(4,2) DEFAULT 0.00,
  `permaDeathTime` int(11) DEFAULT 0,
  `isPet` tinyint(1) DEFAULT 0,
  `petHash` varchar(50) DEFAULT '0',
  `dateofBirth` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `characters_questpoints`
--

CREATE TABLE `characters_questpoints` (
  `id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL DEFAULT 0,
  `quest_id` int(11) NOT NULL DEFAULT 0,
  `checkpoint` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `characters_questpoints`
--

INSERT INTO `characters_questpoints` (`id`, `character_id`, `quest_id`, `checkpoint`) VALUES
(28, 85, 1, 1),
(29, 31, 1, 1),
(30, 165, 1, 1),
(31, 437, 1, 1),
(32, 371, 1, 1),
(33, 895, 1, 3),
(34, 287, 1, 3),
(35, 585, 1, 1),
(36, 1394, 1, 1),
(37, 97, 1, 1),
(38, 1569, 1, 1),
(39, 703, 1, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `clothes_new`
--

CREATE TABLE `clothes_new` (
  `id` int(11) NOT NULL,
  `name` varchar(31) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `gender` enum('male','female') DEFAULT NULL,
  `type` enum('clothes','props') NOT NULL DEFAULT 'clothes',
  `part` enum('Torsos','Unterhemden','Masken','Oberteile','Hosen','Schuhe','Accessoires','Hüte','Brillen','Ohren','Uhren','Armbänder') NOT NULL DEFAULT 'Oberteile',
  `price` decimal(38,2) DEFAULT 0.00,
  `clothesID` int(11) DEFAULT NULL,
  `indexID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Daten für Tabelle `clothes_new`
--

INSERT INTO `clothes_new` (`id`, `name`, `gender`, `type`, `part`, `price`, `clothesID`, `indexID`) VALUES
(1, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 0, 1),
(2, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 1, 2),
(3, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 2, 3),
(4, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 3, 4),
(5, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 4, 5),
(6, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 5, 6),
(7, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 6, 7),
(8, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 7, 8),
(9, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 8, 9),
(10, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 9, 10),
(11, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 10, 11),
(12, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 11, 12),
(13, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 12, 13),
(14, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 13, 14),
(15, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 14, 15),
(16, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 15, 16),
(17, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 129, 17),
(18, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 130, 18),
(19, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 131, 19),
(20, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 0, 1),
(21, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 1, 2),
(22, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 2, 3),
(23, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 3, 4),
(24, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 4, 5),
(25, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 5, 6),
(26, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 6, 7),
(27, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 7, 8),
(28, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 8, 9),
(29, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 9, 10),
(30, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 10, 11),
(31, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 11, 12),
(32, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 12, 13),
(33, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 13, 14),
(34, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 14, 15),
(35, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 15, 16),
(36, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 112, 17),
(37, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 113, 18),
(38, 'Torso', 'male', 'clothes', 'Torsos', '0.00', 114, 19),
(39, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 0, 1),
(40, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 1, 2),
(41, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 5, 3),
(42, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 11, 4),
(43, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 12, 5),
(44, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 13, 6),
(45, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 15, 7),
(46, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 16, 8),
(47, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 17, 9),
(48, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 18, 10),
(49, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 19, 11),
(50, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 20, 12),
(51, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 21, 13),
(52, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 22, 14),
(53, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 23, 15),
(54, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 24, 16),
(55, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 25, 17),
(56, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 26, 18),
(57, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 27, 19),
(58, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 28, 20),
(59, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 29, 21),
(60, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 30, 22),
(61, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 31, 23),
(62, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 32, 24),
(63, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 33, 25),
(64, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 36, 26),
(65, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 37, 27),
(66, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 38, 28),
(67, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 39, 29),
(68, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 40, 30),
(69, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 41, 31),
(70, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 42, 32),
(71, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 43, 33),
(72, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 44, 34),
(73, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 45, 35),
(74, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 46, 36),
(75, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 47, 37),
(76, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 48, 38),
(77, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 49, 39),
(78, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 50, 40),
(79, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 51, 41),
(80, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 52, 42),
(81, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 53, 43),
(82, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 54, 44),
(83, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 55, 45),
(84, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 56, 46),
(85, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 57, 47),
(86, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 58, 48),
(87, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 59, 49),
(88, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 60, 50),
(89, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 61, 51),
(90, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 62, 52),
(91, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 63, 53),
(92, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 64, 54),
(93, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 65, 55),
(94, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 66, 56),
(95, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 67, 57),
(96, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 68, 58),
(97, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 69, 59),
(98, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 70, 60),
(99, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 71, 61),
(100, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 72, 62),
(101, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 73, 63),
(102, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 74, 64),
(103, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 75, 65),
(104, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 76, 66),
(105, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 77, 67),
(106, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 78, 68),
(107, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 79, 69),
(108, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 80, 70),
(109, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 81, 71),
(110, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 82, 72),
(111, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 83, 73),
(112, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 84, 74),
(113, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 85, 75),
(114, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 86, 76),
(115, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 87, 77),
(116, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 88, 78),
(117, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 89, 79),
(118, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 90, 80),
(119, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 91, 81),
(120, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 92, 82),
(121, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 94, 83),
(122, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 95, 84),
(123, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 96, 85),
(124, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 97, 86),
(125, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 98, 87),
(126, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 99, 88),
(127, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 100, 89),
(128, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 101, 90),
(129, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 102, 91),
(130, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 103, 92),
(131, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 104, 93),
(132, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 106, 94),
(133, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 107, 95),
(134, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 108, 96),
(135, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 109, 97),
(136, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 110, 98),
(137, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 111, 99),
(138, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 112, 100),
(139, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 113, 101),
(140, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 114, 102),
(141, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 115, 103),
(142, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 116, 104),
(143, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 117, 105),
(144, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 118, 106),
(145, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 119, 107),
(146, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 120, 108),
(147, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 121, 109),
(148, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 122, 110),
(149, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 123, 111),
(150, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 124, 112),
(151, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 125, 113),
(152, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 126, 114),
(153, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 127, 115),
(154, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 128, 116),
(155, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 129, 117),
(156, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 130, 118),
(157, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 131, 119),
(158, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 132, 120),
(159, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 133, 121),
(160, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 134, 122),
(161, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 135, 123),
(162, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 136, 124),
(163, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 137, 125),
(164, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 138, 126),
(165, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 139, 127),
(166, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 140, 128),
(167, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 141, 129),
(168, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 142, 130),
(169, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 143, 131),
(170, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 144, 132),
(171, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 145, 133),
(172, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 146, 144),
(173, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 147, 145),
(174, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 148, 146),
(175, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 149, 147),
(176, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 150, 148),
(177, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 151, 149),
(178, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 162, 150),
(179, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 163, 151),
(180, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 164, 152),
(181, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 165, 153),
(182, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 166, 154),
(183, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 167, 155),
(184, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 168, 156),
(185, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 169, 157),
(186, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 170, 158),
(187, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 171, 159),
(188, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 172, 160),
(189, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 173, 161),
(190, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 174, 162),
(191, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 175, 163),
(192, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 176, 164),
(193, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 177, 165),
(194, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 178, 166),
(195, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 180, 167),
(196, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 181, 168),
(197, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 182, 169),
(198, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 183, 170),
(199, 'Unterhemd', 'female', 'clothes', 'Unterhemden', '0.00', 184, 171),
(200, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 0, 1),
(201, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 1, 2),
(202, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 2, 3),
(203, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 3, 4),
(204, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 4, 5),
(205, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 5, 6),
(206, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 6, 7),
(207, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 7, 8),
(208, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 8, 9),
(209, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 9, 10),
(210, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 10, 11),
(211, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 11, 12),
(212, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 12, 13),
(213, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 13, 14),
(214, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 14, 15),
(215, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 16, 16),
(216, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 17, 17),
(217, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 18, 18),
(218, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 19, 19),
(219, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 20, 20),
(220, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 21, 21),
(221, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 22, 22),
(222, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 23, 23),
(223, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 24, 24),
(224, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 25, 25),
(225, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 26, 26),
(226, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 27, 27),
(227, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 28, 28),
(228, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 29, 29),
(229, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 30, 30),
(230, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 31, 31),
(231, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 32, 32),
(232, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 33, 33),
(233, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 34, 34),
(234, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 35, 35),
(235, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 36, 36),
(236, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 37, 37),
(237, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 38, 38),
(238, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 39, 39),
(239, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 40, 40),
(240, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 41, 41),
(241, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 42, 42),
(242, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 43, 43),
(243, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 44, 44),
(244, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 45, 45),
(245, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 46, 46),
(246, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 47, 47),
(247, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 48, 48),
(248, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 49, 49),
(249, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 50, 50),
(250, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 51, 41),
(251, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 52, 52),
(252, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 53, 53),
(253, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 54, 54),
(254, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 55, 55),
(255, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 59, 56),
(256, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 60, 57),
(257, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 61, 58),
(258, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 62, 59),
(259, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 63, 60),
(260, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 64, 61),
(261, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 65, 62),
(262, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 66, 63),
(263, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 67, 64),
(264, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 68, 65),
(265, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 69, 66),
(266, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 70, 67),
(267, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 71, 68),
(268, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 72, 69),
(269, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 73, 70),
(270, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 74, 71),
(271, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 75, 72),
(272, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 76, 73),
(273, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 77, 74),
(274, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 78, 75),
(275, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 79, 76),
(276, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 80, 77),
(277, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 81, 78),
(278, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 82, 79),
(279, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 83, 80),
(280, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 84, 81),
(281, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 85, 82),
(282, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 86, 83),
(283, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 87, 84),
(284, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 88, 85),
(285, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 89, 86),
(286, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 90, 87),
(287, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 91, 88),
(288, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 92, 89),
(289, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 93, 90),
(290, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 94, 91),
(291, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 95, 92),
(292, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 96, 93),
(293, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 98, 94),
(294, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 99, 95),
(295, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 100, 96),
(296, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 101, 97),
(297, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 102, 98),
(298, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 103, 99),
(299, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 104, 100),
(300, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 105, 101),
(301, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 106, 102),
(302, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 107, 103),
(303, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 108, 104),
(304, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 109, 105),
(305, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 110, 106),
(306, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 111, 107),
(307, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 112, 108),
(308, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 113, 109),
(309, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 114, 110),
(310, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 115, 111),
(311, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 116, 112),
(312, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 117, 113),
(313, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 118, 114),
(314, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 119, 115),
(315, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 120, 116),
(316, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 121, 117),
(317, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 132, 118),
(318, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 133, 119),
(319, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 134, 120),
(320, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 135, 121),
(321, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 136, 122),
(322, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 137, 123),
(323, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 138, 124),
(324, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 139, 125),
(325, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 140, 126),
(326, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 141, 127),
(327, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 142, 128),
(328, 'Unterhemd', 'male', 'clothes', 'Unterhemden', '0.00', 143, 129),
(329, 'High Heels1', 'female', 'clothes', 'Schuhe', '62.99', 0, 1),
(330, 'Stoffschuhe1', 'female', 'clothes', 'Schuhe', '12.95', 1, 2),
(331, 'Winterboots1', 'female', 'clothes', 'Schuhe', '14.99', 2, 3),
(332, 'Chucks1', 'female', 'clothes', 'Schuhe', '24.90', 3, 4),
(333, 'Flip Flops1', 'female', 'clothes', 'Schuhe', '5.95', 5, 5),
(334, 'High Heels spitz1', 'female', 'clothes', 'Schuhe', '62.99', 6, 6),
(335, 'Stiefeletten1', 'female', 'clothes', 'Schuhe', '34.90', 7, 7),
(336, 'Stiefeletten2', 'female', 'clothes', 'Schuhe', '34.90', 8, 8),
(337, 'Stiefel1', 'female', 'clothes', 'Schuhe', '29.90', 9, 9),
(338, 'Laufschuhe1', 'female', 'clothes', 'Schuhe', '27.85', 10, 10),
(339, 'Ballerinas1', 'female', 'clothes', 'Schuhe', '18.95', 13, 11),
(340, 'Tanzschuhe', 'female', 'clothes', 'Schuhe', '69.99', 14, 12),
(341, 'Sandaletten', 'female', 'clothes', 'Schuhe', '22.90', 15, 13),
(342, 'Flip Flops2', 'female', 'clothes', 'Schuhe', '5.95', 16, 14),
(343, 'Elfenschuhe', 'female', 'clothes', 'Schuhe', '5.95', 17, 15),
(344, 'High Heels spitz2', 'female', 'clothes', 'Schuhe', '62.99', 18, 16),
(345, 'High Heels2', 'female', 'clothes', 'Schuhe', '62.99', 19, 17),
(346, 'High Heels spitz3', 'female', 'clothes', 'Schuhe', '62.99', 20, 18),
(347, 'Stiefel2', 'female', 'clothes', 'Schuhe', '29.90', 21, 19),
(348, 'Stiefeletten3', 'female', 'clothes', 'Schuhe', '57.80', 22, 20),
(349, 'Flamenco Schuhe', 'female', 'clothes', 'Schuhe', '69.99', 23, 21),
(350, 'Stoffschuhe2', 'female', 'clothes', 'Schuhe', '14.90', 28, 22),
(351, 'Lackschuhe1', 'female', 'clothes', 'Schuhe', '59.90', 29, 23),
(352, 'Stiefeletten4', 'female', 'clothes', 'Schuhe', '34.90', 30, 24),
(353, 'Laufschuhe2', 'female', 'clothes', 'Schuhe', '27.00', 32, 25),
(354, 'Cowboystiefel1', 'female', 'clothes', 'Schuhe', '19.90', 38, 26),
(355, 'Cowboystiefel2', 'female', 'clothes', 'Schuhe', '19.90', 38, 27),
(356, 'High Heels3', 'female', 'clothes', 'Schuhe', '62.99', 41, 28),
(357, 'Keilheels1', 'female', 'clothes', 'Schuhe', '34.90', 43, 29),
(358, 'Stiefeletten5', 'female', 'clothes', 'Schuhe', '34.90', 44, 30),
(359, 'Cowboystiefel3', 'female', 'clothes', 'Schuhe', '19.90', 45, 31),
(360, 'Cowboystiefel4', 'female', 'clothes', 'Schuhe', '19.90', 46, 32),
(361, 'Motorradschuhe1', 'female', 'clothes', 'Schuhe', '27.85', 47, 33),
(362, 'Chucks2', 'female', 'clothes', 'Schuhe', '24.90', 49, 34),
(363, 'Chucks3', 'female', 'clothes', 'Schuhe', '24.90', 50, 35),
(364, 'Motorradstiefel1', 'female', 'clothes', 'Schuhe', '29.90', 51, 36),
(365, 'Motorradstiefel2', 'female', 'clothes', 'Schuhe', '29.90', 52, 37),
(366, 'Motorradstiefel3', 'female', 'clothes', 'Schuhe', '29.90', 53, 38),
(367, 'Boots1', 'female', 'clothes', 'Schuhe', '29.90', 54, 39),
(368, 'Boots2', 'female', 'clothes', 'Schuhe', '29.90', 55, 40),
(369, 'Motorradstiefel4', 'female', 'clothes', 'Schuhe', '29.90', 56, 41),
(370, 'Motorradstiefel5', 'female', 'clothes', 'Schuhe', '29.90', 57, 42),
(371, 'Motorradstiefel6', 'female', 'clothes', 'Schuhe', '29.90', 63, 43),
(372, 'Motorradstiefel7', 'female', 'clothes', 'Schuhe', '29.90', 64, 44),
(373, 'Wanderschuhe1', 'female', 'clothes', 'Schuhe', '29.90', 65, 45),
(374, 'Wanderschuhe2', 'female', 'clothes', 'Schuhe', '29.90', 66, 46),
(375, 'Schwimmflossen', 'female', 'clothes', 'Schuhe', '5.95', 70, 47),
(376, 'Arbeitsschuhe1', 'female', 'clothes', 'Schuhe', '19.90', 73, 48),
(377, 'Arbeitsschuhe2', 'female', 'clothes', 'Schuhe', '19.90', 74, 49),
(378, 'Arbeitsschuhe3', 'female', 'clothes', 'Schuhe', '29.90', 75, 50),
(379, 'Arbeitsschuhe4', 'female', 'clothes', 'Schuhe', '29.90', 76, 51),
(380, 'Keilheels2', 'female', 'clothes', 'Schuhe', '57.80', 77, 52),
(381, 'Basketballschuhe1', 'female', 'clothes', 'Schuhe', '27.85', 79, 53),
(382, 'Basketballschuhe2', 'female', 'clothes', 'Schuhe', '27.85', 80, 54),
(383, 'Sneakers1', 'female', 'clothes', 'Schuhe', '14.99', 81, 55),
(384, 'Motorradstiefel8', 'female', 'clothes', 'Schuhe', '29.90', 83, 56),
(385, 'Motorradstiefel9', 'female', 'clothes', 'Schuhe', '29.90', 84, 57),
(386, 'Motorradstiefel10', 'female', 'clothes', 'Schuhe', '29.90', 85, 58),
(387, 'Motorradstiefel11', 'female', 'clothes', 'Schuhe', '29.90', 86, 59),
(388, 'Sneaker2', 'female', 'clothes', 'Schuhe', '27.85', 4, 1),
(389, 'Sneaker3', 'female', 'clothes', 'Schuhe', '27.85', 11, 2),
(390, 'Boots3', 'female', 'clothes', 'Schuhe', '29.90', 24, 3),
(391, 'Boots4', 'female', 'clothes', 'Schuhe', '29.90', 25, 4),
(392, 'Boots5', 'female', 'clothes', 'Schuhe', '29.90', 26, 5),
(393, 'Sneakers4', 'female', 'clothes', 'Schuhe', '27.85', 27, 6),
(394, 'Sneakers5', 'female', 'clothes', 'Schuhe', '27.85', 31, 7),
(395, 'Chucks m. Stulpen', 'female', 'clothes', 'Schuhe', '24.90', 33, 8),
(396, 'Boots6', 'female', 'clothes', 'Schuhe', '20.80', 36, 9),
(397, 'Moccasins', 'female', 'clothes', 'Schuhe', '55.80', 37, 10),
(398, 'High Heels4', 'female', 'clothes', 'Schuhe', '62.99', 42, 11),
(399, 'Motorcrossboots', 'female', 'clothes', 'Schuhe', '25.95', 48, 12),
(400, 'Sneakers6', 'female', 'clothes', 'Schuhe', '24.90', 58, 13),
(401, 'Sneakers7', 'female', 'clothes', 'Schuhe', '27.85', 60, 14),
(402, 'Slipper1', 'female', 'clothes', 'Schuhe', '5.95', 61, 15),
(403, 'Laufschuhe3', 'female', 'clothes', 'Schuhe', '27.85', 62, 16),
(404, 'Boxerschuhe1', 'female', 'clothes', 'Schuhe', '27.85', 67, 17),
(405, 'Boots7', 'female', 'clothes', 'Schuhe', '19.90', 68, 18),
(406, 'Boots8', 'female', 'clothes', 'Schuhe', '19.90', 69, 19),
(407, 'Slipper2', 'female', 'clothes', 'Schuhe', '5.95', 71, 20),
(408, 'Chelsea Boots', 'female', 'clothes', 'Schuhe', '9.95', 72, 21),
(409, 'Boxerschuhe2', 'female', 'clothes', 'Schuhe', '27.85', 78, 22),
(410, 'Chucks1', 'male', 'clothes', 'Schuhe', '24.90', 4, 23),
(411, 'Flip Flops1', 'male', 'clothes', 'Schuhe', '5.95', 5, 24),
(412, 'Adiletten1', 'male', 'clothes', 'Schuhe', '5.95', 6, 25),
(413, 'Lackschuhe1', 'male', 'clothes', 'Schuhe', '62.99', 10, 26),
(414, 'Flip Flips2', 'male', 'clothes', 'Schuhe', '5.95', 16, 27),
(415, 'Elfenschuhe', 'male', 'clothes', 'Schuhe', '5.95', 17, 28),
(416, 'Lackschuhe2', 'male', 'clothes', 'Schuhe', '62.99', 18, 29),
(417, 'Lackschuhe3', 'male', 'clothes', 'Schuhe', '62.99', 19, 30),
(418, 'Chucks2', 'male', 'clothes', 'Schuhe', '24.90', 22, 31),
(419, 'Boots1', 'male', 'clothes', 'Schuhe', '29.90', 24, 32),
(420, 'Boots2', 'male', 'clothes', 'Schuhe', '29.90', 25, 33),
(421, 'Chucks3', 'male', 'clothes', 'Schuhe', '24.90', 26, 34),
(422, 'Boots3', 'male', 'clothes', 'Schuhe', '20.80', 27, 35),
(423, 'Sneakers1', 'male', 'clothes', 'Schuhe', '27.85', 29, 36),
(424, 'Moccasins1', 'male', 'clothes', 'Schuhe', '55.80', 30, 37),
(425, 'Laufschuhe1', 'male', 'clothes', 'Schuhe', '27.85', 31, 38),
(426, 'Boots4', 'male', 'clothes', 'Schuhe', '27.85', 35, 39),
(427, 'Moccasins2', 'male', 'clothes', 'Schuhe', '55.80', 36, 40),
(428, 'Cowboystiefel1', 'male', 'clothes', 'Schuhe', '19.90', 37, 41),
(429, 'Cowboystiefel2', 'male', 'clothes', 'Schuhe', '19.90', 38, 42),
(430, 'Cowboystiefel3', 'male', 'clothes', 'Schuhe', '19.90', 44, 43),
(431, 'Cowboystiefel4', 'male', 'clothes', 'Schuhe', '19.90', 45, 44),
(432, 'Boxerschuhe1', 'male', 'clothes', 'Schuhe', '27.85', 46, 45),
(433, 'Motorcrossboots1', 'male', 'clothes', 'Schuhe', '25.95', 47, 46),
(434, 'Chucks4', 'male', 'clothes', 'Schuhe', '24.90', 48, 47),
(435, 'Chucks5', 'male', 'clothes', 'Schuhe', '24.90', 49, 48),
(436, 'Motorradstiefel1', 'male', 'clothes', 'Schuhe', '29.90', 50, 49),
(437, 'Motorradstiefel2', 'male', 'clothes', 'Schuhe', '29.90', 51, 50),
(438, 'Motorradstiefel3', 'male', 'clothes', 'Schuhe', '29.90', 52, 51),
(439, 'Motorradstiefel4', 'male', 'clothes', 'Schuhe', '29.90', 53, 52),
(440, 'Motorradstiefel5', 'male', 'clothes', 'Schuhe', '29.90', 54, 53),
(441, 'Sneakers2', 'male', 'clothes', 'Schuhe', '24.90', 55, 54),
(442, 'Sneakers3', 'male', 'clothes', 'Schuhe', '27.85', 57, 55),
(443, 'Slipper1', 'male', 'clothes', 'Schuhe', '5.95', 58, 56),
(444, 'Laufschuhe2', 'male', 'clothes', 'Schuhe', '27.85', 59, 57),
(445, 'Motorradstiefel6', 'male', 'clothes', 'Schuhe', '29.90', 60, 58),
(446, 'Motorradstiefel7', 'male', 'clothes', 'Schuhe', '29.90', 61, 59),
(447, 'Wanderschuhe1', 'male', 'clothes', 'Schuhe', '29.90', 62, 60),
(448, 'Wanderschuhe2', 'male', 'clothes', 'Schuhe', '29.90', 63, 61),
(449, 'Boxerschuhe2', 'male', 'clothes', 'Schuhe', '27.85', 64, 62),
(450, 'Boots5', 'male', 'clothes', 'Schuhe', '19.90', 65, 63),
(451, 'Boots6', 'male', 'clothes', 'Schuhe', '19.90', 66, 64),
(452, 'Schwimmflossen', 'male', 'clothes', 'Schuhe', '5.95', 67, 65),
(453, 'Slipper2', 'male', 'clothes', 'Schuhe', '5.95', 68, 66),
(454, 'Chelsea Boots', 'male', 'clothes', 'Schuhe', '19.90', 69, 67),
(455, 'Arbeitsschuhe1', 'male', 'clothes', 'Schuhe', '19.90', 70, 68),
(456, 'Arbeitsschuhe2', 'male', 'clothes', 'Schuhe', '19.90', 71, 69),
(457, 'Arbeitsschuhe3', 'male', 'clothes', 'Schuhe', '29.90', 72, 70),
(458, 'Arbeitsschuhe4', 'male', 'clothes', 'Schuhe', '29.90', 73, 71),
(459, 'Boxerschuhe3', 'male', 'clothes', 'Schuhe', '27.85', 74, 72),
(460, 'Basketballschuhe1', 'male', 'clothes', 'Schuhe', '20.80', 75, 73),
(461, 'Basketballschuhe2', 'male', 'clothes', 'Schuhe', '20.80', 76, 74),
(462, 'Sneakers4', 'male', 'clothes', 'Schuhe', '14.99', 77, 75),
(463, 'Motorradstiefel8', 'male', 'clothes', 'Schuhe', '29.90', 79, 76),
(464, 'Motorradstiefel9', 'male', 'clothes', 'Schuhe', '29.90', 80, 77),
(465, 'Motorradstiefel10', 'male', 'clothes', 'Schuhe', '29.90', 81, 78),
(466, 'Motorradstiefel11', 'male', 'clothes', 'Schuhe', '29.90', 82, 79),
(467, 'Slipper3', 'male', 'clothes', 'Schuhe', '5.95', 83, 80),
(468, 'Flat Sneaker', 'male', 'clothes', 'Schuhe', '12.95', 1, NULL),
(469, 'Sailor Sneaker', 'male', 'clothes', 'Schuhe', '55.80', 3, NULL),
(470, 'Sneaker5', 'male', 'clothes', 'Schuhe', '24.90', 7, NULL),
(471, 'Sportschuhe', 'male', 'clothes', 'Schuhe', '12.95', 8, NULL),
(472, 'Laufschuhe3', 'male', 'clothes', 'Schuhe', '27.85', 9, NULL),
(473, 'Arbeitsstiefel', 'male', 'clothes', 'Schuhe', '27.85', 12, NULL),
(474, 'Wanderstiefel', 'male', 'clothes', 'Schuhe', '27.85', 14, NULL),
(475, 'Stiefeletten', 'male', 'clothes', 'Schuhe', '62.99', 15, NULL),
(476, 'Lederschuhe', 'male', 'clothes', 'Schuhe', '62.99', 20, NULL),
(477, 'Slipper4', 'male', 'clothes', 'Schuhe', '62.99', 21, NULL),
(478, 'Wildlederschuhe', 'male', 'clothes', 'Schuhe', '27.85', 23, NULL),
(479, 'Freaky Sneaker', 'male', 'clothes', 'Schuhe', '27.85', 28, NULL),
(480, 'Basketballschuhe3', 'male', 'clothes', 'Schuhe', '27.85', 32, NULL),
(481, 'Budapester', 'male', 'clothes', 'Schuhe', '62.99', 40, NULL),
(482, 'Moccasins3', 'male', 'clothes', 'Schuhe', '55.80', 41, NULL),
(483, 'Freizeit Moccasins', 'male', 'clothes', 'Schuhe', '12.95', 42, NULL),
(484, 'Schnürschuhe', 'male', 'clothes', 'Schuhe', '19.90', 43, NULL),
(485, 'Jeans1', 'female', 'clothes', 'Hosen', '12.99', 80, NULL),
(486, 'BoyfriendJeans', 'female', 'clothes', 'Hosen', '12.99', 80, NULL),
(487, 'Anzughose1', 'female', 'clothes', 'Hosen', '17.95', 80, NULL),
(488, '3/4 Jeans', 'female', 'clothes', 'Hosen', '20.89', 80, NULL),
(489, 'Hot Pants1', 'female', 'clothes', 'Hosen', '24.95', 80, NULL),
(490, 'enge Anzughose 1', 'female', 'clothes', 'Hosen', '74.99', 80, NULL),
(491, 'Stiftrock1', 'female', 'clothes', 'Hosen', '69.95', 80, NULL),
(492, 'Minirock1', 'female', 'clothes', 'Hosen', '26.95', 7, NULL),
(493, 'Minirock2', 'female', 'clothes', 'Hosen', '27.85', 8, NULL),
(494, 'Shorts1', 'female', 'clothes', 'Hosen', '4.99', 9, NULL),
(495, 'Faltenrock', 'female', 'clothes', 'Hosen', '22.90', 10, NULL),
(496, 'Hot Pants2', 'female', 'clothes', 'Hosen', '24.95', 11, NULL),
(497, 'Bikini1', 'female', 'clothes', 'Hosen', '5.99', 12, NULL),
(498, 'Hot Pants3', 'female', 'clothes', 'Hosen', '24.95', 14, NULL),
(500, 'Stiftrock2', 'female', 'clothes', 'Hosen', '69.95', 16, NULL),
(501, 'Panty1', 'female', 'clothes', 'Hosen', '24.95', 17, NULL),
(502, 'Reizwäsche1', 'female', 'clothes', 'Hosen', '26.90', 18, NULL),
(503, 'Reizwäsche2', 'female', 'clothes', 'Hosen', '29.90', 19, NULL),
(504, 'Hose mit Bügelfalte1', 'female', 'clothes', 'Hosen', '74.99', 20, NULL),
(505, 'Stiftrock3', 'female', 'clothes', 'Hosen', '69.95', 22, NULL),
(506, 'Minirock3', 'female', 'clothes', 'Hosen', '27.85', 23, NULL),
(507, 'Lederleggins1', 'female', 'clothes', 'Hosen', '29.90', 24, NULL),
(508, 'Minirock4', 'female', 'clothes', 'Hosen', '12.95', 25, NULL),
(509, 'Leggins1', 'female', 'clothes', 'Hosen', '6.95', 26, NULL),
(510, 'Cargo Hose1', 'female', 'clothes', 'Hosen', '26.95', 27, NULL),
(511, 'Schutzhose', 'female', 'clothes', 'Hosen', '35.60', 28, NULL),
(512, 'Anzughose2', 'female', 'clothes', 'Hosen', '74.99', 30, NULL),
(513, 'Reflekthose', 'female', 'clothes', 'Hosen', '14.95', 31, NULL),
(514, 'Stiftrock4', 'female', 'clothes', 'Hosen', '69.95', 32, NULL),
(515, 'Cargobermuda1', 'female', 'clothes', 'Hosen', '26.95', 34, NULL),
(516, 'sterile Hose', 'female', 'clothes', 'Hosen', '5.95', 35, NULL),
(517, 'Stoffhose1', 'female', 'clothes', 'Hosen', '17.35', 36, NULL),
(519, 'enge Lederhose2', 'female', 'clothes', 'Hosen', '34.95', 38, NULL),
(520, 'enge Anzughose2', 'female', 'clothes', 'Hosen', '74.99', 39, NULL),
(521, 'Hose mit Bügelfalte2', 'female', 'clothes', 'Hosen', '74.99', 40, NULL),
(522, 'Leggins2', 'female', 'clothes', 'Hosen', '25.90', 41, NULL),
(524, 'Hose mit Bügelfalte4', 'female', 'clothes', 'Hosen', '74.99', 44, NULL),
(525, 'Enge Anzughose3', 'female', 'clothes', 'Hosen', '64.90', 45, NULL),
(526, 'Leggins3', 'female', 'clothes', 'Hosen', '64.90', 47, NULL),
(527, 'Bikini3', 'female', 'clothes', 'Hosen', '5.99', 49, NULL),
(528, 'Bademantel', 'female', 'clothes', 'Hosen', '11.99', 50, NULL),
(530, 'Nikolaushose', 'female', 'clothes', 'Hosen', '4.95', 52, NULL),
(531, 'Pyjamahose1', 'female', 'clothes', 'Hosen', '13.85', 53, NULL),
(532, 'Panty2', 'female', 'clothes', 'Hosen', '24.95', 54, NULL),
(533, 'Reizwäsche3', 'female', 'clothes', 'Hosen', '26.90', 55, NULL),
(534, 'Hose mit Bügelfalte5', 'female', 'clothes', 'Hosen', '40.90', 56, NULL),
(535, 'Jogginghose2', 'female', 'clothes', 'Hosen', '9.95', 57, NULL),
(536, 'Pyjamahose2', 'female', 'clothes', 'Hosen', '13.85', 58, NULL),
(537, 'Motorradhose', 'female', 'clothes', 'Hosen', '35.60', 60, NULL),
(538, 'Pyjamahose3', 'female', 'clothes', 'Hosen', '9.95', 62, NULL),
(539, 'Skinny Jeans1', 'female', 'clothes', 'Hosen', '19.99', 63, NULL),
(540, 'Skinny Jeans2', 'female', 'clothes', 'Hosen', '24.95', 64, NULL),
(541, 'Skinny Jeans3', 'female', 'clothes', 'Hosen', '19.99', 65, NULL),
(542, 'Skinny Jeans4', 'female', 'clothes', 'Hosen', '19.99', 66, NULL),
(543, 'Skinny Jeans5', 'female', 'clothes', 'Hosen', '19.99', 67, NULL),
(545, 'Leggins4', 'female', 'clothes', 'Hosen', '26.90', 70, NULL),
(546, 'Goa Hose', 'female', 'clothes', 'Hosen', '4.95', 71, NULL),
(547, 'Latzhose1', 'female', 'clothes', 'Hosen', '13.85', 72, NULL),
(548, 'Latzhose2', 'female', 'clothes', 'Hosen', '13.85', 73, NULL),
(549, 'Rennanzug1', 'female', 'clothes', 'Hosen', '19.95', 75, NULL),
(550, 'Hose', 'female', 'clothes', 'Hosen', '19.99', 76, NULL),
(551, 'Arbeitshose1', 'female', 'clothes', 'Hosen', '13.85', 77, NULL),
(552, 'Arbeitshose2', 'female', 'clothes', 'Hosen', '13.85', 78, NULL),
(553, 'enge Lederhose1', 'female', 'clothes', 'Hosen', '34.95', 80, NULL),
(554, 'Rennanzug3', 'female', 'clothes', 'Hosen', '19.95', 81, NULL),
(555, 'Pyjamahose3', 'female', 'clothes', 'Hosen', '14.95', 82, NULL),
(556, 'Rennanzug4', 'female', 'clothes', 'Hosen', '35.60', 83, NULL),
(557, 'enge Lederhose2', 'female', 'clothes', 'Hosen', '34.95', 84, NULL),
(558, 'Hotpants4', 'female', 'clothes', 'Hosen', '24.95', 85, NULL),
(559, 'Minirock5', 'female', 'clothes', 'Hosen', '27.85', 87, NULL),
(560, '3/4 Jogginghose', 'female', 'clothes', 'Hosen', '9.95', 88, NULL),
(561, 'Cargobermuda2', 'female', 'clothes', 'Hosen', '19.99', 89, NULL),
(562, 'Jeans Shorts', 'female', 'clothes', 'Hosen', '24.95', 90, NULL),
(563, 'Hose1', 'female', 'clothes', 'Hosen', '74.99', 91, NULL),
(564, 'Leinenhose1', 'female', 'clothes', 'Hosen', '26.95', 92, NULL),
(565, 'Hose2', 'female', 'clothes', 'Hosen', '35.60', 93, NULL),
(566, 'Cargohose1', 'female', 'clothes', 'Hosen', '17.35', 96, NULL),
(567, 'Cargohose2', 'female', 'clothes', 'Hosen', '26.95', 97, NULL),
(568, 'Hose3', 'female', 'clothes', 'Hosen', '54.60', 100, NULL),
(569, 'Rennanzug2', 'female', 'clothes', 'Hosen', '35.60', 101, NULL),
(570, 'Stunthose1', 'female', 'clothes', 'Hosen', '4.95', 102, NULL),
(571, 'Stunthose2', 'female', 'clothes', 'Hosen', '4.95', 104, NULL),
(572, 'Jeansshorts mit Leggins', 'female', 'clothes', 'Hosen', '24.95', 106, NULL),
(573, 'Hose4', 'female', 'clothes', 'Hosen', '20.80', 107, NULL),
(574, 'Hose5', 'female', 'clothes', 'Hosen', '16.99', 108, NULL),
(575, 'Hose6', 'female', 'clothes', 'Hosen', '16.99', 109, NULL),
(576, 'Hose7', 'female', 'clothes', 'Hosen', '16.99', 112, NULL),
(588, 'Jeans1', 'male', 'clothes', 'Hosen', '12.99', 0, NULL),
(589, 'weite Jeans1', 'male', 'clothes', 'Hosen', '14.99', 1, NULL),
(590, 'Hose1', 'male', 'clothes', 'Hosen', '8.99', 3, NULL),
(591, 'Jeans2', 'male', 'clothes', 'Hosen', '19.99', 4, NULL),
(592, 'Jogginghose1', 'male', 'clothes', 'Hosen', '9.95', 5, NULL),
(593, 'Hose2', 'male', 'clothes', 'Hosen', '13.95', 6, NULL),
(594, 'Stoffhose1', 'male', 'clothes', 'Hosen', '16.99', 7, NULL),
(595, 'Leinenhose1', 'male', 'clothes', 'Hosen', '17.95', 8, NULL),
(596, 'Hose3', 'male', 'clothes', 'Hosen', '26.95', 9, NULL),
(597, 'Anzughose1', 'male', 'clothes', 'Hosen', '69.95', 10, NULL),
(598, 'kurze Hose1', 'male', 'clothes', 'Hosen', '16.99', 12, NULL),
(599, 'Hose4', 'male', 'clothes', 'Hosen', '26.95', 13, NULL),
(600, 'Shorts1', 'male', 'clothes', 'Hosen', '4.99', 14, NULL),
(601, 'Bermudashorts1', 'male', 'clothes', 'Hosen', '16.99', 15, NULL),
(602, 'Hose5', 'male', 'clothes', 'Hosen', '13.95', 16, NULL),
(603, 'kurze Hose2', 'male', 'clothes', 'Hosen', '16.99', 17, NULL),
(604, 'Shorts2', 'male', 'clothes', 'Hosen', '4.99', 18, NULL),
(605, 'Stoffhose2', 'male', 'clothes', 'Hosen', '26.95', 19, NULL),
(606, 'Stoffhose3', 'male', 'clothes', 'Hosen', '69.95', 20, NULL),
(607, 'Boxershorts', 'male', 'clothes', 'Hosen', '6.95', 21, NULL),
(608, 'Hose', 'male', 'clothes', 'Hosen', '69.95', 22, NULL),
(609, 'Leinenhose3', 'male', 'clothes', 'Hosen', '24.95', 23, NULL),
(610, 'enge Anzughose1', 'male', 'clothes', 'Hosen', '64.90', 24, NULL),
(611, 'Anzughose2', 'male', 'clothes', 'Hosen', '69.95', 25, NULL),
(612, 'Jeans3', 'male', 'clothes', 'Hosen', '16.99', 26, NULL),
(613, 'Leinenhose4', 'male', 'clothes', 'Hosen', '24.95', 27, NULL),
(614, 'enge Anzughose2', 'male', 'clothes', 'Hosen', '64.90', 28, NULL),
(615, 'Stoffhose4', 'male', 'clothes', 'Hosen', '12.95', 29, NULL),
(616, 'Cargobermuda1', 'male', 'clothes', 'Hosen', '26.95', 31, NULL),
(617, 'Hose6', 'male', 'clothes', 'Hosen', '6.95', 32, NULL),
(618, 'Cargohose1', 'male', 'clothes', 'Hosen', '26.95', 33, NULL),
(619, 'Motorradhose', 'male', 'clothes', 'Hosen', '35.60', 34, NULL),
(620, 'Anzughose3', 'male', 'clothes', 'Hosen', '69.95', 35, NULL),
(621, 'Reflekthose', 'male', 'clothes', 'Hosen', '14.95', 36, NULL),
(622, 'Stoffhose5', 'male', 'clothes', 'Hosen', '19.99', 37, NULL),
(623, 'sterile Hose', 'male', 'clothes', 'Hosen', '5.95', 40, NULL),
(624, 'Hose7', 'male', 'clothes', 'Hosen', '16.99', 42, NULL),
(625, 'weite Jeans2', 'male', 'clothes', 'Hosen', '12.99', 43, NULL),
(626, 'Anzughose4', 'male', 'clothes', 'Hosen', '54.80', 45, NULL),
(627, 'Hose8', 'male', 'clothes', 'Hosen', '35.60', 46, NULL),
(628, 'Cargohose2', 'male', 'clothes', 'Hosen', '26.95', 47, NULL),
(629, 'Anzughose5', 'male', 'clothes', 'Hosen', '74.95', 48, NULL),
(630, 'enge Anzughose3', 'male', 'clothes', 'Hosen', '74.95', 49, NULL),
(631, 'Hose mit Bügelfalte1', 'male', 'clothes', 'Hosen', '74.95', 50, NULL),
(632, 'Hose mit Bügelfalte2', 'male', 'clothes', 'Hosen', '74.95', 51, NULL),
(633, 'enge Anzughose4', 'male', 'clothes', 'Hosen', '74.95', 52, NULL),
(634, 'enge Anzughose5', 'male', 'clothes', 'Hosen', '74.95', 53, NULL),
(635, 'Hose9', 'male', 'clothes', 'Hosen', '13.95', 54, NULL),
(636, 'Jogginghose2', 'male', 'clothes', 'Hosen', '9.95', 55, NULL),
(637, 'Bademantel', 'male', 'clothes', 'Hosen', '11.99', 56, NULL),
(638, 'Pyjamahose1', 'male', 'clothes', 'Hosen', '13.85', 58, NULL),
(639, 'Hose10', 'male', 'clothes', 'Hosen', '26.95', 59, NULL),
(640, 'Hose11', 'male', 'clothes', 'Hosen', '12.95', 60, NULL),
(641, 'Shorts3', 'male', 'clothes', 'Hosen', '6.95', 61, NULL),
(642, 'Hose12', 'male', 'clothes', 'Hosen', '16.99', 62, NULL),
(643, 'Jeans4', 'male', 'clothes', 'Hosen', '12.99', 63, NULL),
(644, 'Jogginghose3', 'male', 'clothes', 'Hosen', '9.95', 64, NULL),
(645, 'Pyjamahose2', 'male', 'clothes', 'Hosen', '13.85', 65, NULL),
(646, 'Rennanzug1', 'male', 'clothes', 'Hosen', '35.60', 66, NULL),
(647, 'Rennanzug2', 'male', 'clothes', 'Hosen', '35.60', 67, NULL),
(648, 'Stunthose1', 'male', 'clothes', 'Hosen', '4.95', 68, NULL),
(649, 'Pyjamahose3', 'male', 'clothes', 'Hosen', '9.95', 69, NULL),
(650, 'Stunthose2', 'male', 'clothes', 'Hosen', '4.95', 70, NULL),
(651, 'Lederhose1', 'male', 'clothes', 'Hosen', '16.99', 71, NULL),
(652, 'Lederhose2', 'male', 'clothes', 'Hosen', '16.99', 72, NULL),
(653, 'Lederhose3', 'male', 'clothes', 'Hosen', '26.95', 73, NULL),
(654, 'Lederhose4', 'male', 'clothes', 'Hosen', '26.95', 74, NULL),
(655, 'Jeans5', 'male', 'clothes', 'Hosen', '24.95', 75, NULL),
(656, 'Jeans6', 'male', 'clothes', 'Hosen', '24.95', 76, NULL),
(657, 'Hose13', 'male', 'clothes', 'Hosen', '20.80', 77, NULL),
(658, 'Hose14', 'male', 'clothes', 'Hosen', '16.99', 78, NULL),
(659, 'Hose15', 'male', 'clothes', 'Hosen', '16.99', 79, NULL),
(660, 'Hose16', 'male', 'clothes', 'Hosen', '16.99', 80, NULL),
(661, 'Hose17', 'male', 'clothes', 'Hosen', '16.99', 81, NULL),
(662, 'Jeans7', 'male', 'clothes', 'Hosen', '6.95', 82, NULL),
(663, 'Hose18', 'male', 'clothes', 'Hosen', '16.99', 83, NULL),
(664, 'Goa Hose', 'male', 'clothes', 'Hosen', '4.95', 85, NULL),
(665, 'Cargohose3', 'male', 'clothes', 'Hosen', '19.95', 86, NULL),
(666, 'Cargohose4', 'male', 'clothes', 'Hosen', '19.95', 87, NULL),
(667, 'kurze Hose3', 'male', 'clothes', 'Hosen', '16.99', 88, NULL),
(668, 'Latzhose1', 'male', 'clothes', 'Hosen', '13.85', 89, NULL),
(669, 'Latzhose2', 'male', 'clothes', 'Hosen', '13.85', 90, NULL),
(670, 'Rennanzug3', 'male', 'clothes', 'Hosen', '35.60', 91, NULL),
(671, 'Nikolaushose', 'male', 'clothes', 'Hosen', '4.95', 57, NULL),
(672, 'Hose19', 'male', 'clothes', 'Hosen', '19.99', 94, NULL),
(673, 'Leggins mit Neonstreifen', 'male', 'clothes', 'Hosen', '4.95', 95, NULL),
(674, 'Hose20', 'male', 'clothes', 'Hosen', '74.90', 96, NULL),
(675, 'Arbeitshose1', 'male', 'clothes', 'Hosen', '13.85', 97, NULL),
(676, 'Arbeitshose2', 'male', 'clothes', 'Hosen', '13.85', 98, NULL),
(677, 'Rennanzug4', 'male', 'clothes', 'Hosen', '35.60', 99, NULL),
(678, 'Pyjamahose4', 'male', 'clothes', 'Hosen', '14.95', 100, NULL),
(679, 'Rennanzug5', 'male', 'clothes', 'Hosen', '35.60', 101, NULL),
(680, 'Cargohose5', 'male', 'clothes', 'Hosen', '26.95', 102, NULL),
(681, 'Cargohose6', 'male', 'clothes', 'Hosen', '26.95', 103, NULL),
(682, 'Stoffhose6', 'male', 'clothes', 'Hosen', '16.99', 104, NULL),
(683, 'Hose21', 'male', 'clothes', 'Hosen', '74.90', 105, NULL),
(684, 'Tshirt rund1', 'male', 'clothes', 'Oberteile', '14.99', 0, NULL),
(685, 'Tshirt rund2', 'male', 'clothes', 'Oberteile', '14.99', 22, NULL),
(686, 'Tshirt rund3', 'male', 'clothes', 'Oberteile', '14.99', 33, NULL),
(687, 'Tshirt rund4', 'male', 'clothes', 'Oberteile', '14.99', 47, NULL),
(688, 'Tshirt rund5', 'male', 'clothes', 'Oberteile', '7.99', 56, NULL),
(689, 'Tshirt rund6', 'male', 'clothes', 'Oberteile', '18.99', 71, NULL),
(690, 'Tshirt rund7', 'male', 'clothes', 'Oberteile', '11.95', 73, NULL),
(691, 'Tshirt rund8', 'male', 'clothes', 'Oberteile', '14.99', 97, NULL),
(692, 'Tshirt rund9', 'male', 'clothes', 'Oberteile', '14.99', 146, NULL),
(693, 'Tshirt rund10', 'male', 'clothes', 'Oberteile', '18.95', 208, NULL),
(694, 'Tshirt rund11', 'male', 'clothes', 'Oberteile', '14.95', 226, NULL),
(695, 'Tshirt V1', 'male', 'clothes', 'Oberteile', '14.99', 1, NULL),
(696, 'Tshirt V2', 'male', 'clothes', 'Oberteile', '14.99', 16, NULL),
(697, 'Tshirt V3', 'male', 'clothes', 'Oberteile', '14.99', 34, NULL),
(698, 'Muscle Shirt1', 'male', 'clothes', 'Oberteile', '9.99', 5, NULL),
(699, 'Muscle Shirt2', 'male', 'clothes', 'Oberteile', '9.99', 17, NULL),
(700, 'Muscle Shirt3', 'male', 'clothes', 'Oberteile', '9.99', 36, NULL),
(701, 'Muscle Shirt4', 'male', 'clothes', 'Oberteile', '5.00', 237, NULL),
(702, 'Polo Shirt1', 'male', 'clothes', 'Oberteile', '39.99', 9, NULL),
(703, 'Polo Shirt2', 'male', 'clothes', 'Oberteile', '39.99', 39, NULL),
(704, 'Polo Shirt3', 'male', 'clothes', 'Oberteile', '42.55', 93, NULL),
(705, 'Polo Shirt4', 'male', 'clothes', 'Oberteile', '42.55', 131, NULL),
(706, 'Polo Shirt5', 'male', 'clothes', 'Oberteile', '42.95', 235, NULL),
(707, 'Polo Shirt6', 'male', 'clothes', 'Oberteile', '42.95', 241, NULL),
(708, 'Polo Shirt7', 'male', 'clothes', 'Oberteile', '42.55', 94, NULL),
(709, 'Polo Shirt8', 'male', 'clothes', 'Oberteile', '42.55', 132, NULL),
(710, 'Polo Shirt9', 'male', 'clothes', 'Oberteile', '42.95', 236, NULL),
(711, 'Polo Shirt10', 'male', 'clothes', 'Oberteile', '42.95', 242, NULL),
(712, 'Weste1', 'male', 'clothes', 'Oberteile', '54.99', 11, NULL),
(713, 'Weste1a', 'male', 'clothes', 'Oberteile', '54.99', 11, NULL),
(714, 'Weste', 'male', 'clothes', 'Oberteile', '54.99', 21, NULL),
(715, 'Westea', 'male', 'clothes', 'Oberteile', '54.99', 21, NULL),
(716, 'Weste2', 'male', 'clothes', 'Oberteile', '57.75', 25, NULL),
(717, 'Weste2a', 'male', 'clothes', 'Oberteile', '57.75', 25, NULL),
(718, 'Weste3', 'male', 'clothes', 'Oberteile', '57.75', 40, NULL),
(719, 'Weste3a', 'male', 'clothes', 'Oberteile', '57.75', 40, NULL),
(720, 'Weste4', 'male', 'clothes', 'Oberteile', '8.00', 45, NULL),
(721, 'Weste4a', 'male', 'clothes', 'Oberteile', '8.00', 45, NULL),
(722, 'Weste5', 'male', 'clothes', 'Oberteile', '54.97', 120, NULL),
(723, 'Weste5a', 'male', 'clothes', 'Oberteile', '54.97', 120, NULL),
(724, 'Sakko1', 'male', 'clothes', 'Oberteile', '79.99', 4, NULL),
(725, 'Sakko zu1', 'male', 'clothes', 'Oberteile', '48.99', 10, NULL),
(726, 'Sakko zu2', 'male', 'clothes', 'Oberteile', '35.99', 19, NULL),
(727, 'Sakko', 'male', 'clothes', 'Oberteile', '74.99', 23, NULL),
(728, 'Sakko zu3', 'male', 'clothes', 'Oberteile', '39.99', 24, NULL),
(729, 'Sakko2', 'male', 'clothes', 'Oberteile', '48.99', 29, NULL),
(730, 'Sakko eng1', 'male', 'clothes', 'Oberteile', '44.95', 31, NULL),
(731, 'Sakko eng2', 'male', 'clothes', 'Oberteile', '44.95', 32, NULL),
(732, 'Sakko3', 'male', 'clothes', 'Oberteile', '89.99', 32, NULL),
(733, 'Sakko5', 'male', 'clothes', 'Oberteile', '12.99', 46, NULL),
(734, 'Sakko6', 'male', 'clothes', 'Oberteile', '49.99', 58, NULL),
(735, 'Sakko7', 'male', 'clothes', 'Oberteile', '29.95', 59, NULL),
(736, 'Sakko zu4', 'male', 'clothes', 'Oberteile', '29.95', 60, NULL),
(737, 'Sakko8', 'male', 'clothes', 'Oberteile', '52.50', 99, NULL),
(738, 'Sakko zu5', 'male', 'clothes', 'Oberteile', '52.50', 100, NULL),
(739, 'Sakko9', 'male', 'clothes', 'Oberteile', '81.99', 101, NULL),
(740, 'Sakko zu6', 'male', 'clothes', 'Oberteile', '81.99', 102, NULL),
(741, 'Sakko', 'male', 'clothes', 'Oberteile', '99.99', 103, NULL),
(742, 'Sakko zu7', 'male', 'clothes', 'Oberteile', '99.99', 104, NULL),
(743, 'Bomberjacke1', 'male', 'clothes', 'Oberteile', '19.98', 229, NULL),
(744, 'Bomberjacke2', 'male', 'clothes', 'Oberteile', '19.98', 230, NULL),
(745, 'Stuntjacke1', 'male', 'clothes', 'Oberteile', '10.00', 149, NULL),
(746, 'Stuntjacke2', 'male', 'clothes', 'Oberteile', '10.00', 155, NULL),
(747, 'Daunenjacke', 'male', 'clothes', 'Oberteile', '44.95', 167, NULL),
(748, 'kariertes Hemd1', 'male', 'clothes', 'Oberteile', '25.90', 126, NULL),
(749, 'kariertes Hemd2', 'male', 'clothes', 'Oberteile', '35.99', 127, NULL),
(750, 'Tang', 'male', 'clothes', 'Oberteile', '74.90', 107, NULL);
INSERT INTO `clothes_new` (`id`, `name`, `gender`, `type`, `part`, `price`, `clothesID`, `indexID`) VALUES
(751, 'Pullunder', 'male', 'clothes', 'Oberteile', '28.95', 109, NULL),
(752, 'Sacko zu8', 'male', 'clothes', 'Oberteile', '44.95', 183, NULL),
(753, 'Weihnachtsjacke', 'male', 'clothes', 'Oberteile', '10.00', 198, NULL),
(754, 'Weihnachtsjacke1', 'male', 'clothes', 'Oberteile', '10.00', 199, NULL),
(755, 'Ugly Sweater', 'male', 'clothes', 'Oberteile', '10.00', 194, NULL),
(756, 'Ugly Sweater1', 'male', 'clothes', 'Oberteile', '10.00', 195, NULL),
(757, 'Ugly Sweater2', 'male', 'clothes', 'Oberteile', '10.00', 196, NULL),
(758, 'Ugly Sweater3', 'male', 'clothes', 'Oberteile', '10.00', 197, NULL),
(759, 'Ugly Sweater4', 'male', 'clothes', 'Oberteile', '10.00', 245, NULL),
(760, 'XMas Pullover1', 'male', 'clothes', 'Oberteile', '10.00', 51, NULL),
(761, 'XMas Pullover2', 'male', 'clothes', 'Oberteile', '10.00', 52, NULL),
(762, 'Hemd m Hosentr1', 'male', 'clothes', 'Oberteile', '24.99', 42, NULL),
(763, 'Hemd m Hosentr2', 'male', 'clothes', 'Oberteile', '24.99', 43, NULL),
(764, 'Hemd1', 'male', 'clothes', 'Oberteile', '24.99', 12, NULL),
(765, 'Hemd2', 'male', 'clothes', 'Oberteile', '24.99', 13, NULL),
(766, 'Hemd m Shirt', 'male', 'clothes', 'Oberteile', '14.99', 14, NULL),
(767, 'Hemd3', 'male', 'clothes', 'Oberteile', '44.99', 26, NULL),
(768, 'Hemd4', 'male', 'clothes', 'Oberteile', '19.90', 41, NULL),
(769, 'Hemd5', 'male', 'clothes', 'Oberteile', '27.95', 95, NULL),
(770, 'Hemd6', 'male', 'clothes', 'Oberteile', '24.99', 133, NULL),
(771, 'Hemd7', 'male', 'clothes', 'Oberteile', '4.99', 135, NULL),
(772, 'XMas Shirt', 'male', 'clothes', 'Oberteile', '7.95', 18, NULL),
(773, 'Hawaiihemd', 'male', 'clothes', 'Oberteile', '5.99', 105, NULL),
(774, 'Pelzjacke1', 'male', 'clothes', 'Oberteile', '139.99', 70, NULL),
(775, 'Pelzjacke2', 'male', 'clothes', 'Oberteile', '139.99', 240, NULL),
(776, 'Jacke1', 'male', 'clothes', 'Oberteile', '16.99', 3, NULL),
(777, 'Jacke2', 'male', 'clothes', 'Oberteile', '12.99', 7, NULL),
(778, 'Jacke3', 'male', 'clothes', 'Oberteile', '19.99', 61, NULL),
(779, 'Jacke4', 'male', 'clothes', 'Oberteile', '44.99', 74, NULL),
(780, 'Jacke5', 'male', 'clothes', 'Oberteile', '44.99', 75, NULL),
(781, 'Jacke6', 'male', 'clothes', 'Oberteile', '12.95', 85, NULL),
(782, 'Jacke7', 'male', 'clothes', 'Oberteile', '69.99', 106, NULL),
(783, 'Jacke8', 'male', 'clothes', 'Oberteile', '45.95', 110, NULL),
(784, 'Jacke9', 'male', 'clothes', 'Oberteile', '39.99', 112, NULL),
(785, 'Jacke10', 'male', 'clothes', 'Oberteile', '12.99', 113, NULL),
(786, 'Jacke11', 'male', 'clothes', 'Oberteile', '26.94', 122, NULL),
(787, 'Jacke12', 'male', 'clothes', 'Oberteile', '34.99', 124, NULL),
(788, 'Jacke13', 'male', 'clothes', 'Oberteile', '39.95', 125, NULL),
(789, 'Jacke14', 'male', 'clothes', 'Oberteile', '47.95', 136, NULL),
(790, 'Jacke15', 'male', 'clothes', 'Oberteile', '34.95', 138, NULL),
(791, 'Jacke16', 'male', 'clothes', 'Oberteile', '52.50', 140, NULL),
(792, 'Jacke17', 'male', 'clothes', 'Oberteile', '16.99', 141, NULL),
(793, 'Jacke18', 'male', 'clothes', 'Oberteile', '14.99', 150, NULL),
(794, 'Jacke19', 'male', 'clothes', 'Oberteile', '11.95', 153, NULL),
(795, 'Jacke20', 'male', 'clothes', 'Oberteile', '11.95', 154, NULL),
(796, 'Jacke21', 'male', 'clothes', 'Oberteile', '27.95', 163, NULL),
(797, 'Jacke22', 'male', 'clothes', 'Oberteile', '12.95', 168, NULL),
(798, 'Jacke23', 'male', 'clothes', 'Oberteile', '14.98', 169, NULL),
(799, 'Jacke24', 'male', 'clothes', 'Oberteile', '17.98', 172, NULL),
(800, 'Jacke25', 'male', 'clothes', 'Oberteile', '24.99', 187, NULL),
(801, 'Jacke26', 'male', 'clothes', 'Oberteile', '49.99', 191, NULL),
(802, 'Jacke27', 'male', 'clothes', 'Oberteile', '24.99', 204, NULL),
(803, 'Jacke28', 'male', 'clothes', 'Oberteile', '32.95', 215, NULL),
(804, 'Jacke29', 'male', 'clothes', 'Oberteile', '39.99', 224, NULL),
(805, 'Jacke30', 'male', 'clothes', 'Oberteile', '26.95', 243, NULL),
(806, 'Jacke31', 'male', 'clothes', 'Oberteile', '34.95', 244, NULL),
(807, 'Jacke32', 'male', 'clothes', 'Oberteile', '38.95', 248, NULL),
(808, 'Jacke33', 'male', 'clothes', 'Oberteile', '16.99', 249, NULL),
(809, 'Jacke34', 'male', 'clothes', 'Oberteile', '14.95', 251, NULL),
(810, 'Jacke35', 'male', 'clothes', 'Oberteile', '14.95', 253, NULL),
(811, 'Lederjacke1', 'male', 'clothes', 'Oberteile', '18.99', 6, NULL),
(812, 'Lederjacke2', 'male', 'clothes', 'Oberteile', '21.80', 37, NULL),
(813, 'Lederjacke3', 'male', 'clothes', 'Oberteile', '24.99', 62, NULL),
(814, 'Lederjacke4', 'male', 'clothes', 'Oberteile', '34.99', 64, NULL),
(815, 'Lederjacke5', 'male', 'clothes', 'Oberteile', '24.99', 118, NULL),
(816, 'Lederjacke6', 'male', 'clothes', 'Oberteile', '45.99', 161, NULL),
(817, 'Lederjacke7', 'male', 'clothes', 'Oberteile', '54.95', 166, NULL),
(818, 'Lederjacke8', 'male', 'clothes', 'Oberteile', '48.99', 174, NULL),
(819, 'Lederjacke9', 'male', 'clothes', 'Oberteile', '54.95', 181, NULL),
(820, 'Regenjacke', 'male', 'clothes', 'Oberteile', '9.99', 57, NULL),
(821, 'Regenjacke1', 'male', 'clothes', 'Oberteile', '24.99', 184, NULL),
(822, 'Regenjacke2', 'male', 'clothes', 'Oberteile', '24.99', 185, NULL),
(823, 'Regenjacke3', 'male', 'clothes', 'Oberteile', '14.95', 188, NULL),
(824, 'Regenjacke4', 'male', 'clothes', 'Oberteile', '14.95', 189, NULL),
(825, 'Regenjacke5', 'male', 'clothes', 'Oberteile', '29.95', 209, NULL),
(826, 'Regenjacke6', 'male', 'clothes', 'Oberteile', '29.95', 210, NULL),
(827, 'Regenjacke7', 'male', 'clothes', 'Oberteile', '29.95', 211, NULL),
(828, 'Regenjacke8', 'male', 'clothes', 'Oberteile', '29.95', 212, NULL),
(829, 'Regenjacke9', 'male', 'clothes', 'Oberteile', '24.99', 217, NULL),
(830, 'Regenjacke10', 'male', 'clothes', 'Oberteile', '24.99', 218, NULL),
(831, 'Regenjacke11', 'male', 'clothes', 'Oberteile', '12.95', 232, NULL),
(832, 'Regenjacke12', 'male', 'clothes', 'Oberteile', '12.95', 233, NULL),
(833, 'Kapuzenjacke1', 'male', 'clothes', 'Oberteile', '25.97', 68, NULL),
(834, 'Kapuzenjacke2', 'male', 'clothes', 'Oberteile', '24.97', 69, NULL),
(835, 'Mantel1', 'male', 'clothes', 'Oberteile', '109.99', 72, NULL),
(836, 'Mantel2', 'male', 'clothes', 'Oberteile', '114.99', 77, NULL),
(837, 'Mantel3', 'male', 'clothes', 'Oberteile', '69.99', 115, NULL),
(838, 'Mantel4', 'male', 'clothes', 'Oberteile', '69.99', 142, NULL),
(839, 'Mantel5', 'male', 'clothes', 'Oberteile', '69.99', 192, NULL),
(840, 'Trenchcoat1', 'male', 'clothes', 'Oberteile', '49.95', 76, NULL),
(841, 'Collegejacke1', 'male', 'clothes', 'Oberteile', '59.99', 79, NULL),
(842, 'Collegejacke2', 'male', 'clothes', 'Oberteile', '59.99', 87, NULL),
(843, 'Collegejacke3', 'male', 'clothes', 'Oberteile', '59.99', 88, NULL),
(844, 'Collegejacke4', 'male', 'clothes', 'Oberteile', '49.99', 90, NULL),
(845, 'Collegejacke5', 'male', 'clothes', 'Oberteile', '38.94', 143, NULL),
(846, 'Morgenmantel', 'male', 'clothes', 'Oberteile', '89.99', 108, NULL),
(847, 'Morgenmantel2', 'male', 'clothes', 'Oberteile', '84.98', 145, NULL),
(848, 'Rennanzug1', 'male', 'clothes', 'Oberteile', '42.98', 147, NULL),
(849, 'Rennanzug2', 'male', 'clothes', 'Oberteile', '42.98', 148, NULL),
(850, 'Rennanzug3', 'male', 'clothes', 'Oberteile', '30.95', 227, NULL),
(851, 'Rennanzug4', 'male', 'clothes', 'Oberteile', '42.98', 254, NULL),
(852, 'Wildlederjacke1', 'male', 'clothes', 'Oberteile', '34.97', 151, NULL),
(853, 'Wildlederjacke2', 'male', 'clothes', 'Oberteile', '34.97', 156, NULL),
(854, 'Neonanzug', 'male', 'clothes', 'Oberteile', '42.98', 178, NULL),
(855, 'Goa Anzug', 'male', 'clothes', 'Oberteile', '10.00', 201, NULL),
(856, 'Matrixauto', 'male', 'clothes', 'Oberteile', '10.00', 246, NULL),
(857, 'Hoodie', 'male', 'clothes', 'Oberteile', '39.99', 86, NULL),
(858, 'Hoodie1', 'male', 'clothes', 'Oberteile', '36.99', 96, NULL),
(859, 'Hoodie2', 'male', 'clothes', 'Oberteile', '49.99', 134, NULL),
(860, 'Hoodie3', 'male', 'clothes', 'Oberteile', '29.99', 171, NULL),
(861, 'Hoodie4', 'male', 'clothes', 'Oberteile', '29.99', 182, NULL),
(862, 'Hoodie5', 'male', 'clothes', 'Oberteile', '13.95', 200, NULL),
(863, 'Hoodie6', 'male', 'clothes', 'Oberteile', '19.95', 202, NULL),
(864, 'Hoodie7', 'male', 'clothes', 'Oberteile', '13.95', 203, NULL),
(865, 'Hoodie8', 'male', 'clothes', 'Oberteile', '19.95', 205, NULL),
(866, 'Hoodie9', 'male', 'clothes', 'Oberteile', '24.95', 206, NULL),
(867, 'Hoodie10', 'male', 'clothes', 'Oberteile', '24.95', 207, NULL),
(868, 'Pullover', 'male', 'clothes', 'Oberteile', '28.95', 50, NULL),
(869, 'Pullover1', 'male', 'clothes', 'Oberteile', '7.99', 78, NULL),
(870, 'Pullover2', 'male', 'clothes', 'Oberteile', '24.99', 89, NULL),
(871, 'Pullover3', 'male', 'clothes', 'Oberteile', '29.95', 190, NULL),
(872, 'Rollkragenpullover1', 'male', 'clothes', 'Oberteile', '19.99', 111, NULL),
(873, 'Rollkragenpullover2', 'male', 'clothes', 'Oberteile', '19.99', 139, NULL),
(874, 'Baggieshirt1', 'male', 'clothes', 'Oberteile', '16.99', 80, NULL),
(875, 'Baggieshirt2', 'male', 'clothes', 'Oberteile', '34.99', 193, NULL),
(876, 'Baggieshirt V1', 'male', 'clothes', 'Oberteile', '16.99', 81, NULL),
(877, 'Baggieshirt V2', 'male', 'clothes', 'Oberteile', '24.99', 128, NULL),
(878, 'Pullunder', 'male', 'clothes', 'Oberteile', '39.99', 137, NULL),
(879, 'Nikolausoberteil', 'male', 'clothes', 'Oberteile', '5.99', 116, NULL),
(880, 'Baggiepoloshirt', 'male', 'clothes', 'Oberteile', '15.99', 83, NULL),
(881, 'BaggieHemd', 'male', 'clothes', 'Oberteile', '17.99', 84, NULL),
(882, 'Oberteil1', 'male', 'clothes', 'Oberteile', '10.00', 8, NULL),
(883, 'Oberteil2', 'male', 'clothes', 'Oberteile', '10.99', 38, NULL),
(884, 'Oberteil3', 'male', 'clothes', 'Oberteile', '17.98', 53, NULL),
(885, 'Oberteil4', 'male', 'clothes', 'Oberteile', '19.95', 63, NULL),
(886, 'Oberteil5', 'male', 'clothes', 'Oberteile', '29.99', 92, NULL),
(887, 'Oberteil6', 'male', 'clothes', 'Oberteile', '24.99', 98, NULL),
(888, 'Oberteil7', 'male', 'clothes', 'Oberteile', '11.99', 117, NULL),
(889, 'Oberteil8', 'male', 'clothes', 'Oberteile', '7.85', 121, NULL),
(890, 'Oberteil9', 'male', 'clothes', 'Oberteile', '19.99', 123, NULL),
(891, 'Oberteil10', 'male', 'clothes', 'Oberteile', '6.95', 144, NULL),
(892, 'Oberteil11', 'male', 'clothes', 'Oberteile', '31.95', 152, NULL),
(893, 'Oberteil12', 'male', 'clothes', 'Oberteile', '49.99', 158, NULL),
(894, 'Oberteil13', 'male', 'clothes', 'Oberteile', '49.99', 159, NULL),
(895, 'Oberteil14', 'male', 'clothes', 'Oberteile', '49.99', 160, NULL),
(896, 'Oberteil15', 'male', 'clothes', 'Oberteile', '45.99', 162, NULL),
(897, 'Oberteil16', 'male', 'clothes', 'Oberteile', '35.99', 165, NULL),
(898, 'Oberteil17', 'male', 'clothes', 'Oberteile', '12.98', 170, NULL),
(899, 'Oberteil18', 'male', 'clothes', 'Oberteile', '15.98', 173, NULL),
(900, 'Oberteil19', 'male', 'clothes', 'Oberteile', '48.99', 175, NULL),
(901, 'Oberteil20', 'male', 'clothes', 'Oberteile', '52.99', 176, NULL),
(902, 'Oberteil21', 'male', 'clothes', 'Oberteile', '30.99', 177, NULL),
(903, 'Oberteil22', 'male', 'clothes', 'Oberteile', '49.99', 180, NULL),
(904, 'Oberteil23', 'male', 'clothes', 'Oberteile', '30.99', 213, NULL),
(905, 'Oberteil24', 'male', 'clothes', 'Oberteile', '35.99', 214, NULL),
(906, 'Oberteil25', 'male', 'clothes', 'Oberteile', '29.95', 216, NULL),
(907, 'Oberteil26', 'male', 'clothes', 'Oberteile', '19.95', 219, NULL),
(908, 'Oberteil27', 'male', 'clothes', 'Oberteile', '25.98', 220, NULL),
(909, 'Oberteil28', 'male', 'clothes', 'Oberteile', '25.98', 221, NULL),
(910, 'Oberteil29', 'male', 'clothes', 'Oberteile', '25.98', 222, NULL),
(911, 'Oberteil30', 'male', 'clothes', 'Oberteile', '32.99', 223, NULL),
(912, 'Oberteil31', 'male', 'clothes', 'Oberteile', '4.95', 225, NULL),
(913, 'Oberteil32', 'male', 'clothes', 'Oberteile', '24.95', 234, NULL),
(914, 'Oberteil33', 'male', 'clothes', 'Oberteile', '11.95', 238, NULL),
(915, 'Oberteil34', 'male', 'clothes', 'Oberteile', '14.95', 239, NULL),
(916, 'Oberteil35', 'male', 'clothes', 'Oberteile', '29.99', 247, NULL),
(917, 'Oberteil36', 'male', 'clothes', 'Oberteile', '39.99', 250, NULL),
(918, 'Oberteil37', 'male', 'clothes', 'Oberteile', '10.00', 255, NULL),
(919, 'BaggieHemd2', 'male', 'clothes', 'Oberteile', '18.95', 164, NULL),
(920, 'Anglerweste1', 'male', 'clothes', 'Oberteile', '49.99', 157, NULL),
(921, 'Anglerweste2', 'male', 'clothes', 'Oberteile', '24.95', 179, NULL),
(922, 'Sakko Zweireiher1', 'male', 'clothes', 'Oberteile', '99.83', 20, NULL),
(923, 'Sakko Zweireiher2', 'male', 'clothes', 'Oberteile', '95.99', 27, NULL),
(924, 'Sakko Zweireiher3', 'male', 'clothes', 'Oberteile', '59.97', 119, NULL),
(925, 'Sakko10', 'male', 'clothes', 'Oberteile', '48.99', 28, NULL),
(926, 'Sakko11', 'male', 'clothes', 'Oberteile', '44.95', 30, NULL),
(927, 'Bademantel', 'male', 'clothes', 'Oberteile', '10.00', 114, NULL),
(928, 'schulterfreies Shirt', 'female', 'clothes', 'Oberteile', '16.99', 2, NULL),
(929, 'schulterfreies Shirt2', 'female', 'clothes', 'Oberteile', '16.99', 30, NULL),
(930, 'schulterfreies Shirt3', 'female', 'clothes', 'Oberteile', '16.99', 38, NULL),
(931, 'schulterfreies Shirt4', 'female', 'clothes', 'Oberteile', '16.99', 40, NULL),
(932, 'schulterfreies Shirt5', 'female', 'clothes', 'Oberteile', '16.99', 67, NULL),
(933, 'Tang', 'female', 'clothes', 'Oberteile', '74.90', 98, NULL),
(934, 'Bademantel', 'female', 'clothes', 'Oberteile', '12.99', 105, NULL),
(935, 'Nikolausjacke', 'female', 'clothes', 'Oberteile', '5.99', 108, NULL),
(936, 'Tshirt V1', 'female', 'clothes', 'Oberteile', '14.99', 0, NULL),
(937, 'Tshirt V2', 'female', 'clothes', 'Oberteile', '14.99', 23, NULL),
(938, 'Top1', 'female', 'clothes', 'Oberteile', '9.99', 4, NULL),
(939, 'Top2', 'female', 'clothes', 'Oberteile', '12.99', 16, NULL),
(940, 'Top3', 'female', 'clothes', 'Oberteile', '9.99', 32, NULL),
(941, 'Hawaiihemd1', 'female', 'clothes', 'Oberteile', '4.97', 17, NULL),
(942, 'Hawaiihemd2', 'female', 'clothes', 'Oberteile', '5.99', 96, NULL),
(943, 'Bikini1', 'female', 'clothes', 'Oberteile', '10.99', 15, NULL),
(944, 'Bikini2', 'female', 'clothes', 'Oberteile', '10.99', 18, NULL),
(945, 'Bikini3', 'female', 'clothes', 'Oberteile', '10.99', 101, NULL),
(946, 'Korsage1', 'female', 'clothes', 'Oberteile', '69.95', 13, NULL),
(947, 'Korsage2', 'female', 'clothes', 'Oberteile', '89.99', 22, NULL),
(948, 'Korsage3', 'female', 'clothes', 'Oberteile', '69.95', 111, NULL),
(949, 'Poloshirt1', 'female', 'clothes', 'Oberteile', '42.50', 14, NULL),
(950, 'Poloshirt2', 'female', 'clothes', 'Oberteile', '42.55', 84, NULL),
(951, 'Poloshirt3', 'female', 'clothes', 'Oberteile', '42.55', 85, NULL),
(952, 'Poloshirt4', 'female', 'clothes', 'Oberteile', '19.99', 119, NULL),
(953, 'Poloshirt5', 'female', 'clothes', 'Oberteile', '42.55', 128, NULL),
(954, 'Poloshirt6', 'female', 'clothes', 'Oberteile', '42.55', 129, NULL),
(955, 'Poloshirt7', 'female', 'clothes', 'Oberteile', '42.95', 246, NULL),
(956, 'Poloshirt8', 'female', 'clothes', 'Oberteile', '42.95', 249, NULL),
(957, 'Poloshirt9', 'female', 'clothes', 'Oberteile', '42.95', 250, NULL),
(958, 'Kleid1', 'female', 'clothes', 'Oberteile', '74.99', 37, NULL),
(959, 'Kleid2', 'female', 'clothes', 'Oberteile', '74.99', 112, NULL),
(960, 'Kleid3', 'female', 'clothes', 'Oberteile', '74.99', 113, NULL),
(961, 'Kleid4', 'female', 'clothes', 'Oberteile', '74.99', 114, NULL),
(962, 'Kleid5', 'female', 'clothes', 'Oberteile', '74.99', 115, NULL),
(963, 'Kleid6', 'female', 'clothes', 'Oberteile', '74.99', 116, NULL),
(964, 'XMas Shirt', 'female', 'clothes', 'Oberteile', '10.00', 19, NULL),
(965, 'XMas Pullover1', 'female', 'clothes', 'Oberteile', '10.00', 44, NULL),
(966, 'XMas Pullover2', 'female', 'clothes', 'Oberteile', '10.00', 45, NULL),
(967, 'Ugly Sweater1', 'female', 'clothes', 'Oberteile', '10.00', 196, NULL),
(968, 'Ugly Sweater2', 'female', 'clothes', 'Oberteile', '10.00', 197, NULL),
(969, 'Ugly Sweater3', 'female', 'clothes', 'Oberteile', '10.00', 198, NULL),
(970, 'Ugly Sweater4', 'female', 'clothes', 'Oberteile', '10.00', 199, NULL),
(971, 'XMas Jacke1', 'female', 'clothes', 'Oberteile', '10.00', 200, NULL),
(972, 'XMas Jacke2', 'female', 'clothes', 'Oberteile', '10.00', 201, NULL),
(973, 'Hoodie1', 'female', 'clothes', 'Oberteile', '39.99', 78, NULL),
(974, 'Hoodie2', 'female', 'clothes', 'Oberteile', '36.99', 87, NULL),
(975, 'Hoodie3', 'female', 'clothes', 'Oberteile', '39.99', 131, NULL),
(976, 'Hoodie4', 'female', 'clothes', 'Oberteile', '29.99', 172, NULL),
(977, 'Hoodie5', 'female', 'clothes', 'Oberteile', '29.99', 184, NULL),
(978, 'Hoodie6', 'female', 'clothes', 'Oberteile', '24.99', 202, NULL),
(979, 'Hoodie7', 'female', 'clothes', 'Oberteile', '24.99', 204, NULL),
(980, 'Hoodie8', 'female', 'clothes', 'Oberteile', '24.99', 205, NULL),
(981, 'Jacke21', 'female', 'clothes', 'Oberteile', '19.95', 206, NULL),
(982, 'Hoodie10', 'female', 'clothes', 'Oberteile', '24.95', 207, NULL),
(983, 'Hoodie11', 'female', 'clothes', 'Oberteile', '24.95', 210, NULL),
(984, 'Hoodie12', 'female', 'clothes', 'Oberteile', '24.95', 211, NULL),
(985, 'Tshirt1', 'female', 'clothes', 'Oberteile', '14.99', 49, NULL),
(986, 'Tshirt2', 'female', 'clothes', 'Oberteile', '14.99', 73, NULL),
(987, 'Tshirt3', 'female', 'clothes', 'Oberteile', '14.99', 88, NULL),
(988, 'Tshirt4', 'female', 'clothes', 'Oberteile', '11.95', 117, NULL),
(989, 'Tshirt5', 'female', 'clothes', 'Oberteile', '11.95', 118, NULL),
(990, 'Tshirt6', 'female', 'clothes', 'Oberteile', '14.99', 141, NULL),
(991, 'Tshirt7', 'female', 'clothes', 'Oberteile', '24.99', 208, NULL),
(992, 'Tshirt8', 'female', 'clothes', 'Oberteile', '24.99', 209, NULL),
(993, 'Tshirt9', 'female', 'clothes', 'Oberteile', '18.95', 212, NULL),
(994, 'Tshirt10', 'female', 'clothes', 'Oberteile', '15.99', 224, NULL),
(995, 'Tshirt11', 'female', 'clothes', 'Oberteile', '15.99', 225, NULL),
(996, 'Tshirt12', 'female', 'clothes', 'Oberteile', '15.99', 226, NULL),
(997, 'Tshirt13', 'female', 'clothes', 'Oberteile', '14.95', 236, NULL),
(998, 'Tshirt14', 'female', 'clothes', 'Oberteile', '11.95', 68, NULL),
(999, 'bauchfreies Top1', 'female', 'clothes', 'Oberteile', '7.00', 5, NULL),
(1000, 'bauchfreies Top2', 'female', 'clothes', 'Oberteile', '10.00', 33, NULL),
(1001, 'bauchfreies Top3', 'female', 'clothes', 'Oberteile', '9.98', 74, NULL),
(1002, 'Collegejacke1', 'female', 'clothes', 'Oberteile', '59.99', 72, NULL),
(1003, 'Collegejacke2', 'female', 'clothes', 'Oberteile', '49.99', 80, NULL),
(1004, 'Collegejacke3', 'female', 'clothes', 'Oberteile', '59.99', 81, NULL),
(1005, 'Collegejacke4', 'female', 'clothes', 'Oberteile', '38.94', 140, NULL),
(1006, 'Goa Anzug', 'female', 'clothes', 'Oberteile', '10.00', 203, NULL),
(1007, 'Pullover1', 'female', 'clothes', 'Oberteile', '28.95', 43, NULL),
(1008, 'Pullover2', 'female', 'clothes', 'Oberteile', '24.99', 75, NULL),
(1009, 'Pullover3', 'female', 'clothes', 'Oberteile', '24.99', 79, NULL),
(1010, 'Pullover4', 'female', 'clothes', 'Oberteile', '19.99', 103, NULL),
(1011, 'Pullover5', 'female', 'clothes', 'Oberteile', '7.85', 123, NULL),
(1012, 'Pullover6', 'female', 'clothes', 'Oberteile', '19.99', 136, NULL),
(1013, 'Pullover7', 'female', 'clothes', 'Oberteile', '31.95', 149, NULL),
(1014, 'Pullover8', 'female', 'clothes', 'Oberteile', '29.95', 192, NULL),
(1015, 'Pullover9', 'female', 'clothes', 'Oberteile', '19.95', 230, NULL),
(1016, 'Pullover10', 'female', 'clothes', 'Oberteile', '4.95', 235, NULL),
(1017, 'Hemd1', 'female', 'clothes', 'Oberteile', '12.99', 9, NULL),
(1018, 'Hemd2', 'female', 'clothes', 'Oberteile', '29.99', 27, NULL),
(1019, 'Hemd3', 'female', 'clothes', 'Oberteile', '17.99', 76, NULL),
(1020, 'Hemd4', 'female', 'clothes', 'Oberteile', '27.95', 86, NULL),
(1021, 'Hemd5', 'female', 'clothes', 'Oberteile', '69.50', 130, NULL),
(1022, 'Hemd6', 'female', 'clothes', 'Oberteile', '24.95', 244, NULL),
(1023, 'Hemd7', 'female', 'clothes', 'Oberteile', '42.95', 245, NULL),
(1024, 'Pelzjacke1', 'female', 'clothes', 'Oberteile', '139.99', 65, NULL),
(1025, 'Pelzjacke2', 'female', 'clothes', 'Oberteile', '139.99', 248, NULL),
(1026, 'Jeansjacke1', 'female', 'clothes', 'Oberteile', '24.99', 1, NULL),
(1027, 'Jeansjacke2', 'female', 'clothes', 'Oberteile', '24.99', 31, NULL),
(1028, 'kariertes Hemd1', 'female', 'clothes', 'Oberteile', '19.95', 120, NULL),
(1029, 'kariertes Hemd2', 'female', 'clothes', 'Oberteile', '16.95', 121, NULL),
(1030, 'Lederjacke1', 'female', 'clothes', 'Oberteile', '27.99', 8, NULL),
(1031, 'Lederjacke2', 'female', 'clothes', 'Oberteile', '27.99', 35, NULL),
(1032, 'Lederjacke3', 'female', 'clothes', 'Oberteile', '17.98', 46, NULL),
(1033, 'Lederjacke4', 'female', 'clothes', 'Oberteile', '29.99', 55, NULL),
(1034, 'Lederjacke5', 'female', 'clothes', 'Oberteile', '59.99', 69, NULL),
(1035, 'Lederjacke6', 'female', 'clothes', 'Oberteile', '24.99', 110, NULL),
(1036, 'Lederjacke7', 'female', 'clothes', 'Oberteile', '34.95', 135, NULL),
(1037, 'Lederjacke8', 'female', 'clothes', 'Oberteile', '34.97', 153, NULL),
(1038, 'Lederjacke9', 'female', 'clothes', 'Oberteile', '54.99', 158, NULL),
(1039, 'Lederjacke10', 'female', 'clothes', 'Oberteile', '54.95', 163, NULL),
(1040, 'Lederjacke11', 'female', 'clothes', 'Oberteile', '48.99', 176, NULL),
(1041, 'Weste1', 'female', 'clothes', 'Oberteile', '54.99', 28, NULL),
(1042, 'Weste2', 'female', 'clothes', 'Oberteile', '49.99', 154, NULL),
(1043, 'Weste3', 'female', 'clothes', 'Oberteile', '49.99', 155, NULL),
(1044, 'Weste4', 'female', 'clothes', 'Oberteile', '49.99', 156, NULL),
(1045, 'Weste5', 'female', 'clothes', 'Oberteile', '49.99', 157, NULL),
(1046, 'Weste6', 'female', 'clothes', 'Oberteile', '45.99', 159, NULL),
(1047, 'Weste7', 'female', 'clothes', 'Oberteile', '12.98', 167, NULL),
(1048, 'Weste8', 'female', 'clothes', 'Oberteile', '15.98', 175, NULL),
(1049, 'Weste9', 'female', 'clothes', 'Oberteile', '48.99', 177, NULL),
(1050, 'Weste10', 'female', 'clothes', 'Oberteile', '52.99', 178, NULL),
(1051, 'Weste11', 'female', 'clothes', 'Oberteile', '30.99', 179, NULL),
(1052, 'Weste12', 'female', 'clothes', 'Oberteile', '24.95', 181, NULL),
(1053, 'Weste13', 'female', 'clothes', 'Oberteile', '49.99', 182, NULL),
(1054, 'Weste14', 'female', 'clothes', 'Oberteile', '30.99', 217, NULL),
(1055, 'Weste15', 'female', 'clothes', 'Oberteile', '29.95', 220, NULL),
(1056, 'Weste16', 'female', 'clothes', 'Oberteile', '32.99', 233, NULL),
(1057, 'Weste17', 'female', 'clothes', 'Oberteile', '29.99', 255, NULL),
(1058, 'Blazer1', 'female', 'clothes', 'Oberteile', '39.99', 6, NULL),
(1059, 'Blazer2', 'female', 'clothes', 'Oberteile', '79.99', 7, NULL),
(1060, 'Blazer3', 'female', 'clothes', 'Oberteile', '44.99', 20, NULL),
(1061, 'Blazer4', 'female', 'clothes', 'Oberteile', '49.99', 24, NULL),
(1062, 'Blazer5', 'female', 'clothes', 'Oberteile', '84.99', 25, NULL),
(1063, 'Blazer6', 'female', 'clothes', 'Oberteile', '14.95', 34, NULL),
(1064, 'Blazer7', 'female', 'clothes', 'Oberteile', '79.99', 57, NULL),
(1065, 'Blazer8', 'female', 'clothes', 'Oberteile', '79.99', 58, NULL),
(1066, 'Blazer9', 'female', 'clothes', 'Oberteile', '44.99', 66, NULL),
(1067, 'Blazer10', 'female', 'clothes', 'Oberteile', '52.50', 90, NULL),
(1068, 'Blazer11', 'female', 'clothes', 'Oberteile', '52.50', 91, NULL),
(1069, 'Blazer12', 'female', 'clothes', 'Oberteile', '81.99', 92, NULL),
(1070, 'Blazer13', 'female', 'clothes', 'Oberteile', '81.99', 93, NULL),
(1071, 'Blazer14', 'female', 'clothes', 'Oberteile', '99.99', 94, NULL),
(1072, 'Blazer15', 'female', 'clothes', 'Oberteile', '99.99', 95, NULL),
(1073, 'Blazer16', 'female', 'clothes', 'Oberteile', '44.95', 185, NULL),
(1074, 'Jeansjacke3', 'female', 'clothes', 'Oberteile', '14.98', 166, NULL),
(1075, 'Jeansjacke4', 'female', 'clothes', 'Oberteile', '17.98', 174, NULL),
(1076, 'Morgenmantel1', 'female', 'clothes', 'Oberteile', '89.99', 99, NULL),
(1077, 'Morgenmantel2', 'female', 'clothes', 'Oberteile', '89.99', 143, NULL),
(1078, 'Jacke1', 'female', 'clothes', 'Oberteile', '19.99', 50, NULL),
(1079, 'Jacke2', 'female', 'clothes', 'Oberteile', '49.99', 51, NULL),
(1080, 'Jacke3', 'female', 'clothes', 'Oberteile', '19.99', 54, NULL),
(1081, 'Jacke4', 'female', 'clothes', 'Oberteile', '25.97', 62, NULL),
(1082, 'Jacke5', 'female', 'clothes', 'Oberteile', '25.97', 63, NULL),
(1083, 'Jacke6', 'female', 'clothes', 'Oberteile', '114.99', 64, NULL),
(1084, 'Jacke7', 'female', 'clothes', 'Oberteile', '45.95', 70, NULL),
(1085, 'Jacke8', 'female', 'clothes', 'Oberteile', '69.99', 97, NULL),
(1086, 'Jacke9', 'female', 'clothes', 'Oberteile', '47.95', 133, NULL),
(1087, 'Jacke10', 'female', 'clothes', 'Oberteile', '16.99', 138, NULL),
(1088, 'Jacke11', 'female', 'clothes', 'Oberteile', '11.95', 150, NULL),
(1089, 'Jacke12', 'female', 'clothes', 'Oberteile', '11.95', 151, NULL),
(1090, 'Jacke13', 'female', 'clothes', 'Oberteile', '27.95', 160, NULL),
(1091, 'Jacke14', 'female', 'clothes', 'Oberteile', '44.95', 164, NULL),
(1092, 'Jacke16', 'female', 'clothes', 'Oberteile', '24.99', 187, NULL),
(1093, 'Jacke17', 'female', 'clothes', 'Oberteile', '24.99', 189, NULL),
(1094, 'Jacke18', 'female', 'clothes', 'Oberteile', '24.99', 190, NULL),
(1095, 'Jacke19', 'female', 'clothes', 'Oberteile', '24.99', 191, NULL),
(1096, 'Jacke20', 'female', 'clothes', 'Oberteile', '49.99', 193, NULL),
(1097, 'Jacke21', 'female', 'clothes', 'Oberteile', '29.95', 213, NULL),
(1098, 'Jacke22', 'female', 'clothes', 'Oberteile', '29.95', 214, NULL),
(1099, 'Jacke23', 'female', 'clothes', 'Oberteile', '29.95', 215, NULL),
(1100, 'Jacke24', 'female', 'clothes', 'Oberteile', '29.95', 216, NULL),
(1101, 'Jacke25', 'female', 'clothes', 'Oberteile', '20.90', 219, NULL),
(1102, 'Jacke26', 'female', 'clothes', 'Oberteile', '24.99', 227, NULL),
(1103, 'Jacke27', 'female', 'clothes', 'Oberteile', '24.99', 229, NULL),
(1104, 'Jacke28', 'female', 'clothes', 'Oberteile', '20.90', 234, NULL),
(1105, 'Jacke29', 'female', 'clothes', 'Oberteile', '19.96', 239, NULL),
(1106, 'Jacke30', 'female', 'clothes', 'Oberteile', '19.98', 240, NULL),
(1107, 'Jacke31', 'female', 'clothes', 'Oberteile', '19.98', 242, NULL),
(1108, 'Jacke32', 'female', 'clothes', 'Oberteile', '12.95', 243, NULL),
(1109, 'Mantel1', 'female', 'clothes', 'Oberteile', '69.99', 107, NULL),
(1110, 'Mantel2', 'female', 'clothes', 'Oberteile', '69.99', 139, NULL),
(1111, 'Mantel3', 'female', 'clothes', 'Oberteile', '69.99', 194, NULL),
(1112, 'Kleid7', 'female', 'clothes', 'Oberteile', '49.99', 21, NULL),
(1113, 'Jacke33', 'female', 'clothes', 'Oberteile', '12.95', 77, NULL),
(1114, 'Jacke34', 'female', 'clothes', 'Oberteile', '45.95', 102, NULL),
(1115, 'Jacke35', 'female', 'clothes', 'Oberteile', '12.99', 106, NULL),
(1116, 'Jacke36', 'female', 'clothes', 'Oberteile', '14.99', 147, NULL),
(1117, 'Jacke37', 'female', 'clothes', 'Oberteile', '34.97', 148, NULL),
(1118, 'Jacke38', 'female', 'clothes', 'Oberteile', '35.99', 162, NULL),
(1119, 'Jacke39', 'female', 'clothes', 'Oberteile', '54.95', 183, NULL),
(1120, 'Jacke40', 'female', 'clothes', 'Oberteile', '35.99', 218, NULL),
(1121, 'Jacke41', 'female', 'clothes', 'Oberteile', '42.95', 251, NULL),
(1122, 'Rennanzug1', 'female', 'clothes', 'Oberteile', '42.98', 144, NULL),
(1123, 'Rennanzug2', 'female', 'clothes', 'Oberteile', '42.98', 145, NULL),
(1124, 'Rennanzug3', 'female', 'clothes', 'Oberteile', '30.95', 237, NULL),
(1125, 'Stuntanzug1', 'female', 'clothes', 'Oberteile', '10.00', 146, NULL),
(1126, 'Stuntanzug2', 'female', 'clothes', 'Oberteile', '10.00', 152, NULL),
(1127, 'Pyjama1', 'female', 'clothes', 'Oberteile', '19.99', 83, NULL),
(1128, 'Pyjama2', 'female', 'clothes', 'Oberteile', '11.99', 109, NULL),
(1129, 'Pyjama3', 'female', 'clothes', 'Oberteile', '6.95', 142, NULL),
(1130, 'Oberteil1', 'female', 'clothes', 'Oberteile', '24.95', 3, NULL),
(1131, 'Oberteil2', 'female', 'clothes', 'Oberteile', '16.99', 10, NULL),
(1132, 'Oberteil3', 'female', 'clothes', 'Oberteile', '11.95', 11, NULL),
(1133, 'Oberteil4', 'female', 'clothes', 'Oberteile', '39.99', 12, NULL),
(1134, 'Oberteil5', 'female', 'clothes', 'Oberteile', '39.99', 26, NULL),
(1135, 'Oberteil6', 'female', 'clothes', 'Oberteile', '20.00', 36, NULL),
(1136, 'Oberteil7', 'female', 'clothes', 'Oberteile', '7.99', 39, NULL),
(1137, 'Oberteil8', 'female', 'clothes', 'Oberteile', '34.99', 52, NULL),
(1138, 'Oberteil9', 'female', 'clothes', 'Oberteile', '34.99', 53, NULL),
(1139, 'Oberteil10', 'female', 'clothes', 'Oberteile', '12.95', 56, NULL),
(1140, 'Oberteil11', 'female', 'clothes', 'Oberteile', '24.99', 89, NULL),
(1141, 'Oberteil12', 'female', 'clothes', 'Oberteile', '39.99', 104, NULL),
(1142, 'Oberteil13', 'female', 'clothes', 'Oberteile', '79.99', 124, NULL),
(1143, 'Oberteil14', 'female', 'clothes', 'Oberteile', '24.99', 125, NULL),
(1144, 'Oberteil15', 'female', 'clothes', 'Oberteile', '24.99', 126, NULL),
(1145, 'Oberteil16', 'female', 'clothes', 'Oberteile', '4.99', 132, NULL),
(1146, 'Oberteil17', 'female', 'clothes', 'Oberteile', '52.50', 137, NULL),
(1147, 'Oberteil18', 'female', 'clothes', 'Oberteile', '18.95', 161, NULL),
(1148, 'Oberteil19', 'female', 'clothes', 'Oberteile', '12.95', 165, NULL),
(1149, 'Oberteil20', 'female', 'clothes', 'Oberteile', '14.99', 168, NULL),
(1150, 'Oberteil21', 'female', 'clothes', 'Oberteile', '24.99', 169, NULL),
(1151, 'Torso', 'female', 'clothes', 'Torsos', '0.00', 153, NULL),
(1152, 'Oberteil22', 'female', 'clothes', 'Oberteile', '19.99', 170, NULL),
(1153, 'Oberteil23', 'female', 'clothes', 'Oberteile', '34.76', 171, NULL),
(1154, 'Oberteil24', 'female', 'clothes', 'Oberteile', '69.99', 173, NULL),
(1155, 'Oberteil25', 'female', 'clothes', 'Oberteile', '42.98', 180, NULL),
(1156, 'Oberteil26', 'female', 'clothes', 'Oberteile', '24.99', 195, NULL),
(1157, 'Oberteil27', 'female', 'clothes', 'Oberteile', '15.99', 221, NULL),
(1158, 'Oberteil28', 'female', 'clothes', 'Oberteile', '29.99', 222, NULL),
(1159, 'Oberteil29', 'female', 'clothes', 'Oberteile', '24.99', 223, NULL),
(1160, 'Oberteil30', 'female', 'clothes', 'Oberteile', '25.98', 232, NULL),
(1161, 'Oberteil31', 'female', 'clothes', 'Oberteile', '5.00', 247, NULL),
(1162, 'Oberteil32', 'female', 'clothes', 'Oberteile', '10.00', 253, NULL),
(1163, 'Oberteil33', 'female', 'clothes', 'Oberteile', '10.00', 254, NULL),
(1164, 'Krawatte1', 'male', 'clothes', 'Accessoires', '19.99', 10, NULL),
(1165, 'Krawatte2', 'male', 'clothes', 'Accessoires', '19.99', 12, NULL),
(1166, 'Krawatte3', 'male', 'clothes', 'Accessoires', '24.99', 18, NULL),
(1167, 'Krawatte4', 'male', 'clothes', 'Accessoires', '19.99', 19, NULL),
(1168, 'Krawatte5', 'male', 'clothes', 'Accessoires', '24.99', 20, NULL),
(1169, 'Krawatte6', 'male', 'clothes', 'Accessoires', '24.99', 21, NULL),
(1170, 'Krawatte7', 'male', 'clothes', 'Accessoires', '19.99', 23, NULL),
(1171, 'Krawatte8', 'male', 'clothes', 'Accessoires', '24.99', 24, NULL),
(1172, 'Krawatte9', 'male', 'clothes', 'Accessoires', '19.99', 25, NULL),
(1173, 'Krawatte10', 'male', 'clothes', 'Accessoires', '24.99', 26, NULL),
(1174, 'Krawatte11', 'male', 'clothes', 'Accessoires', '19.99', 27, NULL),
(1175, 'Krawatte12', 'male', 'clothes', 'Accessoires', '24.99', 28, NULL),
(1176, 'Krawatte13', 'male', 'clothes', 'Accessoires', '19.99', 29, NULL),
(1177, 'Krawatte14', 'male', 'clothes', 'Accessoires', '14.99', 37, NULL),
(1178, 'Krawatte15', 'male', 'clothes', 'Accessoires', '24.99', 38, NULL),
(1179, 'Krawatte16', 'male', 'clothes', 'Accessoires', '9.99', 39, NULL),
(1180, 'Krawatte17', 'male', 'clothes', 'Accessoires', '24.99', 115, NULL),
(1181, 'Krawatte18', 'male', 'clothes', 'Accessoires', '19.99', 116, NULL),
(1182, 'Krawatte19', 'male', 'clothes', 'Accessoires', '24.99', 118, NULL),
(1183, 'Schal1', 'male', 'clothes', 'Accessoires', '24.99', 30, NULL),
(1184, 'Schal2', 'male', 'clothes', 'Accessoires', '24.99', 31, NULL),
(1185, 'Schal3', 'male', 'clothes', 'Accessoires', '14.99', 34, NULL),
(1186, 'Schal4', 'male', 'clothes', 'Accessoires', '14.99', 35, NULL),
(1187, 'Schal5', 'male', 'clothes', 'Accessoires', '24.99', 112, NULL),
(1188, 'Fliege1', 'male', 'clothes', 'Accessoires', '24.99', 11, NULL),
(1189, 'Fliege2', 'male', 'clothes', 'Accessoires', '24.99', 22, NULL),
(1190, 'Fliege3', 'male', 'clothes', 'Accessoires', '9.99', 32, NULL),
(1191, 'Fliege4', 'male', 'clothes', 'Accessoires', '19.99', 36, NULL),
(1192, 'Kopfhörer1', 'male', 'clothes', 'Accessoires', '29.99', 114, NULL),
(1193, 'Kopfhörer2', 'male', 'clothes', 'Accessoires', '29.99', 124, NULL),
(1194, 'Kette1', 'male', 'clothes', 'Accessoires', '34.99', 16, NULL),
(1195, 'Kette2', 'male', 'clothes', 'Accessoires', '34.99', 17, NULL),
(1196, 'Kette3', 'male', 'clothes', 'Accessoires', '39.99', 42, NULL),
(1197, 'Kette4', 'male', 'clothes', 'Accessoires', '39.99', 43, NULL),
(1198, 'Kette5', 'male', 'clothes', 'Accessoires', '39.99', 44, NULL),
(1199, 'Kette6', 'male', 'clothes', 'Accessoires', '39.99', 45, NULL),
(1200, 'Kette7', 'male', 'clothes', 'Accessoires', '39.99', 46, NULL),
(1201, 'Kette8', 'male', 'clothes', 'Accessoires', '9.99', 47, NULL),
(1202, 'Kette9', 'male', 'clothes', 'Accessoires', '39.99', 48, NULL),
(1203, 'Kette10', 'male', 'clothes', 'Accessoires', '49.99', 49, NULL),
(1204, 'Kette11', 'male', 'clothes', 'Accessoires', '49.99', 50, NULL),
(1205, 'Kette12', 'male', 'clothes', 'Accessoires', '39.99', 51, NULL),
(1206, 'Kette13', 'male', 'clothes', 'Accessoires', '44.99', 52, NULL),
(1207, 'Kette14', 'male', 'clothes', 'Accessoires', '39.99', 53, NULL),
(1208, 'Kette15', 'male', 'clothes', 'Accessoires', '9.99', 54, NULL),
(1209, 'Kette16', 'male', 'clothes', 'Accessoires', '44.99', 55, NULL),
(1210, 'Kette17', 'male', 'clothes', 'Accessoires', '19.99', 74, NULL),
(1211, 'Kette18', 'male', 'clothes', 'Accessoires', '24.99', 75, NULL),
(1212, 'Kette19', 'male', 'clothes', 'Accessoires', '29.99', 76, NULL),
(1213, 'Kette20', 'male', 'clothes', 'Accessoires', '34.99', 77, NULL),
(1214, 'Kette21', 'male', 'clothes', 'Accessoires', '34.99', 78, NULL),
(1215, 'Kette22', 'male', 'clothes', 'Accessoires', '44.99', 79, NULL),
(1216, 'Kette23', 'male', 'clothes', 'Accessoires', '49.99', 80, NULL),
(1217, 'Kette24', 'male', 'clothes', 'Accessoires', '54.99', 81, NULL),
(1218, 'Kette25', 'male', 'clothes', 'Accessoires', '59.99', 82, NULL),
(1219, 'Kette26', 'male', 'clothes', 'Accessoires', '64.99', 83, NULL),
(1220, 'Kette27', 'male', 'clothes', 'Accessoires', '19.99', 85, NULL),
(1221, 'Kette28', 'male', 'clothes', 'Accessoires', '24.99', 86, NULL),
(1222, 'Kette29', 'male', 'clothes', 'Accessoires', '29.99', 87, NULL),
(1223, 'Kette30', 'male', 'clothes', 'Accessoires', '34.99', 88, NULL),
(1224, 'Kette31', 'male', 'clothes', 'Accessoires', '39.99', 89, NULL),
(1225, 'Kette32', 'male', 'clothes', 'Accessoires', '44.99', 90, NULL),
(1226, 'Kette33', 'male', 'clothes', 'Accessoires', '49.99', 91, NULL),
(1227, 'Kette34', 'male', 'clothes', 'Accessoires', '54.99', 92, NULL),
(1228, 'Kette35', 'male', 'clothes', 'Accessoires', '59.99', 93, NULL),
(1229, 'Kette36', 'male', 'clothes', 'Accessoires', '64.99', 94, NULL),
(1230, 'Kette37', 'male', 'clothes', 'Accessoires', '34.99', 110, NULL),
(1231, 'Kette38', 'male', 'clothes', 'Accessoires', '34.99', 111, NULL),
(1232, 'Kette39', 'male', 'clothes', 'Accessoires', '5.99', 113, NULL),
(1233, 'Kette40', 'male', 'clothes', 'Accessoires', '9.99', 119, NULL),
(1234, 'Kette41', 'male', 'clothes', 'Accessoires', '9.99', 120, NULL),
(1235, 'Kette42', 'male', 'clothes', 'Accessoires', '9.99', 121, NULL),
(1236, 'Kette43', 'male', 'clothes', 'Accessoires', '9.99', 122, NULL),
(1237, 'Kette44', 'male', 'clothes', 'Accessoires', '9.99', 123, NULL),
(1238, 'Kette45', 'male', 'clothes', 'Accessoires', '9.99', 129, NULL),
(1239, 'Kette46', 'male', 'clothes', 'Accessoires', '9.99', 130, NULL),
(1240, 'Kette47', 'male', 'clothes', 'Accessoires', '9.99', 131, NULL),
(1241, 'Ohrringe1', 'female', 'clothes', 'Accessoires', '69.99', 1, NULL),
(1242, 'Ohrringe2', 'female', 'clothes', 'Accessoires', '64.99', 2, NULL),
(1243, 'Armband1', 'female', 'clothes', 'Accessoires', '19.99', 3, NULL),
(1244, 'Armband2', 'female', 'clothes', 'Accessoires', '19.99', 4, NULL),
(1245, 'Armband3', 'female', 'clothes', 'Accessoires', '19.99', 5, NULL),
(1246, 'Armband4', 'female', 'clothes', 'Accessoires', '5.99', 10, NULL),
(1247, 'Armband5', 'female', 'clothes', 'Accessoires', '19.99', 14, NULL),
(1248, 'Fliege1', 'female', 'clothes', 'Accessoires', '19.99', 19, NULL),
(1249, 'Fliege2', 'female', 'clothes', 'Accessoires', '24.99', 23, NULL),
(1250, 'Kopfhörer1', 'female', 'clothes', 'Accessoires', '29.99', 85, NULL),
(1251, 'Kopfhörer2', 'female', 'clothes', 'Accessoires', '29.99', 94, NULL),
(1252, 'Hosenträger', 'female', 'clothes', 'Accessoires', '5.99', 88, NULL),
(1253, 'Tuch', 'female', 'clothes', 'Accessoires', '29.99', 13, NULL),
(1254, 'Schal1', 'female', 'clothes', 'Accessoires', '24.99', 9, NULL),
(1255, 'Schal2', 'female', 'clothes', 'Accessoires', '24.99', 15, NULL),
(1256, 'Schal3', 'female', 'clothes', 'Accessoires', '14.99', 17, NULL),
(1257, 'Schal4', 'female', 'clothes', 'Accessoires', '14.99', 18, NULL),
(1258, 'Schal5', 'female', 'clothes', 'Accessoires', '34.99', 83, NULL),
(1259, 'Krawatte1', 'female', 'clothes', 'Accessoires', '14.99', 20, NULL),
(1260, 'Krawatte2', 'female', 'clothes', 'Accessoires', '24.99', 21, NULL),
(1261, 'Krawatte3', 'female', 'clothes', 'Accessoires', '19.99', 22, NULL),
(1262, 'Krawatte4', 'female', 'clothes', 'Accessoires', '19.99', 26, NULL),
(1263, 'Krawatte5', 'female', 'clothes', 'Accessoires', '19.99', 27, NULL),
(1264, 'Krawatte6', 'female', 'clothes', 'Accessoires', '19.99', 28, NULL),
(1265, 'Krawatte7', 'female', 'clothes', 'Accessoires', '24.99', 86, NULL),
(1266, 'Krawatte8', 'female', 'clothes', 'Accessoires', '19.99', 87, NULL),
(1267, 'Kette1', 'female', 'clothes', 'Accessoires', '39.99', 6, NULL),
(1268, 'Kette2', 'female', 'clothes', 'Accessoires', '49.99', 7, NULL),
(1269, 'Kette3', 'female', 'clothes', 'Accessoires', '19.99', 11, NULL),
(1270, 'Kette4', 'female', 'clothes', 'Accessoires', '59.99', 12, NULL),
(1271, 'Kette5', 'female', 'clothes', 'Accessoires', '39.99', 29, NULL),
(1272, 'Kette6', 'female', 'clothes', 'Accessoires', '39.99', 30, NULL),
(1273, 'Kette7', 'female', 'clothes', 'Accessoires', '39.99', 31, NULL),
(1274, 'Kette8', 'female', 'clothes', 'Accessoires', '9.99', 32, NULL),
(1275, 'Kette9', 'female', 'clothes', 'Accessoires', '39.99', 33, NULL),
(1276, 'Kette10', 'female', 'clothes', 'Accessoires', '39.99', 35, NULL),
(1277, 'Kette11', 'female', 'clothes', 'Accessoires', '39.99', 36, NULL),
(1278, 'Kette12', 'female', 'clothes', 'Accessoires', '39.99', 37, NULL),
(1279, 'Kette13', 'female', 'clothes', 'Accessoires', '39.99', 38, NULL),
(1280, 'Kette14', 'female', 'clothes', 'Accessoires', '39.99', 39, NULL),
(1281, 'Kette15', 'female', 'clothes', 'Accessoires', '39.99', 40, NULL),
(1282, 'Kette16', 'female', 'clothes', 'Accessoires', '9.99', 41, NULL),
(1283, 'Kette17', 'female', 'clothes', 'Accessoires', '9.99', 42, NULL),
(1284, 'Kette18', 'female', 'clothes', 'Accessoires', '19.99', 53, NULL),
(1285, 'Kette19', 'female', 'clothes', 'Accessoires', '24.99', 54, NULL),
(1286, 'Kette20', 'female', 'clothes', 'Accessoires', '29.99', 55, NULL),
(1287, 'Kette21', 'female', 'clothes', 'Accessoires', '34.99', 56, NULL),
(1288, 'Kette22', 'female', 'clothes', 'Accessoires', '39.99', 57, NULL),
(1289, 'Kette23', 'female', 'clothes', 'Accessoires', '44.99', 58, NULL),
(1290, 'Kette24', 'female', 'clothes', 'Accessoires', '49.99', 59, NULL),
(1291, 'Kette25', 'female', 'clothes', 'Accessoires', '54.99', 60, NULL),
(1292, 'Kette26', 'female', 'clothes', 'Accessoires', '59.99', 61, NULL),
(1293, 'Kette27', 'female', 'clothes', 'Accessoires', '64.99', 62, NULL),
(1294, 'Kette28', 'female', 'clothes', 'Accessoires', '19.99', 64, NULL),
(1295, 'Kette29', 'female', 'clothes', 'Accessoires', '24.99', 65, NULL),
(1296, 'Kette30', 'female', 'clothes', 'Accessoires', '29.99', 66, NULL),
(1297, 'Kette31', 'female', 'clothes', 'Accessoires', '34.99', 67, NULL),
(1298, 'Kette32', 'female', 'clothes', 'Accessoires', '39.99', 68, NULL),
(1299, 'Kette33', 'female', 'clothes', 'Accessoires', '44.99', 69, NULL),
(1300, 'Kette34', 'female', 'clothes', 'Accessoires', '49.99', 70, NULL),
(1301, 'Kette35', 'female', 'clothes', 'Accessoires', '54.99', 71, NULL),
(1302, 'Kette36', 'female', 'clothes', 'Accessoires', '59.99', 72, NULL),
(1303, 'Kette37', 'female', 'clothes', 'Accessoires', '64.99', 73, NULL),
(1304, 'Kette38', 'female', 'clothes', 'Accessoires', '34.99', 81, NULL),
(1305, 'Kette39', 'female', 'clothes', 'Accessoires', '34.99', 82, NULL),
(1306, 'Kette40', 'female', 'clothes', 'Accessoires', '5.99', 84, NULL),
(1307, 'Kette41', 'female', 'clothes', 'Accessoires', '9.99', 89, NULL),
(1308, 'Kette42', 'female', 'clothes', 'Accessoires', '9.99', 90, NULL),
(1309, 'Kette43', 'female', 'clothes', 'Accessoires', '9.99', 92, NULL),
(1310, 'Kette44', 'female', 'clothes', 'Accessoires', '9.99', 93, NULL),
(1311, 'Brille1', 'male', 'props', 'Brillen', '23.95', 2, NULL),
(1312, 'Brille2', 'male', 'props', 'Brillen', '46.99', 3, NULL),
(1313, 'Brille3', 'male', 'props', 'Brillen', '35.60', 4, NULL),
(1314, 'Brille4', 'male', 'props', 'Brillen', '50.59', 5, NULL),
(1315, 'Brille5', 'male', 'props', 'Brillen', '18.70', 7, NULL),
(1316, 'Brille6', 'male', 'props', 'Brillen', '25.45', 8, NULL),
(1317, 'Brille7', 'male', 'props', 'Brillen', '19.95', 9, NULL),
(1318, 'Brille8', 'male', 'props', 'Brillen', '75.37', 10, NULL),
(1319, 'Brille9', 'male', 'props', 'Brillen', '80.76', 12, NULL),
(1320, 'Brille10', 'male', 'props', 'Brillen', '24.86', 13, NULL),
(1321, 'Brille11', 'male', 'props', 'Brillen', '15.94', 15, NULL),
(1322, 'Brille12', 'male', 'props', 'Brillen', '17.86', 16, NULL),
(1323, 'Brille13', 'male', 'props', 'Brillen', '55.69', 17, NULL),
(1324, 'Brille14', 'male', 'props', 'Brillen', '85.94', 18, NULL),
(1325, 'Brille15', 'male', 'props', 'Brillen', '19.95', 19, NULL),
(1326, 'Brille16', 'male', 'props', 'Brillen', '26.19', 20, NULL),
(1327, 'Brille17', 'male', 'props', 'Brillen', '4.64', 21, NULL),
(1328, 'Brille18', 'male', 'props', 'Brillen', '4.64', 22, NULL),
(1329, 'Brille19', 'male', 'props', 'Brillen', '15.94', 23, NULL),
(1330, 'Brille20', 'male', 'props', 'Brillen', '24.99', 24, NULL),
(1331, 'Brille21', 'male', 'props', 'Brillen', '25.86', 25, NULL),
(1332, 'Brille1', 'female', 'props', 'Brillen', '15.94', 0, NULL),
(1333, 'Brille2', 'female', 'props', 'Brillen', '74.45', 1, NULL),
(1334, 'Brille3', 'female', 'props', 'Brillen', '74.45', 2, NULL),
(1335, 'Brille4', 'female', 'props', 'Brillen', '47.95', 3, NULL),
(1336, 'Brille5', 'female', 'props', 'Brillen', '74.45', 4, NULL),
(1337, 'Brille6', 'female', 'props', 'Brillen', '85.20', 6, NULL),
(1338, 'Brille7', 'female', 'props', 'Brillen', '56.99', 7, NULL),
(1339, 'Brille8', 'female', 'props', 'Brillen', '86.45', 8, NULL),
(1340, 'Brille9', 'female', 'props', 'Brillen', '15.94', 9, NULL),
(1341, 'Brille10', 'female', 'props', 'Brillen', '15.94', 10, NULL),
(1342, 'Brille11', 'female', 'props', 'Brillen', '25.45', 11, NULL),
(1343, 'Brille12', 'female', 'props', 'Brillen', '36.45', 14, NULL),
(1344, 'Brille13', 'female', 'props', 'Brillen', '85.20', 16, NULL),
(1345, 'Brille14', 'female', 'props', 'Brillen', '24.99', 17, NULL),
(1346, 'Brille15', 'female', 'props', 'Brillen', '16.95', 18, NULL),
(1347, 'Brille16', 'female', 'props', 'Brillen', '25.95', 19, NULL),
(1348, 'Brille17', 'female', 'props', 'Brillen', '28.50', 20, NULL),
(1349, 'Brille18', 'female', 'props', 'Brillen', '28.50', 21, NULL),
(1350, 'Brille19', 'female', 'props', 'Brillen', '4.64', 22, NULL),
(1351, 'Brille20', 'female', 'props', 'Brillen', '4.64', 23, NULL),
(1352, 'Brille21', 'female', 'props', 'Brillen', '28.50', 24, NULL),
(1353, 'Brille22', 'female', 'props', 'Brillen', '15.94', 25, NULL),
(1354, 'Brille23', 'female', 'props', 'Brillen', '24.99', 26, NULL),
(1355, 'Brille24', 'female', 'props', 'Brillen', '25.86', 27, NULL),
(1356, 'Papierhut', 'female', 'props', 'Hüte', '2.85', 1, NULL),
(1357, 'Cowboyhut1', 'female', 'props', 'Hüte', '7.95', 2, NULL),
(1358, 'Cowboyhut2', 'female', 'props', 'Hüte', '7.95', 20, NULL),
(1359, 'Anglerhut1', 'female', 'props', 'Hüte', '9.95', 3, NULL),
(1360, 'Anglerhut2', 'female', 'props', 'Hüte', '9.95', 21, NULL),
(1361, 'Anglerhut3', 'female', 'props', 'Hüte', '9.95', 93, NULL),
(1362, 'Anglerhut4', 'female', 'props', 'Hüte', '9.95', 131, NULL),
(1363, 'Melone', 'female', 'props', 'Hüte', '49.95', 26, NULL),
(1364, 'Rentiergeweih1', 'female', 'props', 'Hüte', '6.99', 25, NULL),
(1365, 'Rentiergeweih2', 'female', 'props', 'Hüte', '6.99', 100, NULL),
(1366, 'Weihnachtsmütze1', 'female', 'props', 'Hüte', '6.99', 23, NULL),
(1367, 'Weihnachtsmütze2', 'female', 'props', 'Hüte', '6.99', 39, NULL),
(1368, 'Weihnachtsmütze3', 'female', 'props', 'Hüte', '6.99', 40, NULL),
(1369, 'Weihnachtsmütze4', 'female', 'props', 'Hüte', '6.99', 41, NULL),
(1370, 'Weihnachtsmütze5', 'female', 'props', 'Hüte', '6.99', 42, NULL),
(1371, 'Weihnachtsmütze6', 'female', 'props', 'Hüte', '6.99', 96, NULL),
(1372, 'Weihnachtsmütze7', 'female', 'props', 'Hüte', '6.99', 97, NULL),
(1373, 'Weihnachtsmütze8', 'female', 'props', 'Hüte', '6.99', 98, NULL),
(1374, 'Weihnachtsmütze9', 'female', 'props', 'Hüte', '6.99', 99, NULL),
(1375, 'Beanie1', 'female', 'props', 'Hüte', '11.90', 5, NULL),
(1376, 'Beanie2', 'female', 'props', 'Hüte', '13.90', 12, NULL),
(1377, 'Beanie3', 'female', 'props', 'Hüte', '13.90', 29, NULL),
(1378, 'Beanie4', 'female', 'props', 'Hüte', '7.95', 33, NULL),
(1379, 'Beanie5', 'female', 'props', 'Hüte', '13.90', 119, NULL),
(1380, 'Zylinder1', 'female', 'props', 'Hüte', '49.95', 27, NULL),
(1381, 'Zylinder2', 'female', 'props', 'Hüte', '7.95', 31, NULL),
(1382, 'Zylinder3', 'female', 'props', 'Hüte', '7.95', 32, NULL),
(1383, 'Elfenmütze', 'female', 'props', 'Hüte', '6.99', 24, NULL),
(1384, 'Baskenmütze', 'female', 'props', 'Hüte', '55.60', 14, NULL),
(1385, 'Sonnenhut1', 'female', 'props', 'Hüte', '55.60', 11, NULL),
(1386, 'Sonnenhut2', 'female', 'props', 'Hüte', '55.60', 22, NULL),
(1387, 'Panama Hut1', 'female', 'props', 'Hüte', '25.90', 8, NULL),
(1388, 'Panama Hut2', 'female', 'props', 'Hüte', '55.60', 13, NULL),
(1389, 'Panama Hut3', 'female', 'props', 'Hüte', '25.90', 28, NULL),
(1390, 'Kopfhörer', 'female', 'props', 'Hüte', '19.99', 15, NULL),
(1391, 'Caps1', 'female', 'props', 'Hüte', '19.95', 4, NULL),
(1392, 'Caps2', 'female', 'props', 'Hüte', '19.95', 9, NULL),
(1393, 'Caps3', 'female', 'props', 'Hüte', '19.95', 10, NULL),
(1394, 'Caps4', 'female', 'props', 'Hüte', '19.95', 43, NULL),
(1395, 'Caps5', 'female', 'props', 'Hüte', '19.95', 44, NULL),
(1396, 'Caps6', 'female', 'props', 'Hüte', '19.95', 53, NULL),
(1397, 'Caps7', 'female', 'props', 'Hüte', '19.95', 55, NULL),
(1398, 'Caps8', 'female', 'props', 'Hüte', '19.95', 56, NULL),
(1399, 'Caps9', 'female', 'props', 'Hüte', '19.95', 58, NULL),
(1400, 'Caps10', 'female', 'props', 'Hüte', '19.95', 64, NULL),
(1401, 'Caps11', 'female', 'props', 'Hüte', '19.95', 65, NULL),
(1402, 'Caps12', 'female', 'props', 'Hüte', '12.99', 75, NULL),
(1403, 'Caps13', 'female', 'props', 'Hüte', '12.99', 76, NULL),
(1404, 'Caps14', 'female', 'props', 'Hüte', '19.95', 95, NULL),
(1405, 'Caps15', 'female', 'props', 'Hüte', '19.95', 102, NULL),
(1406, 'Caps16', 'female', 'props', 'Hüte', '19.95', 108, NULL),
(1407, 'Caps17', 'female', 'props', 'Hüte', '19.95', 109, NULL),
(1408, 'Caps18', 'female', 'props', 'Hüte', '19.95', 129, NULL),
(1409, 'Caps19', 'female', 'props', 'Hüte', '19.95', 130, NULL),
(1410, 'Hut1', 'female', 'props', 'Hüte', '45.90', 7, NULL),
(1411, 'Hut2', 'female', 'props', 'Hüte', '7.95', 30, NULL),
(1412, 'Hut3', 'female', 'props', 'Hüte', '7.95', 34, NULL),
(1413, 'Hut4', 'female', 'props', 'Hüte', '7.95', 35, NULL),
(1414, 'Hut5', 'female', 'props', 'Hüte', '6.99', 36, NULL),
(1415, 'Hut6', 'female', 'props', 'Hüte', '55.60', 54, NULL),
(1416, 'Hut7', 'female', 'props', 'Hüte', '19.95', 60, NULL),
(1417, 'Hut8', 'female', 'props', 'Hüte', '25.90', 61, NULL),
(1418, 'Hut9', 'female', 'props', 'Hüte', '19.95', 63, NULL),
(1419, 'Hut10', 'female', 'props', 'Hüte', '9.95', 82, NULL),
(1420, 'Hut11', 'female', 'props', 'Hüte', '25.90', 94, NULL),
(1421, 'Hut12', 'female', 'props', 'Hüte', '14.90', 103, NULL),
(1422, 'Hut13', 'female', 'props', 'Hüte', '14.90', 104, NULL),
(1423, 'Hut14', 'female', 'props', 'Hüte', '14.90', 105, NULL),
(1424, 'Hut15', 'female', 'props', 'Hüte', '14.90', 106, NULL),
(1425, 'Hut16', 'female', 'props', 'Hüte', '14.90', 107, NULL),
(1426, 'Hut17', 'female', 'props', 'Hüte', '9.95', 113, NULL),
(1427, 'Helm1', 'female', 'props', 'Hüte', '35.90', 16, NULL),
(1428, 'Helm2', 'female', 'props', 'Hüte', '18.50', 17, NULL),
(1429, 'Helm3', 'female', 'props', 'Hüte', '18.50', 59, NULL),
(1430, 'Helm4', 'female', 'props', 'Hüte', '35.90', 66, NULL),
(1431, 'Helm5', 'female', 'props', 'Hüte', '18.50', 74, NULL),
(1432, 'Helm6', 'female', 'props', 'Hüte', '35.90', 90, NULL),
(1433, 'Helm7', 'female', 'props', 'Hüte', '35.90', 91, NULL),
(1434, 'Helm8', 'female', 'props', 'Hüte', '18.50', 92, NULL),
(1435, 'Papierhut', 'male', 'props', 'Hüte', '2.85', 1, NULL),
(1436, 'Beanie1', 'male', 'props', 'Hüte', '11.90', 2, NULL),
(1437, 'Beanie2', 'male', 'props', 'Hüte', '13.90', 5, NULL),
(1438, 'Beanie3', 'male', 'props', 'Hüte', '13.90', 28, NULL),
(1439, 'Beanie4', 'male', 'props', 'Hüte', '7.95', 34, NULL),
(1440, 'Beanie5', 'male', 'props', 'Hüte', '13.90', 120, NULL),
(1441, 'Anglerhut1', 'male', 'props', 'Hüte', '9.95', 3, NULL),
(1442, 'Anglerhut2', 'male', 'props', 'Hüte', '9.95', 20, NULL),
(1443, 'Anglerhut3', 'male', 'props', 'Hüte', '9.95', 94, NULL),
(1444, 'Anglerhut4', 'male', 'props', 'Hüte', '9.95', 132, NULL),
(1445, 'Bandana', 'male', 'props', 'Hüte', '4.95', 14, NULL),
(1446, 'Kopfhörer1', 'male', 'props', 'Hüte', '12.99', 15, NULL),
(1447, 'Bandana2', 'male', 'props', 'Hüte', '9.95', 83, NULL),
(1448, 'Barett', 'male', 'props', 'Hüte', '19.95', 106, NULL),
(1449, 'Melone', 'male', 'props', 'Hüte', '49.95', 26, NULL),
(1450, 'Zylinder1', 'male', 'props', 'Hüte', '49.95', 27, NULL),
(1451, 'Zylinder2', 'male', 'props', 'Hüte', '7.95', 32, NULL),
(1452, 'Zylinder3', 'male', 'props', 'Hüte', '7.95', 33, NULL),
(1453, 'Fedora1', 'male', 'props', 'Hüte', '25.90', 12, NULL),
(1454, 'Fedora2', 'male', 'props', 'Hüte', '25.90', 25, NULL),
(1455, 'Fedora3', 'male', 'props', 'Hüte', '25.90', 30, NULL),
(1456, 'Fedora4', 'male', 'props', 'Hüte', '25.90', 61, NULL),
(1457, 'Fedora5', 'male', 'props', 'Hüte', '55.60', 64, NULL),
(1458, 'Fedora6', 'male', 'props', 'Hüte', '25.90', 95, NULL),
(1459, 'Panama Hut1', 'male', 'props', 'Hüte', '55.60', 21, NULL),
(1460, 'Panama Hut2', 'male', 'props', 'Hüte', '55.60', 29, NULL),
(1461, 'Weihnachtsmütze1', 'male', 'props', 'Hüte', '6.99', 22, NULL),
(1462, 'Weihnachtsmütze2', 'male', 'props', 'Hüte', '6.99', 23, NULL),
(1463, 'Weihnachtsmütze3', 'male', 'props', 'Hüte', '6.99', 24, NULL),
(1464, 'Weihnachtsmütze4', 'male', 'props', 'Hüte', '6.99', 40, NULL),
(1465, 'Weihnachtsmütze5', 'male', 'props', 'Hüte', '6.99', 41, NULL),
(1466, 'Weihnachtsmütze6', 'male', 'props', 'Hüte', '6.99', 42, NULL);
INSERT INTO `clothes_new` (`id`, `name`, `gender`, `type`, `part`, `price`, `clothesID`, `indexID`) VALUES
(1467, 'Weihnachtsmütze7', 'male', 'props', 'Hüte', '6.99', 43, NULL),
(1468, 'Weihnachtsmütze8', 'male', 'props', 'Hüte', '6.99', 97, NULL),
(1469, 'Weihnachtsmütze9', 'male', 'props', 'Hüte', '6.99', 98, NULL),
(1470, 'Weihnachtsmütze10', 'male', 'props', 'Hüte', '6.99', 99, NULL),
(1471, 'Weihnachtsmütze11', 'male', 'props', 'Hüte', '6.99', 100, NULL),
(1472, 'Weihnachtsmütze12', 'male', 'props', 'Hüte', '6.99', 101, NULL),
(1473, 'Cowboyhut', 'male', 'props', 'Hüte', '7.95', 13, NULL),
(1474, 'Caps1', 'male', 'props', 'Hüte', '19.95', 4, NULL),
(1475, 'Caps2', 'male', 'props', 'Hüte', '12.95', 6, NULL),
(1476, 'Caps3', 'male', 'props', 'Hüte', '19.95', 9, NULL),
(1477, 'Caps4', 'male', 'props', 'Hüte', '19.95', 10, NULL),
(1478, 'Caps5', 'male', 'props', 'Hüte', '19.95', 44, NULL),
(1479, 'Caps6', 'male', 'props', 'Hüte', '19.95', 45, NULL),
(1480, 'Caps7', 'male', 'props', 'Hüte', '19.95', 54, NULL),
(1481, 'Caps8', 'male', 'props', 'Hüte', '19.95', 55, NULL),
(1482, 'Caps9', 'male', 'props', 'Hüte', '19.95', 56, NULL),
(1483, 'Caps10', 'male', 'props', 'Hüte', '12.99', 58, NULL),
(1484, 'Caps11', 'male', 'props', 'Hüte', '12.99', 60, NULL),
(1485, 'Caps12', 'male', 'props', 'Hüte', '12.95', 63, NULL),
(1486, 'Caps13', 'male', 'props', 'Hüte', '19.95', 65, NULL),
(1487, 'Caps14', 'male', 'props', 'Hüte', '19.95', 66, NULL),
(1488, 'Caps15', 'male', 'props', 'Hüte', '12.99', 76, NULL),
(1489, 'Caps16', 'male', 'props', 'Hüte', '12.99', 77, NULL),
(1490, 'Caps17', 'male', 'props', 'Hüte', '19.95', 96, NULL),
(1491, 'Caps18', 'male', 'props', 'Hüte', '19.95', 103, NULL),
(1492, 'Caps19', 'male', 'props', 'Hüte', '19.95', 107, NULL),
(1493, 'Caps20', 'male', 'props', 'Hüte', '19.95', 108, NULL),
(1494, 'Caps21', 'male', 'props', 'Hüte', '19.95', 109, NULL),
(1495, 'Caps22', 'male', 'props', 'Hüte', '19.95', 110, NULL),
(1496, 'Caps23', 'male', 'props', 'Hüte', '19.95', 130, NULL),
(1497, 'Caps24', 'male', 'props', 'Hüte', '19.95', 131, NULL),
(1498, 'Hut1', 'male', 'props', 'Hüte', '45.99', 7, NULL),
(1499, 'Hut2', 'male', 'props', 'Hüte', '7.95', 31, NULL),
(1500, 'Hut3', 'male', 'props', 'Hüte', '7.95', 35, NULL),
(1501, 'Hut4', 'male', 'props', 'Hüte', '7.95', 36, NULL),
(1502, 'Hut5', 'male', 'props', 'Hüte', '6.99', 37, NULL),
(1503, 'Hut6', 'male', 'props', 'Hüte', '19.95', 104, NULL),
(1504, 'Hut7', 'male', 'props', 'Hüte', '19.95', 105, NULL),
(1505, 'Hut8', 'male', 'props', 'Hüte', '9.95', 114, NULL),
(1506, 'Helm1', 'male', 'props', 'Hüte', '35.90', 16, NULL),
(1507, 'Helm2', 'male', 'props', 'Hüte', '18.50', 17, NULL),
(1508, 'Helm3', 'male', 'props', 'Hüte', '35.90', 18, NULL),
(1509, 'Helm4', 'male', 'props', 'Hüte', '35.90', 62, NULL),
(1510, 'Helm5', 'male', 'props', 'Hüte', '18.50', 75, NULL),
(1511, 'Helm6', 'male', 'props', 'Hüte', '35.90', 92, NULL),
(1512, 'Helm7', 'male', 'props', 'Hüte', '18.50', 93, NULL),
(1513, 'Schwein', 'male', 'clothes', 'Masken', '39.95', 1, NULL),
(1514, 'Schwein', 'female', 'clothes', 'Masken', '39.95', 1, NULL),
(1515, 'Nikolaus', 'male', 'clothes', 'Masken', '39.95', 8, NULL),
(1516, 'Nikolaus', 'female', 'clothes', 'Masken', '39.95', 8, NULL),
(1517, 'Rentier', 'male', 'clothes', 'Masken', '39.95', 9, NULL),
(1518, 'Rentier', 'female', 'clothes', 'Masken', '39.95', 9, NULL),
(1519, 'Schneemann', 'male', 'clothes', 'Masken', '39.95', 10, NULL),
(1520, 'Schneemann', 'female', 'clothes', 'Masken', '39.95', 10, NULL),
(1521, 'Katze', 'male', 'clothes', 'Masken', '39.95', 17, NULL),
(1522, 'Katze', 'female', 'clothes', 'Masken', '39.95', 17, NULL),
(1523, 'Fuchs', 'male', 'clothes', 'Masken', '39.95', 18, NULL),
(1524, 'Fuchs', 'female', 'clothes', 'Masken', '39.95', 18, NULL),
(1525, 'Eule', 'male', 'clothes', 'Masken', '39.95', 19, NULL),
(1526, 'Eule', 'female', 'clothes', 'Masken', '39.95', 19, NULL),
(1527, 'Waschbaer', 'male', 'clothes', 'Masken', '39.95', 20, NULL),
(1528, 'Waschbaer', 'female', 'clothes', 'Masken', '39.95', 20, NULL),
(1529, 'Braunbaer', 'male', 'clothes', 'Masken', '39.95', 21, NULL),
(1530, 'Braunbaer', 'female', 'clothes', 'Masken', '39.95', 21, NULL),
(1531, 'Bueffel', 'male', 'clothes', 'Masken', '39.95', 22, NULL),
(1532, 'Bueffel', 'female', 'clothes', 'Masken', '39.95', 22, NULL),
(1533, 'Stier', 'male', 'clothes', 'Masken', '39.95', 23, NULL),
(1534, 'Stier', 'female', 'clothes', 'Masken', '39.95', 23, NULL),
(1535, 'Adler', 'male', 'clothes', 'Masken', '39.95', 24, NULL),
(1536, 'Adler', 'female', 'clothes', 'Masken', '39.95', 24, NULL),
(1537, 'Geier', 'male', 'clothes', 'Masken', '39.95', 25, NULL),
(1538, 'Geier', 'female', 'clothes', 'Masken', '39.95', 25, NULL),
(1539, 'Wolf', 'male', 'clothes', 'Masken', '39.95', 26, NULL),
(1540, 'Wolf', 'female', 'clothes', 'Masken', '39.95', 26, NULL),
(1541, 'Pinguin', 'male', 'clothes', 'Masken', '39.95', 31, NULL),
(1542, 'Pinguin', 'female', 'clothes', 'Masken', '39.95', 31, NULL),
(1543, 'Winni', 'male', 'clothes', 'Masken', '39.95', 34, NULL),
(1544, 'Winni', 'female', 'clothes', 'Masken', '39.95', 34, NULL),
(1545, 'Kigurumi', 'male', 'clothes', 'Masken', '39.95', 44, NULL),
(1546, 'Kigurumi', 'female', 'clothes', 'Masken', '39.95', 44, NULL),
(1547, 'Absperrband', 'male', 'clothes', 'Masken', '4.95', 47, NULL),
(1548, 'Absperrband', 'female', 'clothes', 'Masken', '4.95', 47, NULL),
(1549, 'Tape', 'male', 'clothes', 'Masken', '4.95', 48, NULL),
(1550, 'Tape', 'female', 'clothes', 'Masken', '4.95', 48, NULL),
(1551, 'Papiertuete', 'male', 'clothes', 'Masken', '2.99', 49, NULL),
(1552, 'Papiertuete', 'female', 'clothes', 'Masken', '2.99', 49, NULL),
(1553, 'Bigfoot', 'male', 'clothes', 'Masken', '39.95', 59, NULL),
(1554, 'Bigfoot', 'female', 'clothes', 'Masken', '39.95', 59, NULL),
(1555, 'Kuerbis', 'male', 'clothes', 'Masken', '39.95', 60, NULL),
(1556, 'Kuerbis', 'female', 'clothes', 'Masken', '39.95', 60, NULL),
(1557, 'Faceless', 'male', 'clothes', 'Masken', '39.95', 63, NULL),
(1558, 'Faceless', 'female', 'clothes', 'Masken', '39.95', 63, NULL),
(1559, 'Werwolf', 'male', 'clothes', 'Masken', '39.95', 65, NULL),
(1560, 'Werwolf', 'female', 'clothes', 'Masken', '39.95', 65, NULL),
(1561, 'Fliege', 'male', 'clothes', 'Masken', '39.95', 66, NULL),
(1562, 'Fliege', 'female', 'clothes', 'Masken', '39.95', 66, NULL),
(1563, 'Teufel', 'male', 'clothes', 'Masken', '39.95', 68, NULL),
(1564, 'Teufel', 'female', 'clothes', 'Masken', '39.95', 68, NULL),
(1565, 'Vogelscheuche', 'male', 'clothes', 'Masken', '39.95', 69, NULL),
(1566, 'Vogelscheuche', 'female', 'clothes', 'Masken', '39.95', 69, NULL),
(1567, 'Toffa', 'male', 'clothes', 'Masken', '39.95', 71, NULL),
(1568, 'Toffa', 'female', 'clothes', 'Masken', '39.95', 71, NULL),
(1569, 'Tannenbaum', 'male', 'clothes', 'Masken', '6.99', 77, NULL),
(1570, 'Tannenbaum', 'female', 'clothes', 'Masken', '6.99', 77, NULL),
(1571, 'Lebkuchen', 'male', 'clothes', 'Masken', '39.95', 78, NULL),
(1572, 'Lebkuchen', 'female', 'clothes', 'Masken', '39.95', 78, NULL),
(1573, 'Yeti', 'male', 'clothes', 'Masken', '39.95', 84, NULL),
(1574, 'Yeti', 'female', 'clothes', 'Masken', '39.95', 84, NULL),
(1575, 'Chicken', 'male', 'clothes', 'Masken', '39.95', 85, NULL),
(1576, 'Chicken', 'female', 'clothes', 'Masken', '39.95', 85, NULL),
(1577, 'Dino', 'male', 'clothes', 'Masken', '39.95', 93, NULL),
(1578, 'Dino', 'female', 'clothes', 'Masken', '39.95', 93, NULL),
(1579, 'Clown', 'male', 'clothes', 'Masken', '39.95', 95, NULL),
(1580, 'Clown', 'female', 'clothes', 'Masken', '39.95', 95, NULL),
(1581, 'Gorilla', 'male', 'clothes', 'Masken', '39.95', 96, NULL),
(1582, 'Gorilla', 'female', 'clothes', 'Masken', '39.95', 96, NULL),
(1583, 'Pferd', 'male', 'clothes', 'Masken', '39.95', 97, NULL),
(1584, 'Pferd', 'female', 'clothes', 'Masken', '39.95', 97, NULL),
(1585, 'Einhorn', 'male', 'clothes', 'Masken', '39.95', 98, NULL),
(1586, 'Einhorn', 'female', 'clothes', 'Masken', '39.95', 98, NULL),
(1587, 'Santa Muerte', 'male', 'clothes', 'Masken', '39.95', 99, NULL),
(1588, 'Santa Muerte', 'female', 'clothes', 'Masken', '39.95', 99, NULL),
(1589, 'Mops', 'male', 'clothes', 'Masken', '39.95', 100, NULL),
(1590, 'Mops', 'female', 'clothes', 'Masken', '39.95', 100, NULL),
(1591, 'Skull', 'male', 'clothes', 'Masken', '39.95', 108, NULL),
(1592, 'Skull', 'female', 'clothes', 'Masken', '39.95', 108, NULL),
(1593, 'Beelzebub', 'male', 'clothes', 'Masken', '39.95', 131, NULL),
(1594, 'Beelzebub', 'female', 'clothes', 'Masken', '39.95', 131, NULL),
(1595, 'Splinter Cell', 'male', 'clothes', 'Masken', '34.90', 132, NULL),
(1596, 'Splinter Cell', 'female', 'clothes', 'Masken', '34.90', 132, NULL),
(1597, 'Apotheker', 'male', 'clothes', 'Masken', '39.95', 136, NULL),
(1598, 'Apotheker', 'female', 'clothes', 'Masken', '39.95', 136, NULL),
(1599, 'Mr Taco', 'male', 'clothes', 'Masken', '39.95', 143, NULL),
(1600, 'Mr Taco', 'female', 'clothes', 'Masken', '39.95', 143, NULL),
(1601, 'Burgerino', 'male', 'clothes', 'Masken', '39.95', 144, NULL),
(1602, 'Burgerino', 'female', 'clothes', 'Masken', '39.95', 144, NULL),
(1603, 'Huhn', 'male', 'clothes', 'Masken', '39.95', 145, NULL),
(1604, 'Huhn', 'female', 'clothes', 'Masken', '39.95', 145, NULL),
(1605, 'Zombie1', 'male', 'clothes', 'Masken', '39.95', 39, NULL),
(1606, 'Zombie1', 'female', 'clothes', 'Masken', '39.95', 39, NULL),
(1607, 'Zombie2', 'male', 'clothes', 'Masken', '39.95', 40, NULL),
(1608, 'Zombie2', 'female', 'clothes', 'Masken', '39.95', 40, NULL),
(1609, 'Zombie3', 'male', 'clothes', 'Masken', '39.95', 41, NULL),
(1610, 'Zombie3', 'female', 'clothes', 'Masken', '39.95', 41, NULL),
(1611, 'Zombie4', 'male', 'clothes', 'Masken', '39.95', 42, NULL),
(1612, 'Zombie4', 'female', 'clothes', 'Masken', '39.95', 42, NULL),
(1613, 'Zombie5', 'male', 'clothes', 'Masken', '39.95', 61, NULL),
(1614, 'Zombie5', 'female', 'clothes', 'Masken', '39.95', 61, NULL),
(1615, 'Zombie6', 'male', 'clothes', 'Masken', '39.95', 62, NULL),
(1616, 'Zombie6', 'female', 'clothes', 'Masken', '39.95', 62, NULL),
(1617, 'Zombie7', 'male', 'clothes', 'Masken', '39.95', 64, NULL),
(1618, 'Zombie7', 'female', 'clothes', 'Masken', '39.95', 64, NULL),
(1619, 'Zombie8', 'male', 'clothes', 'Masken', '39.95', 67, NULL),
(1620, 'Zombie8', 'female', 'clothes', 'Masken', '39.95', 67, NULL),
(1621, 'Zombie9', 'male', 'clothes', 'Masken', '39.95', 70, NULL),
(1622, 'Zombie9', 'female', 'clothes', 'Masken', '39.95', 70, NULL),
(1623, 'Glatze', 'male', 'clothes', 'Masken', '2.95', 73, NULL),
(1624, 'Glatze', 'female', 'clothes', 'Masken', '2.95', 73, NULL),
(1625, 'Oma1', 'male', 'clothes', 'Masken', '39.95', 86, NULL),
(1626, 'Oma1', 'female', 'clothes', 'Masken', '39.95', 86, NULL),
(1627, 'Oma2', 'male', 'clothes', 'Masken', '39.95', 88, NULL),
(1628, 'Oma2', 'female', 'clothes', 'Masken', '39.95', 88, NULL),
(1629, 'Keks', 'male', 'clothes', 'Masken', '39.95', 33, NULL),
(1630, 'Keks', 'female', 'clothes', 'Masken', '39.95', 33, NULL),
(1631, 'Keks2', 'male', 'clothes', 'Masken', '39.95', 74, NULL),
(1632, 'Keks2', 'female', 'clothes', 'Masken', '39.95', 74, NULL),
(1633, 'Keks3', 'male', 'clothes', 'Masken', '39.95', 75, NULL),
(1634, 'Keks3', 'female', 'clothes', 'Masken', '39.95', 75, NULL),
(1635, 'Cartoon1', 'male', 'clothes', 'Masken', '39.95', 43, NULL),
(1636, 'Cartoon1', 'female', 'clothes', 'Masken', '39.95', 43, NULL),
(1637, 'Cartoon2', 'male', 'clothes', 'Masken', '39.95', 45, NULL),
(1638, 'Cartoon2', 'female', 'clothes', 'Masken', '39.95', 45, NULL),
(1639, 'Bandana1', 'male', 'clothes', 'Masken', '4.95', 51, NULL),
(1640, 'Bandana1', 'female', 'clothes', 'Masken', '4.95', 51, NULL),
(1641, 'Bandana2', 'male', 'clothes', 'Masken', '4.95', 111, NULL),
(1642, 'Bandana2', 'female', 'clothes', 'Masken', '4.95', 111, NULL),
(1643, 'Palischal1', 'male', 'clothes', 'Masken', '4.95', 114, NULL),
(1644, 'Palischal1', 'female', 'clothes', 'Masken', '4.95', 114, NULL),
(1645, 'Palischal2', 'male', 'clothes', 'Masken', '4.95', 115, NULL),
(1646, 'Palischal2', 'female', 'clothes', 'Masken', '4.95', 115, NULL),
(1647, 'Palischal3', 'male', 'clothes', 'Masken', '4.95', 116, NULL),
(1648, 'Palischal3', 'female', 'clothes', 'Masken', '4.95', 116, NULL),
(1649, 'Keks4', 'male', 'clothes', 'Masken', '19.99', 127, NULL),
(1650, 'Keks4', 'female', 'clothes', 'Masken', '19.99', 127, NULL),
(1651, 'Tshirt1', 'male', 'clothes', 'Masken', '19.99', 54, NULL),
(1652, 'Tshirt1', 'female', 'clothes', 'Masken', '19.99', 54, NULL),
(1653, 'Tshirt2', 'male', 'clothes', 'Masken', '19.99', 118, NULL),
(1654, 'Tshirt2', 'female', 'clothes', 'Masken', '19.99', 118, NULL),
(1655, 'Goa1', 'male', 'clothes', 'Masken', '4.95', 102, NULL),
(1656, 'Goa1', 'female', 'clothes', 'Masken', '4.95', 102, NULL),
(1657, 'Goa2', 'male', 'clothes', 'Masken', '4.95', 124, NULL),
(1658, 'Goa2', 'female', 'clothes', 'Masken', '4.95', 124, NULL),
(1659, 'Strumpf1', 'male', 'clothes', 'Masken', '24.90', 32, NULL),
(1660, 'Strumpf1', 'female', 'clothes', 'Masken', '24.90', 32, NULL),
(1661, 'Strumpf2', 'male', 'clothes', 'Masken', '19.90', 119, NULL),
(1662, 'Strumpf2', 'female', 'clothes', 'Masken', '19.90', 119, NULL),
(1663, 'Affe1', 'male', 'clothes', 'Masken', '39.95', 3, NULL),
(1664, 'Affe1', 'female', 'clothes', 'Masken', '39.95', 3, NULL),
(1665, 'Affe2', 'male', 'clothes', 'Masken', '39.95', 5, NULL),
(1666, 'Affe2', 'female', 'clothes', 'Masken', '39.95', 5, NULL),
(1667, 'Affe3', 'male', 'clothes', 'Masken', '39.95', 79, NULL),
(1668, 'Affe3', 'female', 'clothes', 'Masken', '39.95', 79, NULL),
(1669, 'Affe4', 'male', 'clothes', 'Masken', '39.95', 80, NULL),
(1670, 'Affe4', 'female', 'clothes', 'Masken', '39.95', 80, NULL),
(1671, 'Affe5', 'male', 'clothes', 'Masken', '39.95', 81, NULL),
(1672, 'Affe5', 'female', 'clothes', 'Masken', '39.95', 81, NULL),
(1673, 'Affe6', 'male', 'clothes', 'Masken', '39.95', 82, NULL),
(1674, 'Affe6', 'female', 'clothes', 'Masken', '39.95', 82, NULL),
(1675, 'Affe7', 'male', 'clothes', 'Masken', '39.95', 83, NULL),
(1676, 'Affe7', 'female', 'clothes', 'Masken', '39.95', 83, NULL),
(1677, 'Affe8', 'male', 'clothes', 'Masken', '39.95', 147, NULL),
(1678, 'Affe8', 'female', 'clothes', 'Masken', '39.95', 147, NULL),
(1679, 'Skelett1', 'male', 'clothes', 'Masken', '39.95', 2, NULL),
(1680, 'Skelett1', 'female', 'clothes', 'Masken', '39.95', 2, NULL),
(1681, 'Skelett2', 'male', 'clothes', 'Masken', '34.90', 29, NULL),
(1682, 'Skelett2', 'female', 'clothes', 'Masken', '34.90', 29, NULL),
(1683, 'Hockeymaske1', 'male', 'clothes', 'Masken', '19.99', 4, NULL),
(1684, 'Hockeymaske1', 'female', 'clothes', 'Masken', '19.99', 4, NULL),
(1685, 'Hockeymaske2', 'male', 'clothes', 'Masken', '19.99', 14, NULL),
(1686, 'Hockeymaske2', 'female', 'clothes', 'Masken', '19.99', 14, NULL),
(1687, 'Hockeymaske3', 'male', 'clothes', 'Masken', '19.99', 15, NULL),
(1688, 'Hockeymaske3', 'female', 'clothes', 'Masken', '19.99', 15, NULL),
(1689, 'Hockeymaske4', 'male', 'clothes', 'Masken', '19.99', 16, NULL),
(1690, 'Hockeymaske4', 'female', 'clothes', 'Masken', '19.99', 16, NULL),
(1691, 'Hockeymaske5', 'male', 'clothes', 'Masken', '19.99', 30, NULL),
(1692, 'Hockeymaske5', 'female', 'clothes', 'Masken', '19.99', 30, NULL),
(1693, 'Hockeymaske6', 'male', 'clothes', 'Masken', '19.99', 133, NULL),
(1694, 'Hockeymaske6', 'female', 'clothes', 'Masken', '19.99', 133, NULL),
(1695, 'Demon1', 'male', 'clothes', 'Masken', '39.95', 7, NULL),
(1696, 'Demon1', 'female', 'clothes', 'Masken', '39.95', 7, NULL),
(1697, 'Demon2', 'male', 'clothes', 'Masken', '39.95', 94, NULL),
(1698, 'Demon2', 'female', 'clothes', 'Masken', '39.95', 94, NULL),
(1699, 'Pilot1', 'male', 'clothes', 'Masken', '19.99', 24, NULL),
(1700, 'Pilot1', 'female', 'clothes', 'Masken', '19.99', 24, NULL),
(1701, 'Pilot2', 'male', 'clothes', 'Masken', '19.99', 109, NULL),
(1702, 'Pilot2', 'female', 'clothes', 'Masken', '19.99', 109, NULL),
(1703, 'Sturmhaube1', 'male', 'clothes', 'Masken', '24.90', 35, NULL),
(1704, 'Sturmhaube1', 'female', 'clothes', 'Masken', '24.90', 35, NULL),
(1705, 'Sturmhaube2', 'male', 'clothes', 'Masken', '24.90', 37, NULL),
(1706, 'Sturmhaube2', 'female', 'clothes', 'Masken', '24.90', 37, NULL),
(1707, 'Sturmhaube3', 'male', 'clothes', 'Masken', '24.90', 52, NULL),
(1708, 'Sturmhaube3', 'female', 'clothes', 'Masken', '24.90', 52, NULL),
(1709, 'Sturmhaube4', 'male', 'clothes', 'Masken', '24.90', 53, NULL),
(1710, 'Sturmhaube4', 'female', 'clothes', 'Masken', '24.90', 53, NULL),
(1711, 'Sturmhaube5', 'male', 'clothes', 'Masken', '24.90', 55, NULL),
(1712, 'Sturmhaube5', 'female', 'clothes', 'Masken', '24.90', 55, NULL),
(1713, 'Sturmhaube6', 'male', 'clothes', 'Masken', '24.90', 57, NULL),
(1714, 'Sturmhaube6', 'female', 'clothes', 'Masken', '24.90', 57, NULL),
(1715, 'Sturmhaube7', 'male', 'clothes', 'Masken', '24.90', 58, NULL),
(1716, 'Sturmhaube7', 'female', 'clothes', 'Masken', '24.90', 58, NULL),
(1717, 'Sturmhaube8', 'male', 'clothes', 'Masken', '24.90', 113, NULL),
(1718, 'Sturmhaube8', 'female', 'clothes', 'Masken', '24.90', 113, NULL),
(1719, 'Sturmhaube9', 'male', 'clothes', 'Masken', '24.90', 117, NULL),
(1720, 'Sturmhaube9', 'female', 'clothes', 'Masken', '24.90', 117, NULL),
(1721, 'Skimaske1', 'male', 'clothes', 'Masken', '19.99', 56, NULL),
(1722, 'Skimaske1', 'female', 'clothes', 'Masken', '19.99', 56, NULL),
(1723, 'Teufel2', 'male', 'clothes', 'Masken', '39.95', 72, NULL),
(1724, 'Teufel2', 'female', 'clothes', 'Masken', '39.95', 72, NULL),
(1725, 'Nikolaus2', 'male', 'clothes', 'Masken', '39.95', 76, NULL),
(1726, 'Nikolaus2', 'female', 'clothes', 'Masken', '39.95', 76, NULL),
(1727, 'Elf2', 'male', 'clothes', 'Masken', '39.95', 87, NULL),
(1728, 'Elf2', 'female', 'clothes', 'Masken', '39.95', 87, NULL),
(1729, 'Alien1', 'male', 'clothes', 'Masken', '39.95', 92, NULL),
(1730, 'Alien1', 'female', 'clothes', 'Masken', '39.95', 92, NULL),
(1731, 'Staubfilter1', 'male', 'clothes', 'Masken', '19.99', 90, NULL),
(1732, 'Staubfilter1', 'female', 'clothes', 'Masken', '19.99', 90, NULL),
(1733, 'Skimaske2', 'male', 'clothes', 'Masken', '19.99', 122, NULL),
(1734, 'Skimaske2', 'female', 'clothes', 'Masken', '19.99', 122, NULL),
(1736, 'Zombie10', 'male', 'clothes', 'Masken', '39.95', 103, NULL),
(1737, 'Zombie10', 'female', 'clothes', 'Masken', '39.95', 103, NULL),
(1738, 'Mundschutz1', 'male', 'clothes', 'Masken', '19.99', 101, NULL),
(1739, 'Mundschutz1', 'female', 'clothes', 'Masken', '19.99', 101, NULL),
(1740, 'Mundschutz2', 'male', 'clothes', 'Masken', '19.99', 107, NULL),
(1741, 'Mundschutz2', 'female', 'clothes', 'Masken', '19.99', 107, NULL),
(1742, 'Crossmaske1', 'male', 'clothes', 'Masken', '34.90', 28, NULL),
(1743, 'Crossmaske1', 'female', 'clothes', 'Masken', '34.90', 28, NULL),
(1744, 'Crossmaske2', 'male', 'clothes', 'Masken', '34.90', 89, NULL),
(1745, 'Crossmaske2', 'female', 'clothes', 'Masken', '34.90', 89, NULL),
(1746, 'Gasmaske1', 'male', 'clothes', 'Masken', '34.90', 36, NULL),
(1747, 'Gasmaske1', 'female', 'clothes', 'Masken', '34.90', 36, NULL),
(1748, 'Gasmaske2', 'male', 'clothes', 'Masken', '34.90', 38, NULL),
(1749, 'Gasmaske2', 'female', 'clothes', 'Masken', '34.90', 38, NULL),
(1750, 'Gasmaske3', 'male', 'clothes', 'Masken', '34.90', 46, NULL),
(1751, 'Gasmaske3', 'female', 'clothes', 'Masken', '34.90', 46, NULL),
(1752, 'Gasmaske4', 'male', 'clothes', 'Masken', '34.90', 129, NULL),
(1753, 'Gasmaske4', 'female', 'clothes', 'Masken', '34.90', 129, NULL),
(1754, 'Gasmaske5', 'male', 'clothes', 'Masken', '34.90', 130, NULL),
(1755, 'Gasmaske5', 'female', 'clothes', 'Masken', '34.90', 130, NULL),
(1756, 'Maske1', 'male', 'clothes', 'Masken', '19.99', 6, NULL),
(1757, 'Maske1', 'female', 'clothes', 'Masken', '19.99', 6, NULL),
(1758, 'Maske2', 'male', 'clothes', 'Masken', '14.99', 11, NULL),
(1759, 'Maske2', 'female', 'clothes', 'Masken', '14.99', 11, NULL),
(1760, 'Maske3', 'male', 'clothes', 'Masken', '14.99', 12, NULL),
(1761, 'Maske3', 'female', 'clothes', 'Masken', '14.99', 12, NULL),
(1762, 'Maske4', 'male', 'clothes', 'Masken', '39.95', 13, NULL),
(1763, 'Maske4', 'female', 'clothes', 'Masken', '39.95', 13, NULL),
(1764, 'Maske5', 'male', 'clothes', 'Masken', '34.90', 50, NULL),
(1765, 'Maske5', 'female', 'clothes', 'Masken', '34.90', 50, NULL),
(1766, 'Maske6', 'male', 'clothes', 'Masken', '39.95', 91, NULL),
(1767, 'Maske6', 'female', 'clothes', 'Masken', '39.95', 91, NULL),
(1768, 'Maske7', 'male', 'clothes', 'Masken', '19.90', 104, NULL),
(1769, 'Maske7', 'female', 'clothes', 'Masken', '19.90', 104, NULL),
(1770, 'Maske8', 'male', 'clothes', 'Masken', '19.90', 105, NULL),
(1771, 'Maske8', 'female', 'clothes', 'Masken', '19.90', 105, NULL),
(1772, 'Maske9', 'male', 'clothes', 'Masken', '19.90', 106, NULL),
(1773, 'Maske9', 'female', 'clothes', 'Masken', '19.90', 106, NULL),
(1774, 'Maske10', 'male', 'clothes', 'Masken', '39.95', 110, NULL),
(1775, 'Maske10', 'female', 'clothes', 'Masken', '39.95', 110, NULL),
(1776, 'Maske11', 'male', 'clothes', 'Masken', '34.90', 112, NULL),
(1777, 'Maske11', 'female', 'clothes', 'Masken', '34.90', 112, NULL),
(1778, 'Maske12', 'male', 'clothes', 'Masken', '19.99', 123, NULL),
(1779, 'Maske12', 'female', 'clothes', 'Masken', '19.99', 123, NULL),
(1780, 'Maske13', 'male', 'clothes', 'Masken', '34.90', 125, NULL),
(1781, 'Maske13', 'female', 'clothes', 'Masken', '34.90', 125, NULL),
(1782, 'Maske14', 'male', 'clothes', 'Masken', '34.90', 126, NULL),
(1783, 'Maske14', 'female', 'clothes', 'Masken', '34.90', 126, NULL),
(1784, 'Maske15', 'male', 'clothes', 'Masken', '34.90', 128, NULL),
(1785, 'Maske15', 'female', 'clothes', 'Masken', '34.90', 128, NULL),
(1786, 'Maske16', 'male', 'clothes', 'Masken', '34.90', 134, NULL),
(1787, 'Maske16', 'female', 'clothes', 'Masken', '34.90', 134, NULL),
(1788, 'Maske17', 'male', 'clothes', 'Masken', '34.90', 135, NULL),
(1789, 'Maske17', 'female', 'clothes', 'Masken', '34.90', 135, NULL),
(1790, 'Maske18', 'male', 'clothes', 'Masken', '39.95', 137, NULL),
(1791, 'Maske18', 'female', 'clothes', 'Masken', '39.95', 137, NULL),
(1792, 'Maske19', 'male', 'clothes', 'Masken', '39.95', 138, NULL),
(1793, 'Maske19', 'female', 'clothes', 'Masken', '39.95', 138, NULL),
(1794, 'Maske20', 'male', 'clothes', 'Masken', '39.95', 139, NULL),
(1795, 'Maske20', 'female', 'clothes', 'Masken', '39.95', 139, NULL),
(1796, 'Maske21', 'male', 'clothes', 'Masken', '39.95', 140, NULL),
(1797, 'Maske21', 'female', 'clothes', 'Masken', '39.95', 140, NULL),
(1798, 'Maske22', 'male', 'clothes', 'Masken', '39.95', 141, NULL),
(1799, 'Maske22', 'female', 'clothes', 'Masken', '39.95', 141, NULL),
(1800, 'Maske23', 'male', 'clothes', 'Masken', '39.95', 142, NULL),
(1801, 'Maske23', 'female', 'clothes', 'Masken', '39.95', 142, NULL),
(1802, 'Maske24', 'male', 'clothes', 'Masken', '39.95', 146, NULL),
(1803, 'Maske24', 'female', 'clothes', 'Masken', '39.95', 146, NULL),
(1804, 'Jogginghose', 'female', 'clothes', 'Hosen', '15.00', 80, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fractionranks`
--

CREATE TABLE `fractionranks` (
  `id` int(11) NOT NULL,
  `fractionID` varchar(50) DEFAULT NULL,
  `fractionRankName` varchar(50) DEFAULT NULL,
  `fractionRank` int(11) DEFAULT NULL,
  `canBill` enum('Y','N') DEFAULT NULL,
  `canInvite` enum('Y','N') DEFAULT NULL,
  `payCheck` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fractionranks`
--

INSERT INTO `fractionranks` (`id`, `fractionID`, `fractionRankName`, `fractionRank`, `canBill`, `canInvite`, `payCheck`) VALUES
(1, '3', 'LSMC Assistant Chief', 10, 'N', 'Y', 253),
(2, '3', 'Oberarzt', 9, 'N', 'N', 243),
(3, '3', 'Facharzt Ausbilder', 8, 'N', 'N', 235),
(4, '3', 'Facharzt', 7, 'N', 'N', 225),
(5, '3', 'Notarzt', 6, 'N', 'N', 213),
(6, '3', 'Assistenzarzt', 5, 'N', 'N', 203),
(7, '3', 'Verwaltung', 4, 'N', 'N', 178),
(8, '3', 'Paramedic Ausbilder', 3, 'N', 'N', 178),
(9, '3', 'Paramedic', 2, 'N', 'N', 163),
(10, '3', 'Auszubildender Paramedic', 1, 'N', 'N', 150),
(11, '3', 'Praktikant', 0, 'N', 'N', 63),
(12, '3', 'LSMC Leitung', 11, 'N', 'Y', 265),
(13, '1', 'MIB Leitung', 2, 'N', 'Y', 999),
(14, '1', 'MIB Special Agent', 1, 'N', 'Y', 849),
(15, '1', 'MIB Agent', 0, 'N', 'N', 749),
(16, '2', 'Chief of Police', 10, 'Y', 'Y', 268),
(17, '2', 'Assistant Chief of Police', 9, 'Y', 'Y', 255),
(18, '2', 'Inspector', 6, 'Y', 'N', 250),
(19, '2', 'Commander', 8, 'Y', 'Y', 230),
(20, '2', 'Captain', 7, 'Y', 'Y', 218),
(21, '2', 'Lieutenant', 5, 'Y', 'N', 205),
(22, '2', 'Sergeant', 4, 'Y', 'N', 180),
(23, '2', 'Senior Officer', 3, 'Y', 'N', 165),
(24, '2', 'Officer', 2, 'Y', 'N', 155),
(25, '2', 'Rekrut', 1, 'Y', 'N', 140),
(26, '4', 'Probefahrer', 0, 'N', 'N', 90),
(27, '4', 'Fahrer 1', 1, 'N', 'N', 98),
(28, '4', 'Fahrer 2', 3, 'N', 'N', 108),
(29, '4', 'Ausbilder', 4, 'N', 'N', 115),
(30, '4', 'Ausbildungsleiter', 5, 'N', 'N', 125),
(31, '4', 'Taxi Leitung', 6, 'N', 'Y', 135),
(32, '5', 'Chief Of Justice', 19, 'Y', 'Y', 293),
(33, '5', 'Unit Leader Richter', 17, 'Y', 'Y', 243),
(34, '5', 'Unit Leader Staatsanwalt', 16, 'Y', 'Y', 243),
(35, '5', 'Anwaltskammerleitung', 15, 'Y', 'Y', 243),
(36, '5', 'Unit Assistant Richter', 14, 'N', 'N', 230),
(37, '5', 'Unit Assistant Staatsanwalt', 13, 'N', 'N', 230),
(38, '5', 'Trainer Richter', 12, 'N', 'N', 205),
(39, '5', 'Trainer Staatsanwalt', 11, 'N', 'N', 205),
(40, '5', 'Trainer Justizsicherheit', 10, 'N', 'N', 180),
(41, '5', 'Master Expert Richter', 9, 'N', 'N', 163),
(42, '5', 'Master Expert Staatsanwalt', 8, 'N', 'N', 163),
(43, '5', 'Junior Expert Richter', 7, 'N', 'N', 155),
(44, '5', 'Junior Expert Staatsanwalt', 6, 'N', 'N', 155),
(45, '5', 'Junior Expert Sicherheit', 5, 'N', 'N', 155),
(46, '5', 'Trainee Richter', 4, 'N', 'N', 140),
(47, '5', 'Trainee Staatsanwalt', 3, 'N', 'N', 140),
(48, '5', 'Trainee Sicherheit', 2, 'N', 'N', 140),
(49, '5', 'Zugelassener Anwalt', 1, 'N', 'N', 63),
(50, '6', 'FIB Director', 9, 'N', 'Y', 720),
(51, '6', 'Special Agent I', 2, 'N', 'N', 470),
(52, '5', 'freier Anwalt', 0, 'N', 'N', 0),
(53, '6', 'Deputy Director', 8, 'N', 'Y', 680),
(54, '6', 'Associate Deputy Director', 7, 'N', 'Y', 650),
(55, '6', 'Special Agent in Charge', 6, 'N', 'N', 590),
(56, '6', 'Supervisory Special Agent', 5, 'N', 'N', 560),
(57, '6', 'Senior Special Agent', 4, 'N', 'N', 530),
(58, '6', 'Special Agent II', 3, 'N', 'N', 500),
(59, '6', 'Special Agent in Education', 1, 'N', 'N', 440),
(60, '6', 'New Agent in Training', 0, 'N', 'N', 420),
(61, '4', 'Leitstelle', 2, 'N', 'N', 430),
(62, '5', 'Secretary of Justice', 18, 'Y', 'Y', 243);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fractions`
--

CREATE TABLE `fractions` (
  `fractionID` int(11) NOT NULL,
  `fractionName` varchar(255) DEFAULT NULL,
  `fractionLeaderCharID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Daten für Tabelle `fractions`
--

INSERT INTO `fractions` (`fractionID`, `fractionName`, `fractionLeaderCharID`) VALUES
(1, 'NOOSE', 1),
(2, 'LSPD', 0),
(3, 'LSMC', 0),
(4, 'DOJ', 0),
(5, 'ACLS', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fractionusers`
--

CREATE TABLE `fractionusers` (
  `id` int(11) NOT NULL,
  `playerCharID` int(11) DEFAULT NULL,
  `fractionID` int(11) DEFAULT NULL,
  `fractionRankID` int(11) DEFAULT NULL,
  `playerFractionDuty` varchar(55) DEFAULT 'N',
  `playerFractionCanBuy` varchar(55) DEFAULT 'N',
  `clothes` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fractionusers`
--

INSERT INTO `fractionusers` (`id`, `playerCharID`, `fractionID`, `fractionRankID`, `playerFractionDuty`, `playerFractionCanBuy`, `clothes`) VALUES
(1, 1, 1, 13, 'Y', 'Y', NULL),
(2, 2, 1, 13, 'Y', 'Y', 'Streifendienst'),
(3, 3, 1, 13, 'Y', 'Y', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `garages`
--

CREATE TABLE `garages` (
  `id` int(11) NOT NULL,
  `actionId` int(11) DEFAULT 0,
  `type` varchar(50) DEFAULT '0',
  `fraktion` varchar(50) DEFAULT '0',
  `spawnerX` float DEFAULT 0,
  `spawnerY` float DEFAULT 0,
  `spawnerZ` float DEFAULT 0,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `garages`
--

INSERT INTO `garages` (`id`, `actionId`, `type`, `fraktion`, `spawnerX`, `spawnerY`, `spawnerZ`, `name`) VALUES
(4, 5, 'ground', 'none', 104.312, -1078.91, 29.1924, 'stadtpark'),
(5, 6, 'ground', 'none', 219.971, -806.278, 30.7057, 'meetingpoint'),
(6, 7, 'ground', 'none', -81.3689, -2005.54, 18.017, 'stadion'),
(7, 8, 'ground', 'none', -1043.57, -2652.09, 13.8308, 'flughafen'),
(8, 9, 'ground', 'none', -1670.96, -952.375, 7.67684, 'strand_pier'),
(9, 10, 'ground', 'none', -1150.35, -739.398, 19.9774, 'vespucci'),
(10, 11, 'ground', 'none', -901.741, -160.424, 41.8801, 'golfplatz'),
(11, 12, 'ground', 'none', -195.512, 300.872, 96.9457, 'asialaden'),
(12, 13, 'ground', 'none', 360.822, 293.869, 103.518, 'staatsbank'),
(13, 14, 'ground', 'none', 1029.83, -764.139, 57.9893, 'mirrorpark'),
(14, 15, 'ground', 'none', 559.664, 2718.88, 42.0602, 'harmony'),
(15, 16, 'ground', 'none', 1876.7, 3759.65, 32.9587, 'sandy_shores'),
(16, 17, 'ground', 'none', 80.9688, 6365.52, 31.2284, 'paleto_bay'),
(17, 39, 'ground', 'none', 441.32, -1021.85, 28.57, 'LSPD'),
(18, 40, 'ground', 'none', -515.59, -293.797, 35.23, 'LSMC'),
(19, 41, 'ground', 'none', 2530, -399.96, 92.99, 'MIB'),
(20, 42, 'ground', 'none', 895.862, -138.174, 77.08, 'pferderennbahn'),
(21, 43, 'ground', 'none', 279.174, -336.798, 44.91, 'DOJ'),
(22, 53, 'ground', 'none', -366.32, -109.39, 38.67, 'LSC'),
(23, 55, 'ground', 'none', -180, -1335, 31, 'Bennys'),
(27, 59, 'ground', 'none', 449, -981, 43, 'LSPDHeli'),
(28, 60, 'ground', 'none', -452, -300, 78, 'MedicHeli'),
(29, 67, 'ground', 'none', -10.757, -1096.79, 26.673, 'boomeranggar');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `garages_impound`
--

CREATE TABLE `garages_impound` (
  `id` int(11) NOT NULL,
  `actionId` int(11) DEFAULT 0,
  `type` varchar(50) DEFAULT '0',
  `fraktion` varchar(50) DEFAULT '0',
  `spawnerX` float DEFAULT 0,
  `spawnerY` float DEFAULT 0,
  `spawnerZ` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `house_items`
--

CREATE TABLE `house_items` (
  `id` int(11) NOT NULL,
  `itemid` int(11) DEFAULT NULL,
  `houseid` int(11) DEFAULT NULL,
  `amout` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `house_items`
--

INSERT INTO `house_items` (`id`, `itemid`, `houseid`, `amout`) VALUES
(1, 5, 12, 496),
(4, 112, 12, 17),
(6, 4, 18, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `housing`
--

CREATE TABLE `housing` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `garageplatz` int(11) NOT NULL,
  `name` text NOT NULL,
  `interrior` text NOT NULL,
  `maxbew` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `housing`
--

INSERT INTO `housing` (`id`, `price`, `garageplatz`, `name`, `interrior`, `maxbew`) VALUES
(1, 14350, 2, 'Stadtpark Appartment', 'apa_v_mp_h_08_a', 30),
(2, 32870, 2, 'Arcadius Apartment', 'arcadius', 30),
(3, 120000, 5, 'Anna\'s Villa', 'apa_v_mp_h_04_b', 1),
(5, 5000, 5, 'Richman Hotel', 'apa_v_mp_h_04_b', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `itemanimation`
--

CREATE TABLE `itemanimation` (
  `id` int(11) NOT NULL,
  `itemId` int(11) DEFAULT 0,
  `dict` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `speed` int(11) DEFAULT NULL,
  `flag` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `itemanimation`
--

INSERT INTO `itemanimation` (`id`, `itemId`, `dict`, `name`, `speed`, `flag`) VALUES
(1, 4, 'amb@code_human_wander_eating_donut@male@idle_a', 'idle_c', 1, 47),
(2, 2, 'amb@code_human_wander_drinking@male@idle_a', 'idle_c', 1, 47);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `itemobject`
--

CREATE TABLE `itemobject` (
  `id` int(11) NOT NULL,
  `itemId` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `objectName` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `itemName` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `usable` varchar(50) DEFAULT 'Y',
  `fillvalue` int(3) NOT NULL,
  `itemcount` double NOT NULL DEFAULT 0,
  `hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `items`
--

INSERT INTO `items` (`id`, `itemName`, `type`, `usable`, `fillvalue`, `itemcount`, `hash`) VALUES
(1, 'Crystal Meth', 'drug', 'Y', 0, 0.5, NULL),
(2, 'Wasser', 'drink', 'Y', 66, 1, NULL),
(4, 'Sandwich', 'food', 'Y', 35, 0.5, NULL),
(5, 'Hotdog', 'food', 'Y', 30, 0.5, NULL),
(6, 'Hamburger', 'food', 'Y', 42, 0.75, NULL),
(7, 'Cheeseburger', 'food', 'Y', 42, 0.75, NULL),
(8, 'Orange', 'food', 'Y', 13, 0.5, NULL),
(9, 'Apfel', 'food', 'Y', 13, 0.5, NULL),
(10, 'Banane', 'food', 'Y', 13, 0.5, NULL),
(11, 'Donut', 'food', 'Y', 10, 0.5, NULL),
(12, 'Schokoriegel', 'food', 'Y', 5, 0.25, NULL),
(13, 'Popcorn', 'food', 'Y', 5, 0.25, NULL),
(14, 'Marshmallow', 'food', 'Y', 5, 0.2, NULL),
(15, 'Stockbrot', 'food', 'Y', 20, 0.2, NULL),
(16, 'Wasser (6er Pack)', 'drink', 'Y', 21, 0, NULL),
(17, 'Sprunk', 'drink', 'Y', 33, 0.33, NULL),
(18, 'O-Saft', 'drink', 'Y', 40, 0.33, NULL),
(19, 'e-Cola', 'drink', 'Y', 33, 0.33, NULL),
(20, 'Kaffee', 'drink', 'Y', 35, 0.25, NULL),
(21, 'Energydrink', 'drink', 'Y', 30, 0.33, NULL),
(22, 'Whiskeyshot', 'alcoholdrink', 'Y', 5, 0.02, NULL),
(23, 'Pißwasser', 'alcoholdrink', 'Y', 15, 0.33, NULL),
(24, 'Vodkashot', 'alcoholdrink', 'Y', 5, 0.02, NULL),
(25, 'Rotwein', 'alcoholdrink', 'Y', 10, 1, NULL),
(26, 'Weißwein', 'alcoholdrink', 'Y', 10, 1, NULL),
(27, 'Sekt', 'alcoholdrink', 'Y', 10, 1, NULL),
(28, 'Champagner', 'alcoholdrink', 'Y', 8, 1, NULL),
(29, 'Tequilashot', 'alcoholdrink', 'Y', 5, 0.02, NULL),
(30, 'Zigarette', 'lifeloss', 'Y', 2, 0.15, NULL),
(31, 'Zigarre', 'lifeloss', 'Y', 5, 0.25, NULL),
(32, 'Verbandskasten', 'life', 'Y', 25, 2, NULL),
(33, 'Pflaster', 'plaster', 'Y', 10, 0.5, NULL),
(34, 'Tasche', 'bag', 'Y', 0, 1, NULL),
(35, 'Münze', 'coin', 'Y', 0, 0.5, NULL),
(36, 'Blumenstrauß', 'item', 'Y', 0, 1, NULL),
(37, 'Würfel', 'cube', 'Y', 0, 0.5, NULL),
(38, 'Fußball', 'item', 'Y', 0, 0, NULL),
(39, 'Angel', 'item', 'Y', 0, 1, NULL),
(40, 'Köderbox', 'item', 'Y', 0, 1, NULL),
(41, 'Kabelbinder', 'item', 'Y', 0, 0.2, NULL),
(42, 'Kotztüte', 'item', 'Y', 0, 0, NULL),
(43, 'Wischmop', 'item', 'Y', 0, 0, NULL),
(44, 'Putzlappen', 'item', 'Y', 0, 0, NULL),
(45, 'Poliertuch', 'item', 'Y', 0, 0, NULL),
(47, 'Verlobungsring', 'item', 'Y', 0, 0, NULL),
(48, 'Ehering', 'item', 'Y', 0, 0, NULL),
(49, 'Ringbox', 'item', 'Y', 0, 0, NULL),
(50, 'Brötchen', 'crafting', 'Y', 0, 0, NULL),
(51, 'Hackfleisch', 'crafting', 'Y', 0, 0, NULL),
(52, 'Käse', 'crafting', 'Y', 0, 0, NULL),
(53, 'Apfel', 'crafting', 'Y', 0, 0, NULL),
(54, 'unreiner Tabak', 'crafting', 'Y', 0, 0, NULL),
(55, 'Hülsen', 'crafting', 'Y', 0, 0, NULL),
(56, 'Kondome XS', 'item', 'Y', 0, 0, NULL),
(57, 'Kondome S', 'item', 'Y', 0, 0, NULL),
(58, 'Kondome M', 'item', 'Y', 0, 0, NULL),
(59, 'Kondome L', 'item', 'Y', 0, 0, NULL),
(60, 'Buds', 'item', 'Y', 0, 1, NULL),
(61, 'Joint', 'joint', 'Y', 5, 1, NULL),
(62, 'WeedBaggy', 'item', 'Y', 0, 1, NULL),
(63, 'Tasche-ausgepackt', 'bag', 'Y', 0, 0, NULL),
(66, 'Goldmünze von Joseph', 'unique', 'N', 0, 0, NULL),
(67, 'Bepanthen', 'medic', 'Y', 15, 0.1, NULL),
(68, 'Betaisodona', 'medic', 'Y', 0, 0.1, NULL),
(69, 'Blutinfusion', 'medic', 'Y', 0, 0.25, NULL),
(70, 'Diclofenac', 'medic', 'Y', 20, 0.2, NULL),
(71, 'Flammazine', 'medic', 'Y', 20, 0.2, NULL),
(72, 'Ibuprofen', 'medic', 'Y', 30, 0.1, NULL),
(73, 'Imodium Akut', 'medic', 'Y', 15, 0.1, NULL),
(74, 'Nitro Spray', 'medic', 'Y', 0, 0.2, NULL),
(75, 'Novalgin', 'medic', 'Y', 30, 0.1, NULL),
(76, 'Pantoprazol', 'medic', 'Y', 0, 0.1, NULL),
(77, 'Ringerlösung', 'medic', 'Y', 0, 0.25, NULL),
(78, 'Antibiotika', 'medic', 'Y', 30, 0.1, NULL),
(79, 'Fentanyl', 'medic', 'Y', 0, 0.1, NULL),
(80, 'Propofol', 'medic', 'Y', 0, 0.1, NULL),
(81, 'Antidepressiva', 'medic', 'Y', 0, 0.1, NULL),
(82, 'Diazepam', 'medic', 'Y', 0, 0.1, NULL),
(83, 'Kampfpistole', 'weapon', 'Y', 0, 1.5, '0x5EF9FEC4'),
(84, 'Kampfpistole-ausgerüstet', 'weapon', 'Y', 0, 1.5, ''),
(85, '9mm-Magazin', 'weapon', 'Y', 0, 1, NULL),
(89, 'Schlagring', 'weapon', 'Y', 0, 1, NULL),
(90, 'Schlagring-ausgerüstet', 'weapon', 'Y', 0, 1, NULL),
(91, 'Baseballschläger', 'weapon', 'Y', 0, 1, NULL),
(92, 'Baseballschläger-ausgerüstet', 'weapon', 'Y', 0, 1, NULL),
(93, 'Tabak', 'crafting', 'Y', 0, 1, NULL),
(94, 'Mettbroetchen', 'food', 'Y', 20, 0.75, NULL),
(95, 'Gießkanne', 'unique', 'N', 0, 0.25, NULL),
(96, 'Roh-Zigaretten', 'crafting', 'Y', 0, 0.5, NULL),
(97, 'Klappmesser', 'weapon', 'Y', 0, 0.3, NULL),
(98, 'Klappmesser-ausgerüstet', 'weapon', 'Y', 0, 0.3, NULL),
(99, 'Bund Trauben', 'crafting', 'Y', 0, 1, NULL),
(100, 'Trauben Saft', 'crafting', 'Y', 0, 0.5, NULL),
(101, 'Taser', 'weapon', 'Y', 0, 0.3, NULL),
(102, 'Taser-ausgerüstet', 'weapon', 'Y', 0, 0.3, NULL),
(103, 'Weste', 'armor', 'Y', 0, 0.0001, NULL),
(104, 'Weste ausgerüstet', 'armor', 'Y', 0, 0.0001, NULL),
(105, 'MK2 Pistole', 'weapon', 'Y', 0, 0.5, NULL),
(106, 'MK2 Pistole-ausgerüstet', 'weapon', 'Y', 0, 0.5, NULL),
(107, 'SMG', 'weapon', 'Y', 0, 2, NULL),
(108, 'SMG-ausgerüstet', 'weapon', 'Y', 0, 2, NULL),
(109, 'Pump Shotgun', 'weapon', 'Y', 0, 2, NULL),
(110, 'Pump Shotgun-ausgerüstet', 'weapon', 'Y', 0, 2, NULL),
(111, 'Karabiner', 'weapon', 'Y', 0, 2, NULL),
(112, 'Karabiner-ausgerüstet', 'weapon', 'Y', 0, 2, NULL),
(113, 'Spezial Karabiner', 'weapon', 'Y', 0, 2, NULL),
(114, 'Spezial Karabiner-ausgerüstet', 'weapon', 'Y', 0, 2, NULL),
(115, 'Schlagstock', 'weapon', 'Y', 0, 0.0001, NULL),
(116, 'Schlagstock ausgerüstet', 'weapon', 'Y', 0, 0.0001, NULL),
(117, 'Taschenlampe', 'weapon', 'Y', 0, 0.0001, NULL),
(118, 'Taschenlampe ausgerüstet', 'weapon', 'Y', 0, 0.0001, NULL),
(119, 'MK2 Magazin', 'weapon', 'Y', 0, 0.0001, NULL),
(120, 'SMG Magazin', 'weapon', 'Y', 0, 0.0001, NULL),
(121, 'PumpShotgun Magazin', 'weapon', 'Y', 0, 0.0001, NULL),
(122, 'Karabiner Magazin', 'weapon', 'Y', 0, 0.0001, NULL),
(123, 'Spezial Karabiner Magazin', 'weapon', 'Y', 0, 0.0001, NULL),
(124, 'Gemüse Burger', 'food', 'Y', 50, 1, NULL),
(125, 'MK2 Pistole-ausgerüstet', 'unique', 'Y', 0, 0.5, NULL),
(126, 'MK2 Magazin', 'unique', 'Y', 0, 0.1, NULL),
(127, 'Wodka (Shot)', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(128, 'Jägermeister (Shot)', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(129, 'Tequila (Shot)', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(130, 'Kamikaze', 'alcoholdrink', 'Y', 15, 0.5, NULL),
(131, 'Feuerfänger', 'alcoholdrink', 'Y', 15, 0.5, NULL),
(132, 'Tollwut', 'alcoholdrink', 'Y', 15, 0.5, NULL),
(133, 'Milch', 'drink', 'Y', 35, 0.3, NULL),
(134, 'Root Beer', 'drink', 'Y', 15, 0.3, NULL),
(135, 'Met', 'alcoholdrink', 'Y', 10, 0.3, NULL),
(136, 'Bourbon Whiskey', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(137, 'Single Mait Whiskey', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(138, 'Vodka (Shot)', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(139, 'Cuba Libre', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(140, 'Big Tarantino Burger', 'food', 'Y', 50, 0.7, NULL),
(141, 'Titty Twister', 'food', 'Y', 50, 0.7, NULL),
(142, 'Pandemonium Steak Sandwich', 'food', 'Y', 40, 0.7, NULL),
(143, 'Pommes', 'food', 'Y', 15, 0.3, NULL),
(144, 'Krautsalat', 'food', 'Y', 12, 0.2, NULL),
(145, 'Erdnüsse', 'food', 'Y', 5, 0.1, NULL),
(146, 'Chips', 'food', 'Y', 5, 0.1, NULL),
(147, 'Hotstrip (Shot)', 'alcoholdrink', 'Y', 5, 0.3, NULL),
(148, 'Golden Bay', 'alcoholdrink', 'Y', 15, 0.3, NULL),
(149, 'Unicorn', 'alcoholdrink', 'Y', 15, 0.3, NULL),
(150, 'Vanilla (AlkFrei)', 'drink', 'Y', 15, 0.3, NULL),
(151, 'Nachos', 'food', 'Y', 10, 0.3, NULL),
(152, 'Kirschpudding', 'food', 'Y', 8, 0.2, NULL),
(153, 'Salzstangen', 'food', 'Y', 5, 0.2, NULL),
(155, 'Glasflasche', 'weapon', 'Y', 0, 0.5, NULL),
(156, 'Glasflasche (Ausgerüstet)', 'weapon', 'Y', 0, 0.5, NULL),
(157, 'Hammer', 'weapon', 'Y', 0, 1.5, NULL),
(158, 'Hammer (Ausgerüstet)', 'weapon', 'Y', 0, 1.5, NULL),
(159, 'Messer', 'weapon', 'Y', 0, 0.3, NULL),
(160, 'Messer (Ausgerüstet)', 'weapon', 'Y', 0, 0.3, NULL),
(161, 'Pistole', 'weapon', 'Y', 0, 2.5, NULL),
(162, 'Pistole (Ausgerüstet)', 'weapon', 'Y', 0, 2.5, NULL),
(163, 'Pistole Magazin', 'weapon', 'Y', 0, 0.5, NULL),
(164, 'Combat Pistole', 'weapon', 'Y', 0, 3, NULL),
(165, 'Combat Pistole (Ausgerüstet)', 'weapon', 'Y', 0, 3, NULL),
(166, 'Combat Magazin', 'weapon', 'Y', 0, 0.5, NULL),
(167, 'Pistole .50', 'weapon', 'Y', 0, 3, NULL),
(168, 'Pistole .50 (Ausgerüstet)', 'weapon', 'Y', 0, 3, NULL),
(169, 'Pistole .50 Magazin', 'weapon', 'Y', 0, 0.5, NULL),
(170, 'Schwere Pistole', 'weapon', 'Y', 0, 3, NULL),
(171, 'Schwere Pistole (Ausgerüstet)', 'weapon', 'Y', 0, 3, NULL),
(172, 'Schwere Pistole Magazin', 'weapon', 'Y', 0, 0.5, NULL),
(173, 'Brechstange', 'weapon', 'Y', 0, 1.5, NULL),
(174, 'Brechstange (Ausgerüstet)', 'weapon', 'Y', 0, 1.5, NULL),
(175, 'Machete', 'weapon', 'Y', 0, 1.5, NULL),
(176, 'Machete (Ausgerüstet)', 'weapon', 'Y', 0, 1.5, NULL),
(177, 'Rohrzange', 'weapon', 'Y', 0, 1.5, NULL),
(178, 'Rohrzange (Ausgerüstet)', 'weapon', 'Y', 0, 1.5, NULL),
(179, 'Magic Mushrooms', 'item', 'Y', 0, 0.2, NULL),
(180, 'Magic Mushrooms (Getrockent)', 'mushroom', 'Y', 0, 0.2, NULL),
(181, 'Handy', 'handy', 'N', 0, 0, NULL),
(182, 'Ale', 'alcoholdrink', 'Y', 10, 0.2, NULL),
(183, 'Stout', 'alcoholdrink', 'Y', 10, 0.2, NULL),
(184, '31er mit Milch', 'alcoholdrink', 'Y', 15, 0.3, NULL),
(185, 'Irish Coffee', 'alcoholdrink', 'Y', 17, 0.2, NULL),
(186, 'Haggis', 'food', 'Y', 35, 0.5, NULL),
(187, 'Irish Stew', 'food', 'Y', 40, 0.5, NULL),
(188, 'Lamb & Beans', 'food', 'Y', 45, 0.7, NULL),
(189, 'Bread & Butter Pudding', 'food', 'Y', 8, 0.3, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `jobusers`
--

CREATE TABLE `jobusers` (
  `id` int(11) NOT NULL,
  `charID` int(11) DEFAULT NULL,
  `jobid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `playername` varchar(50) DEFAULT NULL,
  `log` varchar(255) DEFAULT NULL,
  `socialclub` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `datum` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `logs`
--

INSERT INTO `logs` (`id`, `playername`, `log`, `socialclub`, `ip`, `datum`) VALUES
(1, 'Anna Klein', 'Anna Klein hat FIB für 0$ mit Kennzeichen MIB-626 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-13 18:17:24'),
(2, 'Anna Klein', 'Anna Klein hat 5x Wasser gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-13 22:20:03'),
(3, 'Anna Klein', 'Anna Klein hat FIB für 0$ mit Kennzeichen MIB-649 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 13:39:31'),
(4, 'Anna Klein', 'Anna Klein hat FIB für 0$ mit Kennzeichen NOOSE-24 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 14:11:04'),
(5, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-53 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 14:11:15'),
(6, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-47 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 14:12:53'),
(7, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-42 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 14:13:32'),
(8, 'Anna Klein', 'Anna Klein hat FIB SUV für 0$ mit Kennzeichen NOOSE-57 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 14:14:19'),
(9, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-12 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 14:15:48'),
(10, 'Anna Klein', 'Anna Klein hat Blista Compact für 6920$ mit Kennzeichen LS83791 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-14 16:43:11'),
(11, 'Anna Klein', 'Anna Klein hat 1x Sandwich gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-15 17:11:03'),
(12, 'Anna Klein', 'Anna Klein hat einen Dispatch an FuelLSPD gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-17 19:37:12'),
(13, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-41 gekauft!', 'HappyAngle2018', '109.91.35.50', '2019-06-17 22:50:55'),
(14, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-77 gekauft!', 'HappyAngle2018', '109.91.35.50', '2019-06-17 22:51:05'),
(15, 'Jens Prada', 'Jens Prada hat 2x Banane gekauft', 'RealCryPixel', '79.227.51.179', '2019-06-17 23:14:32'),
(16, 'Joshua Gerge', 'Joshua Gerge hat 500$ ausgezahlt.', 'CommanderDonkey2', '87.164.168.182', '2019-06-17 23:14:50'),
(17, 'Joshua Gerge', 'Joshua Gerge hat 4x Wasser gekauft', 'CommanderDonkey2', '87.164.168.182', '2019-06-17 23:15:02'),
(18, 'Joshua Gerge', 'Joshua Gerge hat 1x Taser gekauft', 'CommanderDonkey2', '87.164.168.182', '2019-06-17 23:19:34'),
(19, 'Joshua Gerge', 'Joshua Gerge hat 1x Schlagstock gekauft', 'CommanderDonkey2', '87.164.168.182', '2019-06-17 23:19:49'),
(20, 'Joshua Gerge', 'Joshua Gerge hat Streifenwagen für 0$ mit Kennzeichen LSPD-941 gekauft!', 'CommanderDonkey2', '87.164.168.182', '2019-06-17 23:20:32'),
(21, 'Joshua Gerge', 'Joshua Gerge hat einen Dispatch an lspd gesendet.', 'CommanderDonkey2', '87.164.168.182', '2019-06-17 23:25:18'),
(22, 'Anna Klein', 'Anna Klein hat 3x Wasser gekauft', 'HappyAngle2018', '109.91.35.50', '2019-06-18 00:24:55'),
(23, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-92 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:51:28'),
(24, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen LSPD-425 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:52:18'),
(25, 'Anna Klein', 'Anna Klein hat FIB für 0$ mit Kennzeichen LSPD-693 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:53:34'),
(26, 'Anna Klein', 'Anna Klein hat Streifenwagen für 0$ mit Kennzeichen LSPD-751 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:54:29'),
(27, 'Anna Klein', 'Anna Klein hat Streifenwagen für 0$ mit Kennzeichen LSPD-961 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:55:17'),
(28, 'Anna Klein', 'Anna Klein hat Streifenwagen für 0$ mit Kennzeichen LSPD-644 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:56:08'),
(29, 'Anna Klein', 'Anna Klein hat Zivil-Streifenwagen für 0$ mit Kennzeichen LSPD-786 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:56:45'),
(30, 'Anna Klein', 'Anna Klein hat Polizei-Motorrad für 0$ mit Kennzeichen LSPD-56 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:57:15'),
(31, 'Anna Klein', 'Anna Klein hat Polizei-Transporter für 0$ mit Kennzeichen LSPD-130 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:57:47'),
(32, 'Anna Klein', 'Anna Klein hat Polizei-Riot für 0$ mit Kennzeichen LSPD-215 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:58:35'),
(33, 'Anna Klein', 'Anna Klein hat Polizei-Riot2 für 0$ mit Kennzeichen LSPD-847 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-18 19:59:21'),
(34, 'Anna Klein', 'Anna Klein hat Streifenwagen für 0$ mit Kennzeichen LSPD-253 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-20 08:53:10'),
(35, 'Anna Klein', 'Anna Klein hat Streifenwagen für 0$ mit Kennzeichen LSPD-712 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-20 08:54:50'),
(36, 'Anna Klein', 'Anna Klein hat Porsche 718 für 0$ mit Kennzeichen LSPD-148 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-20 08:59:09'),
(37, 'Anna Klein', 'Anna Klein hat Porsche 718 für 0$ mit Kennzeichen LSPD-796 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-20 09:12:49'),
(38, 'Anna Klein', 'Anna Klein hat 1x Taser gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-20 09:28:52'),
(39, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-56 gekauft!', 'HappyAngle2018', '109.91.35.50', '2019-06-20 22:34:48'),
(40, 'Anna Klein', 'Anna Klein hat undefiniert für 0$ mit Kennzeichen NOOSE-4 gekauft!', 'HappyAngle2018', '109.91.35.50', '2019-06-20 22:35:22'),
(41, 'Anna Klein', 'Anna Klein hat Porsche 718 Police für 0$ mit Kennzeichen LSPD-798 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-21 10:02:48'),
(42, 'Anna Klein', 'Anna Klein hat 3x Sprunk gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-23 15:30:09'),
(43, 'Anna Klein', 'Anna Klein hat 3x GemüseBurger gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-23 15:30:30'),
(44, 'Anna Klein', 'Anna Klein hat Porsche 718 Police für 0$ mit Kennzeichen LSPD-13 gekauft!', 'HappyAngle2018', '127.0.0.1', '2019-06-23 20:29:13'),
(45, 'Anna Klein', 'Anna Klein hat 1x Sprunk gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-23 21:30:07'),
(46, 'Anna Klein', 'Anna Klein hat 5x Sprunk gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-23 21:31:29'),
(47, 'Anna Klein', 'Anna Klein hat 5x Kaffee gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-23 21:31:38'),
(48, 'Anna Klein', 'Anna Klein hat 3x GemüseBurger gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-24 15:37:44'),
(49, 'Anna Klein', 'Anna Klein hat 3x Kaffee gekauft', 'HappyAngle2018', '127.0.0.1', '2019-06-24 19:42:32'),
(50, 'Anna Klein', 'Anna Klein hat einen Dispatch an lspd gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:11:00'),
(51, 'Anna Klein', 'Anna Klein hat einen Dispatch an lspd gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:16:08'),
(52, 'Anna Klein', 'Anna Klein hat einen Dispatch an lsmc gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:17:38'),
(53, 'Anna Klein', 'Anna Klein hat einen Dispatch an lspd gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:17:39'),
(54, 'Anna Klein', 'Anna Klein hat einen Dispatch an acls gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:17:40'),
(55, 'Anna Klein', 'Anna Klein hat einen Dispatch an lsmc gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:40:18'),
(56, 'Anna Klein', 'Anna Klein hat einen Dispatch an lspd gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:40:18'),
(57, 'Anna Klein', 'Anna Klein hat einen Dispatch an acls gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 09:40:19'),
(58, 'Anna Klein', 'Anna Klein hat einen Dispatch an lsmc gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 18:05:38'),
(59, 'Anna Klein', 'Anna Klein hat einen Dispatch an lspd gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 18:05:39'),
(60, 'Anna Klein', 'Anna Klein hat einen Dispatch an acls gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 18:05:40'),
(61, 'Anna Klein', 'Anna Klein hat einen Dispatch an acls gesendet.', 'HappyAngle2018', '127.0.0.1', '2019-06-25 18:05:47'),
(62, 'Anna Klein', 'Anna Klein hat 200000$ ausgezahlt.', 'HappyAngle2018', '109.91.35.50', '2019-06-26 08:24:17'),
(63, 'Anna Klein', 'Anna Klein hat Daniel Elskamp 200000$ gegeben.', 'HappyAngle2018', '109.91.35.50', '2019-06-26 08:24:41'),
(64, 'Joshua Gerge', 'Joshua Gerge hat 3x Traubensaft für 16.799999999999997$ verkauft', 'CommanderDonkey2', '87.164.170.149', '2019-07-31 00:00:12'),
(65, 'Max Mustermann', 'Max Mustermann hat 3x Traubensaft für 16.799999999999997$ verkauft', 'ShellyYT', '79.220.113.70', '2019-07-31 00:00:13'),
(66, 'Joshua Gerge', 'Joshua Gerge hat 4x Wasser gekauft', 'CommanderDonkey2', '87.164.170.149', '2019-07-31 00:02:57'),
(67, 'Joshua Gerge', 'Joshua Gerge hat 3x Sandwich gekauft', 'CommanderDonkey2', '87.164.170.149', '2019-07-31 00:03:02'),
(68, 'Max Mustermann', 'Max Mustermann hat 4x Wasser gekauft', 'ShellyYT', '79.220.113.70', '2019-07-31 00:05:24'),
(69, 'Max Mustermann', 'Max Mustermann hat 1x Hotdog gekauft', 'Sniiper-GaMer', '2.207.27.219', '2019-08-06 17:04:44'),
(70, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:10:03'),
(71, 'Max Mustermann', 'Max Mustermann hat einen Dispatch an lsmc gesendet.', 'Sniiper-GaMer', '2.207.27.219', '2019-08-06 17:11:27'),
(72, 'Max Mustermann', 'Max Mustermann hat einen Dispatch an acls gesendet.', 'Sniiper-GaMer', '2.207.27.219', '2019-08-06 17:11:34'),
(73, 'Max Mustermann', 'Max Mustermann hat einen Dispatch an lspd gesendet.', 'Sniiper-GaMer', '2.207.27.219', '2019-08-06 17:11:35'),
(74, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:11:55'),
(75, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:12:52'),
(76, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:12:54'),
(77, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:12:58'),
(78, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:00'),
(79, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:15'),
(80, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:16'),
(81, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:23'),
(82, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:28'),
(83, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:30'),
(84, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:36'),
(85, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:37'),
(86, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:39'),
(87, 'Max Mustermann3', 'Max Mustermann3 hat einen Dispatch an lspd gesendet.', 'ShellyYT', '79.220.113.70', '2019-08-06 17:13:42'),
(88, 'Joshua Gerke', 'Joshua Gerke hat 5x Wasser gekauft', 'CommanderDonkey2', '91.48.32.36', '2019-08-10 22:58:31'),
(89, 'Joshua Gerke', 'Joshua Gerke hat 5x Sandwich gekauft', 'CommanderDonkey2', '91.48.32.36', '2019-08-10 22:58:36'),
(90, 'Jens Prada', 'Jens Prada hat 1x Banane gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-19 18:59:01'),
(91, 'Joshua Gerke', 'Joshua Gerke hat 10x Sandwich gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-19 18:59:07'),
(92, 'Jens Prada', 'Jens Prada hat 1x Hotdog gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-19 18:59:09'),
(93, 'Joshua Gerke', 'Joshua Gerke hat 6x Traubensaft für 33.599999999999994$ verkauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-19 20:05:36'),
(94, 'Jens Prada', 'Jens Prada hat 8x Traubensaft für 44.8$ verkauft', 'RealCryPixel', '93.198.197.166', '2019-11-19 20:05:38'),
(95, 'Joshua Gerke', 'Joshua Gerke hat Zombie Chopper für 27030$ mit Kennzeichen LS961574 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-19 20:30:25'),
(96, 'Jens Prada', 'Jens Prada hat 1x Wasser gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-19 20:32:13'),
(97, 'Joshua Gerke', 'Joshua Gerke hat bifta für 12630$ mit Kennzeichen LS392518 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-19 20:36:13'),
(98, 'Joshua Gerke', 'Joshua Gerke hat undefiniert für 6920$ mit Kennzeichen LS938354 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-19 20:38:47'),
(99, 'Joshua Gerke', 'Joshua Gerke hat undefiniert für 6920$ mit Kennzeichen LS642164 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-19 20:41:23'),
(100, 'Joshua Gerke', 'Joshua Gerke hat 5x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 13:55:34'),
(101, 'Joshua Gerke', 'Joshua Gerke hat 1x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 16:30:34'),
(102, 'Joshua Gerke', 'Joshua Gerke hat 1x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 16:35:44'),
(103, 'Joshua Gerke', 'Joshua Gerke hat 1x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 17:12:34'),
(104, 'Joshua Gerke', 'Joshua Gerke hat 1x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 17:12:39'),
(105, 'Joshua Gerke', 'Joshua Gerke hat 1x Weißwein gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 17:12:54'),
(106, 'Jens Prada', 'Jens Prada hat 12x Whiskeyshot gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-20 20:22:45'),
(107, 'Joshua Gerke', 'Joshua Gerke hat 2x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 20:22:46'),
(108, 'Jens Prada', 'Jens Prada hat 2x Wasser gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-20 21:31:12'),
(109, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 22:52:04'),
(110, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 22:53:31'),
(111, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 22:56:20'),
(112, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 23:02:34'),
(113, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 23:03:07'),
(114, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 23:05:18'),
(115, 'Joshua Gerke', 'Joshua Gerke hat 2x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 23:09:44'),
(116, 'Joshua Gerke', 'Joshua Gerke hat 1x Sandwich gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 23:15:41'),
(117, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-20 23:17:29'),
(118, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-21 21:08:58'),
(119, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-21 21:18:30'),
(120, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-21 21:19:57'),
(121, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-21 21:23:16'),
(122, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-21 21:25:18'),
(123, 'Jens Prada', 'Jens Prada hat undefiniert für 55850$ mit Kennzeichen LS964036 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-21 21:50:21'),
(124, 'Joshua Gerke', 'Joshua Gerke hat undefiniert für 6920$ mit Kennzeichen LS136281 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-21 22:00:31'),
(125, 'Joshua Gerke', 'Joshua Gerke hat 5x Sandwich gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-21 22:20:02'),
(126, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '87.164.175.110', '2019-11-22 14:11:45'),
(127, 'Daniel Elskamp', 'Daniel Elskamp hat 10x Wasser gekauft', 'umut32a', '127.0.0.1', '2019-11-22 14:12:00'),
(128, 'Jens Prada', 'Jens Prada hat Surge für 16500$ mit Kennzeichen LS406381 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-23 13:31:31'),
(129, 'Jens Prada', 'Jens Prada hat einen Dispatch an FuelLSPD gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 13:33:09'),
(130, 'Jens Prada', 'Jens Prada hat 3x Wasser gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-23 13:59:09'),
(131, 'Jens Prada', 'Jens Prada hat 5x Hotdog gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-23 14:00:06'),
(132, 'Jens Prada', 'Jens Prada hat 3x Apfel gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-23 14:38:03'),
(133, 'Joshua Gerke', 'Joshua Gerke hat 4x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-23 18:05:06'),
(134, 'Joshua Gerke', 'Joshua Gerke hat 1x Schokoriegel gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-23 19:00:32'),
(135, 'Jens Prada', 'Jens Prada hat einen Dispatch an lspd gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:55'),
(136, 'Jens Prada', 'Jens Prada hat einen Dispatch an lspd gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:55'),
(137, 'Jens Prada', 'Jens Prada hat einen Dispatch an lspd gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:56'),
(138, 'Jens Prada', 'Jens Prada hat einen Dispatch an lspd gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:56'),
(139, 'Jens Prada', 'Jens Prada hat einen Dispatch an lspd gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:56'),
(140, 'Jens Prada', 'Jens Prada hat einen Dispatch an lsmc gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:56'),
(141, 'Jens Prada', 'Jens Prada hat einen Dispatch an lsmc gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:57'),
(142, 'Jens Prada', 'Jens Prada hat einen Dispatch an acls gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:57'),
(143, 'Jens Prada', 'Jens Prada hat einen Dispatch an acls gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:58'),
(144, 'Jens Prada', 'Jens Prada hat einen Dispatch an acls gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-23 19:15:58'),
(145, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-23 20:55:22'),
(146, 'Joshua Gerke', 'Joshua Gerke hat 5x Sandwich gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-24 19:14:29'),
(147, 'Jens Prada', 'Jens Prada hat FIB für 0$ mit Kennzeichen NOOSE-30 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-24 19:53:25'),
(148, 'Jens Prada', 'Jens Prada hat undefiniert für 0$ mit Kennzeichen NOOSE-25 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-24 19:55:54'),
(149, 'Jens Prada', 'Jens Prada hat undefiniert für 0$ mit Kennzeichen NOOSE-46 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-24 19:56:03'),
(150, 'Jens Prada', 'Jens Prada hat FIB für 0$ mit Kennzeichen NOOSE-78 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-24 19:56:08'),
(151, 'Joshua Gerke', 'Joshua Gerke hat 20x Zigarette gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 14:50:52'),
(152, 'Joshua Gerke', 'Joshua Gerke hat 20x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 14:50:58'),
(153, 'Joshua Gerke', 'Joshua Gerke hat 50x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 14:51:05'),
(154, 'Joshua Gerke', 'Joshua Gerke hat 1x Whiskeyshot gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 14:51:24'),
(155, 'Joshua Gerke', 'Joshua Gerke hat undefiniert für 4630$ mit Kennzeichen LS507362 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 15:07:47'),
(156, 'Joshua Gerke', 'Joshua Gerke hat 5x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:04:12'),
(157, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an FuelLSPD gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 20:08:09'),
(158, 'Joshua Gerke', 'Joshua Gerke hat 3x Traubensaft für 16.799999999999997$ verkauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 21:45:34'),
(159, 'Joshua Gerke', 'Joshua Gerke hat 9x Zigaretten für 51.48$ verkauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-25 21:46:15'),
(160, 'Joshua Gerke', 'Joshua Gerke hat 2x Sandwich gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:16:24'),
(161, 'Joshua Gerke', 'Joshua Gerke hat Jens Prada ItemID: 79 weitergegeben', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:30:56'),
(162, 'Jens Prada', 'Jens Prada hat 1x Joints für 4.35$ verkauft', 'RealCryPixel', '93.198.197.166', '2019-11-26 18:37:44'),
(163, 'Joshua Gerke', 'Joshua Gerke hat 2x Joints für 8.7$ verkauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 18:37:45'),
(164, 'Joshua Gerke', 'Joshua Gerke hatJens PradaItemID:74 weitergegeben', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:21:40'),
(165, 'Joshua Gerke', 'Joshua Gerke hat 3x Magic Mushrooms für 10.350000000000001$ verkauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:30:12'),
(166, 'Jens Prada', 'Jens Prada hat 1x Magic Mushrooms für 3.45$ verkauft', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:30:12'),
(167, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:32:05'),
(168, 'Joshua Gerke', 'Joshua Gerke hat 20x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:40:38'),
(169, 'Joshua Gerke', 'Joshua Gerke hat 9x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:41:34'),
(170, 'Joshua Gerke', 'Joshua Gerke hat undefiniert für 55850$ mit Kennzeichen LS750608 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:42:47'),
(171, 'Jens Prada', 'Jens Prada hat rostiger Rebel für 1299$ mit Kennzeichen LS544242 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:43:10'),
(172, 'Jens Prada', 'Jens Prada hat rostiger Rebel für 1299$ mit Kennzeichen LS444649 gekauft!', 'RealCryPixel', '93.198.197.166', '2019-11-26 19:44:18'),
(173, 'Joshua Gerke', 'Joshua Gerke hat rostiger Rebel für 1299$ mit Kennzeichen LS68553 gekauft!', 'CommanderDonkey2', '127.0.0.1', '2019-11-26 19:44:58'),
(174, 'Daniel Elskamp', 'Daniel Elskamp hat Joshua Gerke ItemID: 60 weitergegeben', 'umut32a', '127.0.0.1', '2019-11-27 02:19:37'),
(175, 'Joshua Gerke', 'Joshua Gerke hat Daniel Elskamp 31$ gegeben.', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:19:51'),
(176, 'Joshua Gerke', 'Joshua Gerke hat Daniel Elskamp 31$ gegeben.', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:19:53'),
(177, 'Joshua Gerke', 'Joshua Gerke hat Daniel Elskamp 31$ gegeben.', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:19:54'),
(178, 'Joshua Gerke', 'Joshua Gerke hat Daniel Elskamp 31$ gegeben.', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:19:55'),
(179, 'Joshua Gerke', 'Joshua Gerke hat Daniel Elskamp 31$ gegeben.', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:19:56'),
(180, 'Daniel Elskamp', 'Daniel Elskamp hat 3x Sandwich gekauft', 'umut32a', '127.0.0.1', '2019-11-27 02:29:18'),
(181, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:31:03'),
(182, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:33:32'),
(183, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:34:18'),
(184, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:35:11'),
(185, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:35:14'),
(186, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:35:14'),
(187, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:35:14'),
(188, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:35:51'),
(189, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:36:07'),
(190, 'Joshua Gerke', 'Joshua Gerke hat Polizei-Riot2 für 0$ mit Kennzeichen LSPD-473 gekauft!', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:36:32'),
(191, 'Joshua Gerke', 'Joshua Gerke hat Porsche 718 Police für 0$ mit Kennzeichen LSPD-599 gekauft!', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:36:42'),
(192, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:08'),
(193, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:16'),
(194, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:18'),
(195, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:19'),
(196, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:20'),
(197, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:20'),
(198, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:20'),
(199, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:20'),
(200, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:20'),
(201, 'Daniel Elskamp', 'Daniel Elskamp hat einen Dispatch an lspd gesendet.', 'umut32a', '127.0.0.1', '2019-11-27 02:37:20'),
(202, 'Daniel Elskamp', 'Daniel Elskamp hat Bodhi für 9630$ mit Kennzeichen LS763138 gekauft!', 'umut32a', '127.0.0.1', '2019-11-27 02:39:53'),
(203, 'Joshua Gerke', 'Joshua Gerke hat 1x Taser gekauft', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:41:54'),
(204, 'Joshua Gerke', 'Joshua Gerke hat 1x Schutzweste gekauft', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:41:57'),
(205, 'Daniel Elskamp', 'Daniel Elskamp hat rostiger Emperor für 999$ mit Kennzeichen LS38860 gekauft!', 'umut32a', '127.0.0.1', '2019-11-27 02:42:09'),
(206, 'Joshua Gerke', 'Joshua Gerke hat 10x PumpShotgunMagazin gekauft', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:42:13'),
(207, 'Joshua Gerke', 'Joshua Gerke hat 1x PumpShotgun gekauft', 'CommanderDonkey2', '87.164.167.235', '2019-11-27 02:42:32'),
(208, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:14'),
(209, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:51'),
(210, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:52'),
(211, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:52'),
(212, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:52'),
(213, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:53'),
(214, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:53'),
(215, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:53'),
(216, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:54'),
(217, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:54'),
(218, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 21:59:55'),
(219, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:02:47'),
(220, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:02:54'),
(221, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:02:54'),
(222, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:14:50'),
(223, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:14:52'),
(224, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:17:41'),
(225, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:18:32'),
(226, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:18:41'),
(227, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:19:39'),
(228, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:20:24'),
(229, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:20:40'),
(230, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-27 22:20:52'),
(231, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:21:24'),
(232, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:21:30'),
(233, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:24:54'),
(234, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:28:50'),
(235, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:31:14'),
(236, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:39:23'),
(237, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:41:59'),
(238, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:47:40'),
(239, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:48:20'),
(240, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:51:50'),
(241, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:52:16'),
(242, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:54:21'),
(243, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:56:09'),
(244, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:57:31'),
(245, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 22:58:24'),
(246, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 23:00:05'),
(247, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 23:05:00'),
(248, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-27 23:06:49'),
(249, 'Jens Prada', 'Jens Prada hat 20x Wasser gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:32:11'),
(250, 'Jens Prada', 'Jens Prada hat 1x Wasser gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:33:08'),
(251, 'Jens Prada', 'Jens Prada hat 10x Hamburger gekauft', 'RealCryPixel', '93.198.197.166', '2019-11-29 20:45:12'),
(252, 'Joshua Gerke', 'Joshua Gerke hat 1x Wasser gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:06:17'),
(253, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:06:21'),
(254, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:10:00'),
(255, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:10:11'),
(256, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:10:34'),
(257, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:11:10'),
(258, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:11:24'),
(259, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:12:25'),
(260, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:15:22'),
(261, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:17:10'),
(262, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:18:21'),
(263, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:19:09'),
(264, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:19:18'),
(265, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:19:53'),
(266, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:20:05'),
(267, 'Jens Prada', 'Jens Prada hat einen Dispatch an AtmRob gesendet.', 'RealCryPixel', '93.198.197.166', '2019-11-29 21:20:13'),
(268, 'Joshua Gerke', 'Joshua Gerke hat 3x Sandwich gekauft', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:27:07'),
(269, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:33:44'),
(270, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:38:29'),
(271, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:38:43'),
(272, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:38:54'),
(273, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:39:07'),
(274, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:39:22'),
(275, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:39:54'),
(276, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:43:01'),
(277, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:43:12'),
(278, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:43:24'),
(279, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:43:35'),
(280, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:43:48'),
(281, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:43:59'),
(282, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:44:10'),
(283, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:44:22'),
(284, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:44:42'),
(285, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:44:53'),
(286, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:45:05'),
(287, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:45:21'),
(288, 'Joshua Gerke', 'Joshua Gerke hat einen Dispatch an AtmRob gesendet.', 'CommanderDonkey2', '127.0.0.1', '2019-11-29 21:46:54'),
(289, 'Maddox Knight', 'Maddox Knight hat 3x Chesseburger gekauft', 'Amaazen', '88.130.60.7', '2019-12-02 17:39:42'),
(290, 'Maddox Knight', 'Maddox Knight hat 1x Tasche gekauft', 'Amaazen', '88.130.60.7', '2019-12-02 17:47:42'),
(291, 'Maddox Knight', 'Maddox Knight hat einen Dispatch an lsmc gesendet.', 'Amaazen', '88.130.60.164', '2019-12-02 23:48:01');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `marker`
--

CREATE TABLE `marker` (
  `id` int(11) NOT NULL,
  `dim1` int(11) NOT NULL DEFAULT 0,
  `dim2` int(11) NOT NULL DEFAULT 0,
  `krz` varchar(50) DEFAULT NULL,
  `pos1X` double DEFAULT NULL,
  `pos1Y` double DEFAULT NULL,
  `pos1Z` double DEFAULT NULL,
  `pos2X` double DEFAULT NULL,
  `pos2Y` double DEFAULT NULL,
  `pos2Z` double DEFAULT NULL,
  `ownerType` enum('World','Fraction','Business') DEFAULT NULL,
  `ownerName` varchar(50) DEFAULT NULL,
  `open` enum('Y','N') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `marker`
--

INSERT INTO `marker` (`id`, `dim1`, `dim2`, `krz`, `pos1X`, `pos1Y`, `pos1Z`, `pos2X`, `pos2Y`, `pos2Z`, `ownerType`, `ownerName`, `open`) VALUES
(5, 7, 0, 'kh_helipad', 279.577, -1349.485, 24.5377, 335.1269, -1432.176, 46.512, 'Fraction', 'LSMC', 'Y'),
(10, 0, 0, 'mine', -596.3221, 2089.48095, 131.5938, -595.652, 2087.0493, 131.4077, 'World', NULL, 'Y'),
(20, 0, 0, 'Trakt_Entry', 1730.46, 2603.96, -183.91, 1729.26, 2563.31, 45.56, 'World', NULL, 'Y'),
(21, 0, 0, 'Zellen_Entry', 1690.8, 2591.48, 45.92, 1781.24, 2604.35, -183.91, 'World', NULL, 'Y'),
(34, 0, 7, 'lsc_buero_entry', -347.24, -133.433, 39, -1145.77, -1999.42, 8.09, 'Business', 'Los Santos Customs', 'Y'),
(35, 0, 7, 'lsc_toilette_entry', -345.24, -123.08, 39, -1139.89, -2004.33, 8.18, 'Business', 'Los Santos Customs', 'Y'),
(36, 0, 7, 'bennys_buero_entry', -206.7, -1341.47, 34.89, -207.67, -1333.57, -188.91, 'Business', 'Bennys Werkstatt', 'Y'),
(37, 0, 7, 'bahamas', -1388.8623, -586.3444, 30.1979, -1387.7855, -588.205, 30.4533, 'Business', 'Bahama Mamas', 'Y'),
(38, 7, 7, 'bahamas_theke', -1389.1674, -592.0893, 30.3195, -1385.5402, -606.4552, 30.3195, 'Business', 'Bahama Mamas', 'N'),
(39, 0, 0, 'vanilla_theke', 132.768, -1293.692, 29.26, 133.6986, -1289.6281, 29.2695, 'Business', 'Vanilla Unicorn', 'N'),
(41, 0, 7, 'lsmeteor_entry', -121.0806, -1314.0103, 29.3006, -153.4671, -1312.786, -98.6109, 'Business', 'Los Santos Meteor', 'Y'),
(42, 0, 7, 'jackal_entry', 849.38, 2383.58, 54.16, 845.76, 2384.09, 46.09, 'Business', 'Jackal Events', 'Y'),
(43, 0, 7, 'blazing_entry', 321.84, 185.86, 103.59, 341.33, 184.6, -193.91, 'Business', 'Blazing Tattoos', 'Y'),
(44, 0, 7, 'legalcare_entry', -842.17, -25.12, 40.4, -855.3, 1.39, -85.44, 'Business', 'Legal & Care', 'Y'),
(45, 0, 7, 'kh_entry', 294.76, -1448.3793, 29.9666, 275.586, -1361.28, 24.5378, 'Fraction', 'LSMC', 'Y'),
(46, 0, 7, 'doj', 238.085, -412.515, 48.111, 276.078, -268.768, 53.939, 'Fraction', 'Deparment of Justice', 'Y');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `objects`
--

CREATE TABLE `objects` (
  `ID` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `z` float NOT NULL,
  `rotation` float NOT NULL,
  `alpha` float NOT NULL,
  `dimension` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `objects`
--

INSERT INTO `objects` (`ID`, `model`, `x`, `y`, `z`, `rotation`, `alpha`, `dimension`) VALUES
(1, 'p_int_jewel_plant_01', 367.98, 6593.28, 28.552, 183.366, 255, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ped`
--

CREATE TABLE `ped` (
  `id` int(11) NOT NULL,
  `hash` varchar(50) DEFAULT NULL,
  `posX` double DEFAULT 0,
  `posY` double DEFAULT 0,
  `posZ` double DEFAULT 0,
  `heading` double DEFAULT 0,
  `dimension` int(11) DEFAULT 0,
  `krz` varchar(50) DEFAULT '0',
  `hash_new` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `ped`
--

INSERT INTO `ped` (`id`, `hash`, `posX`, `posY`, `posZ`, `heading`, `dimension`, `krz`, `hash_new`) VALUES
(4, '0x69591CF7', 149.4024, -1042.132, 29.36799, 343.671, 0, 'fl1', '797459875'),
(5, '0x62018559', 100.63162231445312, -1073.299560546875, 29.374120712280273, 253.97833251953125, 0, 'Garage1', '1644266841'),
(6, '0x62018559', 213.68313598632812, -809.2505493164062, 31.014894485473633, 336.74627685546875, 0, 'Garage2', '1644266841'),
(7, '0x62018559', -73.3067398071289, -2004.0699462890625, 18.27528190612793, 174.4911651611328, 0, 'Garage3', '1644266841'),
(8, '0x62018559', -1053.8480224609375, -2648.699951171875, 13.830753326416016, 201.6044921875, 0, 'Garage4', '1644266841'),
(9, '0x62018559', -1662.01318359375, -950.6506958007812, 7.707923412322998, 73.28723907470703, 0, 'Garage5', '1644266841'),
(10, '0x62018559', -1158.921875, -740.2091674804688, 19.889921188354492, 42.75471878051758, 0, 'Garage6', '1644266841'),
(11, '0x62018559', -903.483154296875, -143.08981323242188, 41.88425064086914, 157.35946655273438, 0, 'Garage7', '1644266841'),
(12, '0x62018559', -190.6781768798828, 300.6519470214844, 96.9456787109375, 41.49456024169922, 0, 'Garage8', '1644266841'),
(13, '0x62018559', 362.15380859375, 298.6358642578125, 103.88387298583984, 160.0867156982422, 0, 'Garage9', '1644266841'),
(14, '0x62018559', 1036.2763671875, -763.3126220703125, 57.99301528930664, 146.32325744628906, 0, 'Garage10', '1644266841'),
(15, '0x62018559', 555.6434326171875, 2717.166748046875, 42.060211181640625, 323.0474548339844, 0, 'Garage11', '1644266841'),
(16, '0x62018559', 1871.8397216796875, 3757.273193359375, 32.995513916015625, 273.1797180175781, 0, 'Garage12', '1644266841'),
(17, '0x62018559', 91.58988952636719, 6361.13330078125, 31.2258358001709, 27.96231460571289, 0, 'Garage13', '1644266841'),
(18, '0xEDA0082D', 24.369543075561523, -1345.7410888671875, 29.497020721435547, 265.7750549316406, 0, 'shop1', '-308279251'),
(19, '0x247502A9', -47.032203674316406, -1758.3135986328125, 29.421018600463867, 45.377601623535156, 0, 'shop2', '611648169 '),
(20, '0x5DCA2528', -706.0999145507812, -914.6561279296875, 19.215587615966797, 85.62281036376953, 0, 'shop3', '1573528872'),
(21, '0xB3F3EE34', -332.39, 6084.27, -20, 229, 0, 'ammunation1', '-1275859404 '),
(22, '0xC2A87702', -1221.3643798828125, -907.9393920898438, 12.32634449005127, 26.306777954101562, 0, 'shop4', '-1029146878 '),
(23, '0x312B5BC0', 1164.88134765625, -323.65167236328125, 69.20515441894531, 87.83282470703125, 0, 'shop6', '824925120 '),
(24, '0x19F41F65', 1134.183837890625, -982.5642700195312, 46.415802001953125, 272.4559326171875, 0, 'shop5', '435429221 '),
(25, '0xB3F3EE34', 23.65, -1106.82, 26.79, 80.24406433105469, 0, 'shopammu', '-1275859404 '),
(26, '0x9F6D37E1', 372.96624755859375, 328.0411071777344, 103.56636810302734, 258.0195007324219, 0, 'shop8', '-1620232223'),
(28, '0xA56DE716', 2555.534912109375, 380.8191833496094, 108.62293243408203, 354.44854736328125, 0, 'shop7', '-1519524074 '),
(29, '0x60F4A717', 1166.569580078125, 2710.83837890625, 38.15771484375, 171.15061950683594, 0, 'shop9', '1626646295 '),
(30, '0x9F6D37E1', 549.310791015625, 2669.538818359375, 42.156490325927734, 91.4091567993164, 0, 'shop10', '-1620232223 '),
(31, '0x9F6D37E1', 1959.1634521484375, 3741.41162109375, 32.34373474121094, 291.4291076660156, 0, 'shop11', '-1620232223 '),
(32, '0x9F6D37E1', 1697.300048828125, 4923.4970703125, 42.063682556152344, 325.732421875, 0, 'shop12', '-1620232223 '),
(33, '0x9F6D37E1', 2676.635498046875, 3280.114501953125, 55.24112319946289, 320.04718017578125, 0, 'shop13', '-1620232223 '),
(34, '0x9F6D37E1', 1728.6185302734375, 6416.80908203125, 35.03722381591797, 238.51449584960938, 0, 'shop14', '-1620232223 '),
(35, '0x9F6D37E1', -1819.475341796875, 793.9652099609375, 138.0807342529297, 139.24461364746094, 0, 'shop15', '-1620232223 '),
(37, '0x247502A9', -2966.427001953125, 390.23370361328125, 15.043313980102539, 74.38968658447266, 0, 'liqour', '611648169 '),
(38, '0x26EF3426', -72.6474380493164, -1234.6861572265625, 29.099929809570312, 252.2985076904297, 0, 'weeddealer', '653210662 '),
(39, '0x62018559', 441.98, -1014.07, 28.63, 185, 0, 'PoliceGarage', '1644266841 '),
(40, '0x62018559', -510.236, -296.291, 35.37, 27, 0, 'MedicGarage', '1644266841 '),
(41, '0x62018559', 2524.66, -418.101, 94.123, 342, 0, 'MIBGarage', '1644266841 '),
(43, '0x62018559', 275.65, -344.89, 45.17, 67, 0, 'DOJGarage', '1644266841 '),
(44, '0x9AB35F63', 454.04, -980.07, 30.68, 91, 0, 'ammunationlspd', '1644266841'),
(45, '0xF161D212', 236.7, -414.446, -118.91, 6, 0, 'ammunationdoj', '1644266841'),
(46, '0xF161D212', -1390.3, -600.54, 27.25, 0, 0, 'shopbahama', '1644266841'),
(47, '0xF161D212', 1982.4, 3053.5, 44, 0, 0, 'shopyellow', '1644266841'),
(48, '0xF161D212', 130.1398, -1282.77, 26.26, 0, 0, 'shopvanilla', '1644266841'),
(49, '0x4BA14CCA', 1444.6049, 6333.1186, 23.8875, 90, 0, 'WeedBearb', NULL),
(50, '0xE7A963D9', -674.7623, -881.2561, 24.4856, 11.481, 0, 'WeedSell', NULL),
(51, '0x50F73C0C', 67.57, 3760.67, 39.73, 188.0122, 0, 'MushroomBearb', NULL),
(52, '0x14D506EE', -1100.25, 2722.24, 18.8, 54.3529, 0, 'MushroomSell', NULL),
(53, '0x62018559', -364.59, -103.69, 39.5, 159.19, 0, 'LSCGarage', NULL),
(54, '0x75C34ACA', 170.0738, -1799.4508, 29.3158, 319.9633, 0, 'vehKeys', NULL),
(59, '0x62018559', 465, -986, 43.69, 221, 0, 'LSPDHeli', '1644266841'),
(60, '0x62018559', -444.19, -302, 78, 112, 0, 'LSMCHeli', '1644266841'),
(61, '0x247502A9', 2105.7875, 2919.1176, -61.9019, 345.9776, 0, 'objWaterdispenser', '611648169'),
(62, '0x60F4A717', 2098.6445, 2921.2209, -61.9019, 339.428, 0, 'objSnacks', '1626646295'),
(63, '0x19F41F65', 2091.0053, 2923.0478, -61.9019, 344.6324, 0, 'objDrinks', '435429221'),
(64, '0x19F41F65', 2114.0917, 2918.4282, -61.9018, 0.5437, 0, 'objCoffee', '435429221'),
(65, '0x60F4A717', 2083.2873, 2925.4567, -61.9019, 346.6841, 0, 'objKippen', '1626646295'),
(66, '0x3CDCA742', 721.136, 1296.028, 360.29, 58, 0, 'manyduty', '1644266841'),
(67, '0x62018559', -9.54, -1102.401, 26.67, 70, 0, 'boomerangcars', '1644266841'),
(68, '0x62018559', -85.76, 37.53, 71.89, 330, 0, '0', NULL),
(69, '0x69591CF7', -2960.974, 481.613, 15.696, 86.399, 0, 'fl2', '797459875'),
(71, '0xEDA0082D', 218.38539123535156, -866.2979736328125, 30.492109298706055, 243.55160522460938, 0, 'stadtshop1', '-308279251');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `phone_contacts`
--

CREATE TABLE `phone_contacts` (
  `id` int(11) NOT NULL,
  `playerCharID` int(11) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `contactName` varchar(255) NOT NULL,
  `contactNotes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `phone_contacts`
--

INSERT INTO `phone_contacts` (`id`, `playerCharID`, `phoneNumber`, `contactName`, `contactNotes`) VALUES
(1, 1, '1234', 'test', ''),
(2, 1, '1324', 'test', ''),
(3, 1, '123458', 'teste', ''),
(4, 1, '', '', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `phone_short`
--

CREATE TABLE `phone_short` (
  `id` int(11) NOT NULL,
  `targetnumber` varchar(11) DEFAULT NULL,
  `shortnumber` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `phone_short`
--

INSERT INTO `phone_short` (`id`, `targetnumber`, `shortnumber`) VALUES
(1, '567888874', '911'),
(2, '552207', '912'),
(3, NULL, '913'),
(4, '695842', '920'),
(5, '722747', '921'),
(6, NULL, '914'),
(7, NULL, '930'),
(8, '1339', '999'),
(9, NULL, '940'),
(10, NULL, '941'),
(11, NULL, '950'),
(12, '933392', '951'),
(13, NULL, '922'),
(14, '429327', '931'),
(15, NULL, '952'),
(16, NULL, '932');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `pedId` int(11) DEFAULT 0,
  `shopName` varchar(50) DEFAULT '0',
  `fraktion` varchar(50) DEFAULT '0',
  `cashBalance` float DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `shop`
--

INSERT INTO `shop` (`id`, `pedId`, `shopName`, `fraktion`, `cashBalance`) VALUES
(1, 3, 'test', 'none', 0),
(2, 18, 'Supermarkt', 'none', 0),
(3, 19, 'Supermarkt', 'none', 0),
(4, 20, 'Supermarkt', 'none', 0),
(5, 21, 'Waffenladen', 'none', 0),
(6, 22, 'Robs Liquors', 'none', 0),
(7, 23, 'Supermarkt', 'none', 0),
(8, 24, 'Robs Liquors', 'none', 0),
(9, 25, 'Ammunation', 'Ammunation', 0),
(10, 26, 'Supermarkt', 'none', 0),
(12, 28, 'Supermarkt', 'none', 0),
(13, 29, 'Supermarkt', 'none', 0),
(14, 30, 'Supermarkt', 'none', 0),
(15, 31, 'Supermarkt', 'none', 0),
(16, 32, 'Supermarkt', 'none', 0),
(17, 33, 'Supermarkt', 'none', 0),
(18, 34, 'Supermarkt', 'none', 0),
(19, 35, 'Supermarkt', 'none', 0),
(21, 37, 'Robs Liquors', 'none', 0),
(22, 38, 'Weeddealer', 'none', 0),
(23, 44, 'LSPD Laden', 'LSPD', 0),
(24, 45, 'DOJ Laden', 'Department of Justice', 0),
(25, 46, 'Bahama Mamas', 'Bahama Mamas', 0),
(26, 47, 'Yellow Jack', 'Yellow Jack', 0),
(27, 48, 'Vanilla Unicorn', 'Vanilla Unicorn', 0),
(28, 61, 'Wasserspender', 'none', 0),
(29, 62, 'Snackautomat', 'none', 0),
(30, 63, 'Getränkeautomat', 'none', 0),
(31, 64, 'Kaffeeautomat', 'none', 0),
(32, 65, 'Kippenautomat', 'none', 0),
(71, 71, 'Rucksackladen', 'none', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `shop_items`
--

CREATE TABLE `shop_items` (
  `id` int(11) NOT NULL,
  `shopId` int(11) DEFAULT 0,
  `itemId` int(11) DEFAULT 0,
  `amout` decimal(38,2) DEFAULT 0.00,
  `itemName` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `shop_items`
--

INSERT INTO `shop_items` (`id`, `shopId`, `itemId`, `amout`, `itemName`) VALUES
(2, 1, 2, '1.00', 'Wasser'),
(4, 1, 4, '2.00', 'Sandwich'),
(5, 1, 5, '2.00', 'Hotdog'),
(6, 1, 6, '3.00', 'Hamburger'),
(7, 1, 7, '4.00', 'Cheeseburger'),
(8, 1, 8, '3.00', 'Orange'),
(9, 1, 9, '3.00', 'Apfel'),
(10, 1, 10, '3.00', 'Banane'),
(11, 1, 11, '4.00', 'Donut'),
(12, 1, 12, '5.00', 'Schokoriegel'),
(13, 1, 13, '3.33', 'Popcorn'),
(14, 1, 14, '0.90', 'Marshmallow'),
(15, 1, 15, '3.00', 'Stockbrot'),
(17, 1, 17, '3.00', 'Sprunk'),
(18, 1, 18, '3.00', 'O-Saft'),
(19, 1, 19, '3.00', 'e-Cola'),
(20, 1, 20, '3.00', 'Kaffee'),
(21, 1, 21, '5.00', 'Energydrink'),
(22, 1, 22, '5.99', 'Whiskeyshot'),
(23, 1, 23, '2.20', 'Pißwasser'),
(24, 1, 24, '5.10', 'Vodkashot'),
(25, 1, 25, '8.00', 'Rotwein'),
(26, 1, 26, '8.00', 'Weißwein'),
(27, 1, 27, '7.45', 'Sekt'),
(28, 1, 28, '99.99', 'Champagner'),
(29, 1, 29, '5.77', 'Tequilashot'),
(30, 1, 30, '1.34', 'Zigarette'),
(31, 1, 31, '45.00', 'Zigarre'),
(32, 1, 32, '20.00', 'Verbandskasten'),
(33, 1, 34, '55.00', 'Tasche'),
(35, 1, 35, '1.00', 'Münze'),
(36, 1, 36, '7.00', 'Blumenstrauß'),
(37, 1, 37, '2.00', 'Würfel'),
(38, 1, 38, '25.00', 'Fußball'),
(39, 1, 39, '35.00', 'Angel'),
(40, 1, 40, '20.00', 'Köderbox'),
(41, 1, 41, '5.00', 'Kabelbinder'),
(42, 1, 42, '2.00', 'Kotztüte'),
(43, 1, 43, '4.00', 'Wischmop'),
(44, 1, 44, '10.00', 'Putzlappen'),
(45, 1, 45, '7.00', 'Poliertuch'),
(47, 1, 47, '100.00', 'Verlobungsring'),
(48, 1, 48, '150.00', 'Ehering'),
(49, 1, 49, '10.00', 'Ringbox'),
(50, 22, 61, '20.00', 'Joint'),
(58, 5, 89, '29.90', 'Schlagring'),
(59, 5, 91, '54.95', 'Baseballschläger'),
(60, 2, 2, '1.45', 'Wasser'),
(61, 2, 4, '1.50', 'Sandwich'),
(62, 2, 5, '2.50', 'Hotdog'),
(63, 2, 6, '3.10', 'Hamburger'),
(64, 2, 7, '3.99', 'Cheeseburger'),
(65, 2, 8, '2.20', 'Orange'),
(66, 2, 9, '2.20', 'Apfel'),
(67, 2, 10, '2.20', 'Banane'),
(68, 2, 11, '3.95', 'Donut'),
(69, 2, 12, '4.95', 'Schokoriegel'),
(70, 2, 21, '4.99', 'Energydrink'),
(71, 3, 2, '1.45', 'Wasser'),
(72, 3, 4, '1.50', 'Sandwich'),
(73, 3, 5, '2.50', 'Hotdog'),
(74, 3, 6, '3.10', 'Hamburger'),
(75, 3, 7, '3.99', 'Chesseburger'),
(76, 3, 8, '2.20', 'Orange'),
(77, 3, 9, '2.20', 'Apfel'),
(78, 3, 10, '2.20', 'Banane'),
(79, 3, 11, '3.95', 'Donut'),
(80, 3, 12, '4.95', 'Schokoriegel'),
(81, 3, 21, '4.99', 'Energydrink'),
(82, 4, 2, '1.45', 'Wasser'),
(83, 4, 4, '1.50', 'Sandwich'),
(84, 4, 5, '2.50', 'Hotdog'),
(85, 4, 6, '3.10', 'Hamburger'),
(86, 4, 7, '3.99', 'Cheeseburger'),
(87, 4, 8, '2.20', 'Orange'),
(88, 4, 9, '2.20', 'Apfel'),
(89, 4, 10, '2.20', 'Banane'),
(90, 4, 11, '3.95', 'Donut'),
(91, 4, 12, '4.95', 'Schokoriegel'),
(92, 4, 21, '4.99', 'Energydrink'),
(93, 7, 2, '1.45', 'Wasser'),
(94, 7, 4, '1.50', 'Sandwich'),
(95, 7, 5, '2.50', 'Hotdog'),
(96, 7, 6, '3.10', 'Hamburger'),
(97, 7, 7, '3.99', 'Cheeseburger'),
(98, 7, 8, '2.20', 'Orange'),
(99, 7, 9, '2.20', 'Apfel'),
(100, 7, 10, '2.20', 'Banane'),
(101, 7, 11, '3.95', 'Donut'),
(102, 7, 12, '4.95', 'Schokoriegel'),
(103, 7, 21, '4.99', 'Energydrink'),
(104, 10, 2, '1.45', 'Wasser'),
(105, 10, 4, '1.50', 'Sandwich'),
(106, 10, 5, '2.50', 'Hotdog'),
(107, 10, 6, '3.10', 'Hamburger'),
(108, 10, 7, '3.99', 'Cheeseburger'),
(109, 10, 8, '2.20', 'Orange'),
(110, 10, 9, '2.20', 'Apfel'),
(111, 10, 10, '2.20', 'Banane'),
(112, 10, 11, '3.95', 'Donut'),
(113, 10, 12, '4.95', 'Schokoriegel'),
(114, 10, 21, '4.99', 'Energydrink'),
(115, 12, 2, '1.45', 'Wasser'),
(116, 12, 4, '1.50', 'Sandwich'),
(117, 12, 5, '2.50', 'Hotdog'),
(118, 12, 6, '3.10', 'Hamburger'),
(119, 12, 7, '3.99', 'Cheeseburger'),
(120, 12, 8, '2.20', 'Orange'),
(121, 12, 9, '2.20', 'Apfel'),
(122, 12, 10, '2.20', 'Banane'),
(123, 12, 11, '3.95', 'Donut'),
(124, 12, 12, '4.95', 'Schokoriegel'),
(125, 12, 21, '4.99', 'Energydrink'),
(126, 13, 2, '1.45', 'Wasser'),
(127, 13, 4, '1.50', 'Sandwich'),
(128, 13, 5, '2.50', 'Hotdog'),
(129, 13, 6, '3.10', 'Hamburger'),
(130, 13, 7, '3.99', 'Cheeseburger'),
(131, 13, 8, '2.20', 'Orange'),
(132, 13, 9, '2.20', 'Apfel'),
(133, 13, 10, '2.20', 'Banane'),
(134, 13, 11, '3.95', 'Donut'),
(135, 13, 12, '4.95', 'Schokoriegel'),
(136, 13, 21, '4.99', 'Energydrink'),
(137, 14, 2, '1.45', 'Wasser'),
(138, 14, 4, '1.50', 'Sandwich'),
(139, 14, 5, '2.50', 'Hotdog'),
(140, 14, 6, '3.10', 'Hamburger'),
(141, 14, 7, '3.99', 'Cheeseburger'),
(142, 14, 8, '2.20', 'Orange'),
(143, 14, 9, '2.20', 'Apfel'),
(144, 14, 10, '2.20', 'Banane'),
(145, 14, 11, '3.95', 'Donut'),
(146, 14, 12, '4.95', 'Schokoriegel'),
(147, 14, 21, '4.99', 'Energydrink'),
(148, 15, 2, '1.45', 'Wasser'),
(149, 15, 4, '1.50', 'Sandwich'),
(150, 15, 5, '2.50', 'Hotdog'),
(151, 15, 6, '3.10', 'Hamburger'),
(152, 15, 7, '3.99', 'Cheeseburger'),
(153, 15, 8, '2.20', 'Orange'),
(154, 15, 9, '2.20', 'Apfel'),
(155, 15, 10, '2.20', 'Banane'),
(156, 15, 11, '3.95', 'Donut'),
(157, 15, 12, '4.95', 'Schokoriegel'),
(158, 15, 21, '4.99', 'Energydrink'),
(159, 16, 2, '1.45', 'Wasser'),
(160, 16, 4, '1.50', 'Sandwich'),
(161, 16, 5, '2.50', 'Hotdog'),
(162, 16, 6, '3.10', 'Hamburger'),
(163, 16, 7, '3.99', 'Cheeseburger'),
(164, 16, 8, '2.20', 'Orange'),
(165, 16, 9, '2.20', 'Apfel'),
(166, 16, 10, '2.20', 'Banane'),
(167, 16, 11, '3.99', 'Donut'),
(168, 16, 12, '4.95', 'Schokoriegel'),
(169, 16, 21, '4.99', 'Energydrink'),
(170, 17, 2, '1.45', 'Wasser'),
(171, 17, 4, '1.50', 'Sandwich'),
(172, 17, 5, '2.50', 'Hotdog'),
(173, 17, 6, '3.10', 'Hamburger'),
(174, 17, 7, '3.99', 'Cheeseburger'),
(175, 17, 8, '2.20', 'Orange'),
(176, 17, 9, '2.20', 'Apfel'),
(177, 17, 10, '2.20', 'Banane'),
(178, 17, 11, '3.95', 'Donut'),
(179, 17, 12, '4.95', 'Schokoriegel'),
(180, 17, 21, '4.99', 'Energydrink'),
(181, 18, 2, '1.45', 'Wasser'),
(182, 18, 4, '1.50', 'Sandwich'),
(183, 18, 5, '2.50', 'Hotdog'),
(184, 18, 6, '3.10', 'Hamburger'),
(185, 18, 7, '3.99', 'Cheeseburger'),
(186, 18, 8, '2.20', 'Orange'),
(187, 18, 9, '2.20', 'Apfel'),
(188, 18, 10, '2.20', 'Banane'),
(189, 18, 11, '3.95', 'Donut'),
(190, 18, 12, '4.95', 'Schokoriegel'),
(191, 18, 21, '4.99', 'Energydrink'),
(192, 19, 2, '1.45', 'Wasser'),
(193, 19, 4, '1.50', 'Sandwich'),
(194, 19, 5, '2.50', 'Hotdog'),
(195, 19, 6, '3.10', 'Hamburger'),
(196, 19, 7, '3.99', 'Cheeseburger'),
(197, 19, 8, '2.20', 'Orange'),
(198, 19, 9, '2.20', 'Apfel'),
(199, 19, 10, '2.20', 'Banane'),
(200, 19, 11, '3.95', 'Donut'),
(201, 19, 12, '4.95', 'Schokoriegel'),
(202, 19, 21, '4.99', 'Energydrink'),
(203, 6, 22, '5.99', 'Whiskeyshot'),
(204, 6, 23, '5.10', 'Pißwasser'),
(205, 6, 24, '5.10', 'Vodkashot'),
(206, 6, 25, '8.40', 'Rotwein'),
(207, 6, 26, '8.40', 'Weißwein'),
(208, 6, 27, '29.80', 'Sekt'),
(209, 6, 28, '99.99', 'Champagner'),
(210, 6, 29, '5.77', 'Tequilashot'),
(211, 6, 30, '1.34', 'Zigarette'),
(212, 6, 31, '44.99', 'Zigarre'),
(213, 6, 32, '19.95', 'Verbandskasten'),
(214, 6, 33, '2.98', 'Pflaster'),
(215, 6, 34, '54.95', 'Tasche'),
(216, 8, 22, '5.99', 'Whiskeyshot'),
(217, 8, 23, '5.10', 'Pißwasser'),
(218, 8, 24, '5.10', 'Vodkashot'),
(219, 8, 25, '8.40', 'Rotwein'),
(220, 8, 26, '8.40', 'Weißwein'),
(221, 8, 27, '29.80', 'Sekt'),
(222, 8, 28, '99.99', 'Champagner'),
(223, 8, 29, '5.77', 'Tequilashot'),
(224, 8, 30, '1.34', 'Zigarette'),
(225, 8, 31, '44.99', 'Zigarre'),
(226, 8, 32, '19.95', 'Verbandskasten'),
(227, 8, 33, '2.98', 'Pflaster'),
(228, 8, 34, '54.95', 'Tasche'),
(229, 21, 22, '5.99', 'Whiskeyshot'),
(230, 21, 23, '5.10', 'Pißwasser'),
(231, 21, 24, '5.10', 'Vodkashot'),
(232, 21, 25, '8.40', 'Rotwein'),
(233, 21, 26, '8.40', 'Weißwein'),
(234, 21, 27, '29.80', 'Sekt'),
(235, 21, 28, '99.99', 'Champagner'),
(236, 21, 29, '5.77', 'Tequilashot'),
(237, 21, 30, '1.34', 'Zigarette'),
(238, 21, 31, '44.99', 'Zigarre'),
(239, 21, 32, '19.95', 'Verbandskasten'),
(240, 21, 33, '2.98', 'Pflaster'),
(241, 21, 34, '54.95', 'Tasche'),
(242, 9, 97, '59.95', 'Klappmesser'),
(243, 23, 101, '1.00', 'Taser'),
(244, 23, 103, '0.01', 'Schutzweste'),
(245, 23, 105, '1.00', 'MK2Pistole'),
(246, 23, 107, '1.00', 'SMG'),
(247, 23, 109, '1.00', 'PumpShotgun'),
(250, 23, 115, '0.01', 'Schlagstock'),
(251, 23, 117, '0.01', 'Taschenlampe'),
(252, 23, 119, '0.01', 'MK2Magazin'),
(253, 23, 120, '0.01', 'SMGMagazin'),
(254, 23, 121, '0.01', 'PumpShotgunMagazin'),
(257, 23, 124, '1.00', 'GemüseBurger'),
(258, 23, 20, '1.00', 'Kaffee'),
(259, 23, 11, '1.00', 'Donut'),
(260, 24, 101, '0.01', 'Taser'),
(261, 24, 105, '0.01', 'MK2Pistole'),
(262, 24, 119, '0.01', 'MK2Magazin'),
(263, 5, 83, '360.00', 'Kampfpistole'),
(264, 5, 85, '20.00', '9mmMagazin'),
(265, 9, 83, '360.00', 'Kampfpistole'),
(266, 9, 85, '20.00', '9mmMagazin'),
(267, 11, 83, '360.00', 'Kampfpistole'),
(268, 11, 85, '20.00', '9mmMagazin'),
(269, 20, 83, '360.00', 'Kampfpistole'),
(270, 20, 85, '20.00', '9mmMagazin'),
(271, 25, 2, '0.85', 'Wasser'),
(272, 25, 17, '1.00', 'Sprunk'),
(273, 25, 19, '1.00', 'e-Cola'),
(274, 25, 21, '3.00', 'Energydrink'),
(275, 25, 127, '2.50', 'Wodka(Shot)'),
(276, 25, 128, '2.50', 'Jägermeister(Shot)'),
(277, 25, 129, '2.50', 'Tequila(Shot)'),
(278, 25, 23, '1.50', 'Pißwasser'),
(279, 25, 27, '5.00', 'Sekt'),
(280, 25, 28, '25.00', 'Champangner'),
(281, 25, 130, '4.00', 'Kamikaze'),
(282, 25, 131, '4.00', 'Feuerfänger'),
(283, 25, 132, '4.00', 'Tollwut'),
(284, 26, 133, '0.50', 'Milch'),
(285, 26, 2, '0.85', 'Wasser'),
(286, 26, 19, '1.00', 'e-Cola'),
(287, 26, 17, '1.00', 'Sprunk'),
(288, 26, 20, '1.25', 'Kaffee'),
(289, 26, 134, '1.50', 'RootBeer'),
(290, 26, 23, '1.50', 'Pißwasser'),
(291, 26, 135, '2.00', 'Met'),
(292, 26, 136, '2.25', 'BurbonWhiskey'),
(293, 26, 137, '2.75', 'SingleMaitWhiskey'),
(294, 26, 138, '2.50', 'Vodka(Shot)'),
(295, 26, 139, '4.00', 'CubaLibre'),
(296, 26, 140, '2.00', 'BigTarantinoBurger'),
(297, 26, 141, '1.50', 'TittyTwister'),
(298, 26, 142, '3.00', 'PandemoniumSteakSandwich'),
(299, 26, 143, '0.75', 'Pommes'),
(300, 26, 144, '0.50', 'Krautsalat'),
(301, 26, 145, '0.90', 'Erdnüsse'),
(302, 26, 146, '1.00', 'Chips'),
(303, 27, 2, '0.85', 'Wasser'),
(304, 27, 19, '1.00', 'e-Cola'),
(305, 27, 21, '3.00', 'Energydrink'),
(306, 27, 129, '2.50', 'Tequila(Shot)'),
(307, 27, 138, '2.50', 'Vodka(Shot)'),
(308, 27, 22, '2.25', 'Whiskeyshot'),
(309, 27, 147, '2.25', 'Hotstrip(Shot)'),
(310, 27, 148, '4.00', 'GoldenBay'),
(311, 27, 149, '4.00', 'Unicorn'),
(312, 27, 150, '4.00', 'Vanilla(Alkfrei)'),
(313, 27, 151, '1.00', 'Nachos'),
(314, 27, 152, '0.85', 'Kirschpudding'),
(315, 27, 153, '0.25', 'Salzstangen'),
(316, 27, 145, '0.25', 'Erdnüsse'),
(317, 9, 157, '14.00', 'Hammer'),
(318, 9, 159, '44.99', 'Messer'),
(319, 9, 161, '320.00', 'Pistole'),
(320, 9, 163, '50.00', 'PistoleMagazin'),
(321, 9, 164, '400.00', 'CombatPistole'),
(322, 9, 166, '50.00', 'CombatMagazin'),
(323, 9, 167, '600.00', 'Pistole50'),
(324, 9, 169, '50.00', 'Pistole50Magazin'),
(325, 9, 170, '780.00', 'SchwerePistole'),
(326, 9, 172, '50.00', 'SchwerePistoleMagazin'),
(327, 9, 173, '24.99', 'Brechstange'),
(328, 9, 175, '89.95', 'Machete'),
(329, 9, 177, '24.97', 'Rohrzange'),
(330, 9, 117, '19.95', 'Taschenlampe'),
(331, 23, 111, '0.01', 'Karabiner'),
(332, 23, 122, '0.01', 'KarabinerMagazin'),
(333, 26, 182, '3.00', 'Ale'),
(334, 26, 184, '4.00', '31er mit Milch'),
(335, 26, 183, '3.00', 'Stout'),
(336, 26, 185, '2.00', 'Irish Coffee'),
(337, 26, 186, '6.00', 'Haggis'),
(338, 26, 187, '7.50', 'Irish Stew'),
(339, 26, 188, '8.50', 'Lamb & Beans'),
(340, 26, 189, '3.25', 'Bread & Butter Pudding'),
(341, 9, 89, '29.90', 'Schlagring'),
(342, 9, 97, '59.95', 'Klappmesser'),
(343, 9, 91, '54.95', 'Baseballschläger'),
(344, 28, 2, '1.10', 'Wasser'),
(345, 31, 20, '1.20', 'Kaffee'),
(346, 32, 30, '1.30', 'Zigarette'),
(347, 30, 17, '2.00', 'Sprunk'),
(348, 30, 19, '2.00', 'eCola'),
(349, 29, 12, '0.70', 'Schokoriegel'),
(350, 29, 145, '1.00', 'Erdnüsse'),
(351, 29, 153, '0.50', 'Salzstangen'),
(352, 71, 34, '54.95', 'Tasche');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `supportlogs`
--

CREATE TABLE `supportlogs` (
  `id` int(11) NOT NULL,
  `reportingid` int(11) NOT NULL DEFAULT 0,
  `reportingname` varchar(63) NOT NULL DEFAULT '0',
  `users` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `supportlogs`
--

INSERT INTO `supportlogs` (`id`, `reportingid`, `reportingname`, `users`) VALUES
(1, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":0.999091625213623}]'),
(2, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.102677583694458}]'),
(3, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.0470283031463623}]'),
(4, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.025364398956299}]'),
(5, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.02941632270813}]'),
(6, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.0482592582702637}]'),
(7, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.064626932144165}]'),
(8, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.080307722091675}]'),
(9, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.1063311100006104}]'),
(10, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.1138055324554443}]'),
(11, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.1136887073516846}]'),
(12, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(13, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(14, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(15, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(16, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(17, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(18, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(19, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(20, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(21, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(22, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(23, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(24, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(25, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(26, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(27, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(28, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(29, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(30, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(31, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(32, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(33, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(34, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(35, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(36, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(37, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(38, 15, 'Joshua Gerge', '[{\"charId\":16,\"name\":\"Jens Prada\",\"distance\":2.113571882247925}]'),
(39, 1, 'Anna Klein', '[{\"charId\":17,\"name\":\"Daniel Elskamp\",\"distance\":0.907441258430481}]'),
(40, 20, 'Max Mustermann', '[{\"charId\":15,\"name\":\"Joshua Gerge\",\"distance\":3.637071132659912}]'),
(41, 1, 'Joshua Gerke', '[{\"charId\":2,\"name\":\"Jens Prada\",\"distance\":3.918325901031494}]'),
(42, 1, 'Joshua Gerke', '[{\"charId\":2,\"name\":\"Jens Prada\",\"distance\":7.342674255371094}]'),
(43, 3, 'Daniel Elskamp', '[{\"charId\":1,\"name\":\"Joshua Gerke\",\"distance\":0.7331436276435852}]');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `transaktionlist`
--

CREATE TABLE `transaktionlist` (
  `id` int(11) NOT NULL,
  `accountId` int(11) DEFAULT NULL,
  `amout` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `transferlist`
--

CREATE TABLE `transferlist` (
  `id` int(11) NOT NULL,
  `transmitterId` int(11) DEFAULT NULL,
  `receiverId` int(11) DEFAULT NULL,
  `amout` float DEFAULT 0,
  `date` varchar(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_houses`
--

CREATE TABLE `user_houses` (
  `id` int(11) NOT NULL,
  `houseid` int(11) NOT NULL,
  `ingameName` text NOT NULL,
  `charId` int(11) NOT NULL,
  `dimension` int(11) NOT NULL,
  `userinhouse` int(11) DEFAULT 0,
  `isLocked` int(11) DEFAULT 0,
  `pin` int(255) DEFAULT NULL,
  `lagerpin` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `user_houses`
--

INSERT INTO `user_houses` (`id`, `houseid`, `ingameName`, `charId`, `dimension`, `userinhouse`, `isLocked`, `pin`, `lagerpin`) VALUES
(12, 3, 'Anna_Klein', 1, 4879, 1, 0, 123458, NULL),
(13, 2, 'Anna_Klein', 1, 2994, 0, 0, 88898989, NULL),
(14, 1, 'Anna_Klein', 1, 987, 0, 0, 46545648, NULL),
(15, 1, 'Anna_Klein', 1, 3637, 0, 0, NULL, NULL),
(16, 1, 'Daniel_Elskamp', 17, 1614, 0, 0, 1234, NULL),
(17, 2, 'Daniel_Elskamp', 17, 4919, 0, 0, NULL, NULL),
(18, 5, 'Joshua_Gerke', 1, 349260, 0, 0, 1337, 1335);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_items`
--

CREATE TABLE `user_items` (
  `id` int(11) NOT NULL,
  `charId` int(11) DEFAULT 0,
  `itemId` int(11) DEFAULT 0,
  `amout` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `user_items`
--

INSERT INTO `user_items` (`id`, `charId`, `itemId`, `amout`) VALUES
(100, 1, 7, 2),
(101, 1, 34, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_licenses`
--

CREATE TABLE `user_licenses` (
  `id` int(11) NOT NULL,
  `licenseID` int(11) NOT NULL DEFAULT 0,
  `charID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_outfits`
--

CREATE TABLE `user_outfits` (
  `id` int(11) NOT NULL,
  `clothes` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `charID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `user_outfits`
--

INSERT INTO `user_outfits` (`id`, `clothes`, `name`, `charID`) VALUES
(9, '{\"clothes\":[null,{\"drawable\":0,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":2,\"texture\":0},{\"drawable\":6,\"palette\":0,\"texture\":0},{\"drawable\":1,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":0,\"texture\":0},{\"drawable\":1,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":2,\"texture\":0},{\"drawable\":15,\"palette\":0,\"texture\":0},{\"drawable\":255,\"palette\":2,\"texture\":0},{\"drawable\":255,\"palette\":0,\"texture\":0},{\"drawable\":41,\"palette\":0,\"texture\":0}],\"props\":[{\"drawable\":255,\"texture\":0},{\"drawable\":255,\"texture\":4},{\"drawable\":255,\"texture\":0},null,null,null,{\"drawable\":255,\"texture\":0},{\"drawable\":255,\"texture\":0}]}', 'test', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehiclekeys`
--

CREATE TABLE `vehiclekeys` (
  `id` int(11) NOT NULL,
  `vehID` int(11) DEFAULT NULL,
  `keyOwner` int(11) DEFAULT NULL,
  `amout` int(11) DEFAULT NULL,
  `isActive` enum('Y','N') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `vehiclekeys`
--

INSERT INTO `vehiclekeys` (`id`, `vehID`, `keyOwner`, `amout`, `isActive`) VALUES
(4, 4, 1, 2, 'N'),
(16, 13, 1, 2, 'Y'),
(17, 14, 1, 2, 'Y'),
(18, 15, 1, 2, 'Y'),
(19, 16, 1, 2, 'Y'),
(20, 17, 1, 2, 'Y'),
(21, 18, 1, 2, 'Y'),
(22, 19, 1, 2, 'Y'),
(23, 20, 1, 2, 'Y'),
(24, 21, 1, 2, 'N'),
(25, 22, 1, 2, 'Y'),
(26, 23, 1, 2, 'Y'),
(27, 24, 1, 2, 'Y'),
(28, 25, 1, 2, 'Y'),
(29, 26, 1, 2, 'N'),
(30, 27, 1, 2, 'Y'),
(31, 1, 1, 2, 'Y'),
(32, 28, 1, 2, 'Y'),
(33, 29, 1, 2, 'Y'),
(34, 26, 1, 2, 'Y'),
(35, 21, 1, 2, 'N'),
(36, 30, 1, 1, 'Y'),
(37, 31, 1, 2, 'Y'),
(38, 30, 15, 1, 'Y'),
(39, 21, 15, 2, 'Y'),
(40, 32, 15, 2, 'Y'),
(41, 33, 20, 2, 'Y'),
(42, 34, 15, 1, 'Y'),
(43, 34, 20, 1, 'Y'),
(44, 35, 1, 2, 'Y'),
(45, 36, 1, 2, 'Y'),
(46, 37, 1, 2, 'Y'),
(47, 38, 1, 2, 'Y'),
(48, 39, 1, 2, 'Y'),
(49, 40, 1, 2, 'Y'),
(50, 41, 1, 2, 'Y'),
(51, 42, 1, 2, 'Y'),
(52, 43, 1, 2, 'N'),
(53, 44, 1, 2, 'Y'),
(54, 45, 2, 5, 'Y'),
(55, 46, 1, 3, 'Y'),
(56, 47, 2, 2, 'Y'),
(57, 43, 2, 2, 'N'),
(58, 48, 2, 2, 'Y'),
(59, 49, 2, 2, 'Y'),
(60, 50, 2, 2, 'Y'),
(61, 51, 2, 2, 'Y'),
(62, 52, 1, 2, 'Y'),
(63, 53, 1, 2, 'Y'),
(64, 54, 2, 2, 'Y'),
(65, 55, 2, 2, 'Y'),
(66, 56, 1, 2, 'Y'),
(67, 57, 1, 2, 'Y'),
(68, 58, 1, 2, 'Y'),
(69, 59, 3, 2, 'Y'),
(70, 60, 3, 2, 'Y'),
(71, 43, 1, 2, 'Y');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehiclelist`
--

CREATE TABLE `vehiclelist` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `propellant` varchar(50) DEFAULT 'gas',
  `ekPrice` float DEFAULT 0,
  `scPrice` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `vehiclelist`
--

INSERT INTO `vehiclelist` (`id`, `title`, `model`, `propellant`, `ekPrice`, `scPrice`) VALUES
(1, 'fbi', 'fbi', 'gas', 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `garage` int(11) NOT NULL,
  `isSpawned` enum('Y','N') NOT NULL,
  `modelId` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `numberplate` varchar(8) DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  `fuel` int(11) DEFAULT NULL,
  `odometer` int(11) DEFAULT NULL,
  `tuning` text NOT NULL,
  `isImpounded` enum('Y','N') DEFAULT 'N',
  `posX` int(11) DEFAULT NULL,
  `posY` int(11) DEFAULT NULL,
  `posZ` int(11) DEFAULT NULL,
  `posRot` int(11) DEFAULT NULL,
  `fraction` varchar(50) DEFAULT 'none',
  `isRegistered` enum('Y','N') DEFAULT 'N',
  `buyDate` varchar(50) DEFAULT NULL,
  `firstRegistration` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `vehicles`
--

INSERT INTO `vehicles` (`id`, `garage`, `isSpawned`, `modelId`, `type`, `numberplate`, `owner`, `fuel`, `odometer`, `tuning`, `isImpounded`, `posX`, `posY`, `posZ`, `posRot`, `fraction`, `isRegistered`, `buyDate`, `firstRegistration`) VALUES
(43, 7, 'Y', '3889340782', 1, 'LS76102', 1, 53, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -224, -1381, 31, 279, 'none', 'N', '2019-11-20 16:01:24.233', NULL),
(44, 7, 'Y', '3889340782', 1, 'LS720575', 1, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -229, -1393, 31, 0, 'none', 'N', '2019-11-20 16:01:24.234', NULL),
(45, 4, 'Y', '3783366066', 1, 'LS964036', 2, 0, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -1283, 295, 64, 38, 'none', 'N', '2019-11-22 14:38:42.589', NULL),
(46, 4, 'Y', 'Blista', 1, 'LS136281', 1, 0, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -3, -1705, 29, 111, 'none', 'N', '2019-11-25 22:11:51.166', NULL),
(47, 4, 'Y', 'faggio3', 1, 'LS406381', 2, 88, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 247, -381, 44, 69, 'none', 'N', '2019-11-23 14:48:29.322', NULL),
(48, 19, 'Y', '1127131465', 1, 'NOOSE-30', 2, 54, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 2522, -373, 93, 312, 'NOOSE', 'N', '2019-11-24 21:29:41.692', NULL),
(49, 19, 'Y', '2071877360', 1, 'NOOSE-25', 2, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 2530, -400, 93, 240, 'NOOSE', 'N', '2019-11-24 21:29:41.692', NULL),
(50, 19, 'Y', '2434067162', 1, 'NOOSE-46', 2, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 2530, -400, 93, 240, 'NOOSE', 'N', '2019-11-24 21:29:41.692', NULL),
(51, 19, 'Y', '1127131465', 1, 'NOOSE-78', 2, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 2530, -400, 93, 240, 'NOOSE', 'N', '2019-11-24 21:29:41.693', NULL),
(52, 4, 'Y', '3863274624', 1, 'LS507362', 1, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -48, -1682, 29, 0, 'none', 'N', '2019-11-25 16:09:47.089', NULL),
(53, 4, 'Y', '3783366066', 1, 'LS750608', 1, 0, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 3, -1702, 29, 289, 'none', 'N', '2019-11-27 04:21:40.406', NULL),
(54, 4, 'Y', '3087195462', 1, 'LS544242', 2, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -48, -1682, 29, 0, 'none', 'N', '2019-11-26 20:53:32.922', NULL),
(55, 4, 'Y', '3087195462', 1, 'LS444649', 2, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -48, -1682, 29, 0, 'none', 'N', '2019-11-26 20:53:32.921', NULL),
(56, 4, 'Y', '3087195462', 1, 'LS68553', 1, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -48, -1682, 29, 0, 'none', 'N', '2019-11-26 20:53:32.922', NULL),
(57, 17, 'Y', '2601952180', 1, 'LSPD-473', 1, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 451, -1021, 28, 0, 'LSPD', 'N', '2019-11-27 04:21:40.405', NULL),
(58, 17, 'Y', 'pol718', 1, 'LSPD-599', 1, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', 451, -1021, 28, 0, 'LSPD', 'N', '2019-11-27 04:21:40.402', NULL),
(59, 4, 'Y', '2859047862', 1, 'LS763138', 3, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -48, -1682, 29, 0, 'none', 'N', '2019-11-27 04:21:40.401', NULL),
(60, 4, 'Y', '2411965148', 1, 'LS38860', 3, 100, 100, '{\"pcolor\":0,\"scolor\":0,\"neonr\":0,\"neong\":0,\"neonb\":0,\"neonEnabled\":false,\"wheelColor\":-1,\"windowTint\":-1,\"design\":-1,\"spoiler\":-1,\"front\":-1,\"heck\":-1,\"seite\":-1,\"auspuff\":-1,\"rahmen\":-1,\"gitter\":-1,\"haube\":-1,\"kotfl\":-1,\"dach\":-1,\"motor\":-1,\"bremsen\":-1,\"getriebe\":-1,\"hupe\":-1,\"feder\":-1,\"turbo\":-1,\"xenon\":-1,\"felgen\":-1}', 'N', -48, -1682, 29, 0, 'none', 'N', '2019-11-27 04:21:40.403', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehicles_impound`
--

CREATE TABLE `vehicles_impound` (
  `id` int(11) NOT NULL,
  `garage` int(11) NOT NULL,
  `isSpawned` enum('Y','N') NOT NULL,
  `modelId` bigint(20) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `numberplate` text DEFAULT NULL,
  `owner` int(11) DEFAULT NULL,
  `fuel` int(11) DEFAULT NULL,
  `odometer` int(11) DEFAULT NULL,
  `tuning` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehicle_items`
--

CREATE TABLE `vehicle_items` (
  `id` int(11) NOT NULL,
  `vehId` int(11) NOT NULL DEFAULT 0,
  `itemId` int(11) NOT NULL DEFAULT 0,
  `amout` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `website_blacklist`
--

CREATE TABLE `website_blacklist` (
  `id` int(11) NOT NULL,
  `ip` varchar(50) NOT NULL DEFAULT '0',
  `grund` varchar(255) NOT NULL,
  `mitglied` varchar(50) NOT NULL,
  `zeitpunkt` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `website_regelwerk`
--

CREATE TABLE `website_regelwerk` (
  `regelwerk` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `website_regelwerk`
--

INSERT INTO `website_regelwerk` (`regelwerk`) VALUES
('<div class=\"row\">\r\n            <div class=\"col-sm-12 col-md-4 sidebar\">\r\n                <div class=\"sidebar-box\">\r\n                </div>\r\n                <div class=\"sidebar-box\">\r\n                    <div class=\"categories\">\r\n                        <h3>Sortieren</h3>\r\n                        <li><a href=\"#highest-values\">Oberste Gebote</a></li>\r\n                        <li><a href=\"#default-rules\">Allgemein</a></li>\r\n                        <li><a href=\"#rdm-vdm\">RDM / VDM</a></li>\r\n                        <li><a href=\"#fail-rp\">Fail-RP</a></li>\r\n                        <li><a href=\"#meta-gaming\">Meta-Gaming</a></li>\r\n                        <li><a href=\"#power-rp\">Power-RP</a></li>\r\n                        <li><a href=\"#rp-flucht\">RP-Flucht</a></li>\r\n                        <li><a href=\"#scripting\">Scripting</a></li>\r\n                        <li><a href=\"#trolling\">Trolling</a></li>\r\n                        <li><a href=\"#fractions\">Fraktionen</a></li>\r\n                        <li><a href=\"#roleplay\">Roleplay</a></li>\r\n                        <li><a href=\"#support\">Support</a></li>\r\n                        <li><a href=\"#torcher\">Ausreisen / Hinrichtung / Suizid</a></li>\r\n                        <li><a href=\"#death\">Bewusstlosigkeit / Erste Hilfe</a></li>\r\n                        <li><a href=\"#notfall\">Aufheben durch das Notfallteam</a></li>\r\n                        <li><a href=\"#raub\">Raub / Geiselnahme / Entführung</a></li>\r\n                        <li><a href=\"#gangs\">Gruppierungen / Gangs</a></li>\r\n                        <li><a href=\"#gangwars\">Gang/Bandenkriege</a></li>\r\n                        <li><a href=\"#old-friends\">Alte Freunde Regel</a></li>\r\n                        <li><a href=\"#illigal\">Illegale Handlungen</a></li>\r\n                        <li><a href=\"#streaming\">Streaming</a></li>\r\n                        <li>v1.1.0 - 14.04.2019</li>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-8\">\r\n                <h2 class=\"mb-3\" id=\"highest-values\">Oberste Gebote</h2>\r\n                <p>\r\n                    1. Das Leben ist das oberste Gut.<br><br>\r\n                    2. Behandelt andere Spieler im RP genauso, wie auch ihr behandelt werden wollt.<br><br>\r\n                    3. Benutzt im RP euren Verstand, alles das was im RP passiert, sollte euch Out of Charakter nicht beschäftigen.<br><br>\r\n                    4. Versucht euer RP realitätsnah zu halten.\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"default-rules\">Allgemeine Regeln</h2>\r\n                <p>\r\n                    1. Das Darstellen und Ausspielen von körperlichen oder geistigen Behinderungen, extreme Beleidigungen,\r\n                       Rassismus, Extremismus, das Diskriminieren von Minderheiten und sexuelle Belästigung sowie Sex RP ist strengstens verboten und wird hart bestraft.<br><br>\r\n                    2. Bugusing oder das Ausnutzen von Fehlerhaften Spielmechaniken wird bestraft. Falls ihr solche Fehler findet, meldet diese bitte umgehend im Support.<br><br>\r\n                    3. Das Mindestalter für den Besitz von Grand Theft Auto 5 liegt bei 18 Jahren, genauso wie das Mindestalter 18 Jahre beträgt um auf unserem Server spielen zu dürfen.\r\n                       Sollten wir mitbekommen, dass Ihr unter 18 Jahren seid, dann werden wir euch auch im Nachhinein vom Projekt ausschließen.<br><br>\r\n                    4. Das Benutzen von Mods oder Programmen sowie Makros die das Spielverhalten oder das Fahrverhalten von Fahrzeugen verbessern sind verboten. Ausgenommen sind Grafikmods.<br><br>\r\n                    5. Wer gegen die Serverregeln verstößt kann entweder mit einem temporären Timeout oder einem permanenten Ausschluss von dem Projekt bestraft werden.<br><br>\r\n                    6. Schwangerschafts- und Vergewaltigungs-RP ist ausdrücklich verboten und wird mit einem permanenten Bann vom Projekt bestraft.<br><br>\r\n                    7. Die Weitergabe eines Accounts, Log In-Daten oder das Nutzen eines anderen Accounts ist verboten.<br><br>\r\n                    8. Das Ausnutzen von Lücken im Regelwerk ist strengstens verboten.<br><br>\r\n                    9. Jeder Spieler wird gleich behandelt, egal ob Teammitglied, Streamer/-in oder andere Spieler/-in.<br><br>\r\n                    10. Im Teamspeak sowie im Controlpanel sind die gleichen Namen zu verwenden.<br><br>\r\n                    11. Das permanente Jagen, Überfallen und Kidnappen der Exekutivbeamten zwecks Waffenbeschaffung (Cop-Farming) ist untersagt.<br><br>\r\n                    12. Es herrscht Anwesenheitspflicht auf dem TS wenn man aktiv auf dem Server ist.<br><br>\r\n                    13. Stumme Spieler werden so behandelt als wenn sie ganz normal reden.<br><br>\r\n                    14. Eine Schuss Ankündigung muss klar und deutlich erkennbar bzw verständlich sein. Wenn euch jemand mit einer Waffe gegenüber steht, muss man mit einem Schuss rechnen.<br><br>\r\n                    15. Während du auf dem Server spielst, ist es dir untersagt, RP Streams von anderen BL-Spielern zu schauen.\r\n<br><br>\r\n                </p>\r\n\r\n                <h4>Nachfolgend werden Begriffe erklärt, welche auf dem Server verboten sind und welche mit einem temporären oder permanenten Bann bestraft werden.<br><br></h4>\r\n\r\n                <h2 class=\"mb-3\" id=\"rdm-vdm\">RDM / VDM</h2>\r\n                <p>\r\n                    1.  Das Töten anderer Spieler ohne nötigen RP-Hintergrund ist strengstens verboten.\r\n<br><br>\r\n                    2. Das absichtliche Überfahren anderer Spieler (ohne vorheriges RP) mit jeglichen Fahrzeugen ist verboten.\r\n                 <br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"fail-rp\">Fail-RP</h2>\r\n                <p>\r\n                    1. Als Fail-RP werden die Aktionen bezeichnet, welche im realen Leben unmöglich oder unrealistisch sind.<br>\r\n                    <strong>Beispiel:</strong> Das hochspringen mit BMX Rädern an Häuserwänden um auf Dächer zu kommen oder das Drehen des Fahrzeuges mit den Tasten W,A,S,D, wenn dies auf dem Kopf liegt.<br><br>\r\n                    2. Das Benutzen von Muskeln und extremes betonen einzelner Buchstaben, um anderen Spielern zu erklären, welche Taste sie benutzen müssen zählt ebenfalls als Fail-RP.<br>\r\n                    <strong>Beispiel:</strong> Du musst deinen F-Muskel benutzen dann kannst du einsteigen oder du musst dich da \"Zzzz\"iemlich dolle festhalten.<br><br>\r\n                    3. Wenn du AFK gehst, lass dir was einfallen!<br>\r\n                    <strong>Negativbeispiele:</strong><br>\r\n                    - Ich gehe mal eben Augen waschen.<br>\r\n                    - Ich bin mal eben im Kopf.<br>\r\n                    - Ich geh mal ins Handschuhfach.<br>\r\n                    Lasst euch bitte was Besseres einfallen oder sagt einfach “Ich geh kurz auf die Toilette”, ob der Gang 2 Minuten dauert oder länger stört das RP nicht!<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"meta-gaming\">Meta-Gaming</h2>\r\n                <p>\r\n                    1. Meta-Gaming ist das IC Nutzen von OOC erlangten Informationen. Nur Informationen die man aktiv im RP erhält darf man benutzen!<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"power-rp\">Power-RP</h2>\r\n                <p>\r\n                    1. Als Power-RP versteht man das Aufzwingen einer RP-Situation, in der andere Spieler keine Chance haben zu agieren! Jeder Spieler muss eine Chance haben zu handeln und zu überlegen!<br><br>\r\n                    2. Ebenso muss man sich als Charakter darüber im klaren sein, welche Folgen die Aktionen auf seinen Gegenüber hat. <br>\r\nBeispiel: Ich hacke dir jetzt dein Bein ab!\r\nDiese Aktion hat für das Opfer die Folge, das dieser nicht mehr normal laufen kann und so wird ihm aufgezwungen, dauerhaft zu spielen das er nur ein Bein hat.\r\n<br><br>\r\n                    \r\n              \r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"rp-flucht\">RP-Flucht</h2>\r\n                <p>\r\n                    1. Darunter versteht man das Verlassen des Servers während einer derzeit laufenden RP-Situation.<br><br>\r\n                    2. Man sollte den Server erst verlassen, wenn man sich sicher ist, dass die Situation vorbei ist und man in keine neue Handlung einbezogen wird.<br><br>\r\n                    3. Zusatz Combat-Logging: Combat-Logging ist strengstens untersagt!<br>\r\n                    <strong>Beispiel:</strong> Bankraub, Entführung, Schusswechsel oder Verfolgungsjagd<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"scripting\">Scripting</h2>\r\n                <p>\r\n                    1. Scripted-RP ist das Planen einer RP Situation außerhalb des Spiels. Alle Handlungen müssen im RP geplant und gemacht werden.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"trolling\">Trolling</h2>\r\n                <p>\r\n                    1. Das vorsätzliche und mutwillige Stören einer RP-Situation oder eines Spielers ist verboten.<br>\r\n                    <strong>Beispiel:</strong> Das Ausnutzen der Sprache Reichweite um andere Spieler in ihrem Gespräch zu stören.<br><br>\r\n                    2. Der Missbrauch von Leitstellen Nummern zwecks ‘Scherzanrufen’ ist untersagt.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"fractions\">Fraktionen</h2>\r\n                <p>\r\n                    1. Der Mediziner kann auf Grund von z.b vermehrten Verletzungen am selben Tag \r\n(Schusswunden, Knochenbrüche), die den gesundheitlichen Zustand deines Charakters schwer beeinträchtigen, jemanden im Krankenhaus für 1-2 Tage aufgrund einer Intensiv- oder stationären Behandlung behalten.\r\nBeispiel: Wenn ihr euch innerhalb von 2 Tagen 2-3 mal in einer Schießerei verletzt oder mit einem Fallschirm den Berg runter springt und euch vermehrt die Knochen brecht, müsst ihr davon ausgehen das ihr im Krankenhaus bleiben müsst.\r\n<br><br>\r\n                    2.  Es ist verboten, Waffen aus dem PD an Personen weiter zu geben, die nicht dem PD zugehörig sind.\r\n<br><br>\r\n                    3. Es darf nur aktiv gegen Cops agiert werden wenn eine Mindestanzahl an Cops im Dienst ist. \r\n <br>\r\n3.1. Bei einer Minderheit seitens der Polizei dürfen keinen offensiven Aktionen gegen diese gestartet werden. Z.b. Wenn nur 5 Cops im Dienst sind darf man diese nicht mit 10 Gruppierungsmitgliedern ausrauben. <br>\r\n\r\n3.2. Bei einer Hochnahme des Polizei HQ’s müssen mindestens 12 Cops im Dienst sein.<br>\r\n\r\n3.3. Wenn ihr einen Spieler als Geisel nehmt und Forderungen gegen den Staat stellt, z.B. Lösegeld, sollte der Betrag angemessen sein. Bitte achtet darauf das mindestens 8 Cops im Dienst sind.<br>\r\n\r\n3.4. Wenn ihr Polizisten, Richter und Staatsanwälte als Geisel nehmen wollt müssen mindestens 12 Cops aktiv im Dienst sein.\r\n<br><br>\r\n\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"roleplay\">Roleplay</h2>\r\n                <p>\r\n                    1. Da wir einen Hardcore-RP Server bespielen, steht es in eurer Pflicht, so realitätsnah wie möglich zu handeln. Vergesst trotzdem nicht, dass es nur ein Spiel ist. Jeder der seinem Charakter eine Hintergrundgeschichte gibt sollte sie auch immer im Hinterkopf behalten und nicht aus seiner Rolle fallen. Also überlegt euch von Anfang an wie euer Charakter und deren Geschichte sein wird. Die Zeit kann deinen Charakter verändern aber nicht von heute auf morgen.<br><br>\r\n                    2. Begibst du dich selber in Lebensgefahr kann es dazu führen, dass der Support einen permanenten Tod des Charakters vorsieht.<br>\r\n                    <strong>Beispiel:</strong> Du willst mit dem Fallschirm vom Maze Bank Tower oder vom Mount Chiliad springen, aber du ziehst nicht rechtzeitig die Reißleine und prallst auf den Boden auf.<br><br>\r\n                    3. Der Ingame Name deines Charakters sollte zur Herkunft dessen passen. Trollnamen, wie Fixi Hartmann, Ansgar Ragentor oder Gernhard Reinlunzen etc. sind untersagt. Namen von Personen die in der Öffentlichkeit stehen, sind nicht gestattet.\r\n<br><br>\r\n                    4. Wenn man gefesselt ist, darf man kein Handy oder Funkgerät benutzen. (Du bist kein Entfesselungskünstler)\r\n<br><br>\r\n                    5. Achte immer auf das Leben deines Charakters. Wenn du aus einer RP-Situation nicht rauskommst, handle für das Wohl deines Charakters, auch wenn es dir nicht passt.\r\n<br><br>\r\n                    6. Man kann einen maskierten Spieler nicht allein an seiner Stimme oder dem Kleidungsstil identifizieren. Mehrere schlüssige Übereinstimmungen können allerdings zu Verdächtigungen und Mutmaßungen führen. (Ein mehrmaliges, grundloses Maskieren um die Identifizierung auf biegen und brechen zu verhindern wird als Power-RP interpretiert.)<br><br>\r\n                    7. Jeder Spieler ist verpflichtet ein funktionstüchtiges Mikrofon mit entsprechender Qualität zu besitzen. Störgeräusche sind zu vermeiden.<br><br>\r\n                    8. Die Benutzung eines Stimmenverzerrer ist gestattet wenn es das RP benötigt, das heißt z.B. bei einer Geiselnahme mit einer Vollmaskierung (ausgeschlossen T-Shirt Maske oder Bandana) oder bei einem Anonymen Anruf.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"support\">Support</h2>\r\n                <p>\r\n                    1. Wenn du bemerkst, dass ein anderer Spieler ein Regelverstoß begeht, kannst du nur mit einem Videobeweis (ggf. mit Ingame-Name) in den Support kommen.<br><br>\r\n                    2. Jeglicher Verstoß gegen die Serverregeln muss gemeldet werden. Wir wollen cleanes und regelkonformes Reallife-RP.<br><br>\r\n                    3. Ein Regelverstoß sollte innerhalb von 48 Stunden im Support gemeldet werden.\r\n<br><br>\r\n                </p>\r\n\r\n\r\n                <h2 class=\"mb-3\" id=\"torcher\">(Zwangs-)Ausreisen / Hinrichtung / Suizid</h2>\r\n                <p>\r\n                    1. Hinrichtungen können nur in Absprache des Supports genehmigt werden und müssen genauestens im RP begründet sein.<br><br>\r\n                    2.  Genauso ist es für Suizid und für eine Zwangs-Ausreise.<br><br>\r\n                    3.  Nach einer Hinrichtung oder Suizid wird der Charakter gelöscht.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"death\">Bewusstlosigkeit / Erste Hilfe</h2>\r\n                <p>\r\n                    1. Während der Bewusstlosigkeit erlangte Informationen dürfen im Roleplay nicht verwendet werden. (Meta-Gaming)<br><br>\r\n                    2. Wenn du angeschossen wurdest, kannst du dich nicht an das erinnern was in der Bewusstlosigkeit passiert oder gesagt worden ist.<br><br>\r\n                    3. Spieler die reanimiert worden sind begeben sich erst in die Behandlung und dürfen nicht mehr Aktiv, sondern nur noch passiv an der Roleplay Situation teilnehmen.<br><br>\r\n                </p>\r\n                <h2 class=\"mb-3\" id=\"notfall\">Aufheben durch das Notfallteam</h2>\r\n                <p>\r\n                    1.  Du darfst erst 20 Minuten nach dem erwachen im Krankenhaus, deinen Verletzungen entsprechend (passiv), wieder an der RP-Situation teilnehmen.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"raub\">Raub / Geiselnahme / Entführung</h2>\r\n                <p>\r\n                    1. Es sollten realistische Forderungen ausgesprochen werden.<br><br>\r\n                    2. Das Niederschießen der Geisel ist nur dann gestattet, wenn eine Geisel unkooperativ ist oder um den Forderungen der Polizei gegenüber Nachdruck zu verleihen.\r\n                       Bedenkzeit sollte gewährt sein. Es sollte die letzte Möglichkeit sein.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"gangs\">Gruppierungen / Gangs</h2>\r\n                <p>\r\n                    1. Eine Gruppierung darf höchstens aus 15 Mitglieder bestehen. Dazu zählen auch Anwärter.<br><br>\r\n                    2. Ein Bündnis zwischen Gangs/Mafien/MC ist erlaubt. Jedoch darf eine Gruppierung nur 1 Bündnis zur gleichen Zeit haben.<br><br>\r\n                    3.  Eine Gruppe mit mehr als 6 Spielern, welche Kriminell tätig sind, zählt als Gruppierung.<br><br>\r\n                    4. Das Bilden einer Gruppierung muss im Roleplay erarbeitet werden.<br><br>\r\n                    5. Eine Gruppierung darf sich nicht durch die Alte Freunde Regel bilden.<br><br>\r\n                    6.  Eine Gruppierung / Mafia / Gang etc. muss, bei allen von ihnen gestarteten kriminellen Aktivitäten, durch ein eindeutiges Erkennungsmerkmal von der zivilen Bevölkerung zu unterscheiden sein. <br>\r\nDies kann durch Farbe, Style oder eine Kombination aus beidem erreicht werden.<br>\r\nBeispiel:<br>\r\nGang: Alle Tragen das gleiche Hemd in der selben Farbe.<br>\r\nMafia: Schwarzer Anzug + Rote Krawatte + Hut mit rotem Band<br>\r\nNur Tattoos und Bandanas reichen nicht für ein eindeutiges Erkennungsmerkmal.<br><br>\r\n                    7. Blood-Outs sind erlaubt wenn das Konzept der Gang es vorsieht, dass es einen Blood-In gibt. Blood-Outs führen zum permanenten Tod des Charakters.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"gangwars\">Gang-/Bandenkriege</h2>\r\n                <p>\r\n                    Es ist erlaubt Kriege zu führen:<br><br>\r\n                    1. Es muss ein ordentlicher und ausschlaggebender RP hintergrund vorhanden sein.<br><br>\r\n                    2. Es dürfen Bündnis Partner zum Krieg mit zu gezogen werden.<br><br>\r\n                    3. Während des Krieges muss man als Gang/Mafia/MC Mitglied klar erkennbar sein.<br><br>\r\n                    4. Schießereien sollten bestmöglich an abgelegenen Orten stattfinden.<br><br>\r\n                    5. Während des Krieges ist der Drive-By erlaubt.<br><br>\r\n                    6. Nach dem Fallen bei einer Schießerei, ist es erst am Folgetag wieder erlaubt aktiv mit zu machen im Krieg.<br><br>\r\n                    7. Der Krieg muss mit der Fraktions-/Gruppierungsverwaltung besprochen und genehmigt werden.<br><br>\r\n                    8. Es ist darauf zu achten, während eines Krieges, dass keine Zivilisten verletzt werden.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"old-friends\">Alte Freunde Regel</h2>\r\n                <p>\r\n                    1. Charaktere aus vergangenen Projekten dürfen schemenhaft erkannt werden.<br><br>\r\n                    2. Feindschaften dürfen nicht übernommen werden. Somit darf z.B. eine vom anderen Projekt verfeindete Gang oder Person nicht mehr als Feind angesehen werden.<br><br>\r\n                </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"illigal\">Illegale Handlungen</h2>\r\n                <p>\r\n                    1. 30 Minuten vor einem geplanten Serverrestart sind keine illegalen Handlungen mehr auszuführen.<br>\r\n                    <strong>Beispiel:</strong> Geiselnahme oder Raub<br><br>\r\n                    2. Ein Spieler darf nicht ohne RP-Hintergrund zum Geldabheben gezwungen werden.<br><br>\r\n                    3. Jobcampen, also das Überfallen von Spielern an Abgabepunkten zur Herausgabe der Items beziehungsweise des Geldes sind verboten.<br><br>\r\n               </p>\r\n\r\n                <h2 class=\"mb-3\" id=\"streaming\">Streaming</h2>\r\n                <p>\r\n                    1. Auf dem Server sind auch Streamer unterwegs. Jeder Spieler erklärt sich einverstanden damit, dass das eigene Spiel inklusive Stimme aufgezeichnet werden kann.<br><br>\r\n                    2. Jeder Streamer muss damit rechnen, dass außenstehende Personen Meta-Informationen für sich gewinnen wollen. Einen Anti-Meta Screen oder das muten des Channels in wichtigen Situationen könnte hilfreich sein.<br><br>\r\n                    3. Als Streamer bist du die Werbung des Servers, Supporter nehmen sich das Recht zwischendurch im Stream zu sein und eventuelle Fehler zu clippen und zu melden.<br><br>\r\n                    4. Eine Streaming-Lizenz benötigst du bei uns nicht.<br><br>\r\n                    5. Das Aufzeichnen und/oder Streamen von Support Gesprächen, sowie Whitelist Gesprächen ist verboten. Beim Verstoß werden rechtliche Schritte eingeleitet.<br><br>\r\n6. Jeder Streamer hat dafür Sorge zu tragen, dass von der Streaming Plattform verbotene Inhalte nicht zu zeigen sind.<bv><bv>\r\n                </p>\r\n            </div>\r\n        </div>');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `whitelisting_changelog`
--

CREATE TABLE `whitelisting_changelog` (
  `id` int(11) NOT NULL,
  `whitelistId` int(11) NOT NULL DEFAULT 0,
  `typ` enum('Eingereicht','Eingeladen','Angenommen','Abgelehnt Punkte','Abgelehnt Charakter','undefiniert') NOT NULL,
  `bearbeiterName` varchar(63) NOT NULL,
  `updatetime` varchar(63) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `whitelisting_forms`
--

CREATE TABLE `whitelisting_forms` (
  `id` int(11) NOT NULL,
  `characterId` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `ingameName` varchar(64) NOT NULL DEFAULT '0',
  `dateOfBirth` varchar(64) NOT NULL DEFAULT '0',
  `homeland` varchar(64) NOT NULL DEFAULT '0',
  `positiveOne` varchar(64) NOT NULL DEFAULT '0',
  `positiveTwo` varchar(64) NOT NULL DEFAULT '0',
  `positiveThree` varchar(64) NOT NULL DEFAULT '0',
  `positiveFour` varchar(64) NOT NULL DEFAULT '0',
  `positiveFive` varchar(64) NOT NULL DEFAULT '0',
  `negativeOne` varchar(64) NOT NULL DEFAULT '0',
  `negativeTwo` varchar(64) NOT NULL DEFAULT '0',
  `negativeThree` varchar(64) NOT NULL DEFAULT '0',
  `questionOne` varchar(32) NOT NULL DEFAULT '0',
  `questionTwo` varchar(32) NOT NULL DEFAULT '0',
  `questionThree` varchar(32) NOT NULL DEFAULT '0',
  `questionFour` varchar(32) NOT NULL DEFAULT '0',
  `questionFive` varchar(32) NOT NULL DEFAULT '0',
  `questionSix` varchar(32) NOT NULL DEFAULT '0',
  `questionSeven` varchar(32) NOT NULL DEFAULT '0',
  `questionEight` varchar(32) NOT NULL DEFAULT '0',
  `questionNine` varchar(32) NOT NULL DEFAULT '0',
  `questionTen` varchar(32) NOT NULL DEFAULT '0',
  `charStory` text NOT NULL,
  `internalComment` text NOT NULL,
  `bearbeiter` varchar(64) DEFAULT NULL,
  `bearbeitungDurch` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `whitelisting_questions`
--

CREATE TABLE `whitelisting_questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `a1` text NOT NULL,
  `a2` text NOT NULL,
  `a3` text NOT NULL,
  `a4` text NOT NULL,
  `correct` varchar(10) NOT NULL,
  `isActive` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `adminlogs`
--
ALTER TABLE `adminlogs`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `bank_konten`
--
ALTER TABLE `bank_konten`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `blips`
--
ALTER TABLE `blips`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`businessID`);

--
-- Indizes für die Tabelle `businessranks`
--
ALTER TABLE `businessranks`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `businessusers`
--
ALTER TABLE `businessusers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `buyed_clothes`
--
ALTER TABLE `buyed_clothes`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `charactermodel`
--
ALTER TABLE `charactermodel`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `characters_questpoints`
--
ALTER TABLE `characters_questpoints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Schlüssel 2` (`character_id`);

--
-- Indizes für die Tabelle `clothes_new`
--
ALTER TABLE `clothes_new`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fractionranks`
--
ALTER TABLE `fractionranks`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fractions`
--
ALTER TABLE `fractions`
  ADD PRIMARY KEY (`fractionID`);

--
-- Indizes für die Tabelle `fractionusers`
--
ALTER TABLE `fractionusers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `garages`
--
ALTER TABLE `garages`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `garages_impound`
--
ALTER TABLE `garages_impound`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `house_items`
--
ALTER TABLE `house_items`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `housing`
--
ALTER TABLE `housing`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `itemanimation`
--
ALTER TABLE `itemanimation`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `itemobject`
--
ALTER TABLE `itemobject`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `jobusers`
--
ALTER TABLE `jobusers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `marker`
--
ALTER TABLE `marker`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `ped`
--
ALTER TABLE `ped`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `phone_contacts`
--
ALTER TABLE `phone_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `phone_short`
--
ALTER TABLE `phone_short`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `shop_items`
--
ALTER TABLE `shop_items`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `supportlogs`
--
ALTER TABLE `supportlogs`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `transaktionlist`
--
ALTER TABLE `transaktionlist`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `transferlist`
--
ALTER TABLE `transferlist`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `user_houses`
--
ALTER TABLE `user_houses`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `user_items`
--
ALTER TABLE `user_items`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `user_licenses`
--
ALTER TABLE `user_licenses`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `user_outfits`
--
ALTER TABLE `user_outfits`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vehiclekeys`
--
ALTER TABLE `vehiclekeys`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vehiclelist`
--
ALTER TABLE `vehiclelist`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vehicles_impound`
--
ALTER TABLE `vehicles_impound`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vehicle_items`
--
ALTER TABLE `vehicle_items`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `website_blacklist`
--
ALTER TABLE `website_blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `whitelisting_changelog`
--
ALTER TABLE `whitelisting_changelog`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `whitelisting_forms`
--
ALTER TABLE `whitelisting_forms`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `whitelisting_questions`
--
ALTER TABLE `whitelisting_questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT für Tabelle `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT für Tabelle `adminlogs`
--
ALTER TABLE `adminlogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT für Tabelle `bank_konten`
--
ALTER TABLE `bank_konten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `blips`
--
ALTER TABLE `blips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT für Tabelle `business`
--
ALTER TABLE `business`
  MODIFY `businessID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT für Tabelle `businessranks`
--
ALTER TABLE `businessranks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT für Tabelle `businessusers`
--
ALTER TABLE `businessusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `buyed_clothes`
--
ALTER TABLE `buyed_clothes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT für Tabelle `charactermodel`
--
ALTER TABLE `charactermodel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT für Tabelle `characters_questpoints`
--
ALTER TABLE `characters_questpoints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT für Tabelle `clothes_new`
--
ALTER TABLE `clothes_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1805;

--
-- AUTO_INCREMENT für Tabelle `fractionranks`
--
ALTER TABLE `fractionranks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT für Tabelle `fractions`
--
ALTER TABLE `fractions`
  MODIFY `fractionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `fractionusers`
--
ALTER TABLE `fractionusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT für Tabelle `garages`
--
ALTER TABLE `garages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT für Tabelle `garages_impound`
--
ALTER TABLE `garages_impound`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `house_items`
--
ALTER TABLE `house_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `housing`
--
ALTER TABLE `housing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `itemanimation`
--
ALTER TABLE `itemanimation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `itemobject`
--
ALTER TABLE `itemobject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT für Tabelle `jobusers`
--
ALTER TABLE `jobusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=292;

--
-- AUTO_INCREMENT für Tabelle `marker`
--
ALTER TABLE `marker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT für Tabelle `objects`
--
ALTER TABLE `objects`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `ped`
--
ALTER TABLE `ped`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT für Tabelle `phone_contacts`
--
ALTER TABLE `phone_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `phone_short`
--
ALTER TABLE `phone_short`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT für Tabelle `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT für Tabelle `shop_items`
--
ALTER TABLE `shop_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=353;

--
-- AUTO_INCREMENT für Tabelle `supportlogs`
--
ALTER TABLE `supportlogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT für Tabelle `transaktionlist`
--
ALTER TABLE `transaktionlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `transferlist`
--
ALTER TABLE `transferlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `user_houses`
--
ALTER TABLE `user_houses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT für Tabelle `user_items`
--
ALTER TABLE `user_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT für Tabelle `user_licenses`
--
ALTER TABLE `user_licenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `user_outfits`
--
ALTER TABLE `user_outfits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT für Tabelle `vehiclekeys`
--
ALTER TABLE `vehiclekeys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT für Tabelle `vehiclelist`
--
ALTER TABLE `vehiclelist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT für Tabelle `vehicles_impound`
--
ALTER TABLE `vehicles_impound`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `vehicle_items`
--
ALTER TABLE `vehicle_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `website_blacklist`
--
ALTER TABLE `website_blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `whitelisting_changelog`
--
ALTER TABLE `whitelisting_changelog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `whitelisting_forms`
--
ALTER TABLE `whitelisting_forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `whitelisting_questions`
--
ALTER TABLE `whitelisting_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
