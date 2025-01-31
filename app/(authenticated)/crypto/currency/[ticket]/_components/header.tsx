import { formatCurrency } from "@/lib/formatters";
import { DollarSign } from "lucide-react";
import Image from "next/image";

export interface StockHeaderProps {
  logo?: string;
  name: string;
  ticket: string;
  regularMarketPrice: number;
}

export function StockHeader(props: StockHeaderProps) {
  return (
    <>
      <div className="w-full flex items-start flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          {props.logo ? (
            <Image
              src={props.logo}
              width={48}
              height={48}
              alt={props.name}
              className="size-16 rounded-md object-contain object-center shrink-0"
            />
          ) : (
            <div className="size-16 rounded-md bg-muted flex items-center justify-center shrink-0">
              <DollarSign className="size-12 text-muted-foreground" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl text-foreground font-medium">
              {props.name}
            </h3>
            <p className="text-muted-foreground text-sm">{props.ticket}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 xl:items-end">
          <p className="text-muted-foreground text-xs font-medium">
            Preço atual
          </p>
          <h3 className="text-3xl text-foreground font-bold">
            {formatCurrency(props.regularMarketPrice)}
          </h3>
        </div>
      </div>
    </>
  );
}
