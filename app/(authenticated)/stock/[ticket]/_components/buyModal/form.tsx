"use client";
import { trpc } from "@/app/_trpc/client";
import { buttonVariants } from "@/components/ui/button";
import { DialogClose, DialogFooter, DialogMain } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/formatters";
import { DialogDescription } from "@radix-ui/react-dialog";
import { setCookie } from "cookies-next";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function BuyTicketForm({
  methods,
}: {
  methods: UseFormReturn<
    {
      ticket: string;
      quantity: number;
      currentPrice: number;
      logo: string;
      name: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}) {
  const { data } = trpc.user.getCurrentWallet.useQuery();
  const quantity = methods.watch("quantity");
  const currentPrice = methods.watch("currentPrice");

  const { mutate: invest } = trpc.wallet.postNewInvestment.useMutation({
    onSuccess: async (data) => {
      setCookie("token", data.data.token, {
        maxAge: 60 * 60 * 24,
      });
      setCookie("user", JSON.stringify(data.data.user));
      toast.success("Investimento realizado com sucesso!");
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!data) {
    return <Skeleton className="w-full h-24 rounded-md" />;
  }

  const wallet = data.data.wallet;

  return (
    <form onSubmit={methods.handleSubmit((data) => invest({ ...data }))}>
      <DialogMain>
        <DialogDescription className="mb-4 text-sm font-medium text-muted-foreground">
          Atualmente você possuí cerca de {formatCurrency(wallet.availableCash)}{" "}
          disponíveis para compra e está investindo cerca de{" "}
          <strong className="text-primary">
            {formatCurrency(currentPrice * quantity)}{" "}
          </strong>
        </DialogDescription>
        <Input
          name="quantity"
          methods={methods}
          isNumeric
          required
          label="Quantidade para comprar"
          decimalScale={0}
          thousandSeparator="."
          decimalSeparator=","
          placeholder="0"
          min={1}
          isAllowed={(values) => {
            const { floatValue } = values;

            if (!floatValue) {
              methods.setValue("quantity", 1);
              return false;
            }

            if (floatValue < 1) return false;

            const total = floatValue * currentPrice;

            return total <= wallet.availableCash;
          }}
        />
      </DialogMain>
      <DialogFooter>
        <DialogClose className={buttonVariants({ variant: "outline" })}>
          Cancelar
        </DialogClose>
        <DialogClose type="submit" className={buttonVariants()}>
          Comprar ({quantity})
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
