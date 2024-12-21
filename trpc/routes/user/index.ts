import { privateProcedure, router } from "@/trpc/trpc";
import { ChangeWalletActiveSchema } from "./schema";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { generateJwt } from "@/lib/session";
import { defaultUsersSelect } from "../defaultsSelects";

export const userRouter = router({
  changeWalletActive: privateProcedure
    .input(ChangeWalletActiveSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await db.users.update({
        where: {
          id: ctx.userId,
        },
        data: {
          activeWallet: input.walletId,
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
        message: "Wallet active successfully changed",
        data: {
          user,
          token,
        },
      };
    }),

  getMe: privateProcedure.query(async ({ ctx }) => {
    const user = await db.users.findUnique({
      where: {
        id: ctx.userId,
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
      message: "Get me",
      data: {
        user,
        token,
      },
    };
  }),

  getCurrentWallet: privateProcedure.query(async ({ ctx }) => {
    const wallet = await db.wallet.findUnique({
      where: {
        id: ctx.activeWalletId,
        AND: {
          usersId: ctx.userId,
        },
      },
      select: {
        availableCash: true,
        id: true,
        currentAmount: true,
        invested: true,
        name: true,
        profits: true,
        profitPercentage: true,
        Stocks: {
          select: {
            id: true,
            ticket: true,
            name: true,
          },
        },
      },
    });

    if (!wallet) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wallet not found",
      });
    }

    return {
      success: true,
      statusCode: 200,
      message: "Get current wallet",
      data: {
        wallet,
      },
    };
  }),
});
