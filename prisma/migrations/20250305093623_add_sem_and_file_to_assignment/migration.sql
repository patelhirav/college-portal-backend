/*
  Warnings:

  - Added the required column `sem` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Admin_superAdminId_fkey` ON `admin`;

-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Leave_userId_fkey` ON `leave`;

-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `fileUrl` VARCHAR(191) NULL,
    ADD COLUMN `sem` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_Admin_FK` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_superAdminId_fkey` FOREIGN KEY (`superAdminId`) REFERENCES `SuperAdmin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
