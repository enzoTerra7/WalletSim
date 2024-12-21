import { privateProcedure, router } from "@/trpc/trpc";
import { CreateWalletSchema, ExchangeTicketSchema } from "./schemas";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { generateJwt } from "@/lib/session";
import { defaultUsersSelect } from "../defaultsSelects";
// import { api } from "@/lib/axios";

export const walletRouter = router({
  create: privateProcedure
    .input(CreateWalletSchema)
    .mutation(async ({ ctx, input }) => {
      const wallet = await db.wallet.create({
        data: {
          ...input,
          currentAmount: input.availableCash,
          usersId: ctx.userId,
        },
      });

      const user = await db.users.update({
        where: {
          id: ctx.userId,
        },
        data: {
          activeWallet: wallet.id,
        },
        select: defaultUsersSelect,
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const token = await generateJwt({
        id: user.id,
        email: user.email,
        name: user.name,
        wallets: user.Wallet,
        activeWallet: user.activeWallet,
        hasWallet: true,
      });

      return {
        success: true,
        statusCode: 200,
        message: "Wallet created successful",
        data: {
          user,
          token,
        },
      };
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const wallets = await db.wallet.findMany({
      where: {
        usersId: ctx.userId,
      },
      select: {
        name: true,
        id: true,
        currentAmount: true,
        profitPercentage: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Get all wallets",
      data: wallets,
    };
  }),

  getWalletStocks: privateProcedure.query(async ({ ctx }) => {
    const stocks = await db.stocks.findMany({
      where: {
        walletId: ctx.activeWalletId,
      },
      select: {
        averagePrice: true,
        currentPrice: true,
        id: true,
        name: true,
        profitPercentage: true,
        profit: true,
        ticket: true,
        quantity: true,
        logo: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Get all stocks",
      data: {
        stocks,
      },
    };
  }),

  postNewInvestment: privateProcedure
    .input(ExchangeTicketSchema)
    .mutation(async ({ ctx, input }) => {
      const wallet = await db.wallet.findUnique({
        where: {
          id: ctx.activeWalletId,
          AND: {
            usersId: ctx.userId,
          },
        },
        select: {
          Stocks: {
            select: {
              id: true,
              ticket: true,
              averagePrice: true,
              quantity: true,
            },
          },
          currentAmount: true,
          availableCash: true,
          invested: true,
        },
      });

      if (!wallet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet not found",
        });
      }

      const { Stocks } = wallet;

      const currentStock = Stocks.find(
        (stock) => stock.ticket === input.ticket
      );

      if (!currentStock) {
        const newStocksAndWallet = await db.$transaction(async (tx) => {
          const stock = await tx.stocks.create({
            data: {
              averagePrice: input.currentPrice,
              currentPrice: input.currentPrice,
              name: input.name,
              quantity: input.quantity,
              ticket: input.ticket,
              logo: input.logo,
              profitPercentage: 0,
              profit: 0,
              walletId: ctx.activeWalletId,
            },
          });

          const wallet = await tx.wallet.findUnique({
            where: { id: stock.walletId },
          });

          if (!wallet) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Wallet not found",
            });
          }

          const newInvested =
            wallet.invested + stock.averagePrice * stock.quantity;
          const newCurrentAmount =
            wallet.currentAmount + stock.averagePrice * stock.quantity;

          const newProfitPercentage =
            (newCurrentAmount * 100) / newInvested - 100;

          const updatedWallet = await tx.wallet.update({
            where: { id: stock.walletId },
            data: {
              availableCash: { decrement: stock.quantity * stock.averagePrice },
              invested: newInvested,
              currentAmount: newCurrentAmount,
              profitPercentage: newProfitPercentage,
              profits: newInvested - newCurrentAmount,
            },
          });

          return { stock, wallet: updatedWallet };
        });

        return {
          success: true,
          statusCode: 200,
          message: "Stock invested successful",
          data: { ...newStocksAndWallet },
        };
      }

      const newAveragePrice =
        (currentStock.averagePrice * currentStock.quantity +
          input.currentPrice * input.quantity) /
        (currentStock.quantity + input.quantity);

      const newProfit = input.currentPrice - newAveragePrice;
      const newProfitPercentage = (newProfit / newAveragePrice) * 100;

      const newStocksAndWallet = await db.$transaction(async (tx) => {
        const stock = await tx.stocks.update({
          where: {
            id: currentStock.id,
          },
          data: {
            averagePrice: newAveragePrice,
            currentPrice: input.currentPrice,
            quantity: currentStock.quantity + input.quantity,
            profitPercentage: newProfitPercentage,
            profit: newProfit,
          },
        });

        const wallet = await tx.wallet.findUnique({
          where: { id: stock.walletId },
        });

        if (!wallet) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Wallet not found",
          });
        }

        const newWalletInvested =
          wallet.invested + stock.averagePrice * stock.quantity;
        const newWalletCurrentAmount =
          wallet.currentAmount + stock.averagePrice * stock.quantity;

        const newWalletProfitPercentage =
          (newWalletCurrentAmount * 100) / newWalletInvested - 100;

        const updatedWallet = await tx.wallet.update({
          where: { id: stock.walletId },
          data: {
            availableCash: { decrement: stock.quantity * stock.averagePrice },
            invested: newWalletInvested,
            currentAmount: newWalletCurrentAmount,
            profitPercentage: newWalletProfitPercentage,
            profits: newWalletInvested - newWalletCurrentAmount,
          },
        });

        return { stock, wallet: updatedWallet };
      });

      return {
        success: true,
        statusCode: 200,
        message: "Stock invested successful",
        data: { ...newStocksAndWallet },
      };
    }),

  postNewSell: privateProcedure
    .input(ExchangeTicketSchema)
    .mutation(async ({ ctx, input }) => {
      const wallet = await db.wallet.findUnique({
        where: {
          id: ctx.activeWalletId,
          AND: {
            usersId: ctx.userId,
          },
        },
        select: {
          Stocks: {
            select: {
              id: true,
              ticket: true,
              averagePrice: true,
              quantity: true,
            },
          },
          currentAmount: true,
          availableCash: true,
          invested: true,
        },
      });

      if (!wallet) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet not found",
        });
      }

      const { Stocks } = wallet;

      const currentStock = Stocks.find(
        (stock) => stock.ticket === input.ticket
      );

      if (!currentStock) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Stock not found",
        });
      }

      if (input.quantity === currentStock.quantity) {
        console.log("entrou aqui");
        const newStocksAndWallet = await db.$transaction(async (tx) => {
          const stock = await tx.stocks.delete({
            where: {
              id: currentStock.id,
            },
          });

          const wallet = await tx.wallet.findUnique({
            where: { id: stock.walletId },
          });

          if (!wallet) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Wallet not found",
            });
          }

          const newInvested =
            wallet.invested - stock.averagePrice * stock.quantity;
          const newCurrentAmount =
            wallet.currentAmount - stock.averagePrice * stock.quantity;

          const newProfitPercentage =
            (newCurrentAmount * 100) / newInvested - 100;

          const updatedWallet = await tx.wallet.update({
            where: { id: stock.walletId },
            data: {
              availableCash: { increment: stock.quantity * input.currentPrice },
              invested: newInvested,
              currentAmount: newCurrentAmount,
              profitPercentage: newInvested === 0 ? 0 : newProfitPercentage,
              profits: newInvested === 0 ? 0 : newInvested - newCurrentAmount,
            },
          });

          return { stock, wallet: updatedWallet };
        });

        return {
          success: true,
          statusCode: 200,
          message: "Stock invested successful",
          data: { ...newStocksAndWallet },
        };
      }

      const newProfit = input.currentPrice - currentStock.averagePrice;
      const newProfitPercentage = (newProfit / currentStock.averagePrice) * 100;

      const newStocksAndWallet = await db.$transaction(async (tx) => {
        const stock = await tx.stocks.update({
          where: {
            id: currentStock.id,
          },
          data: {
            currentPrice: input.currentPrice,
            quantity: currentStock.quantity - input.quantity,
            profitPercentage: newProfitPercentage,
            profit: newProfit,
          },
        });

        const wallet = await tx.wallet.findUnique({
          where: { id: stock.walletId },
        });

        if (!wallet) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Wallet not found",
          });
        }

        const newWalletInvested =
          wallet.invested - stock.averagePrice * stock.quantity;
        const newWalletCurrentAmount =
          wallet.currentAmount - stock.averagePrice * stock.quantity;

        const newWalletProfitPercentage =
          (newWalletCurrentAmount * 100) / newWalletInvested - 100;

        const updatedWallet = await tx.wallet.update({
          where: { id: stock.walletId },
          data: {
            availableCash: { increment: stock.quantity * input.currentPrice },
            invested: newWalletInvested,
            currentAmount: newWalletCurrentAmount,
            profitPercentage: newWalletProfitPercentage,
            profits: newWalletInvested - newWalletCurrentAmount,
          },
        });

        return { stock, wallet: updatedWallet };
      });

      return {
        success: true,
        statusCode: 200,
        message: "Stock sell successful",
        data: { ...newStocksAndWallet },
      };
    }),

  // updateMyWalletValues: privateProcedure.post(async ({ ctx }) => {
  //   const wallet = await db.wallet.findUnique({
  //     where: {
  //       id: ctx.activeWalletId,
  //     },
  //     select: {
  //       Stocks: {
  //         select: {
  //           id: true,
  //           ticket: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!wallet) {
  //     throw new TRPCError({
  //       code: "NOT_FOUND",
  //       message: "Wallet not found",
  //     });
  //   }

  //   const { stocks } = wallet;

  //   for (const stock of stocks) {
  //     const { id, ticket } = stock;

  //     const { data } = await api.get(`/quote/${ticket}`);
  //   }
  // }),
});
