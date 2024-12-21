import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleWalletColorsBalance(
  invested: number,
  currentAmount: number
) {
  if (invested > currentAmount) {
    return {
      textClass: "text-red-500",
      icon: TrendingDown,
    };
  }

  if (invested < currentAmount && invested !== 0) {
    return {
      textClass: "text-green-500",
      icon: TrendingUp,
    };
  }

  return {
    textClass: "text-neutral-500",
    icon: Minus,
  };
}
