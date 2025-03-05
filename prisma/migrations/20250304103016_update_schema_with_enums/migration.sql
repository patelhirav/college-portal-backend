/*
  Warnings:

  - You are about to alter the column `branch` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `branch` on the `assignment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `status` on the `leave` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - You are about to alter the column `branch` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Leave_userId_fkey` ON `leave`;

-- AlterTable
ALTER TABLE `admin` ADD COLUMN `superAdminId` VARCHAR(191) NULL,
    MODIFY `branch` ENUM('COMPUTER_SCIENCE', 'INFORMATION_TECHNOLOGY', 'MECHANICAL', 'ELECTRICAL', 'CIVIL', 'ARTIFICIAL_INTELLIGENCE') NOT NULL;

-- AlterTable
ALTER TABLE `assignment` MODIFY `branch` ENUM('COMPUTER_SCIENCE', 'INFORMATION_TECHNOLOGY', 'MECHANICAL', 'ELECTRICAL', 'CIVIL', 'ARTIFICIAL_INTELLIGENCE') NOT NULL;

-- AlterTable
ALTER TABLE `leave` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `user` MODIFY `branch` ENUM('COMPUTER_SCIENCE', 'INFORMATION_TECHNOLOGY', 'MECHANICAL', 'ELECTRICAL', 'CIVIL', 'ARTIFICIAL_INTELLIGENCE') NOT NULL,
    MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_superAdminId_fkey` FOREIGN KEY (`superAdminId`) REFERENCES `SuperAdmin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
