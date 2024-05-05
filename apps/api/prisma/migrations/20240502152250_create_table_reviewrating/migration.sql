/*
  Warnings:

  - You are about to alter the column `eventLocationName` on the `event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `eventLocationURL` on the `event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `eventImage` on the `event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `eventLocationName` VARCHAR(50) NOT NULL,
    MODIFY `eventLocationURL` VARCHAR(100) NOT NULL,
    MODIFY `eventDescription` VARCHAR(255) NOT NULL,
    MODIFY `eventImage` VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE `ReviewRating` (
    `ratingStar` INTEGER NOT NULL,
    `reviewComment` VARCHAR(255) NOT NULL,
    `suggestion` VARCHAR(255) NOT NULL,
    `userId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReviewRating` ADD CONSTRAINT `ReviewRating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewRating` ADD CONSTRAINT `ReviewRating_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
