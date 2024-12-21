"use client";
import { Slot } from "@radix-ui/react-slot";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export function GoBackPage({
  asChild,
  children,
}: { asChild?: boolean } & Required<PropsWithChildren>) {
  const router = useRouter();
  const Comp = asChild ? Slot : "button";
  return <Comp onClick={() => router.back()}>{children}</Comp>;
}
