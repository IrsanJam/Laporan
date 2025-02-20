-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: Real Time Chat
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `marketing`
--

DROP TABLE IF EXISTS `marketing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marketing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketing`
--

LOCK TABLES `marketing` WRITE;
/*!40000 ALTER TABLE `marketing` DISABLE KEYS */;
INSERT INTO `marketing` VALUES (1,'Alfandy'),(2,'Merry'),(3,'Danang');
/*!40000 ALTER TABLE `marketing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omset`
--

DROP TABLE IF EXISTS `omset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omset` (
  `id` int NOT NULL AUTO_INCREMENT,
  `omzet` int NOT NULL,
  `marketing` varchar(255) NOT NULL,
  `bulan` varchar(255) NOT NULL,
  `komisi` varchar(255) NOT NULL,
  `komisi_nominal` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omset`
--

LOCK TABLES `omset` WRITE;
/*!40000 ALTER TABLE `omset` DISABLE KEYS */;
INSERT INTO `omset` VALUES (13,635000000,'Alfandy','Mei','10%',698500000),(14,270000000,'Merry','Juni','5%',283500000),(15,320000,'Danang','Mei','0%',320000),(16,1000000000,'Alfandy','Juli','10%',1100000000),(17,9000000,'Merry','Agustus','0%',9000000);
/*!40000 ALTER TABLE `omset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pembayaran`
--

DROP TABLE IF EXISTS `pembayaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pembayaran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `penjualanId` int NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `paymentDate` date DEFAULT NULL,
  `isPaid` tinyint NOT NULL DEFAULT '0',
  `remainingBalance` decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `FK_6c3f0a009512001848bb822563f` (`penjualanId`),
  CONSTRAINT `FK_6c3f0a009512001848bb822563f` FOREIGN KEY (`penjualanId`) REFERENCES `penjualan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pembayaran`
--

LOCK TABLES `pembayaran` WRITE;
/*!40000 ALTER TABLE `pembayaran` DISABLE KEYS */;
INSERT INTO `pembayaran` VALUES (3,13,50000.00,'2025-02-01',0,999979870.00),(4,14,8000000.00,'2025-08-09',0,1035000.00);
/*!40000 ALTER TABLE `pembayaran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penjualan`
--

DROP TABLE IF EXISTS `penjualan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penjualan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_number` varchar(255) NOT NULL,
  `date` timestamp NOT NULL,
  `cargo_fee` decimal(10,0) NOT NULL DEFAULT '0',
  `total_balance` decimal(10,0) NOT NULL DEFAULT '0',
  `grand_total` decimal(10,0) NOT NULL DEFAULT '0',
  `metode_pembayaran` varchar(255) NOT NULL,
  `marketing_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_461a70515ba5b67ebf3a2df20f` (`transaction_number`),
  KEY `FK_4060ee1c838c0b0b776125e76f2` (`marketing_id`),
  CONSTRAINT `FK_4060ee1c838c0b0b776125e76f2` FOREIGN KEY (`marketing_id`) REFERENCES `marketing` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penjualan`
--

LOCK TABLES `penjualan` WRITE;
/*!40000 ALTER TABLE `penjualan` DISABLE KEYS */;
INSERT INTO `penjualan` VALUES (13,'TRX001','2023-07-03 07:00:00',29870,1000000000,1000029870,'Kredit',1),(14,'TRX002','2023-08-03 07:00:00',35000,9000000,9035000,'Cash',2);
/*!40000 ALTER TABLE `penjualan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Real Time Chat'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-02  7:48:06
