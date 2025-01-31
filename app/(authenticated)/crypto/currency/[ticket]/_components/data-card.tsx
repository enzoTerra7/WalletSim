export interface StockDataCardProps {
  title: string;
  value: React.ReactNode;
}

export function StockDataCard(props: StockDataCardProps) {
  return (
    <>
      <div className="bg-muted border border-border rounded-md flex items-stretch gap-2 p-2.5">
        <div className="h-full w-px bg-primary rounded-sm" />
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            {props.title}
          </p>
          <div className="text-2xl font-bold text-card-foreground">
            {props.value}
          </div>
        </div>
      </div>
    </>
  );
}
