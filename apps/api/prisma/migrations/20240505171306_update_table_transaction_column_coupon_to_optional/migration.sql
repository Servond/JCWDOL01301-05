-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_couponId_fkey`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `couponId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
