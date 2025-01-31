import { authRouter } from "./routes/authRoutes";
import { cryptoRouter } from "./routes/crypto";
import { ticketsRouter } from "./routes/tickets";
import { userRouter } from "./routes/user";
import { walletRouter } from "./routes/wallet";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  tickets: ticketsRouter,
  wallet: walletRouter,
  user: userRouter,
  crypto: cryptoRouter,
});

export type AppRouter = typeof appRouter;
