/*
  Warnings:

  - Added the required column `quantity` to the `stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stocks" ADD COLUMN     "quantity" INTEGER NOT NULL;
