import { StockDataCard } from "./data-card";

export interface AnalysisCardsProps {
  regularMarketVolume: number;
  regularMarketChangePercent: number;
  // marketCap: number;
}

export function AnalysisCards(props: AnalysisCardsProps) {
  return (
    <>
      <h4 className="text-xl font-semibold mt-6">Analise da moeda</h4>
      <div className="w-full rounded-md grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <StockDataCard
          title="Variação diária"
          value={
            props.regularMarketChangePercent
              ?.toFixed(2)
              .replace(".", ",")
              .concat("%") || "---"
          }
        />
        <StockDataCard
          title="Lucro por ação"
          value={
            props.regularMarketVolume?.toFixed(2).replace(".", ",") || "---"
          }
        />
      </div>
    </>
  );
}
