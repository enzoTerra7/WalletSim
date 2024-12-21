"use client";

import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { generateCacheTime } from "@/lib/cache";
import { MyStocksCards } from "./stocksCard";

export function MyStocksList() {
  const { data, isLoading } = trpc.wallet.getWalletStocks.useQuery(undefined, {
    cacheTime: generateCacheTime(),
    refetchInterval: generateCacheTime(),
  });

  if (!data || isLoading) {
    return (
      <>
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
        <Skeleton className="w-full h-24 rounded-lg" />
      </>
    );
  }
  return (
    <>
      {data.data.stocks.map((stock) => (
        <MyStocksCards key={`my-wallet-${stock.id}`} {...stock} />
      ))}
    </>
  );
}
