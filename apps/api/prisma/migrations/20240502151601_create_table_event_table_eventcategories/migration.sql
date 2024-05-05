-- CreateTable
CREATE TABLE `EventCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventCategoriesName` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventName` VARCHAR(191) NOT NULL,
    `eventDateTime` DATETIME(3) NOT NULL,
    `eventLocationName` VARCHAR(191) NOT NULL,
    `eventLocationURL` VARCHAR(191) NOT NULL,
    `eventDescription` VARCHAR(191) NOT NULL,
    `eventImage` VARCHAR(191) NOT NULL,
    `eventBookingStart` DATETIME(3) NOT NULL,
    `eventBookingEnd` DATETIME(3) NOT NULL,
    `eventTnc` VARCHAR(191) NOT NULL,
    `eventMaxCapacity` INTEGER NOT NULL,
    `isFree` BOOLEAN NOT NULL,
    `eventCategoriesId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_eventCategoriesId_fkey` FOREIGN KEY (`eventCategoriesId`) REFERENCES `EventCategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
