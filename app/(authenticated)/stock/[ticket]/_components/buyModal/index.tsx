"use client";
import { Button } from "@/components/ui/button";
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
import { BuyTicketForm } from "./form";
export interface SellModalProps {
  currentPrice: number;
  ticket: string;
  name: string;
  logo: string;
  type?: string;
}

type SellTicketForm = y.InferType<typeof ExchangeTicketSchema>;

export function BuyModal(props: SellModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm<SellTicketForm>({
    resolver: yupResolver(ExchangeTicketSchema),
    defaultValues: {
      ticket: props.ticket,
      currentPrice: props.currentPrice,
      quantity: 1,
      logo: props.logo,
      name: props.name,
      type: props.type || "stock",
    },
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Comprar</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comprar {props.ticket}</DialogTitle>
            <DialogDescription>
              Você está prestes a comprar {props.ticket} no valor de{" "}
              {formatCurrency(props.currentPrice)}
            </DialogDescription>
          </DialogHeader>
          <BuyTicketForm methods={methods} />
        </DialogContent>
      </Dialog>
    </>
  );
}
