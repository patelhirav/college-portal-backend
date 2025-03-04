-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    ALTER COLUMN `semester` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
