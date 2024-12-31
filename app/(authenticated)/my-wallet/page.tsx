import { GetUserAuthentication } from "@/hooks/getUser";
import { formatCurrency } from "@/lib/formatters";
import { cn, handleWalletColorsBalance } from "@/lib/utils";
import { deleteCookie } from "cookies-next";
import { DashboardWalletCard } from "../dashboard/_components/wallet-card";
import { Banknote, ChartCandlestick, DollarSign, Percent } from "lucide-react";
import { MyStocksList } from "./_components/stocksList";
import { EmptyStocks } from "./_components/emptyStocks";
import { DeleteWalletButton } from "./_components/deleteWallet";

export default async function MyWalletPage() {
  const { getUser } = GetUserAuthentication();

  const user = await getUser();
  const wallet = user?.Wallet.find((wallet) => wallet.id === user.activeWallet);

  if (!user || !wallet) {
    deleteCookie("token");
    deleteCookie("user");
    return <></>;
  }

  const { icon: Icon, textClass } = handleWalletColorsBalance(
    wallet.invested,
    wallet.currentAmount
  );

  return (
    <main className="w-full flex items-start justify-start flex-col gap-8 py-16 xl:px-28">
      <DeleteWalletButton walletId={wallet.id} />
      <div className="flex items-center justify-between w-full gap-4">
        <h1 className="text-2xl text-foreground font-medium">{wallet.name}</h1>
        <p
          className={cn(
            "text-3xl font-semibold flex items-center gap-4 tracking-tight",
            textClass
          )}
        >
          {formatCurrency(wallet.invested || 0)}
          <Icon className="size-6 inline-block shrink-0" />
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardWalletCard
          Icon={Banknote}
          name="Dinheiro disponível"
          currentAmount={formatCurrency(wallet.availableCash)}
        />
        <DashboardWalletCard
          Icon={DollarSign}
          name="Ganho total"
          currentAmount={formatCurrency(wallet.profits)}
        />
        <DashboardWalletCard
          Icon={Percent}
          name="Percentual de lucro"
          currentAmount={formatCurrency(wallet.profitPercentage || 0)}
        />
        <DashboardWalletCard
          Icon={ChartCandlestick}
          name="Total de ativos"
          currentAmount={wallet.Stocks.length || 0}
        />
      </div>

      <h1 className="text-2xl mt-4 text-foreground font-medium">Seus ativos</h1>
      {wallet.Stocks.length > 0 ? <MyStocksList /> : <EmptyStocks />}
    </main>
  );
}
