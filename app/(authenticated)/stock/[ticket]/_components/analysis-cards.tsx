import { StockDataCard } from "./data-card";
import { formatCurrency } from "@/lib/formatters";

export interface AnalysisCardsProps {
  priceEarnings: number;
  earningsPerShare: number;
  // marketCap: number;
}

export function AnalysisCards(props: AnalysisCardsProps) {
  return (
    <>
      <h4 className="text-xl font-semibold mt-6">Analise de ações</h4>
      <div className="w-full rounded-md grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <StockDataCard
          title="P/L"
          value={props.priceEarnings?.toFixed(2).replace(".", ",") || "---"}
        />
        <StockDataCard
          title="Lucro por ação"
          value={formatCurrency(props.earningsPerShare)}
        />
        {/* <StockDataCard
          title="Capitalização de mercado"
          value={formatCurrency(props.marketCap)}
        /> */}
      </div>
    </>
  );
}
