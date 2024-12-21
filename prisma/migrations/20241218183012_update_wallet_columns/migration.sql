/*
  Warnings:

  - Added the required column `availableCash` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "availableCash" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currentAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "invested" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "monthlyAport" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "profitPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "profits" DOUBLE PRECISION NOT NULL DEFAULT 0;
