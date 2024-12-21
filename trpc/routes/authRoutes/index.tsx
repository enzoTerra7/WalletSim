import { publicProcedure, router } from "@/trpc/trpc";
import { LoginSchema, RegisterSchema } from "./schemas";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";
import { handleDecryption, handleEncryption } from "@/lib/encryption";
import { generateJwt } from "@/lib/session";
import { defaultUsersSelect } from "../defaultsSelects";

export const authRouter = router({
  login: publicProcedure.input(LoginSchema).mutation(async ({ input }) => {
    const user = await db.users.findUnique({
      where: {
        email: input.email,
      },
      select: { ...defaultUsersSelect, password: true },
    });

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User not found",
      });
    }

    const decryptedPassword = await handleDecryption(
      input.password,
      user.password
    );

    if (decryptedPassword) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User not found",
      });
    }

    const token = await generateJwt({
      id: user.id,
      email: user.email,
      name: user.name,
      wallets: user.Wallet,
      activeWallet: user.activeWallet,
      hasWallet: user.Wallet.length > 0,
    });

    return {
      success: true,
      statusCode: 200,
      message: "Login successful",
      data: {
        user,
        token,
      },
    };
  }),
  register: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ input }) => {
      const encryptedPassword = await handleEncryption(input.password);

      const user = await db.users.create({
        data: {
          email: input.email,
          password: encryptedPassword,
          name: input.name,
        },
      });

      const token = await generateJwt({
        id: user.id,
        email: user.email,
        name: user.name,
        wallets: [],
        activeWallet: -1,
        hasWallet: false,
      });

      return {
        success: true,
        statusCode: 200,
        message: "User created",
        data: {
          user,
          token,
        },
      };
    }),
});
