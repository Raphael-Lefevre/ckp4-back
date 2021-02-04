/*
  Warnings:

  - You are about to alter the column `review` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `description` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Hotel` ADD COLUMN     `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Review` MODIFY `review` DECIMAL(65,30) NOT NULL;
