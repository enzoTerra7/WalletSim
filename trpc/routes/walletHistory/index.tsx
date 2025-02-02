import { privateProcedure, router } from "@/trpc/trpc";
import { GetWalletGHistoryActiveSchema } from "./schema";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { mapWalletHistory } from "@/lib/generateHistory";

export const walletHistoryRouter = router({
  getWalletHistory: privateProcedure
    .input(GetWalletGHistoryActiveSchema)
    .query(async ({ ctx, input }) => {
      const walletHistory = await db.walletHistory.findMany({
        where: {
          walletId: ctx.activeWalletId,
        },
        orderBy: {
          day: "desc",
        },
      });

      if (!walletHistory) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Wallet history not found",
        });
      }

      const payload = {
        success: true,
        statusCode: 200,
        message: "Wallet active successfully changed",
      };

      if (input.filterDate === "all") {
        return {
          ...payload,
          data: { walletHistory },
        };
      }

      return {
        ...payload,
        data: {
          walletHistory: mapWalletHistory(walletHistory, input.filterDate),
        },
      };
    }),
});
