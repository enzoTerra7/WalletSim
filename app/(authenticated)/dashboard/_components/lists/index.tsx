"use client";

import { trpc } from "@/app/_trpc/client";
import { generateCacheTime } from "@/lib/cache";
import { ListsDashboardRanking } from "./list";

export function DashboardList() {
  const { data, isLoading } = trpc.tickets.getAllTickets.useQuery(
    {
      limit: 10,
      page: 1,
      sortBy: "volume",
      sortOrder: "desc",
    },
    {
      cacheTime: generateCacheTime(),
      refetchInterval: generateCacheTime(),
    }
  );

  return (
    <>
      <h1 className="text-xl mx-auto text-foreground font-medium">
        Principais do mercado
      </h1>
      <div className="w-full grid lg:grid-cols-2 lg:justify-between gap-6">
        <ListsDashboardRanking
          hasLink
          name="Top 10 ações"
          data={data?.data.stocks}
          isLoading={isLoading}
        />
        <ListsDashboardRanking
          name="Top 10 mercados"
          data={data?.data.indexes}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
