import { Skeleton } from "@/components/ui/skeleton";
import { GetUserAuthentication } from "@/hooks/getUser";
import { DashboardWalletCard } from "./wallet-card";
import { Banknote, DollarSign, Landmark } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

export async function WalletCards() {
  const { getUser } = GetUserAuthentication();

  const user = await getUser();

  if (!user) {
    return (
      <>
        <WalletCardsSkeleton />
      </>
    );
  }

  const wallet = user.Wallet.find((wallet) => wallet.id === user.activeWallet);

  if (!wallet) {
    return (
      <>
        <div className="col-span-3 border border-border p-4 flex items-center justify-center gap-2 bg-card shadow">
          <p className="text-xl font-medium tracking-tight text-destructive">
            Nenhuma carteira ativa
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardWalletCard
        Icon={Banknote}
        name="Dinheiro disponível"
        currentAmount={formatCurrency(wallet.availableCash)}
      />
      <DashboardWalletCard
        Icon={Landmark}
        name="Total investido"
        currentAmount={formatCurrency(wallet.invested)}
      />
      <DashboardWalletCard
        Icon={DollarSign}
        name="Ganho total"
        currentAmount={formatCurrency(wallet.profits)}
      />
    </>
  );
}

export function WalletCardsSkeleton() {
  return (
    <>
      <Skeleton className="w-full flex-1 h-44 rounded-md" />
      <Skeleton className="w-full flex-1 h-44 rounded-md" />
      <Skeleton className="w-full flex-1 h-44 rounded-md" />
    </>
  );
}
