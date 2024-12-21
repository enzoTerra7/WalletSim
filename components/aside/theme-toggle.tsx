"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full gap-4 items-center justify-start">
      <Button
        className="pointer-events-none"
        type="button"
        variant={"outline"}
        size={"icon"}
      >
        <Sun className="size-4 shrink-0" />
      </Button>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
      />
      <Button
        className="pointer-events-none"
        type="button"
        variant={"outline"}
        size={"icon"}
      >
        <Moon className="size-4 shrink-0" />
      </Button>
    </div>
  );
}
