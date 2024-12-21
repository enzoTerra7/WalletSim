"use client";

import { Bolt, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { NavigationItem } from "./item";
import { ThemeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export function NavBottom() {
  const router = useRouter();

  function handleLogout() {
    deleteCookie("token");
    deleteCookie("user");
    router.push("/aut/login");
  }
  return (
    <div className="border-t space-y-3 border-border shrink-0 p-4">
      <ThemeToggle />
      <NavigationItem href="/my-profile" name="Meu Perfil" icon={User} />
      <NavigationItem href="/configuration" name="Configurações" icon={Bolt} />
      <Button
        onClick={handleLogout}
        className="p-2 rounded flex items-center bg-card hover:bg-primary/15 transition-colors duration-300 text-card-foreground justify-start gap-2 w-full"
      >
        <LogOut className="size-4 shrink-0" />
        <p className="text-sm font-medium">Sair</p>
      </Button>
    </div>
  );
}
