import { Globe, Landmark, PiggyBank } from "lucide-react";
import { MarketTypeCard } from "./_components/type-card";
import Link from "next/link";
import { MainStocksList } from "./_components/lists";

export default function MarketPage() {
  return (
    <main className="w-full flex items-start justify-start flex-col gap-8 py-16 xl:px-28">
      <div className="space-y-1">
        <h1 className="text-2xl text-foreground font-medium">Mercado</h1>
        <p className="text-muted-foreground font-medium text-sm">
          Comece a investir agora mesmo e descubra os melhores ativos para você
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Link href="/market/stock" className="w-full">
          <MarketTypeCard
            name="Ações"
            description="Invista diretamente em empresas listadas na bolsa de valores. Escolha entre diferentes setores e potencialize seus ganhos com papéis de alta liquidez. Descubra empresas listadas e invista em papéis que atendem às suas estratégias e objetivos financeiros."
            Icon={Landmark}
          />
        </Link>
        <Link href="/market/fund" className="w-full">
          <MarketTypeCard
            name="Fundos"
            description="Diversifique seus investimentos com fundos geridos por especialistas. Uma forma prática de acessar carteiras diversificadas e reduzir riscos."
            Icon={PiggyBank}
          />
        </Link>
        <Link href="/market/bdr" className="w-full">
          <MarketTypeCard
            name="BDR's"
            description="Tenha acesso às maiores empresas globais sem sair do mercado brasileiro. Invista em BDRs e participe do crescimento de gigantes internacionais."
            Icon={Globe}
          />
        </Link>
      </div>
      <MainStocksList />
    </main>
  );
}
