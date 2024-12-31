"use client";

import { trpc } from "@/app/_trpc/client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMain,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setCookie } from "cookies-next";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface DeleteWalletButtonProps {
  walletId: number;
}

export function DeleteWalletButton(props: DeleteWalletButtonProps) {
  const router = useRouter();
  const { mutate, isLoading } = trpc.wallet.deleteWallet.useMutation({
    onSuccess: async (data) => {
      if (data.data.sendToWalletCreation) {
        toast.success("Carteira excluída com sucesso!");
        router.push("/auth/wallet-create");
        return;
      }

      setCookie("token", data.data.user, {
        maxAge: 60 * 60 * 24,
      });
      setCookie("user", JSON.stringify(data.data.user), {
        maxAge: 60 * 60 * 24,
      });

      toast.success(
        "Carteira ativa excluída com sucesso! Outra carteira foi ativada."
      );
      router.refresh();
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            isLoading={isLoading}
            variant={"destructive"}
            type="button"
            size={"icon"}
          >
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir carteira</DialogTitle>
          </DialogHeader>
          <DialogMain>
            <DialogDescription>
              Tem certeza que deseja excluir essa carteira?
            </DialogDescription>
          </DialogMain>
          <DialogFooter>
            <DialogClose
              disabled={isLoading}
              type="button"
              className={buttonVariants({ variant: "ghost" })}
            >
              Cancelar
            </DialogClose>
            <DialogClose
              onClick={() => mutate({ id: props.walletId })}
              disabled={isLoading}
              type="button"
              className={buttonVariants({ variant: "destructive" })}
            >
              Excluir
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
