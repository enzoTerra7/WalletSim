import { authRouter } from "./routes/authRoutes";
import { ticketsRouter } from "./routes/tickets";
import { userRouter } from "./routes/user";
import { walletRouter } from "./routes/wallet";
import { walletHistoryRouter } from "./routes/walletHistory";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  tickets: ticketsRouter,
  wallet: walletRouter,
  user: userRouter,
  walletHistory: walletHistoryRouter,
});

export type AppRouter = typeof appRouter;
