"use client";
import { trpc } from "@/app/_trpc/client";
import { buttonVariants } from "@/components/ui/button";
import { DialogClose, DialogFooter, DialogMain } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/formatters";
import { Stocks } from "@prisma/client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function SellTicketForm({
  methods,
  stock,
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
  stock: Stocks;
}) {
  const router = useRouter();
  const quantity = methods.watch("quantity");
  const currentPrice = methods.watch("currentPrice");

  const { refetch } = trpc.user.getMe.useQuery(undefined, {
    enabled: false,
  });
  const { mutate: invest } = trpc.wallet.postNewSell.useMutation({
    onSuccess: async () => {
      const { data } = await refetch();

      if (!data) {
        return;
      }

      setCookie("token", data.data.token, {
        maxAge: 60 * 60 * 24,
      });
      setCookie("user", JSON.stringify(data.data.user));
      toast.success("Investimento realizado com sucesso!");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <form onSubmit={methods.handleSubmit((data) => invest({ ...data }))}>
      <DialogMain>
        <DialogDescription className="mb-4 text-sm font-medium text-muted-foreground">
          Atualmente você possuí {stock.quantity} ações disponíveis para vender.
          Se concluir a venda, receberá{" "}
          <strong className="text-primary">
            {formatCurrency(currentPrice * quantity)}
          </strong>
        </DialogDescription>
        <Input
          name="quantity"
          methods={methods}
          isNumeric
          required
          label="Quantidade para vender"
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

            return floatValue <= stock.quantity;
          }}
        />
      </DialogMain>
      <DialogFooter>
        <DialogClose className={buttonVariants({ variant: "outline" })}>
          Cancelar
        </DialogClose>
        <DialogClose type="submit" className={buttonVariants()}>
          Vender ({quantity})
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
