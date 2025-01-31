import {
  Bitcoin,
  LayoutDashboard,
  ShoppingBag,
  WalletMinimal,
} from "lucide-react";
import { ElementType } from "react";

export type NavigationItem = {
  name: string;
  href: string;
  icon: ElementType;
  partial?: boolean;
};

export const navigationItems: NavigationItem[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Minha Carteira",
    href: "/my-wallet",
    partial: true,
    icon: WalletMinimal,
  },
  {
    name: "Mercado",
    href: "/market",
    icon: ShoppingBag,
    partial: true,
  },
  {
    name: "Criptomoedas",
    href: "/crypto",
    icon: Bitcoin,
    partial: true,
  },
];
