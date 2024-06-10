
CREATE DATABASE IF NOT EXISTS `safe`;

USE `safe`;

SELECT 4;

SHOW databases;

CREATE TABLE
    `users` (
        `id` varchar(64) NOT NULL,
        `email` varchar(64) DEFAULT NULL,
        `password` varchar(512) NOT NULL
    );

CREATE TABLE
    `passwords` (
        `id` varchar(64) NOT NULL,
        `useridfk` varchar(64) DEFAULT NULL,
        `title` varchar(64) NOT NULL,
        `url` varchar(64) NOT NULL,
        `username` varchar(64) NOT NULL,
        `password` varchar(512) NOT NULL,
        `description` varchar(64) DEFAULT NULL,
        `category` varchar(64) DEFAULT NULL
    );

ALTER TABLE `users` ADD PRIMARY KEY (`id`);

ALTER TABLE `passwords` ADD PRIMARY KEY (`id`),
ADD KEY `fk_password_user` (`useridfk`);

ALTER TABLE `password` ADD CONSTRAINT `fk_password_user` FOREIGN KEY (`useridfk`) REFERENCES `users` (`id`);
