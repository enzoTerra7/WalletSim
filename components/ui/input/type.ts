import { ClassName, Mask } from "@/types";
import { ElementType } from "react";
import { UseFormReturn } from "react-hook-form";
import { NumericFormatProps } from "react-number-format";

type ClassNames = {
  innerWrapper?: ClassName;
  label?: ClassName;
  mainWrapper?: ClassName;
  input?: ClassName;
  customMessage?: ClassName;
};

type Icon = {
  element: ElementType;
  className?: ClassName;
  event?: () => void;
};

type DefaultInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type InputProps = {
  name: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods?: UseFormReturn<any, any, any>;
  mask?: Mask;
  classNames?: ClassNames;
  leftIcon?: Icon;
  rightIcon?: Icon;
  isNumeric?: boolean;
  type?: DefaultInputProps["type"];
  customMessage?: React.ReactNode;
} & Omit<Partial<NumericFormatProps>, "type"> &
  DefaultInputProps;
