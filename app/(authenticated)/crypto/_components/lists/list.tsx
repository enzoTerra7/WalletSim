import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

type List = {
  name: string;
  data?: Array<string>;
  isLoading?: boolean;
  hasLink?: boolean;
};

export function ListsCryptoRanking(props: List) {
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
                href={props.hasLink ? `/crypto/currency/${item}` : "#"}
                key={`${props.name}-list-${index}`}
                className={cn(
                  "flex items-center p-6 gap-4",
                  props.hasLink &&
                    "hover:bg-muted transition-all duration-300 cursor-pointer"
                )}
              >
                <div className="size-12 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <BadgeDollarSign className="size-6 text-muted-foreground" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <p className="text-lg tracking-tight text-card-foreground truncate font-semibold">
                    {item}
                  </p>
                </div>
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
        <Skeleton className="h-6 w-1/5" />
      </div>
    </div>
  );
}
