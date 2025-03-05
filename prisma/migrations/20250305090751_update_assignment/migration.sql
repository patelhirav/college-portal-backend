/*
  Warnings:

  - The values [INFORMATION_TECHNOLOGY,ARTIFICIAL_INTELLIGENCE] on the enum `User_branch` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fileUrl` on the `assignment` table. All the data in the column will be lost.
  - The values [INFORMATION_TECHNOLOGY,ARTIFICIAL_INTELLIGENCE] on the enum `User_branch` will be removed. If these variants are still used in the database, this will fail.
  - The values [INFORMATION_TECHNOLOGY,ARTIFICIAL_INTELLIGENCE] on the enum `User_branch` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Admin_superAdminId_fkey` ON `admin`;

-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Leave_userId_fkey` ON `leave`;

-- AlterTable
ALTER TABLE `admin` MODIFY `branch` ENUM('COMPUTER_SCIENCE', 'ELECTRICAL', 'MECHANICAL', 'CIVIL', 'CHEMICAL') NOT NULL;

-- AlterTable
ALTER TABLE `assignment` DROP COLUMN `fileUrl`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `branch` ENUM('COMPUTER_SCIENCE', 'ELECTRICAL', 'MECHANICAL', 'CIVIL', 'CHEMICAL') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `branch` ENUM('COMPUTER_SCIENCE', 'ELECTRICAL', 'MECHANICAL', 'CIVIL', 'CHEMICAL') NOT NULL;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_Admin_FK` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_superAdminId_fkey` FOREIGN KEY (`superAdminId`) REFERENCES `SuperAdmin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
