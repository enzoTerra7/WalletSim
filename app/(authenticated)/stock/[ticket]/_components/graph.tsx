"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { format, fromUnixTime } from "date-fns";
import { formatCurrency } from "@/lib/formatters";
import { HistoricalDataPrice } from "@/trpc/routes/tickets/types";

const chartConfig = {
  close: {
    label: "Valor",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const ranges = ["5d", "1mo", "3mo"];

export function StockGraph({
  range,
  setRange,
  data,
}: {
  range: string;
  setRange: (range: string) => void;
  data?: Array<HistoricalDataPrice>;
}) {
  return (
    <Card className="w-full mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>Últimos valores</CardTitle>
          <CardDescription>
            Mostrando o histórico de valores do ativo
          </CardDescription>
        </div>
        <div className="flex divide-x-2 overflow-hidden divide-border border border-border rounded-lg">
          {ranges.map((r) => (
            <Button
              key={`range-${r}`}
              onClick={() => setRange(r)}
              variant={range === r ? "default" : "ghost"}
              className="rounded-none"
            >
              {r}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="max-h-96">
        {data ? (
          <ChartContainer
            className="max-h-80 w-full max-w-none"
            config={chartConfig}
          >
            <AreaChart
              accessibilityLayer
              data={data.map((d) => ({
                ...d,
                date: format(fromUnixTime(d.date), "dd/MM"),
              }))}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                dataKey="close"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="close"
                type="monotone"
                fill="hsl(var(--primary))"
                fillOpacity={0.4}
                stroke="hsl(var(--primary))"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-48 border border-border rounded-lg">
            <span className="text-muted-foreground">
              Sem gráfico disponível
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
