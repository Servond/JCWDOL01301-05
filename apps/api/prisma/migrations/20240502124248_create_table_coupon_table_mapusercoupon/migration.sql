-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `couponKey` VARCHAR(50) NOT NULL,
    `couponName` VARCHAR(50) NOT NULL,
    `couponDesc` VARCHAR(255) NOT NULL,
    `couponStartDate` DATETIME(3) NOT NULL,
    `couponEndDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MapUserCoupon` (
    `userId` INTEGER NOT NULL,
    `couponId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `couponId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MapUserCoupon` ADD CONSTRAINT `MapUserCoupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MapUserCoupon` ADD CONSTRAINT `MapUserCoupon_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
