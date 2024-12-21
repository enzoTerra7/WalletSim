"use client";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "./config";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavigationItem(props: NavigationItem) {
  const pathname = usePathname();

  const isActive = props.partial
    ? pathname.includes(props.href)
    : pathname === props.href;
  return (
    <>
      <Link
        href={props.href}
        className={cn(
          "p-2 rounded flex items-center bg-card hover:bg-primary/15 transition-colors duration-300 text-card-foreground gap-2 w-full",
          { "bg-primary/10 text-primary pointer-events-none": isActive }
        )}
      >
        <props.icon className="size-4 shrink-0" />
        <p className="text-sm font-medium">{props.name}</p>
      </Link>
    </>
  );
}
