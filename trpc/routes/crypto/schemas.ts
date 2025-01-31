import * as y from "yup";

export const SearchAllCryptoSchema = y.object({
  page: y.number().required(),
  limit: y.number().required(),
  search: y.string(),
});

export const SearchCryptoSchema = y.object({
  coin: y.string().required(),
  currency: y.string().optional().default("BRL"),
});
