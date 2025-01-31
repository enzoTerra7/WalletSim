"use client";
import { trpc } from "@/app/_trpc/client";
import { generateCacheTime } from "@/lib/cache";
import { StockHeader } from "./header";
import { StockByIdLoading } from "./loading";
import { AnalysisCards } from "./analysis-cards";
import { GoBackPage } from "@/components/ui/goBack";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { YourInvestmentData } from "./your-investment-data";
import { SellModal } from "@/app/(authenticated)/stock/[ticket]/_components/sellModal";
import { BuyModal } from "@/app/(authenticated)/stock/[ticket]/_components/buyModal";
import { useEffect } from "react";

export function MainCryptoData({ ticket }: { ticket: string }) {
  const { data } = trpc.crypto.getCrypto.useQuery(
    {
      coin: ticket,
      currency: "BRL",
    },
    {
      refetchInterval: generateCacheTime(),
      cacheTime: generateCacheTime(),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log("data", data);
  }, [data]);

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
              ticket={data.data.data.coin}
              name={data.data.data.coinName}
              logo={data.data.data.coinImageUrl}
            />
            <BuyModal
              currentPrice={data.data.data.regularMarketPrice}
              ticket={ticket}
              name={data.data.data.coin}
              logo={data.data.data.coinImageUrl}
              type="crypto"
            />
          </div>
        </div>
        <StockHeader
          logo={data.data.data.coinImageUrl}
          name={data.data.data.coin}
          ticket={data.data.data.coin}
          regularMarketPrice={data.data.data.regularMarketPrice}
        />
        <AnalysisCards
          regularMarketVolume={data.data.data.regularMarketVolume}
          regularMarketChangePercent={data.data.data.regularMarketChangePercent}
        />
        {data.data.stock && <YourInvestmentData {...data.data.stock} />}
      </div>
    </>
  );
}
