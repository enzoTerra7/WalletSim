import Link from "next/link";
import { LoginForm } from "./_components/form";

export default function LoginPage() {
  return (
    <main className="h-full max-w-lg mx-auto w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl text-primary font-medium">Login</h1>
      <LoginForm />
      <Link href={"/auth/register"} className="text-sm font-medium group">
        Não possuí uma conta? <span className="font-semibold text-primary group-hover:underline">Cadastre-se</span>
      </Link>
    </main>
  );
}
