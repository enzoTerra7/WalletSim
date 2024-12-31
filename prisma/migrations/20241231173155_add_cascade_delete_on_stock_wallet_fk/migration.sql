-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_walletId_fkey";

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
