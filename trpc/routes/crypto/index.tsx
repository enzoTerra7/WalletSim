import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { SearchAllCryptoSchema, SearchCryptoSchema } from "./schemas";
import { api } from "@/lib/axios";
import { GetAllCryptoResponse, GetCryptoResponse } from "./types";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

export const cryptoRouter = router({
  getAllCrypto: publicProcedure
    .input(SearchAllCryptoSchema)
    .query(async ({ input }) => {
      try {
        const { data } = await api.get<GetAllCryptoResponse>(
          "/v2/crypto/available",
          {
            params: input,
          }
        );

        const start = (input.page - 1) * input.limit;

        const formattedData = {
          totalItem: data.coins.length,
          coins: data.coins.slice(start, start + input.limit),
        };
        return {
          success: true,
          statusCode: 200,
          message: "Get all tickets",
          data: formattedData,
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error,
        });
      }
    }),

  getCrypto: privateProcedure
    .input(SearchCryptoSchema)
    .query(async ({ input, ctx }) => {
      try {
        const stockId = await db.stocks.findFirst({
          where: {
            walletId: ctx.activeWalletId,
            ticket: input.coin,
          },
          select: {
            id: true,
            averagePrice: true,
          },
        });

        console.log("log1");

        const { data } = await api.get<GetCryptoResponse>(`/v2/crypto`, {
          params: {
            coin: input.coin,
            currency: input.currency,
          },
        });

        console.log("log2");

        if (!stockId) {
          return {
            success: true,
            statusCode: 200,
            message: "Get ticket",
            data: {
              data: data.coins[0],
              stock: null,
            },
          };
        }

        const currentPrice = data.coins[0].regularMarketPrice;

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
            data: data.coins[0],
            stock: stock,
          },
        };
      } catch (error) {
        console.dir(error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error,
        });
      }
    }),
});
