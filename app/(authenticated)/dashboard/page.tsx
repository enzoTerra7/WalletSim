import { Suspense } from "react";
import { WalletCards, WalletCardsSkeleton } from "./_components/wallet-cards";
import { DashboardList } from "./_components/lists";

export default function DashboardPage() {
  return (
    <main className="w-full flex items-start justify-start flex-col gap-8 py-16 xl:px-28">
      <h1 className="text-2xl mx-auto text-foreground font-medium">
        Dashboard
      </h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Suspense fallback={<WalletCardsSkeleton />}>
          <WalletCards />
        </Suspense>
      </div>
      <DashboardList />
    </main>
  );
}
