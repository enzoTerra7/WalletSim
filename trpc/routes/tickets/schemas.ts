import * as y from "yup";

export const SearchAllTicketSchema = y.object({
  page: y.number().required(),
  limit: y.number().required(),
  search: y.string(),
  sortBy: y
    .string()
    .oneOf([
      "market_cap_basic",
      "volume",
      "change",
      "name",
      "close",
      "change_abs",
      "sector",
    ]),
  sortOrder: y.string().oneOf(["asc", "desc"]),
  type: y.string().oneOf(["stock", "bdr", "fund"]),
});

export const SearchTicketSchema = y.object({
  ticket: y.string().required(),
  range: y
    .string()
    .oneOf([
      "1d",
      "5d",
      "7d",
      "1mo",
      "3mo",
      "6mo",
      "1y",
      "2y",
      "5y",
      "10y",
      "ytd",
      "max",
    ]),
  interval: y
    .string()
    .oneOf([
      "1m",
      "2m",
      "5m",
      "15m",
      "30m",
      "60m",
      "90m",
      "1h",
      "1d",
      "5d",
      "1wk",
      "1mo",
      "3mo",
    ]),
});
