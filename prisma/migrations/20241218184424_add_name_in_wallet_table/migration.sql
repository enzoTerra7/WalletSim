/*
  Warnings:

  - Added the required column `name` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "name" TEXT NOT NULL;
