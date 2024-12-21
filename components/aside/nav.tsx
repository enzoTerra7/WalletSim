"use client";

import { cn } from "@/lib/utils";
import { navigationItems } from "./config";
import { NavigationItem } from "./item";
import { ClassName } from "@/types";

export function Nav({ className }: { className?: ClassName }) {
  return (
    <nav className={cn("flex-1 space-y-4 p-6", className)}>
      {navigationItems.map((item) => (
        <NavigationItem key={item.href.trim()} {...item} />
      ))}
    </nav>
  );
}
