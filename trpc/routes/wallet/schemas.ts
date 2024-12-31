import * as y from "yup";

export const CreateWalletSchema = y.object({
  name: y.string().required("Insira o seu e-mail"),
  availableCash: y.number().required("Insira o aporte inicial"),
  monthlyAport: y.number(),
});

export const ExchangeTicketSchema = y.object({
  ticket: y.string().required("Insira o seu e-mail"),
  quantity: y.number().required("Insira a quantidade a ser comprada"),
  currentPrice: y.number().required(),
  logo: y.string().required(),
  name: y.string().required(),
});

export const DeleteWalletSchema = y.object({
  id: y.number().required(),
});
