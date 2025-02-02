import * as y from "yup";

export const GetWalletGHistoryActiveSchema = y.object({
  filterDate: y
    .string()
    .oneOf(["7d", "14d", "30d", "all"])
    .required()
    .default("7d"),
});
