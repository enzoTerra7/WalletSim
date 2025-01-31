"use client";

import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { generateCacheTime } from "@/lib/cache";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useQueryState, parseAsInteger } from "nuqs";
import { ListsCryptoRanking } from "./list";

export function MainCriptoList() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", {
    throttleMs: 500,
    defaultValue: "",
  });
  const queryClient = useQueryClient();
  const { data, isLoading } = trpc.crypto.getAllCrypto.useQuery(
    {
      limit: 10,
      page: page,
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
            Principais moedas do mercado
          </h1>
          <Input
            name="search"
            placeholder="Buscar código da moeda..."
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
          count={data?.data.totalItem || 0}
          setPage={(e) => {
            setPage(e);
          }}
          isPending={isLoading}
        />
        <ListsCryptoRanking
          hasLink
          name="Criptomoedas"
          data={data?.data.coins}
          isLoading={isLoading}
        />
        <Pagination
          page={page}
          limit={10}
          count={data?.data.totalItem || 0}
          setPage={(e) => {
            setPage(e);
            queryClient.invalidateQueries(["get-all-cripto"]);
          }}
          isPending={isLoading}
        />
      </div>
    </>
  );
}
