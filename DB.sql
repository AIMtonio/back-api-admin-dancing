
use admin_dancing;

/*
CREATE TABLE `admin_dancing`.`rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NOT NULL,
  `tipo_rol` VARCHAR(45) NOT NULL,
  `estatus` INT(1) NOT NULL,
  `user_alta` VARCHAR(45) DEFAULT NULL,
  `fecha_alta` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `user_actualizacion` VARCHAR(45) DEFAULT NULL,
  `fecha_actualizacion` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
);
*/

CREATE TABLE `admin_dancing`.`cat_user` (
  `id_cat_user` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `status` INT(1) NOT NULL,
  `create_by` VARCHAR(45) DEFAULT NULL,
  `create_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(45) DEFAULT NULL,
  `update_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_cat_user`)
);

CREATE TABLE `admin_dancing`.`client` (
  `id_client` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45),
  `lastname` VARCHAR(45),
  `birthdate` DATE NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `uuid` VARCHAR(36) NOT NULL,
  `status` INT(1) DEFAULT 1,
  `create_by` VARCHAR(45) DEFAULT NULL,
  `create_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(45) DEFAULT NULL,
  `update_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_client`)
);

CREATE TABLE `admin_dancing`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) DEFAULT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `id_cat_user` INT DEFAULT NULL,
  `status` INT(1) DEFAULT 0,
  `create_by` VARCHAR(45) DEFAULT NULL,
  `create_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(45) DEFAULT NULL,
  `update_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  FOREIGN KEY (`id_cat_user`) REFERENCES `admin_dancing`.`cat_user`(`id_cat_user`)
);

CREATE TABLE `admin_dancing`.`class` (
  `id_class` INT NOT NULL AUTO_INCREMENT,
  `id_client` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `status` INT(1) NOT NULL,
  `create_by` VARCHAR(45) DEFAULT NULL,
  `create_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(45) DEFAULT NULL,
  `update_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_clase`),
  FOREIGN KEY (`id_maestro`) REFERENCES `admin_dancing`.`maestro`(`id_maestro`)
);

CREATE TABLE `admin_dancing`.`payment` (
  `id_payment` INT NOT NULL AUTO_INCREMENT,
  `id_class` INT NOT NULL,
  `id_client` INT NOT NULL,
  `status_payment` VARCHAR(45) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `payment_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `status` INT(1) NOT NULL,
  `create_by` VARCHAR(45) DEFAULT NULL,
  `create_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_by` VARCHAR(45) DEFAULT NULL,
  `update_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_payment`),
  FOREIGN KEY (`id_client`) REFERENCES `admin_dancing`.`client`(`id_client`),
  FOREIGN KEY (`id_class`) REFERENCES `admin_dancing`.`class`(`id_class`)
);

INSERT INTO `admin_dancing`.`cat_user` (`description`, `status`, `create_by`, `create_at`)
VALUES 	('Admin', 1, 'admin', now()),
		    ('Alumno', 1, 'admin', now()),
		    ('Maestro', 1, 'admin', now());




