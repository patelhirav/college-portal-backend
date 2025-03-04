-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
