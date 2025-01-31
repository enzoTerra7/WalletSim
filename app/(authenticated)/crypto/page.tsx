import { MainCriptoList } from "./_components/lists";
import { Suspense } from "react";

export default function CryptoPage() {
  return (
    <main className="w-full flex items-start justify-start flex-col gap-8 py-16 xl:px-28">
      <div className="space-y-1">
        <h1 className="text-2xl text-foreground font-medium">Criptomoedas</h1>
        <p className="text-muted-foreground font-medium text-sm">
          Comece a investir nos melhores ativos cripto para você
        </p>
      </div>
      <Suspense fallback={<div></div>}>
        <MainCriptoList />
      </Suspense>
    </main>
  );
}
