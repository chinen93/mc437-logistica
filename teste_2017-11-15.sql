# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: teste
# Generation Time: 2017-11-15 05:06:06 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table atividade
# ------------------------------------------------------------

DROP TABLE IF EXISTS `atividade`;

CREATE TABLE `atividade` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_pacote` int(11) unsigned NOT NULL,
  `descricao` text NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_pacote` (`id_pacote`),
  CONSTRAINT `atividade_ibfk_1` FOREIGN KEY (`id_pacote`) REFERENCES `pacote` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table distancia
# ------------------------------------------------------------

DROP TABLE IF EXISTS `distancia`;

CREATE TABLE `distancia` (
  `partida` varchar(2) NOT NULL DEFAULT '',
  `destino` varchar(2) NOT NULL DEFAULT '',
  `distancia` int(11) NOT NULL,
  KEY `partida` (`partida`),
  KEY `destino` (`destino`),
  CONSTRAINT `distancia_ibfk_1` FOREIGN KEY (`partida`) REFERENCES `estado` (`sigla`),
  CONSTRAINT `distancia_ibfk_2` FOREIGN KEY (`destino`) REFERENCES `estado` (`sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `distancia` WRITE;
/*!40000 ALTER TABLE `distancia` DISABLE KEYS */;

INSERT INTO `distancia` (`partida`, `destino`, `distancia`)
VALUES
	('SP','SP',2),
	('SP','RJ',3),
	('RJ','SP',4),
	('RJ','RJ',2),
	('SE','RJ',16),
	('RJ','SE',16),
	('SP','SE',18),
	('SE','SP',18);

/*!40000 ALTER TABLE `distancia` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table endereco
# ------------------------------------------------------------

DROP TABLE IF EXISTS `endereco`;

CREATE TABLE `endereco` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cep` int(8) NOT NULL,
  `numero` int(11) NOT NULL,
  `estado` varchar(2) NOT NULL DEFAULT '',
  `cidade` text NOT NULL,
  `endereco` text NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `estado` (`estado`),
  CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `estado` (`sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table estado
# ------------------------------------------------------------

DROP TABLE IF EXISTS `estado`;

CREATE TABLE `estado` (
  `sigla` varchar(2) NOT NULL DEFAULT '',
  `nome` text NOT NULL,
  PRIMARY KEY (`sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;

INSERT INTO `estado` (`sigla`, `nome`)
VALUES
	('AC','Acre'),
	('AL','Alagoas'),
	('AM','Amazonas'),
	('AP','Amapá'),
	('BA','Bahia'),
	('CE','Ceará'),
	('DF','Distrito Federal'),
	('ES','Espirito Santo'),
	('GO','Goiás'),
	('MA','Maranhão'),
	('MG','Minas Gerais'),
	('MS','Mato Grosso do Sul'),
	('MT','Mato Grosso'),
	('PA','Pará'),
	('PB','Paraíba'),
	('PE','Pernambuco'),
	('PI','Piauí'),
	('RJ','Rio de Janeiro'),
	('RN','Rio Grande do Norte'),
	('RO','Rondônia'),
	('RR','Roraima'),
	('RS','Rio Grande do Sul'),
	('SC','Santa Catarina'),
	('SE','Sergipe'),
	('SP','São Paulo'),
	('TO','Tocantins');

/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pacote
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pacote`;

CREATE TABLE `pacote` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_transportadora` int(11) unsigned NOT NULL,
  `id_site` int(11) unsigned NOT NULL,
  `id_partida` int(11) unsigned NOT NULL,
  `id_destino` int(11) unsigned NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `destinatario` text NOT NULL,
  `preco` float DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_transportadora` (`id_transportadora`),
  KEY `id_site` (`id_site`),
  KEY `id_partida` (`id_partida`),
  CONSTRAINT `pacote_ibfk_1` FOREIGN KEY (`id_transportadora`) REFERENCES `transportadora` (`id`),
  CONSTRAINT `pacote_ibfk_2` FOREIGN KEY (`id_site`) REFERENCES `site` (`id`),
  CONSTRAINT `pacote_ibfk_3` FOREIGN KEY (`id_partida`) REFERENCES `endereco` (`id`),
  CONSTRAINT `pacote_ibfk_4` FOREIGN KEY (`id_partida`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table site
# ------------------------------------------------------------

DROP TABLE IF EXISTS `site`;

CREATE TABLE `site` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` text NOT NULL,
  `email` text,
  `id_endereco` int(11) unsigned DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_endereco` (`id_endereco`),
  CONSTRAINT `site_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table transportadora
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transportadora`;

CREATE TABLE `transportadora` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nome` text,
  `taxa_distancia` float unsigned NOT NULL,
  `taxa_tamanho` float unsigned NOT NULL,
  `taxa_fixa` float unsigned DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `transportadora` WRITE;
/*!40000 ALTER TABLE `transportadora` DISABLE KEYS */;

INSERT INTO `transportadora` (`id`, `nome`, `taxa_distancia`, `taxa_tamanho`, `taxa_fixa`, `created`, `modified`)
VALUES
	(1,'Sedex',2,0.00009,5,'2017-11-13 23:02:04','2017-11-14 00:21:57'),
	(2,'Fedex',3,0.00004,6.7,'2017-11-13 23:02:56','2017-11-14 00:22:01'),
	(3,'DHL',5,0.00001,2,'2017-11-13 23:25:22','2017-11-14 00:22:04');

/*!40000 ALTER TABLE `transportadora` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table transportadora_estado
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transportadora_estado`;

CREATE TABLE `transportadora_estado` (
  `estado` varchar(2) NOT NULL DEFAULT '',
  `id_transportadora` int(11) unsigned NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`estado`,`id_transportadora`),
  KEY `id_transportadora` (`id_transportadora`),
  CONSTRAINT `transportadora_estado_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `estado` (`sigla`),
  CONSTRAINT `transportadora_estado_ibfk_2` FOREIGN KEY (`id_transportadora`) REFERENCES `transportadora` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `transportadora_estado` WRITE;
/*!40000 ALTER TABLE `transportadora_estado` DISABLE KEYS */;

INSERT INTO `transportadora_estado` (`estado`, `id_transportadora`, `created`)
VALUES
	('RJ',1,'2017-11-13 23:06:53'),
	('RJ',2,'2017-11-13 23:22:45'),
	('RJ',3,'2017-11-13 23:25:41'),
	('SE',2,'2017-11-13 23:23:02'),
	('SP',1,'2017-11-13 23:06:41'),
	('SP',3,'2017-11-13 23:25:47');

/*!40000 ALTER TABLE `transportadora_estado` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
