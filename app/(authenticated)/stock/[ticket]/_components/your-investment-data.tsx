import { Stocks } from "@prisma/client";
import { StockDataCard } from "./data-card";
import { formatCurrency } from "@/lib/formatters";

export interface AnalysisCardsProps {
  priceEarnings: number;
  earningsPerShare: number;
  // marketCap: number;
}

export function YourInvestmentData(props: Stocks) {
  return (
    <>
      <h4 className="text-xl font-semibold mt-6">
        Analise do seu investimento
      </h4>
      <div className="w-full rounded-md grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <StockDataCard title="Quantidade de ações" value={props.quantity} />
        <StockDataCard
          title="Total investido"
          value={formatCurrency(props.averagePrice * props.quantity)}
        />
        <StockDataCard
          title="Preço médio"
          value={formatCurrency(props.averagePrice)}
        />
        <StockDataCard
          title="Preço atual da ação"
          value={formatCurrency(props.currentPrice)}
        />
        <StockDataCard title="Lucro" value={formatCurrency(props.profit)} />
        <StockDataCard
          title="Lucro por ação"
          value={formatCurrency(props.profit / props.quantity)}
        />
      </div>
    </>
  );
}
