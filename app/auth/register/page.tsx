import Link from "next/link";
import { RegisterForm } from "./_components/form";

export default function RegisterPage() {
  return (
    <main className="h-full max-w-lg mx-auto w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl text-primary font-medium">Crie sua conta</h1>
      <RegisterForm />
      <Link href={"/auth/login"} className="text-sm font-medium group">
        Já tem conta?{" "}
        <span className="font-semibold text-primary group-hover:underline">
          Entre agora mesmo
        </span>
      </Link>
    </main>
  );
}
