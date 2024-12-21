"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { BadgeDollarSign, IdCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import * as y from "yup";
import { useRouter } from "next/navigation";
import { CreateWalletSchema } from "@/trpc/routes/wallet/schemas";

type RegisterWalletFormData = y.InferType<typeof CreateWalletSchema>;

export function RegisterWalletForm() {
  const router = useRouter();
  const methods = useForm<RegisterWalletFormData>({
    resolver: yupResolver(CreateWalletSchema),
  });

  const { mutate: register, isLoading } = trpc.wallet.create.useMutation({
    onSuccess(data) {
      setCookie("token", data.data.token, {
        maxAge: 60 * 60 * 24,
      });
      setCookie("user", JSON.stringify(data.data.user));
      toast.success("Carteira criada com sucesso!");
      router.push("/dashboard");
    },
    onError(error) {
      console.log(error);
      toast.error(error.message);
    },
  });
  return (
    <>
      <form
        onSubmit={methods.handleSubmit((e) => register({ ...e }))}
        className="w-full flex flex-col gap-3.5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <Input
            name="availableCash"
            label="Valor Inicial"
            required
            id="availableCash"
            methods={methods}
            disabled={isLoading}
            isNumeric
            prefix="R$"
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Insira o valor inicial"
            leftIcon={{
              element: BadgeDollarSign,
            }}
          />
          <Input
            name="monthlyAport"
            label="Aporte mensal (todo dia 1)"
            id="monthlyAport"
            methods={methods}
            disabled={isLoading}
            isNumeric
            prefix="R$"
            decimalScale={2}
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Insira o dos aportes"
            leftIcon={{
              element: BadgeDollarSign,
            }}
          />
        </div>
        <Input
          name="name"
          label="Nome da carteira"
          required
          id="name"
          methods={methods}
          disabled={isLoading}
          placeholder="Insira o nome para a carteira"
          leftIcon={{
            element: IdCard,
          }}
        />

        <Button
          isLoading={isLoading}
          className="mt-2.5"
        >
          Cadastrar
        </Button>
      </form>
    </>
  );
}
