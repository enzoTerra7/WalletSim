"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/formatters";
import { ExchangeTicketSchema } from "@/trpc/routes/wallet/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as y from "yup";
import { SellTicketForm } from "./form";
import { Stocks } from "@prisma/client";
export interface SellModalProps {
  currentPrice: number;
  ticket: string;
  name: string;
  logo: string;
  stock: Stocks | null;
}

type SellTicketForm = y.InferType<typeof ExchangeTicketSchema>;

export function SellModal(props: SellModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm<SellTicketForm>({
    resolver: yupResolver(ExchangeTicketSchema),
    defaultValues: {
      ticket: props.ticket,
      currentPrice: props.currentPrice,
      quantity: 1,
      logo: props.logo,
      name: props.name,
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger disabled={!props.stock} asChild>
          <Button className={buttonVariants({ variant: "destructive" })}>
            Vender
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vender {props.ticket}</DialogTitle>
            <DialogDescription>
              Você está prestes a vender {props.ticket} no valor de{" "}
              {formatCurrency(props.currentPrice)}
            </DialogDescription>
          </DialogHeader>
          {props.stock && (
            <SellTicketForm stock={props.stock} methods={methods} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
