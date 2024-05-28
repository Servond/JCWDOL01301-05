/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventImage` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_eventId_fkey`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `eventImage` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `image`;
