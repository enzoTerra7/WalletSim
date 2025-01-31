import { db } from "@/db";
import { api } from "@/lib/axios";
import { StockByIdResponse } from "@/trpc/routes/tickets/types";

export async function GET() {
  try {
    const users = await db.users.findMany();

    if (!users || users.length === 0) {
      return Response.json({ message: "No users found" }, { status: 404 });
    }

    for (const user of users) {
      const stocks = await db.stocks.findMany({
        where: { walletId: user.activeWallet },
      });

      if (!stocks || stocks.length === 0) {
        continue; // Passa para o próximo usuário se não houver stocks
      }

      const ticketCache: Record<string, StockByIdResponse> = {};

      // Atualizar as ações e a carteira em uma transação
      await db.$transaction(async (tx) => {
        let totalCurrentAmountDelta = 0; // Soma das alterações em currentAmount

        const updates = stocks.map(async (stock) => {
          // Verifica se o ticket já está no cache
          let stockData = ticketCache[stock.ticket];
          if (!stockData) {
            const { data } = await api.get<StockByIdResponse>(
              `/quote/${stock.ticket}`
            );
            ticketCache[stock.ticket] = data;
            stockData = data;
          }

          // Calcula os novos valores
          const marketPrice = stockData.results[0].regularMarketPrice;
          const marketChange = stockData.results[0].regularMarketChange;
          const newProfit =
            (marketChange - stock.averagePrice) * stock.quantity;
          const profitPercentage =
            ((marketChange - stock.averagePrice) * 100) / stock.averagePrice;

          const newTotalStockUsed = marketPrice * stock.quantity;

          totalCurrentAmountDelta += newTotalStockUsed;

          // Atualiza a ação
          await tx.stocks.update({
            where: { id: stock.id },
            data: {
              currentPrice: marketPrice,
              profit: newProfit,
              profitPercentage,
            },
          });
        });

        await Promise.all(updates);

        // Obtém a carteira atual para recalcular o profitPercentage
        const wallet = await tx.wallet.findUniqueOrThrow({
          where: { id: user.activeWallet },
        });

        const newCurrentAmount = totalCurrentAmountDelta;
        const newProfits = newCurrentAmount - wallet.invested;

        // Calcula o novo profitPercentage
        const newProfitPercentage =
          wallet.invested > 0 ? (newProfits * 100) / wallet.invested : 0;

        // Atualiza a carteira
        await tx.wallet.update({
          where: { id: user.activeWallet },
          data: {
            currentAmount: newCurrentAmount,
            profits: newProfits - 100,
            profitPercentage: newProfitPercentage,
          },
        });
      });
    }

    return Response.json({ message: "Tickets updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating tickets:", error);
    return Response.json(
      { message: "Tickets not updated", error: error },
      { status: 500 }
    );
  }
}
