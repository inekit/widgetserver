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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nick` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'1','1','1'),(4,'i@gmail.com','$2a$10$xHkY65lw5aukVuqg6xcKXu8aEDcYWQ.UNn3mnjJw9L0yfycGbSKha','nikita'),(6,'ugy','$2a$10$ivVmIOetE2.2DKiirixBhOtToGIi0ZmvKFV6.V35pHhK03MMKZzm6','gyu'),(8,'334','$2a$10$rScMvCmaMX1T9ojk3m2EIOS90.JeKrJbXrDUXIUc86WAU4qPXFcgK','hh'),(12,'userine','$2a$10$CxXvCHq9sdokbPzP4LjCHeEa04jXDok8EYq9WPvtaV5wU0zVXpzQG','hh'),(15,'userinem','$2a$10$CxXvCHq9sdokbPzP4LjCHeEa04jXDok8EYq9WPvtaV5wU0zVXpzQG','hh'),(17,'i1@gmail.com','$2a$10$CxXvCHq9sdokbPzP4LjCHeEa04jXDok8EYq9WPvtaV5wU0zVXpzQG','m'),(18,'bb','$2a$10$p4mE3C/5wr8P/QueVfWYI.bfQS3ehJD6ly.GBZpB8.lJK89C5T7PS','eeee'),(20,'f`@ffr.v','$2a$10$p4mE3C/5wr8P/QueVfWYI.bfQS3ehJD6ly.GBZpB8.lJK89C5T7PS','ee'),(23,'email','$2a$10$nvg0EyYKUc2niEmeZSQZzuhaULAwfND2n2sfc6pDSXtf5OZVKkZgW','ee'),(24,'emailg','$2a$10$nvg0EyYKUc2niEmeZSQZzuhaULAwfND2n2sfc6pDSXtf5OZVKkZgW','eej'),(25,'bhb','$2a$10$nvg0EyYKUc2niEmeZSQZzuM.qQ9.B6U90qxgimDUwPl.cuSnDqphy','ergergrge'),(27,'hjh','$2a$10$nvg0EyYKUc2niEmeZSQZzuu12eYsMQ3r2O6/i9mpbF64IZ8GAKDjG','rgeg'),(28,'jeuj','$2a$10$nvg0EyYKUc2niEmeZSQZzuGvTya/Pv8w8akylS6.UriV3mW48FtbC','ujyjj'),(31,'gwrtgethe','$2a$10$nvg0EyYKUc2niEmeZSQZzuGvTya/Pv8w8akylS6.UriV3mW48FtbC','ujyjj'),(32,'gwrtgetherrg','$2a$10$nvg0EyYKUc2niEmeZSQZzuGvTya/Pv8w8akylS6.UriV3mW48FtbC','ujyjj'),(35,'i2@gmail.com','$2a$10$nvg0EyYKUc2niEmeZSQZzuGvTya/Pv8w8akylS6.UriV3mW48FtbC','kg'),(39,'i2шгр@gmail.com','$2a$10$nvg0EyYKUc2niEmeZSQZzuGvTya/Pv8w8akylS6.UriV3mW48FtbC','s'),(42,',jvlbh','$2a$10$nvg0EyYKUc2niEmeZSQZzuGvTya/Pv8w8akylS6.UriV3mW48FtbC','jk'),(44,'i@gmail.comfv','$2a$10$SQwjF1FnfgQxNWf9heMzyefKmq1jf1mtHvuEC2ET0VPoI.TUw77iK','vr'),(45,'4jyy','$2a$10$wI6y6kAJmK28d/SdxsuoYuo76pIIobpmCQitclnyfO/Bpei/he3nO','trhhrt');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
