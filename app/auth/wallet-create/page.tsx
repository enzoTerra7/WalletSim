import Link from "next/link";
import { RegisterWalletForm } from "./_components/form";

export default function RegisterWalletPage() {
  return (
    <main className="h-full max-w-lg mx-auto w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl text-primary font-medium">
        Crie sua primeira carteira
      </h1>
      <RegisterWalletForm />
      <Link href={"/dashboard"} className="text-sm font-medium group">
        Não quer criar agora?{" "}
        <span className="font-semibold text-primary group-hover:underline">
          Ir para dashboard
        </span>
      </Link>
    </main>
  );
}
