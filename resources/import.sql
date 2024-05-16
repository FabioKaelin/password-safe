START TRANSACTION;

CREATE DATABASE IF NOT EXISTS `safe`;

use `safe`;

CREATE TABLE
    `users` (
        `id` varchar(64) NOT NULL,
        `name` varchar(64) DEFAULT NULL,
        `password` varchar(512) NOT NULL,
        `role` varchar(64) DEFAULT NULL,
    );

CREATE TABLE
    `passwords` (
        `id` varchar(64) NOT NULL,
        `useridfk` varchar(64) DEFAULT NULL,
        `password` varchar(512) NOT NULL,
        `description` varchar(64) DEFAULT NULL,
    );

ALTER TABLE `users` ADD PRIMARY KEY (`id`);


COMMIT;