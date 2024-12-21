import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type List = {
  name: string;
  data?: Array<{
    stock: string;
    name: string;
    logo?: string;
    market_cap?: number;
  }>;
  isLoading?: boolean;
  hasLink?: boolean;
};

export function ListsDashboardRanking(props: List) {
  const Comp = props.hasLink ? Link : "div";
  return (
    <div className="w-full rounded-lg border overflow-hidden border-border bg-card shadow flex flex-col gap-0">
      <div className="w-full p-6 flex items-center justify-center border-b">
        <p className="text-lg uppercase font-bold text-card-foreground">
          {props.name}
        </p>
      </div>
      {props.isLoading || !props.data ? (
        <div className="flex flex-col w-full divide-y-2 divide-border">
          <ListsDashboardRankingSkeleton />
          <ListsDashboardRankingSkeleton />
          <ListsDashboardRankingSkeleton />
          <ListsDashboardRankingSkeleton />
          <ListsDashboardRankingSkeleton />
          <ListsDashboardRankingSkeleton />
          <ListsDashboardRankingSkeleton />
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full divide-y-2 divide-border">
            {props.data.map((item, index) => (
              <Comp
                href={props.hasLink ? `/stock/${item.stock}` : "#"}
                key={`${props.name}-list-${index}`}
                className={cn(
                  "flex items-center p-6 gap-4",
                  props.hasLink &&
                    "hover:bg-muted transition-all duration-300 cursor-pointer"
                )}
              >
                {item.logo ? (
                  <Image
                    src={item.logo}
                    width={48}
                    height={48}
                    alt={item.name}
                    className="size-12 rounded-md object-contain object-center shrink-0"
                  />
                ) : (
                  <div className="size-12 rounded-md bg-muted flex items-center justify-center shrink-0">
                    <BadgeDollarSign className="size-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-0.5">
                  <p className="text-xs font-medium">{item.stock}</p>
                  <p className="text-lg tracking-tight text-card-foreground truncate font-semibold">
                    {item.name}
                  </p>
                </div>
                {item.market_cap && (
                  <p className="text-green-500 font-semibold text-sm shrink-0">
                    {formatCurrency(item.market_cap)}
                  </p>
                )}
              </Comp>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ListsDashboardRankingSkeleton() {
  return (
    <div className="w-full p-6 flex items-center gap-4">
      <Skeleton className="size-12 rounded-md shrink-0" />
      <div className="flex-col flex gap-0.5 w-full">
        <Skeleton className="h-6 w-2/5" />
        <Skeleton className="h-14 w-2/3 mt-2" />
      </div>
    </div>
  );
}
