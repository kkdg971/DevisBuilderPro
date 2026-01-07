CREATE TABLE `artisans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`entreprise` varchar(255),
	`siret` varchar(14),
	`telephone` varchar(20),
	`adresse` text,
	`codePostal` varchar(10),
	`ville` varchar(100),
	`metiers` json NOT NULL,
	`zoneIntervention` json,
	`description` text,
	`siteWeb` varchar(255),
	`verified` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `artisans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`reference` varchar(50) NOT NULL,
	`type` enum('corps-metier','projet') NOT NULL,
	`corpsDeMetier` json,
	`projetRenovation` varchar(50),
	`answers` json NOT NULL,
	`devisCalcule` json NOT NULL,
	`totalHT` decimal(10,2) NOT NULL,
	`totalTTC` decimal(10,2) NOT NULL,
	`statut` enum('brouillon','publie','en-cours','accepte','refuse','archive') NOT NULL DEFAULT 'brouillon',
	`adresseChantier` text,
	`codePostalChantier` varchar(10),
	`villeChantier` varchar(100),
	`datePublication` timestamp,
	`dateExpiration` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `devis_id` PRIMARY KEY(`id`),
	CONSTRAINT `devis_reference_unique` UNIQUE(`reference`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('nouveau-devis','nouvelle-reponse','reponse-acceptee','reponse-refusee','systeme') NOT NULL,
	`titre` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`lienDevis` int,
	`lienReponse` int,
	`lue` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reponses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`devisId` int NOT NULL,
	`artisanId` int NOT NULL,
	`message` text NOT NULL,
	`prixPropose` decimal(10,2) NOT NULL,
	`delaiPropose` varchar(100),
	`detailsSupplementaires` json,
	`statut` enum('envoyee','vue','acceptee','refusee') NOT NULL DEFAULT 'envoyee',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reponses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('particulier','artisan','admin') NOT NULL DEFAULT 'particulier';