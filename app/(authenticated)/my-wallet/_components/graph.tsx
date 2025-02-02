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
import { format } from "date-fns";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { generateCacheTime } from "@/lib/cache";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  close: {
    label: "Valor",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const ranges = ["7d", "14d", "30d", "all"];

export function MyWalletGraph() {
  const [range, setRange] = useState(ranges[0]);

  const { data, isLoading } = trpc.walletHistory.getWalletHistory.useQuery(
    {
      filterDate: range as "7d" | "14d" | "30d" | "all",
    },
    {
      refetchInterval: generateCacheTime(),
      cacheTime: generateCacheTime(),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Card className="w-full mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>Últimos valores</CardTitle>
          <CardDescription>
            Mostrando a evolução da sua carteira
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
              {r === "all" ? "Tudo" : r}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="max-h-96">
        {isLoading ? (
          <Skeleton className="w-full h-80" />
        ) : data ? (
          <ChartContainer
            className="max-h-80 w-full max-w-none"
            config={chartConfig}
          >
            <AreaChart
              accessibilityLayer
              data={data.data.walletHistory.map((d) => ({
                ...d,
                day: format(new Date(d.day), "dd/MM"),
              }))}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                dataKey="price"
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
                dataKey="price"
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
