"use client";

import { ListsDashboardRanking } from "@/app/(authenticated)/dashboard/_components/lists/list";
import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { generateCacheTime } from "@/lib/cache";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useQueryState, parseAsInteger } from "nuqs";

export function MainStocksList({ type }: { type?: string }) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", {
    throttleMs: 500,
    defaultValue: "",
  });
  const queryClient = useQueryClient();
  const { data, isLoading } = trpc.tickets.getAllTickets.useQuery(
    {
      limit: 10,
      page: page,
      sortBy: "volume",
      sortOrder: "desc",
      type: type,
      search: search,
    },
    {
      cacheTime: generateCacheTime(),
      refetchInterval: generateCacheTime(),
    }
  );

  return (
    <>
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:justify-between">
          <h1 className="text-xl text-foreground font-medium">
            Principais ativos do mercado
          </h1>
          <Input
            name="search"
            placeholder="Buscar ticket do ativo..."
            classNames={{
              innerWrapper: "w-full lg:w-72",
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            value={search}
            leftIcon={{
              element: Search,
            }}
          />
        </div>
        <Pagination
          page={page}
          limit={10}
          count={data?.data.totalCount || 0}
          setPage={(e) => {
            setPage(e);
          }}
          isPending={isLoading}
        />
        <ListsDashboardRanking
          hasLink
          name="Top 10 ações"
          data={data?.data.stocks}
          isLoading={isLoading}
        />
        <Pagination
          page={page}
          limit={10}
          count={data?.data.totalCount || 0}
          setPage={(e) => {
            setPage(e);
            queryClient.invalidateQueries(["get-all-tickets"]);
          }}
          isPending={isLoading}
        />
      </div>
    </>
  );
}
