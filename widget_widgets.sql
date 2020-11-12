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
-- Table structure for table `widgets`
--

DROP TABLE IF EXISTS `widgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `widgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `platform` varchar(45) NOT NULL,
  `type` int NOT NULL,
  `text` varchar(45) NOT NULL,
  `discription` varchar(45) DEFAULT NULL,
  `phone` varchar(80) NOT NULL,
  `message` varchar(45) DEFAULT NULL,
  `key` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_UNIQUE` (`key`),
  KEY `fk_wu_idx` (`client_id`),
  CONSTRAINT `fk_widget_user` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widgets`
--

LOCK TABLES `widgets` WRITE;
/*!40000 ALTER TABLE `widgets` DISABLE KEYS */;
INSERT INTO `widgets` VALUES (7,4,NULL,'wh',1,'text','dics','79779246763','mes',NULL),(15,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщение',NULL),(16,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщение',NULL),(17,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщение',NULL),(18,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщnение',NULL),(19,4,'erbaebf','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщение',NULL),(20,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщеcsdcdscddsние',NULL),(21,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщениеddd',NULL),(22,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщениеddd',NULL),(23,4,'Никита','whatsapp',1,'Нажми','Это описание','79299642127','Это сообщеerrние',NULL),(24,4,'1234','whatsapp',1,'Нажми','Это описание','79299642222','Это сообщение 1',NULL);
/*!40000 ALTER TABLE `widgets` ENABLE KEYS */;
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
