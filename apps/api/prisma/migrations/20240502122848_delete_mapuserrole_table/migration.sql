/*
  Warnings:

  - You are about to drop the `mapuserrole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mapuserrole` DROP FOREIGN KEY `MapUserRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `mapuserrole` DROP FOREIGN KEY `MapUserRole_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roleId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `mapuserrole`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
