import Link from "next/link";
import { ForgotPasswordForm } from "./_components/form";

export default function ForgotPasswordPage() {
  return (
    <main className="h-full max-w-lg mx-auto w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl text-primary font-medium">Esqueceu sua senha?</h1>
      <p className="text-balance text-center text-lg text-foreground">
        Insira o e-mail associado a sua conta e nós enviaremos um link para você
      </p>
      <ForgotPasswordForm />
      <Link href={"/auth/login"} className="text-sm font-medium group">
        Lembrou?{" "}
        <span className="font-semibold text-primary group-hover:underline">
          Voltar ao login
        </span>
      </Link>
    </main>
  );
}
