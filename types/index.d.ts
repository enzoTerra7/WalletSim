export type Mask =
  | "email"
  | "cpf"
  | "datetime"
  | "numeric"
  | "currency"
  | "decimal"
  | "integer"
  | (string & {})
  | (string[] & {})
  | null;

export type ClassName =
  React.InputHTMLAttributes<HTMLInputElement>["className"];
