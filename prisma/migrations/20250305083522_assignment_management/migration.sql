/*
  Warnings:

  - You are about to drop the column `semester` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `assignment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Admin_superAdminId_fkey` ON `admin`;

-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- DropIndex
DROP INDEX `Leave_userId_fkey` ON `leave`;

-- AlterTable
ALTER TABLE `admin` ADD COLUMN `canAddAssignments` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `assignment` DROP COLUMN `semester`,
    DROP COLUMN `updatedAt`;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_superAdminId_fkey` FOREIGN KEY (`superAdminId`) REFERENCES `SuperAdmin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
