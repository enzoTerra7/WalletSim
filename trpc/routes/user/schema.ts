import * as y from "yup";

export const ChangeWalletActiveSchema = y.object({
  walletId: y.number().required(),
});
