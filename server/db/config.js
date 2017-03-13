// CREATE TABLE `monopoly`.`fb_user` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `fbID` VARCHAR(45) NOT NULL,
//   `displayname` VARCHAR(45) NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE INDEX `fbID_UNIQUE` (`fbID` ASC));
// DROP TABLE IF EXISTS `Games`;

// CREATE TABLE `monopoly`.`users` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `username` VARCHAR(45) NOT NULL,
//   `displayname` VARCHAR(45) NOT NULL,
//   `password` TEXT NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE INDEX `username_UNIQUE` (`username` ASC),
//   UNIQUE INDEX `displayname_UNIQUE` (`displayname` ASC));
//
// CREATE TABLE `monopoly`.`game` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `gstate` JSON NOT NULL,
//   `info` JSON NOT NULL,
//   PRIMARY KEY (`id`));
//
//
// CREATE TABLE `monopoly`.`players` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `playerID` TEXT NOT NULL,
//   `gameID` INT NOT NULL,
//   PRIMARY KEY (`id`));

