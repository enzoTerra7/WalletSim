import { ElementType } from "react";

type WalletCard = {
  Icon: ElementType;
  name: string;
  description: string;
};

export function MarketTypeCard(props: WalletCard) {
  return (
    <div className="w-full p-6 hover:bg-muted transition-all duration-300 rounded-lg border border-border bg-card shadow flex items-center gap-4">
      <div className="size-12 shrink-0 rounded-full flex items-center justify-center border border-border bg-background text-primary">
        <props.Icon className="size-6" />
      </div>
      <div className="flex-1-text-start text-card-foreground space-y-1">
        <p className="text-xl font-bold">{props.name}</p>
        <p className="text-sm font-normal line-clamp-3">{props.description}</p>
      </div>
    </div>
  );
}
