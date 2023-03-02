-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2023 at 10:31 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phonebook`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PhoneNumber` int(255) DEFAULT NULL,
  `ContactImage` varchar(255) DEFAULT NULL,
  `PhysicalAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`FirstName`, `LastName`, `Email`, `PhoneNumber`, `ContactImage`, `PhysicalAddress`) VALUES
('ALWX', 'KEMBOI', 'KEMBOI@GMAIL.COM', 726837219, 'C:\\fakepath\\Screenshot 2022-12-11 150949.jpg', 'NAIROBI'),
('alex', 'kemboi', 'alex@gmail.com', 723456782, 'C:\\fakepath\\Screenshot 2022-12-11 150949.jpg', '86-30102 BURNT FOREST'),
('alex', 'kemboi', 'alex@gmail.com', 723456782, 'C:\\fakepath\\Screenshot 2022-12-11 150949.jpg', '86-30102 BURNT FOREST'),
('Betty', 'Chepkemboi', 'chepek@gmail.com', 726789345, 'C:\\fakepath\\Screenshot_20221211_030942.png', '100-00100 Nairobi'),
('Ben', 'Kaimugul', 'kaimugul@gmail.com', 712345678, 'C:\\fakepath\\Screenshot 2022-12-11 150949.jpg', 'Nairobi-Kenya'),
('Evans', 'Kigen', 'kigen@gmail.com', 745634521, 'C:\\fakepath\\Screenshot_20221025_121449.png', 'Nairobi-Kennya'),
('Evans', 'Kigen', 'kigen@gmail.com', 745634521, 'C:\\fakepath\\Screenshot_20221025_121449.png', 'Nairobi'),
('PIUS', 'BETT', 'PIUS@GMAIL.COM', 112345678, 'C:\\fakepath\\Screenshot_20221211_030942.png', '56 NAIROBI'),
('PIUS', 'BETT', 'PIUS@GMAIL.COM', 112345678, 'C:\\fakepath\\Screenshot_20221211_030942.png', '56 NAIROBI'),
('PIUS', 'BETT', 'PIUS@GMAIL.COM', 112345678, 'C:\\fakepath\\Screenshot_20221211_030942.png', '56 NAIROBI'),
('PIUS', 'BETT', 'PIUS@GMAIL.COM', 112345678, 'C:\\fakepath\\Screenshot_20221211_030942.png', '56 NAIROBI'),
('PIUS', 'BETT', 'PIUS@GMAIL.COM', 112345678, 'C:\\fakepath\\Screenshot_20221211_030942.png', '56 NAIROBI'),
('JULIET', 'SONGOK', 'JULIET@GMAIL.COM', 123456, 'C:\\fakepath\\Screenshot_20221211_124535.png', 'NAIROBI');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
