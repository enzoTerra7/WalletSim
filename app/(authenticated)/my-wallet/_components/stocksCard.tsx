import { formatCurrency } from "@/lib/formatters";
import { cn, handleWalletColorsBalance } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type WalletCard = {
  logo: string;
  name: string;
  ticket: string;
  currentPrice: number;
  averagePrice: number;
  quantity: number;
  profitPercentage: number;
  type: string;
};

export function MyStocksCards(props: WalletCard) {
  const { icon: Icon, textClass } = handleWalletColorsBalance(
    props.averagePrice,
    props.currentPrice
  );
  return (
    <Link
      href={
        props.type === "crypto"
          ? `/crypto/currency/${props.ticket}`
          : `/stock/${props.ticket}`
      }
      className="w-full hover:bg-muted hover:text-muted-foreground transition-all duration-300 p-6 rounded-lg border border-border bg-card shadow flex items-center gap-4"
    >
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
      <div className="flex-1 text-start text-card-foreground space-y-1">
        <p className="text-sm font-medium">{props.name}</p>
        <p className="text-2xl font-medium">{props.ticket}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[0.5rem] font-bold text-muted-foreground">
          Possuí: {props.quantity}
        </span>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-bold">
            {formatCurrency(props.currentPrice)}
          </p>
          <Icon className={cn("size-6 inline-block shrink-0", textClass)} />
        </div>
      </div>
    </Link>
  );
}
