CREATE DATABASE  IF NOT EXISTS `widget` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `widget`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: widget
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users_sessions`
--

DROP TABLE IF EXISTS `users_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_sessions` (
  `session_id` varchar(100) NOT NULL,
  `expires` int DEFAULT NULL,
  `data` mediumtext,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_sessions`
--

LOCK TABLES `users_sessions` WRITE;
/*!40000 ALTER TABLE `users_sessions` DISABLE KEYS */;
INSERT INTO `users_sessions` VALUES ('AG-NdGUSblxaAOWYtlLWs046jJh3W0ct',1605216830,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2020-11-12T21:33:49.860Z\",\"httpOnly\":false,\"path\":\"/\"}}'),('BEnelZ89k5GhNVrDX0M15ufpx3iM2vKp',1605216841,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2020-11-12T21:34:00.787Z\",\"httpOnly\":false,\"path\":\"/\"}}'),('dA7dxYeY95blFUVQpLifOS4Xnrd0OYjd',1605217016,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2020-11-12T21:36:55.881Z\",\"httpOnly\":false,\"path\":\"/\"}}'),('eq_5eWs6FcBaBcHxuuce2f9ny7IaJdel',1605217020,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2020-11-12T21:37:00.174Z\",\"httpOnly\":false,\"path\":\"/\"}}'),('s5T8UUgYRmnuH20DaxE-RMzl6dxgRfb4',1605216833,'{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2020-11-12T21:33:52.772Z\",\"httpOnly\":false,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `users_sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-13  0:39:46
