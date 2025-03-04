/*
  Warnings:

  - You are about to drop the column `role` on the `admin` table. All the data in the column will be lost.
  - Added the required column `semester` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Assignment_adminId_fkey` ON `assignment`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `assignment` ADD COLUMN `semester` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `semester` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
