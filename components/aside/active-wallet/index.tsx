import { GetUserAuthentication } from "@/hooks/getUser";
import { Skeleton } from "../../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WalletCard } from "../../ui/wallet-card";
import Link from "next/link";
import { Plus } from "lucide-react";

export async function ActiveWallet() {
  const { getUser } = GetUserAuthentication();

  const user = await getUser();

  if (!user) {
    return (
      <>
        <Skeleton className="w-full flex-1 h-24 rounded-md" />
      </>
    );
  }

  const activeWallet = user.Wallet.find(
    (wallet) => wallet.id === user.activeWallet
  );

  const availableWallets = user.Wallet.filter(
    (wallet) => wallet.id !== user.activeWallet
  );

  return (
    <>
      <DropdownMenu>
        <div className="w-full p-4">
          <DropdownMenuTrigger className="w-full">
            <WalletCard disabled {...activeWallet!} />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Suas carteiras</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="p-2 flex flex-col gap-2">
            {availableWallets.map((wallet) => (
              <DropdownMenuItem
                className="p-0"
                key={`available-wallet-${wallet.id}-to-active`}
              >
                <WalletCard hasActionCall {...wallet} />
              </DropdownMenuItem>
            ))}
            {availableWallets.length === 0 && (
              <p className="text-sm text-balance text-center text-muted-foreground">
                Você não possui carteiras disponíveis
              </p>
            )}
            <DropdownMenuSeparator />
            <Link href="/auth/wallet-create">
              <DropdownMenuItem className="cursor-pointer">
                <Plus />
                Criar carteira
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
