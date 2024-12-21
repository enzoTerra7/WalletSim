import { MaxWidthWrapper } from "../maxWrapper";

export function Header() {
  return (
    <>
      <header className="h-20 p-4 bg-card text-card-foreground border-b border-border w-full">
        <MaxWidthWrapper className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold">WalletSIM</h1>
        </MaxWidthWrapper>
      </header>
    </>
  );
}
