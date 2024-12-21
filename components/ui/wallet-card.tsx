"use client";
import { trpc } from "@/app/_trpc/client";
import { formatCurrency } from "@/lib/formatters";
import { cn, handleWalletColorsBalance } from "@/lib/utils";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function WalletCard(props: {
  name: string;
  id: number;
  currentAmount: number;
  profits: number;
  profitPercentage: number;
  invested: number;
  disabled?: boolean;
  hasActionCall?: boolean;
}) {
  const router = useRouter();
  const { mutate: changeActive } = trpc.user.changeWalletActive.useMutation({
    onSuccess(data) {
      setCookie("token", data.data.token, {
        maxAge: 60 * 60 * 24,
      });
      setCookie("user", JSON.stringify(data.data.user));
      router.refresh();
    },
  });
  const { icon: Icon, textClass } = handleWalletColorsBalance(
    props.invested,
    props.currentAmount
  );
  return (
    <div
      onClick={() => {
        if (props.hasActionCall) {
          changeActive({ walletId: props.id });
        }
      }}
      className={cn(
        "flex flex-col gap-2 outline-none ring-0 w-full cursor-pointer border border-border rounded-md p-2 hover:bg-primary/10 hover:border-primary transition-colors duration-300",
        {
          "pointer-events-none": props.disabled,
        }
      )}
    >
      <p className="text-sm text-start font-medium uppercase tracking-tight">
        {props.name}
      </p>
      <div className={cn("flex items-center gap-2", textClass)}>
        {formatCurrency(props.invested || 0)}
        <Icon className="size-4 shrink-0" />
      </div>
    </div>
  );
}
