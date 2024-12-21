import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { SearchAllTicketSchema, SearchTicketSchema } from "./schemas";
import { api } from "@/lib/axios";
import { GetAllTicketsResponse, StockByIdResponse } from "./types";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const ticketsRouter = router({
  getAllTickets: publicProcedure
    .input(SearchAllTicketSchema)
    .query(async ({ input }) => {
      try {
        const { data } = await api.get<GetAllTicketsResponse>("/quote/list", {
          params: input,
        });
        return {
          success: true,
          statusCode: 200,
          message: "Get all tickets",
          data,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error,
        });
      }
    }),

  getTicket: privateProcedure
    .input(SearchTicketSchema)
    .query(async ({ input, ctx }) => {
      try {
        const stockId = await db.stocks.findFirst({
          where: {
            walletId: ctx.activeWalletId,
            ticket: input.ticket,
          },
          select: {
            id: true,
            averagePrice: true,
          },
        });

        const { data } = await api.get<StockByIdResponse>(
          `/quote/${input.ticket}`,
          {
            params: {
              range: input.range || "1mo",
              interval: input.interval || "1d",
              fundamental: true,
              // modules: ["balanceSheetHistory", "financialData"],
              // dividends: true,
            },
          }
        );

        if (!stockId) {
          return {
            success: true,
            statusCode: 200,
            message: "Get ticket",
            data: {
              data: data.results[0],
              stock: null,
            },
          };
        }

        const currentPrice = data.results[0].regularMarketPrice;

        const stock = await db.stocks.update({
          where: {
            id: stockId.id,
          },
          data: {
            currentPrice: currentPrice,
            profit: currentPrice - stockId.averagePrice,
            profitPercentage: (currentPrice * 100) / stockId.averagePrice - 100,
          },
        });

        return {
          success: true,
          statusCode: 200,
          message: "Get ticket",
          data: {
            data: data.results[0],
            stock: stock,
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error,
        });
      }
    }),
});
