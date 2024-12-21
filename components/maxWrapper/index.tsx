import { cn } from "@/lib/utils";

export function MaxWidthWrapper({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("max-w-7xl w-full h-full mx-auto", className)}
      {...props}
    />
  );
}
