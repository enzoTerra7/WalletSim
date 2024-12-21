"use client";
import { trpc } from "@/app/_trpc/client";
import { generateCacheTime } from "@/lib/cache";
import { StockHeader } from "./header";
import { StockByIdLoading } from "./loading";
import { StockGraph } from "./graph";
import { useState } from "react";
import { AnalysisCards } from "./analysis-cards";
import { GoBackPage } from "@/components/ui/goBack";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { SellModal } from "./sellModal";
import { BuyModal } from "./buyModal";
import { YourInvestmentData } from "./your-investment-data";

export function MainTicketData({ ticket }: { ticket: string }) {
  const [range, setRange] = useState("1mo");
  const { data } = trpc.tickets.getTicket.useQuery(
    {
      ticket: ticket,
      range,
    },
    {
      refetchInterval: generateCacheTime(),
      cacheTime: generateCacheTime(),
      refetchOnWindowFocus: false,
    }
  );

  if (!data) {
    return (
      <>
        <StockByIdLoading />
      </>
    );
  }

  return (
    <>
      <div className="w-full flex items-start flex-col gap-4">
        <div className="flex w-full mb-4 items-center gap-4 justify-between">
          <GoBackPage asChild>
            <Button variant={"outline"} size="icon">
              <ChevronLeft className="size-6" />
            </Button>
          </GoBackPage>
          <div className="flex items-center gap-4">
            <SellModal
              stock={data.data.stock}
              currentPrice={data.data.data.regularMarketPrice}
              ticket={data.data.data.symbol}
              name={data.data.data.shortName}
              logo={data.data.data.logourl}
            />
            <BuyModal
              currentPrice={data.data.data.regularMarketPrice}
              ticket={ticket}
              name={data.data.data.shortName}
              logo={data.data.data.logourl}
            />
          </div>
        </div>
        <StockHeader
          logo={data.data.data.logourl}
          name={data.data.data.shortName}
          ticket={data.data.data.symbol}
          regularMarketPrice={data.data.data.regularMarketPrice}
        />
        <StockGraph
          range={range}
          setRange={setRange}
          data={
            data.data.data.historicalDataPrice.length > 0
              ? data.data.data.historicalDataPrice
              : undefined
          }
        />
        <AnalysisCards
          earningsPerShare={data.data.data.earningsPerShare}
          priceEarnings={data.data.data.priceEarnings}
        />
        {data.data.stock && <YourInvestmentData {...data.data.stock} />}
      </div>
    </>
  );
}
