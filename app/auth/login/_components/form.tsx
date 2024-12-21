"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/trpc/routes/authRoutes/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import { LockKeyhole, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as y from "yup";

type LoginFormData = y.InferType<typeof LoginSchema>;

export function LoginForm() {
  const router = useRouter();
  const methods = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  const { mutate: login, isLoading } = trpc.auth.login.useMutation({
    onSuccess(data) {
      setCookie("token", data.data.token, {
        maxAge: 60 * 60 * 24,
      });
      setCookie("user", JSON.stringify(data.data.user));
      toast.success("Logado com sucesso!");
      router.push("/dashboard");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <>
      <form
        onSubmit={methods.handleSubmit((e) =>
          login({
            ...e,
          })
        )}
        className="w-full flex flex-col gap-3.5"
      >
        <Input
          name="email"
          label="E-mail"
          required
          methods={methods}
          disabled={isLoading}
          type="email"
          placeholder="Insira o seu e-mail"
          leftIcon={{
            element: User,
          }}
        />
        <Input
          name="password"
          label="Senha"
          required
          methods={methods}
          disabled={isLoading}
          type="password"
          placeholder="Insira a sua senha"
          leftIcon={{
            element: LockKeyhole,
          }}
          customMessage={
            <Link href="/auth/forgot-password">Esqueceu sua senha?</Link>
          }
          classNames={{
            customMessage:
              "text-blue-500 text-end w-full font-semibold hover:underline",
          }}
        />
        <Button isLoading={isLoading} className="mt-2.5">
          Entrar
        </Button>
      </form>
    </>
  );
}
