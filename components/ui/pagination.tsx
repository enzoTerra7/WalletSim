"use client";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface Pagination {
  limit: number;
  page: number;
  setPage: (e: number) => void;
  count: number;
  isPending?: boolean;
}

export function Pagination(props: Pagination) {
  const { pages, totalPages } = usePagination({
    limit: props.limit,
    page: props.page,
    total: props.count,
  });

  const showing = props.limit * (props.page - 1) + 1;
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-[#495057] text-sm font-medium">
        Exibindo {showing} - {showing + props.limit - 1} de {props.count}
      </p>
      <div className={cn("flex items-center gap-1")}>
        <Button
          variant="ghost"
          onClick={() => {
            if (props.page > 1) {
              props.setPage(props.page - 1);
            }
          }}
          className="relative"
          disabled={props.page == 1 || props.isPending}
        >
          <ChevronLeft className="size-4" />
          <div className="sr-only">Button to go to previous page</div>
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            variant="ghost"
            onClick={() => props.setPage(page)}
            className={cn(
              "border-transparent border text-sm text-muted-foreground font-medium hover:border-border hover:bg-muted",
              {
                "!bg-primary/5 border-primary text-primary pointer-events-none":
                  props.page == page,
              }
            )}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="relative"
          onClick={() => {
            if (props.page < totalPages) {
              props.setPage(props.page + 1);
            }
          }}
          disabled={props.page >= totalPages}
        >
          <ChevronRight className="size-4" />
          <div className="sr-only">Button to go to previous page</div>
        </Button>
      </div>
    </div>
  );
}
