import { db } from "@/db";
import { api } from "@/lib/axios";
import { StockByIdResponse } from "@/trpc/routes/tickets/types";

const ticket: Array<StockByIdResponse> = [];

export async function GET() {
  try {
    const users = await db.users.findMany();

    if (!users) {
      return;
    }

    for (const user of users) {
      const stocks = await db.stocks.findMany({
        where: {
          walletId: user.activeWallet,
        },
      });

      if (!stocks) {
        return;
      }

      db.$transaction(async (tx) => {
        for (const stock of stocks) {
          const savedStock = ticket.find(
            (s) => s.results[0].symbol === stock.ticket
          );
          if (!savedStock) {
            const { data } = await api.get<StockByIdResponse>(
              `/quote/${stock.ticket}`
            );

            ticket.push(data);

            const newProfit =
              (data.results[0].regularMarketChange - stock.averagePrice) *
              stock.quantity;

            await tx.stocks.update({
              where: {
                id: stock.id,
              },
              data: {
                currentPrice: data.results[0].regularMarketPrice,
                profit: newProfit,
                profitPercentage:
                  ((data.results[0].regularMarketChange - stock.averagePrice) *
                    100) /
                  stock.averagePrice,
              },
            });

            const oldTotalStockUsed = stock.averagePrice * stock.quantity;
            const newTotalStockUsed =
              data.results[0].regularMarketPrice * stock.quantity;

            await tx.wallet.update({
              where: {
                id: stock.walletId,
              },
              data: {
                currentAmount: {
                  increment: newTotalStockUsed - oldTotalStockUsed,
                },
                profits: { increment: newProfit - stock.profit },
              },
            });
          } else {
            const newProfit =
              (savedStock.results[0].regularMarketChange - stock.averagePrice) *
              stock.quantity;

            await tx.stocks.update({
              where: {
                id: stock.id,
              },
              data: {
                currentPrice: savedStock.results[0].regularMarketPrice,
                profit: newProfit,
                profitPercentage:
                  ((savedStock.results[0].regularMarketChange -
                    stock.averagePrice) *
                    100) /
                  stock.averagePrice,
              },
            });

            const oldTotalStockUsed = stock.averagePrice * stock.quantity;
            const newTotalStockUsed =
              savedStock.results[0].regularMarketPrice * stock.quantity;

            await tx.wallet.update({
              where: {
                id: stock.walletId,
              },
              data: {
                currentAmount: {
                  increment: newTotalStockUsed - oldTotalStockUsed,
                },
                profits: { increment: newProfit - stock.profit },
              },
            });
          }
        }
      });

      return Response.json(
        {
          message: "Tickets updated",
        },
        {
          status: 200,
        }
      );
    }
  } catch {
    return Response.json(
      {
        message: "Tickets not updated",
      },
      { status: 500 }
    );
  }
}
