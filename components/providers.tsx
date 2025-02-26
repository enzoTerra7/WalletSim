"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink, splitLink } from "@trpc/client";
import { Toaster } from "./ui/sonner";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition() {
            return Boolean(
              process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
            );
          },
          true: httpBatchLink({
            url: "http://localhost:3000/api/trpc",
          }),
          false: httpBatchLink({
            url: "https://wallet-sim.vercel.app/api/trpc",
          }),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <ThemeProvider defaultTheme="dark" attribute={"class"}>
            {children}
            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
